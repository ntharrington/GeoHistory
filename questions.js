// Historical event question bank.
// `lat` and `lng` mark the place to pin on the map.
// `zoom` is the map's starting zoom for that round (lower = wider view).
// `detail` is shown on the result screen after a guess.

const US_QUESTIONS = [
  {
    question: "Where was the decisive three-day battle of the American Civil War fought in July 1863?",
    answer: "Battle of Gettysburg",
    lat: 39.8309, lng: -77.2311,
    detail: "Fought July 1–3, 1863 in Gettysburg, Pennsylvania. The Union victory halted Robert E. Lee's invasion of the North and became the war's turning point.",
    zoom: 4
  },
  {
    question: "Where did colonists dump 342 chests of British tea into the harbor in 1773?",
    answer: "Boston Tea Party",
    lat: 42.3522, lng: -71.0510,
    detail: "On December 16, 1773, Sons of Liberty dumped tea into Boston Harbor to protest the Tea Act — a key spark of the American Revolution.",
    zoom: 4
  },
  {
    question: "Where did the Wright Brothers make the first powered airplane flight in December 1903?",
    answer: "Wright Brothers' First Flight",
    lat: 36.0186, lng: -75.6692,
    detail: "Orville Wright flew 120 feet over the dunes of Kitty Hawk, North Carolina on December 17, 1903.",
    zoom: 4
  },
  {
    question: "Where did Texan defenders famously hold out against Santa Anna's army for 13 days in 1836?",
    answer: "Battle of the Alamo",
    lat: 29.4260, lng: -98.4861,
    detail: "The Alamo, a former mission in San Antonio, Texas. The siege ended March 6, 1836; 'Remember the Alamo' became a rallying cry.",
    zoom: 4
  },
  {
    question: "Where was the world's first atomic bomb detonated on July 16, 1945?",
    answer: "Trinity Test Site",
    lat: 33.6773, lng: -106.4754,
    detail: "Trinity Site, in the Jornada del Muerto desert of New Mexico, was the culmination of the Manhattan Project.",
    zoom: 4
  },
  {
    question: "Where was the Japanese surprise attack of December 7, 1941 that brought the US into WWII?",
    answer: "Attack on Pearl Harbor",
    lat: 21.3649, lng: -157.9507,
    detail: "Pearl Harbor, Oahu, Hawaii. The attack killed 2,403 Americans and destroyed 19 ships.",
    zoom: 4
  },
  {
    question: "Where did Cornwallis surrender to Washington in 1781, effectively ending the Revolutionary War?",
    answer: "Siege of Yorktown",
    lat: 37.2389, lng: -76.5097,
    detail: "Yorktown, Virginia. After a three-week siege by American and French forces, British General Cornwallis surrendered on October 19, 1781.",
    zoom: 4
  },
  {
    question: "Where was President John F. Kennedy assassinated on November 22, 1963?",
    answer: "Assassination of JFK",
    lat: 32.7787, lng: -96.8086,
    detail: "Dealey Plaza in Dallas, Texas. Kennedy was shot while riding in a presidential motorcade.",
    zoom: 4
  },
  {
    question: "Where did 19 people accused of witchcraft hang in 1692?",
    answer: "Salem Witch Trials",
    lat: 42.5197, lng: -70.8955,
    detail: "Salem, Massachusetts. The hysteria lasted from February 1692 to May 1693, resulting in 20 executions.",
    zoom: 4
  },
  {
    question: "Where did the Civil War begin with a Confederate bombardment on April 12, 1861?",
    answer: "Battle of Fort Sumter",
    lat: 32.7522, lng: -79.8746,
    detail: "Fort Sumter, in the harbor of Charleston, South Carolina. The 34-hour bombardment opened the war.",
    zoom: 4
  },
  {
    question: "Where was the first permanent English settlement in North America founded in 1607?",
    answer: "Jamestown",
    lat: 37.2089, lng: -76.7770,
    detail: "Jamestown, Virginia, founded May 14, 1607 by the Virginia Company of London.",
    zoom: 4
  },
  {
    question: "Where was President Lincoln shot by John Wilkes Booth in April 1865?",
    answer: "Lincoln Assassination",
    lat: 38.8967, lng: -77.0254,
    detail: "Ford's Theatre, Washington, D.C. Lincoln was shot during a performance of 'Our American Cousin' on April 14, 1865.",
    zoom: 4
  },
  {
    question: "Where did Custer's 7th Cavalry meet a catastrophic defeat by Lakota and Cheyenne warriors in 1876?",
    answer: "Battle of the Little Bighorn",
    lat: 45.5697, lng: -107.4332,
    detail: "Along the Little Bighorn River in present-day Montana. June 25–26, 1876 — also called 'Custer's Last Stand'.",
    zoom: 4
  },
  {
    question: "Where was the ceremonial Golden Spike driven, completing the first transcontinental railroad in 1869?",
    answer: "Golden Spike Ceremony",
    lat: 41.6175, lng: -112.5505,
    detail: "Promontory Summit, Utah Territory, May 10, 1869 — joining the Union Pacific and Central Pacific railroads.",
    zoom: 4
  },
  {
    question: "Where did a 1929 stock market crash kick off the Great Depression?",
    answer: "Wall Street Crash of 1929",
    lat: 40.7069, lng: -74.0113,
    detail: "The New York Stock Exchange on Wall Street, lower Manhattan. 'Black Tuesday' was October 29, 1929.",
    zoom: 4
  },
  {
    question: "Where did civil rights marchers face violence on 'Bloody Sunday' in March 1965?",
    answer: "Selma to Montgomery Marches",
    lat: 32.4072, lng: -87.0184,
    detail: "The Edmund Pettus Bridge in Selma, Alabama. State troopers attacked marchers on March 7, 1965.",
    zoom: 4
  },
  {
    question: "Where was gold discovered in 1848, triggering the California Gold Rush?",
    answer: "Discovery at Sutter's Mill",
    lat: 38.8030, lng: -120.8916,
    detail: "Sutter's Mill on the American River at Coloma, California. James Marshall spotted gold on January 24, 1848.",
    zoom: 4
  },
  {
    question: "Where did US troops massacre a Lakota encampment in December 1890?",
    answer: "Wounded Knee Massacre",
    lat: 43.1450, lng: -102.3697,
    detail: "Wounded Knee Creek on the Pine Ridge Reservation in South Dakota. The 7th Cavalry killed roughly 250 Lakota on December 29, 1890.",
    zoom: 4
  },
  {
    question: "Where was the secret laboratory that designed the first atomic bombs?",
    answer: "Los Alamos Laboratory",
    lat: 35.8800, lng: -106.3031,
    detail: "Los Alamos, New Mexico — the Manhattan Project's principal weapons-design site, established in 1943.",
    zoom: 4
  },
  {
    question: "Where did a 1969 police raid spark the modern gay-rights movement?",
    answer: "Stonewall Riots",
    lat: 40.7338, lng: -74.0027,
    detail: "The Stonewall Inn in Greenwich Village, New York City. The uprising began June 28, 1969.",
    zoom: 4
  },
  {
    question: "Where did a fire destroy much of a major Midwestern city in October 1871?",
    answer: "Great Chicago Fire",
    lat: 41.8746, lng: -87.6422,
    detail: "Chicago, Illinois. The fire burned from October 8–10, 1871, killing ~300 and leveling 3.3 square miles.",
    zoom: 4
  },
  {
    question: "Where did a 1906 earthquake and fires destroy a major West Coast city?",
    answer: "1906 San Francisco Earthquake",
    lat: 37.7749, lng: -122.4194,
    detail: "San Francisco, California. The magnitude ~7.9 quake struck on April 18, 1906; subsequent fires destroyed 80% of the city.",
    zoom: 4
  },
  {
    question: "Where did the Apollo 11 moon mission lift off in July 1969?",
    answer: "Apollo 11 Launch",
    lat: 28.5729, lng: -80.6490,
    detail: "Launch Complex 39A at the Kennedy Space Center, Florida — July 16, 1969.",
    zoom: 4
  },
  {
    question: "Where did burglars break into Democratic Party headquarters in 1972, sparking a scandal that toppled a president?",
    answer: "Watergate Break-in",
    lat: 38.9015, lng: -77.0509,
    detail: "The Watergate complex in Washington, D.C. The June 17, 1972 break-in led to Nixon's resignation in 1974.",
    zoom: 4
  },
  {
    question: "Where did 146 workers, mostly young immigrant women, die in a 1911 factory fire?",
    answer: "Triangle Shirtwaist Factory Fire",
    lat: 40.7305, lng: -73.9952,
    detail: "The Asch Building (now Brown Building) near Washington Square, NYC. The fire on March 25, 1911 spurred sweeping labor reforms.",
    zoom: 4
  },
  {
    question: "Where did the Pilgrims of the Mayflower come ashore in December 1620?",
    answer: "Plymouth Colony",
    lat: 41.9584, lng: -70.6620,
    detail: "Plymouth, Massachusetts. The site is marked by the legendary (but disputed) Plymouth Rock.",
    zoom: 4
  },
  {
    question: "Where did Martin Luther King Jr. deliver his 'I Have a Dream' speech in 1963?",
    answer: "March on Washington",
    lat: 38.8893, lng: -77.0502,
    detail: "The Lincoln Memorial in Washington, D.C., on August 28, 1963, during the March on Washington for Jobs and Freedom.",
    zoom: 4
  },
  {
    question: "Where did Confederate General Lee surrender to Ulysses S. Grant in April 1865?",
    answer: "Surrender at Appomattox",
    lat: 37.3776, lng: -78.7959,
    detail: "Appomattox Court House, Virginia. The surrender on April 9, 1865 ended the major fighting of the Civil War.",
    zoom: 4
  },
  {
    question: "Where did Martin Luther King Jr. lead a 1955–56 bus boycott against segregated public transit?",
    answer: "Montgomery Bus Boycott",
    lat: 32.3792, lng: -86.3077,
    detail: "Montgomery, Alabama. Sparked by Rosa Parks' December 1, 1955 arrest, the 381-day boycott led to a Supreme Court ruling against bus segregation.",
    zoom: 4
  },
  {
    question: "Where did Spanish missionaries first establish a permanent settlement in what's now the US, in 1565?",
    answer: "St. Augustine Founded",
    lat: 29.8946, lng: -81.3145,
    detail: "St. Augustine, Florida. Founded by Pedro Menéndez de Avilés on September 8, 1565 — the oldest continuously inhabited European-founded city in the contiguous US.",
    zoom: 4
  },
  {
    question: "Where were the opening shots of the American Revolutionary War fired in April 1775?",
    answer: "Battles of Lexington and Concord",
    lat: 42.4476, lng: -71.2244,
    detail: "Lexington and Concord, Massachusetts. 'The shot heard 'round the world' rang out on April 19, 1775.",
    zoom: 4
  },
  {
    question: "Where did an American victory in 1777 convince France to enter the Revolutionary War as an ally?",
    answer: "Battles of Saratoga",
    lat: 42.9889, lng: -73.6447,
    detail: "Near Saratoga, in upstate New York. The two-stage battle ended with British General Burgoyne's surrender on October 17, 1777.",
    zoom: 4
  },
  {
    question: "Where did British soldiers fire on a colonial crowd in March 1770, killing five?",
    answer: "Boston Massacre",
    lat: 42.3588, lng: -71.0573,
    detail: "King Street (now State Street) in Boston, Massachusetts, on March 5, 1770. Paul Revere's engraving spread the story across the colonies.",
    zoom: 4
  },
  {
    question: "Where did the Continental Congress adopt the Declaration of Independence on July 4, 1776?",
    answer: "Signing of the Declaration",
    lat: 39.9489, lng: -75.1499,
    detail: "Independence Hall (then the Pennsylvania State House) in Philadelphia. The Constitution was framed in the same building 11 years later.",
    zoom: 4
  },
  {
    question: "Where did Vice President Aaron Burr fatally shoot Alexander Hamilton in a duel in July 1804?",
    answer: "Burr–Hamilton Duel",
    lat: 40.7800, lng: -74.0153,
    detail: "On a dueling ground in Weehawken, New Jersey, on the Hudson River cliffs across from Manhattan, July 11, 1804.",
    zoom: 4
  },
  {
    question: "Where was the single bloodiest day in American history fought in September 1862?",
    answer: "Battle of Antietam",
    lat: 39.4767, lng: -77.7400,
    detail: "Near Sharpsburg, Maryland, on September 17, 1862. Roughly 23,000 casualties in a single day; the Union 'victory' enabled Lincoln to issue the Emancipation Proclamation.",
    zoom: 4
  },
  {
    question: "Where did a 47-day siege in 1863 give the Union control of the entire Mississippi River?",
    answer: "Siege of Vicksburg",
    lat: 32.3526, lng: -90.8779,
    detail: "Vicksburg, Mississippi. Confederate forces surrendered to Ulysses S. Grant on July 4, 1863 — one day after Gettysburg.",
    zoom: 4
  },
  {
    question: "Where did General Sherman's destructive 'March to the Sea' end in December 1864?",
    answer: "Sherman's March to the Sea",
    lat: 32.0809, lng: -81.0912,
    detail: "Savannah, Georgia. Sherman presented the city to Lincoln as a 'Christmas gift' on December 22, 1864.",
    zoom: 4
  },
  {
    question: "Where did Andrew Jackson win a famous victory over the British in January 1815 — fought after the war was officially over?",
    answer: "Battle of New Orleans",
    lat: 29.9434, lng: -89.9842,
    detail: "Chalmette Battlefield, just downriver from New Orleans, Louisiana. The Treaty of Ghent had ended the War of 1812 two weeks earlier, but word hadn't arrived.",
    zoom: 4
  },
  {
    question: "Where did Texians defeat Santa Anna in April 1836 to secure Texas independence?",
    answer: "Battle of San Jacinto",
    lat: 29.7494, lng: -95.0810,
    detail: "Near present-day La Porte, Texas, east of Houston. Sam Houston's surprise attack on April 21, 1836 lasted just 18 minutes.",
    zoom: 4
  },
  {
    question: "Where was a westward-bound group of pioneers trapped by snow in the Sierra Nevada in the winter of 1846–47?",
    answer: "Donner Party",
    lat: 39.3217, lng: -120.3304,
    detail: "Donner Pass, in the Sierra Nevada of California. Of 87 emigrants, 48 survived — some by resorting to cannibalism.",
    zoom: 4
  },
  {
    question: "Where did the forced Cherokee removal known as the 'Trail of Tears' begin in 1838?",
    answer: "Trail of Tears",
    lat: 34.5453, lng: -84.8769,
    detail: "New Echota, the Cherokee capital in northern Georgia. Thousands died on the march west to Indian Territory.",
    zoom: 4
  },
  {
    question: "Where did William Henry Harrison defeat Tecumseh's confederacy in 1811?",
    answer: "Battle of Tippecanoe",
    lat: 40.5061, lng: -86.8420,
    detail: "Near present-day Lafayette, Indiana, November 7, 1811. Harrison's victory powered his 1840 campaign slogan 'Tippecanoe and Tyler too'.",
    zoom: 4
  },
  {
    question: "Where did a 363-mile waterway open in 1825, connecting the Great Lakes to the Hudson River?",
    answer: "Opening of the Erie Canal",
    lat: 42.8864, lng: -78.8784,
    detail: "Buffalo, New York — the canal's western terminus on Lake Erie. It opened October 26, 1825, slashing freight costs and accelerating westward settlement.",
    zoom: 4
  },
  {
    question: "Where did Thomas Edison develop the first commercially practical incandescent light bulb in 1879?",
    answer: "Edison's Menlo Park Laboratory",
    lat: 40.5687, lng: -74.3457,
    detail: "Menlo Park, New Jersey. Edison's lab there earned him the nickname 'the Wizard of Menlo Park'.",
    zoom: 4
  },
  {
    question: "Where did the Pony Express begin its 1,900-mile run to Sacramento in April 1860?",
    answer: "Pony Express Origin",
    lat: 39.7674, lng: -94.8467,
    detail: "St. Joseph, Missouri. The mail service ran from April 1860 to October 1861, when the transcontinental telegraph put it out of business.",
    zoom: 4
  },
  {
    question: "Where did a then-record suspension bridge open over the East River in 1883?",
    answer: "Brooklyn Bridge Opening",
    lat: 40.7061, lng: -73.9969,
    detail: "Spanning the East River between Manhattan and Brooklyn, New York. Opened May 24, 1883 after 14 years of construction.",
    zoom: 4
  },
  {
    question: "Where was a 305-foot French gift unveiled in 1886 to welcome immigrants arriving by sea?",
    answer: "Statue of Liberty Dedication",
    lat: 40.6892, lng: -74.0445,
    detail: "Liberty Island (then Bedloe's Island), in New York Harbor. President Grover Cleveland presided at the dedication on October 28, 1886.",
    zoom: 4
  },
  {
    question: "Where did the German airship Hindenburg burst into flames while mooring in May 1937?",
    answer: "Hindenburg Disaster",
    lat: 40.0307, lng: -74.3540,
    detail: "Lakehurst Naval Air Station, New Jersey. The airship caught fire on May 6, 1937; 36 of the 97 aboard, plus one ground crewman, died.",
    zoom: 4
  },
  {
    question: "Where was the massive concrete arch dam on the Colorado River completed in 1936?",
    answer: "Hoover Dam Completed",
    lat: 36.0161, lng: -114.7377,
    detail: "Black Canyon, on the Arizona–Nevada border. The dam was dedicated by FDR on September 30, 1935 and fully operational by 1936.",
    zoom: 4
  },
  {
    question: "Where was a 1,454-foot art deco skyscraper completed in 1931, becoming the world's tallest building for 40 years?",
    answer: "Empire State Building",
    lat: 40.7484, lng: -73.9857,
    detail: "Midtown Manhattan, at 350 Fifth Avenue. It opened May 1, 1931 and held the tallest-building title until the World Trade Center surpassed it in 1971.",
    zoom: 4
  },
  {
    question: "Where did a 4,200-foot suspension bridge open over a famous strait in May 1937?",
    answer: "Golden Gate Bridge Opens",
    lat: 37.8199, lng: -122.4783,
    detail: "Spanning the Golden Gate strait between San Francisco and Marin County, California. The bridge opened to pedestrians May 27, 1937 and vehicles the next day.",
    zoom: 4
  },
  {
    question: "Where did National Guardsmen shoot four anti-Vietnam War student protesters in May 1970?",
    answer: "Kent State Shootings",
    lat: 41.1495, lng: -81.3441,
    detail: "Kent State University in Kent, Ohio, on May 4, 1970. The shootings triggered a national student strike.",
    zoom: 4
  },
  {
    question: "Where did a partial nuclear reactor meltdown occur in March 1979 — the worst US commercial nuclear accident?",
    answer: "Three Mile Island Accident",
    lat: 40.1525, lng: -76.7253,
    detail: "Three Mile Island Nuclear Generating Station, near Middletown, Pennsylvania, on the Susquehanna River.",
    zoom: 4
  },
  {
    question: "Where did a 1980 volcanic eruption blow off the top of a Pacific Northwest mountain?",
    answer: "Mount St. Helens Eruption",
    lat: 46.1914, lng: -122.1956,
    detail: "Mount St. Helens, in southwestern Washington state. The May 18, 1980 eruption was the deadliest and most destructive in US history.",
    zoom: 4
  },
  {
    question: "Where was the largest of the camps that interned 120,000 Japanese-Americans during WWII?",
    answer: "Manzanar Internment Camp",
    lat: 36.7283, lng: -118.1545,
    detail: "Manzanar, in the Owens Valley of eastern California, beneath the Sierra Nevada. It operated from 1942 to 1945.",
    zoom: 4
  },
  {
    question: "Where did anti-war protests erupt into violent clashes during the Democratic National Convention in August 1968?",
    answer: "1968 Chicago DNC Protests",
    lat: 41.8849, lng: -87.6298,
    detail: "Chicago, Illinois — primarily in Grant Park and outside the convention hall. The 'police riot' was broadcast nationwide.",
    zoom: 4
  },
  {
    question: "Where did a truck bomb destroy a federal building in April 1995, killing 168 people?",
    answer: "Oklahoma City Bombing",
    lat: 35.4727, lng: -97.5170,
    detail: "The Alfred P. Murrah Federal Building in downtown Oklahoma City. The bomb went off at 9:02 a.m. on April 19, 1995.",
    zoom: 4
  },
  {
    question: "Where did hijacked planes destroy twin 110-story skyscrapers on September 11, 2001?",
    answer: "September 11 Attacks",
    lat: 40.7115, lng: -74.0134,
    detail: "The World Trade Center in Lower Manhattan, New York City. Two further attacks struck the Pentagon and a field in Pennsylvania.",
    zoom: 4
  },
  {
    question: "Where did delegates from 12 colonies first convene to coordinate resistance against Britain in September 1774?",
    answer: "First Continental Congress",
    lat: 39.9484, lng: -75.1494,
    detail: "Carpenters' Hall in Philadelphia, Pennsylvania. The Congress met from September 5 to October 26, 1774.",
    zoom: 4
  }
];

