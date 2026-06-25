// ============================================================
// GeoHistory — daily history-trivia map game
// ============================================================

const MAX_SCORE_PER_ROUND = 5000;
const TOTAL_ROUNDS = 5;

// Scale (km) controls how steeply the score drops with distance.
// Smaller scale = harsher penalty for being far. We tune US tighter,
// international more forgiving since the search area is larger.
const US_SCORE_SCALE_KM = 800;
const INTL_SCORE_SCALE_KM = 2500;

// ---------- State ----------
const state = {
  rounds: [],          // selected questions for today
  currentRound: 0,     // 0-indexed
  totalScore: 0,
  results: [],         // { question, points, distanceKm, guess: {lat,lng}, answer: {lat,lng} }
  guessLatLng: null,
  map: null,
  guessMarker: null,
  answerMarker: null,
  answerLine: null,
  reviewBackTo: "screen-final", // which screen the review's back button returns to
};

// ---------- Persistence ----------
const STORAGE_PREFIX = "geohistory:played:";

function savedResultKey() {
  return STORAGE_PREFIX + todayKey();
}

function loadSavedResult() {
  try {
    const raw = localStorage.getItem(savedResultKey());
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveResult() {
  try {
    const payload = {
      date: todayKey(),
      totalScore: state.totalScore,
      results: state.results,
    };
    localStorage.setItem(savedResultKey(), JSON.stringify(payload));
  } catch (e) {
    // storage unavailable — silently continue
  }
}

// ---------- Daily seed ----------
function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatTodayLong() {
  const d = new Date();
  return d.toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

// Deterministic integer hash from a string — used to seed daily picks.
function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

// Mulberry32 PRNG seeded by an integer.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Daily question selection guarantees:
//   1. Everyone on the same local date gets the same 5 questions in the
//      same order (deterministic from the date).
//   2. No question can appear twice within any 30-day window. Each pool is
//      shuffled once with a fixed seed into a stable rotation; each day
//      takes the next 3 US and next 2 international questions from that
//      rotation. With 90 US / 60 intl and 3+2 picked per day, both pools
//      cycle every 30 days.
//
// Bump SCHEDULE_VERSION to reshuffle the rotation (e.g. after adding new
// questions, or to refresh players who have completed a full cycle).
const SCHEDULE_EPOCH = "2026-06-15";
const SCHEDULE_VERSION = "v2";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function shuffleArray(arr, rand) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function daysSinceEpoch() {
  const utcMidnight = s => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((utcMidnight(todayKey()) - utcMidnight(SCHEDULE_EPOCH)) / 86400000);
}

function pickDailyRounds() {
  const day = daysSinceEpoch();

  // Fixed rotation order, same for every player on every day.
  const usOrder = shuffleArray(
    [...US_QUESTIONS.keys()],
    mulberry32(hashStr("geohistory:us-schedule:" + SCHEDULE_VERSION))
  );
  const intlOrder = shuffleArray(
    [...INTL_QUESTIONS.keys()],
    mulberry32(hashStr("geohistory:intl-schedule:" + SCHEDULE_VERSION))
  );

  const us = [0, 1, 2].map(i => {
    const poolIdx = usOrder[mod(day * 3 + i, usOrder.length)];
    return { ...US_QUESTIONS[poolIdx], scope: "us" };
  });
  const intl = [0, 1].map(i => {
    const poolIdx = intlOrder[mod(day * 2 + i, intlOrder.length)];
    return { ...INTL_QUESTIONS[poolIdx], scope: "intl" };
  });

  // Per-day reshuffle of the US/intl mix order — keeps the scope hidden,
  // but doesn't change WHICH questions appear that day.
  const mixRand = mulberry32(hashStr("geohistory:mix:" + todayKey()));
  return shuffleArray([...us, ...intl], mixRand);
}

// ---------- Geo math ----------
function haversineKm(a, b) {
  const R = 6371;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function scoreFromDistance(distanceKm, scope) {
  const scale = scope === "us" ? US_SCORE_SCALE_KM : INTL_SCORE_SCALE_KM;
  const raw = MAX_SCORE_PER_ROUND * Math.exp(-distanceKm / scale);
  return Math.round(raw);
}

function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  if (km < 100) return `${km.toFixed(1)} km away`;
  return `${Math.round(km).toLocaleString()} km away`;
}

// ---------- Screens ----------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------- Map ----------
// The map is created once at the start of the game and persists across all
// rounds. Between rounds we only clear the previous guess marker; the view
// stays where the player left it, so the map never hints at the next round's
// region (US vs international).
function clearMapAnswerLayers() {
  if (state.answerMarker) {
    state.map.removeLayer(state.answerMarker);
    state.answerMarker = null;
  }
  if (state.answerLine) {
    state.map.removeLayer(state.answerLine);
    state.answerLine = null;
  }
}

function prepareMap() {
  if (state.map) {
    if (state.guessMarker) {
      state.map.removeLayer(state.guessMarker);
      state.guessMarker = null;
    }
    clearMapAnswerLayers();
    state.guessLatLng = null;
    // Container may have been hidden during the result screen — re-measure.
    state.map.invalidateSize();
    return;
  }

  state.map = L.map("map", {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 12,
    worldCopyJump: true,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(state.map);

  state.map.on("click", onMapClick);
}

function onMapClick(e) {
  state.guessLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };

  if (state.guessMarker) {
    state.guessMarker.setLatLng(e.latlng);
  } else {
    const icon = L.divIcon({
      className: "",
      html: '<div class="guess-marker"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    state.guessMarker = L.marker(e.latlng, { icon }).addTo(state.map);
  }

  document.getElementById("btn-guess").disabled = false;
  document.getElementById("guess-hint").textContent = "Locked in. Submit when ready.";
}

// ---------- Round flow ----------
function startGame() {
  state.rounds = pickDailyRounds();
  state.currentRound = 0;
  state.totalScore = 0;
  state.results = [];
  // Discard any leftover map from a previous session so this game starts
  // at the neutral world view.
  if (state.map) {
    state.map.remove();
    state.map = null;
    state.guessMarker = null;
    state.guessLatLng = null;
  }
  loadRound(0);
}

function loadRound(idx) {
  const round = state.rounds[idx];

  document.getElementById("round-label").textContent = `Round ${idx + 1} / ${TOTAL_ROUNDS}`;
  document.getElementById("question-text").textContent = round.question;
  document.getElementById("total-score").textContent = state.totalScore.toLocaleString();
  document.getElementById("btn-guess").disabled = true;
  document.getElementById("guess-hint").textContent = "Click the map to place your guess";

  // Reset the round UI: hide the result overlay, restore the guess footer.
  document.getElementById("round-result-overlay").classList.remove("show");
  document.getElementById("game-footer").style.display = "";

  showScreen("screen-game");
  // Leaflet needs the container to be visible before init/resize for sizing.
  setTimeout(prepareMap, 0);
}

function submitGuess() {
  if (!state.guessLatLng) return;

  const round = state.rounds[state.currentRound];
  const answer = { lat: round.lat, lng: round.lng };
  const distanceKm = haversineKm(state.guessLatLng, answer);
  const points = scoreFromDistance(distanceKm, round.scope);

  state.totalScore += points;
  state.results.push({
    question: round.question,
    answer: round.answer,
    detail: round.detail,
    scope: round.scope,
    points,
    distanceKm,
    guess: { ...state.guessLatLng },
    answerLatLng: answer,
  });

  drawAnswerOnMap(answer);
  showRoundResult(points, distanceKm, round);
}

// Drop a green marker at the correct location, draw a dashed line from
// the player's guess to it, and reframe the map to fit both points.
function drawAnswerOnMap(answer) {
  const answerIcon = L.divIcon({
    className: "",
    html: '<div class="answer-marker"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
  state.answerMarker = L.marker([answer.lat, answer.lng], { icon: answerIcon }).addTo(state.map);

  state.answerLine = L.polyline(
    [[state.guessLatLng.lat, state.guessLatLng.lng], [answer.lat, answer.lng]],
    { className: "answer-line" }
  ).addTo(state.map);

  const bounds = L.latLngBounds([
    [state.guessLatLng.lat, state.guessLatLng.lng],
    [answer.lat, answer.lng],
  ]);
  state.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 6, animate: true });
}

function showRoundResult(points, distanceKm, round) {
  document.getElementById("result-points").textContent = `+${points.toLocaleString()}`;
  document.getElementById("result-distance").textContent = formatDistance(distanceKm);
  document.getElementById("result-event").textContent = round.answer;
  document.getElementById("result-detail").textContent = round.detail;
  document.getElementById("total-score").textContent = state.totalScore.toLocaleString();

  const btnNext = document.getElementById("btn-next");
  btnNext.textContent = state.currentRound + 1 < TOTAL_ROUNDS ? "Next round" : "See final score";

  // Swap the guess footer for the result overlay; map stays visible behind.
  document.getElementById("game-footer").style.display = "none";
  document.getElementById("round-result-overlay").classList.add("show");
}

function nextRound() {
  state.currentRound++;
  if (state.currentRound >= TOTAL_ROUNDS) {
    showFinal();
  } else {
    loadRound(state.currentRound);
  }
}

// ---------- Final ----------
function emojiForPoints(p) {
  if (p >= 4000) return "🟩";
  if (p >= 2500) return "🟨";
  if (p >= 1000) return "🟧";
  return "🟥";
}

function showFinal() {
  document.getElementById("final-score").textContent = state.totalScore.toLocaleString();
  const summary = state.results.map(r => emojiForPoints(r.points)).join("");
  document.getElementById("final-summary").textContent = summary;
  state.reviewBackTo = "screen-final";
  saveResult();
  showScreen("screen-final");
}

function buildShareText() {
  const summary = state.results.map(r => emojiForPoints(r.points)).join("");
  return `GeoHistory ${todayKey()}\n${state.totalScore.toLocaleString()} / ${(MAX_SCORE_PER_ROUND * TOTAL_ROUNDS).toLocaleString()}\n${summary}`;
}

async function shareResult() {
  const text = buildShareText();
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch (e) {
      // user cancelled — fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    toast("Result copied to clipboard");
  } catch (e) {
    toast("Couldn't copy — long-press to copy:\n" + text);
  }
}

// ---------- Review ----------
function showReview() {
  const list = document.getElementById("review-list");
  list.innerHTML = "";
  state.results.forEach((r, i) => {
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-item-header">
        <div class="review-item-event">${i + 1}. ${escapeHtml(r.answer)}</div>
        <div class="review-item-points" style="color:${pointsColor(r.points)}">+${r.points.toLocaleString()}</div>
      </div>
      <div class="review-item-question">${escapeHtml(r.question)}</div>
      <div class="review-item-detail">${escapeHtml(r.detail)}</div>
      <div class="review-item-distance">${formatDistance(r.distanceKm)}</div>
    `;
    list.appendChild(item);
  });
  showScreen("screen-review");
}

function pointsColor(p) {
  if (p >= 4000) return "var(--good)";
  if (p >= 2500) return "var(--mid)";
  return "var(--bad)";
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// ---------- Toast ----------
let toastTimeout = null;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove("show"), 2400);
}

// ---------- Landing (played vs. fresh) ----------
function renderLanding() {
  const saved = loadSavedResult();
  const playedPanel = document.getElementById("played-state");
  const playBtn = document.getElementById("btn-play");

  if (saved && saved.date === todayKey()) {
    // Restore in-memory state so share/review work on the saved data.
    state.totalScore = saved.totalScore;
    state.results = saved.results;

    document.getElementById("played-score").textContent =
      `${saved.totalScore.toLocaleString()} / ${(MAX_SCORE_PER_ROUND * TOTAL_ROUNDS).toLocaleString()}`;
    document.getElementById("played-summary").textContent =
      saved.results.map(r => emojiForPoints(r.points)).join("");

    playedPanel.style.display = "block";
    playBtn.style.display = "none";
  } else {
    playedPanel.style.display = "none";
    playBtn.style.display = "";
  }
}

// ---------- Wire up ----------
function init() {
  document.getElementById("daily-date").textContent = formatTodayLong();

  document.getElementById("btn-play").addEventListener("click", startGame);
  document.getElementById("btn-guess").addEventListener("click", submitGuess);
  document.getElementById("btn-next").addEventListener("click", nextRound);
  document.getElementById("btn-share").addEventListener("click", shareResult);
  document.getElementById("btn-review").addEventListener("click", showReview);
  document.getElementById("btn-review-back").addEventListener("click", () => showScreen(state.reviewBackTo));

  document.getElementById("btn-played-share").addEventListener("click", shareResult);
  document.getElementById("btn-played-review").addEventListener("click", () => {
    state.reviewBackTo = "screen-landing";
    showReview();
  });

  renderLanding();
}

document.addEventListener("DOMContentLoaded", init);