const INTL_QUESTIONS = [
  {
    question: "Where did Napoleon meet his final defeat in June 1815?",
    answer: "Battle of Waterloo",
    lat: 50.6789, lng: 4.4108,
    detail: "Waterloo, in present-day Belgium. The June 18, 1815 battle ended Napoleon's Hundred Days and his rule.",
    zoom: 2
  },
  {
    question: "Where did a revolutionary crowd storm a fortress-prison on July 14, 1789?",
    answer: "Storming of the Bastille",
    lat: 48.8531, lng: 2.3692,
    detail: "The Bastille, in Paris, France. The storming became the symbolic start of the French Revolution and is celebrated as France's national day.",
    zoom: 2
  },
  {
    question: "Where did William the Conqueror defeat the English King Harold in 1066?",
    answer: "Battle of Hastings",
    lat: 50.9119, lng: 0.4877,
    detail: "Near Hastings in southern England, October 14, 1066. The Norman victory transformed English language, law, and aristocracy.",
    zoom: 2
  },
  {
    question: "Where did Allied forces land on five code-named beaches on June 6, 1944?",
    answer: "D-Day Landings",
    lat: 49.3700, lng: -0.8800,
    detail: "Normandy, on the northern coast of France. The largest amphibious invasion in history opened the Western Front against Nazi Germany.",
    zoom: 2
  },
  {
    question: "Where did jubilant crowds tear down a Cold War symbol on November 9, 1989?",
    answer: "Fall of the Berlin Wall",
    lat: 52.5163, lng: 13.3777,
    detail: "Berlin, Germany. The wall had divided the city since 1961; its fall presaged German reunification a year later.",
    zoom: 2
  },
  {
    question: "Where was the first atomic bomb dropped in wartime, on August 6, 1945?",
    answer: "Atomic Bombing",
    lat: 34.3955, lng: 132.4536,
    detail: "Hiroshima, Japan. The bomb killed roughly 80,000 people instantly; a second bomb fell on Nagasaki three days later.",
    zoom: 2
  },
  {
    question: "Where was the Magna Carta sealed by King John in 1215?",
    answer: "Sealing of Magna Carta",
    lat: 51.4453, lng: -0.5631,
    detail: "Runnymede, a meadow beside the River Thames in England. King John sealed the charter on June 15, 1215.",
    zoom: 2
  },
  {
    question: "Where did one of WWII's most brutal sieges take place from 1942 to 1943?",
    answer: "Battle of Stalingrad",
    lat: 48.7080, lng: 44.5133,
    detail: "Stalingrad (now Volgograd), Russia. The five-month battle cost ~2 million casualties and turned the Eastern Front against Germany.",
    zoom: 2
  },
  {
    question: "Where was a Roman city buried under volcanic ash in 79 AD?",
    answer: "Eruption of Vesuvius",
    lat: 40.7497, lng: 14.4848,
    detail: "Pompeii, in southern Italy near modern Naples. Mt. Vesuvius erupted on August 24 (or October 24), 79 AD, also burying Herculaneum.",
    zoom: 2
  },
  {
    question: "Where did 300 Spartans (and allies) make a famous stand against the Persian army in 480 BC?",
    answer: "Battle of Thermopylae",
    lat: 38.7956, lng: 22.5364,
    detail: "Thermopylae, a narrow coastal pass in central Greece. King Leonidas's stand against Xerxes I lasted three days.",
    zoom: 2
  },
  {
    question: "Where did a 1986 nuclear reactor explosion cause the worst civil nuclear disaster in history?",
    answer: "Chernobyl Disaster",
    lat: 51.3890, lng: 30.0992,
    detail: "The Chernobyl Nuclear Power Plant near Pripyat, in northern Ukraine. Reactor No. 4 exploded on April 26, 1986.",
    zoom: 2
  },
  {
    question: "Where did pro-democracy protests end in a military crackdown on June 4, 1989?",
    answer: "Tiananmen Square Protests",
    lat: 39.9054, lng: 116.3976,
    detail: "Tiananmen Square in Beijing, China. The crackdown killed hundreds, possibly thousands, of demonstrators.",
    zoom: 2
  },
  {
    question: "Where was the treaty signed in 1919 that formally ended World War I?",
    answer: "Treaty of Versailles",
    lat: 48.8049, lng: 2.1204,
    detail: "The Palace of Versailles, outside Paris, France. The treaty was signed on June 28, 1919 — five years to the day after the assassination of Archduke Franz Ferdinand.",
    zoom: 2
  },
  {
    question: "Where did Bolsheviks storm a tsarist palace in November 1917, igniting the Russian Revolution?",
    answer: "October Revolution",
    lat: 59.9398, lng: 30.3146,
    detail: "The Winter Palace in Petrograd (now St. Petersburg), Russia. The 'October Revolution' took place on November 7, 1917 (October 25 in the old Julian calendar).",
    zoom: 2
  },
  {
    question: "Where was Tutankhamun's nearly intact tomb discovered by Howard Carter in 1922?",
    answer: "Discovery of King Tut's Tomb",
    lat: 25.7402, lng: 32.6014,
    detail: "The Valley of the Kings, near Luxor in Egypt. Carter opened the tomb on November 26, 1922.",
    zoom: 2
  },
  {
    question: "Where did Nelson's fleet defeat the Franco-Spanish navy on October 21, 1805?",
    answer: "Battle of Trafalgar",
    lat: 36.1819, lng: -6.0331,
    detail: "Off Cape Trafalgar, on the southwest coast of Spain. The British victory ensured naval dominance for a century — at the cost of Nelson's life.",
    zoom: 2
  },
  {
    question: "Where, according to tradition, did Martin Luther post his 95 Theses in 1517, starting the Protestant Reformation?",
    answer: "Posting of the 95 Theses",
    lat: 51.8675, lng: 12.6385,
    detail: "The door of All Saints' (Castle) Church in Wittenberg, in modern Germany. Luther's theses were posted on October 31, 1517.",
    zoom: 2
  },
  {
    question: "Where did Gandhi end his 240-mile Salt March in protest of British colonial salt laws in 1930?",
    answer: "Gandhi's Salt March",
    lat: 20.8500, lng: 72.5667,
    detail: "Dandi, on the Arabian Sea coast of Gujarat, India. Gandhi arrived on April 5, 1930 and broke the Salt Law by making salt from seawater.",
    zoom: 2
  },
  {
    question: "Where did a massive ocean liner strike an iceberg and sink in April 1912?",
    answer: "Sinking of the Titanic",
    lat: 41.7268, lng: -49.9486,
    detail: "In the North Atlantic, about 370 nautical miles south-southeast of Newfoundland. The Titanic sank early on April 15, 1912; over 1,500 perished.",
    zoom: 2
  },
  {
    question: "Where did Allied forces defeat the Ottoman Empire in a famously failed 1915–16 campaign?",
    answer: "Gallipoli Campaign",
    lat: 40.2306, lng: 26.2800,
    detail: "The Gallipoli Peninsula in modern Turkey. The Allied campaign (April 1915 – January 1916) ended in withdrawal after some 500,000 casualties on both sides.",
    zoom: 2
  },
  {
    question: "Where, according to Christian tradition, was Jesus crucified around 30 AD?",
    answer: "Crucifixion of Jesus",
    lat: 31.7784, lng: 35.2310,
    detail: "Golgotha, just outside the walls of Jerusalem. The site is venerated today at the Church of the Holy Sepulchre.",
    zoom: 2
  },
  {
    question: "Where did Athenian hoplites repel a Persian invasion in 490 BC, inspiring a famous long-distance run?",
    answer: "Battle of Marathon",
    lat: 38.1500, lng: 23.9700,
    detail: "On the plain of Marathon, about 26 miles northeast of Athens, Greece. The legend of Pheidippides' run gave the marathon race its name.",
    zoom: 2
  },
  {
    question: "Where was Julius Caesar stabbed to death by a group of senators on the Ides of March, 44 BC?",
    answer: "Assassination of Julius Caesar",
    lat: 41.8959, lng: 12.4773,
    detail: "The Curia of Pompey, in what is now Largo di Torre Argentina, Rome. Caesar was killed during a Senate meeting on March 15, 44 BC.",
    zoom: 2
  },
  {
    question: "Where did Ottoman cannons end the Byzantine Empire in 1453?",
    answer: "Fall of Constantinople",
    lat: 41.0082, lng: 28.9784,
    detail: "Constantinople (modern Istanbul, Turkey). Sultan Mehmed II's forces breached the walls on May 29, 1453, ending nearly 1,500 years of Roman/Byzantine rule.",
    zoom: 2
  },
  {
    question: "Where did a bakery blaze in September 1666 destroy ~13,000 houses and a famous cathedral?",
    answer: "Great Fire of London",
    lat: 51.5117, lng: -0.0918,
    detail: "London, England. The fire began on Pudding Lane on September 2, 1666 and burned for four days, gutting medieval Old St. Paul's.",
    zoom: 2
  },
  {
    question: "Where did Protestant nobles throw Catholic officials out a castle window in 1618, triggering the Thirty Years' War?",
    answer: "Defenestration of Prague",
    lat: 50.0908, lng: 14.4006,
    detail: "Prague Castle, in the Kingdom of Bohemia (now the Czech Republic). The officials survived a 70-foot fall — landing in a dung heap, by some accounts.",
    zoom: 2
  },
  {
    question: "Where did a Polish king lead a relief army to break a months-long Ottoman siege in 1683?",
    answer: "Battle of Vienna",
    lat: 48.2082, lng: 16.3738,
    detail: "Vienna, the Habsburg capital. Jan III Sobieski's cavalry charge on September 12, 1683 halted Ottoman expansion into Europe.",
    zoom: 2
  },
  {
    question: "Where did Christopher Columbus first set foot in the Americas on October 12, 1492?",
    answer: "Columbus Lands in the Americas",
    lat: 24.0571, lng: -74.5419,
    detail: "An island in the Bahamas the Lucayan inhabitants called Guanahani — Columbus renamed it San Salvador.",
    zoom: 2
  },
  {
    question: "Where did Hernán Cortés and his Aztec allies overthrow Moctezuma II's empire in 1521?",
    answer: "Fall of Tenochtitlan",
    lat: 19.4326, lng: -99.1332,
    detail: "Tenochtitlan, the Aztec capital, on an island in Lake Texcoco — now Mexico City. The siege ended August 13, 1521.",
    zoom: 2
  },
  {
    question: "Where did Francisco Pizarro capture the Inca emperor Atahualpa in November 1532?",
    answer: "Battle of Cajamarca",
    lat: -7.1638, lng: -78.5132,
    detail: "Cajamarca, in the highlands of present-day Peru. The ambush on November 16, 1532 led to the collapse of the Inca Empire.",
    zoom: 2
  },
  {
    question: "Where did a Holy League fleet shatter Ottoman naval power in October 1571?",
    answer: "Battle of Lepanto",
    lat: 38.2733, lng: 21.3169,
    detail: "In the Gulf of Patras, off the coast of western Greece near Lepanto (modern Nafpaktos), October 7, 1571.",
    zoom: 2
  },
  {
    question: "Where did a catastrophic 1883 volcanic eruption produce one of the loudest sounds in recorded history?",
    answer: "Eruption of Krakatoa",
    lat: -6.1018, lng: 105.4231,
    detail: "Krakatoa, an island in the Sunda Strait between Java and Sumatra in present-day Indonesia. The August 27, 1883 eruption killed ~36,000.",
    zoom: 2
  },
  {
    question: "Where did a devastating earthquake and tsunami strike a European capital on All Saints' Day, 1755?",
    answer: "Lisbon Earthquake",
    lat: 38.7223, lng: -9.1393,
    detail: "Lisbon, Portugal. The November 1, 1755 quake (magnitude ~8.5–9) and subsequent tsunami and fires destroyed much of the city.",
    zoom: 2
  },
  {
    question: "Where was a 120-mile canal opened in 1869, slashing the sea journey from Europe to Asia?",
    answer: "Opening of the Suez Canal",
    lat: 30.6433, lng: 32.3434,
    detail: "Across the Isthmus of Suez in Egypt, linking the Mediterranean to the Red Sea. It opened November 17, 1869.",
    zoom: 2
  },
  {
    question: "Where was a British ocean liner sunk by a German U-boat in May 1915, killing 1,198 including 128 Americans?",
    answer: "Sinking of the Lusitania",
    lat: 51.4250, lng: -8.5417,
    detail: "Off the Old Head of Kinsale, on the south coast of Ireland, May 7, 1915. The sinking helped push the US toward entering WWI.",
    zoom: 2
  },
  {
    question: "Where did Robert Clive's British East India Company forces win a 1757 victory that started Britain's conquest of India?",
    answer: "Battle of Plassey",
    lat: 23.7833, lng: 88.2500,
    detail: "Palashi (Plassey), in present-day West Bengal, India. Clive defeated the Nawab of Bengal on June 23, 1757.",
    zoom: 2
  },
  {
    question: "Where did North Vietnamese tanks crash through the gates of the Independence Palace in April 1975?",
    answer: "Fall of Saigon",
    lat: 10.8231, lng: 106.6297,
    detail: "Saigon (now Ho Chi Minh City), South Vietnam. The fall on April 30, 1975 ended the Vietnam War.",
    zoom: 2
  },
  {
    question: "Where did Jawaharlal Nehru raise the Indian tricolor at midnight on August 15, 1947?",
    answer: "Indian Independence",
    lat: 28.6562, lng: 77.2410,
    detail: "The Red Fort in Delhi, India. The ceremony marked the end of nearly two centuries of British rule.",
    zoom: 2
  },
  {
    question: "Where did Mongol armies sack and depopulate the capital of the Islamic Golden Age in 1258?",
    answer: "Mongol Sack of Baghdad",
    lat: 33.3152, lng: 44.3661,
    detail: "Baghdad, capital of the Abbasid Caliphate. Hulagu Khan's forces destroyed the city beginning February 13, 1258 — including the famed House of Wisdom.",
    zoom: 2
  },
  {
    question: "Where did the British defeat the French in a 1759 battle that effectively settled control of North America?",
    answer: "Battle of the Plains of Abraham",
    lat: 46.8016, lng: -71.2150,
    detail: "On a plateau outside the walls of Quebec City, September 13, 1759. Both commanders — Wolfe and Montcalm — died of wounds within a day.",
    zoom: 2
  }
];
