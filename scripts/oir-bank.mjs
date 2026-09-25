// Hand-written OIR questions for scripts/gen-oir.mjs (hard level). The generator shuffles each bank with a
// fixed seed and gives test N (11..110) one row per bank. Correct answer is written first; options get shuffled.
const lines = (s) => s.trim().split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l.split("|").map((x) => x.trim()));

// q | correct | wrong | wrong | wrong | explanation
export const analogies = lines(`
Pusillanimous : Courage :: Impecunious : ?|Money|Friends|Wisdom|Patience|Pusillanimous means lacking courage; impecunious means lacking money.
Cacophony : Sound :: Stench : ?|Smell|Taste|Sight|Noise|A cacophony is an unpleasant sound; a stench is an unpleasant smell.
Sycophant : Flattery :: Braggart : ?|Boasting|Lying|Cowardice|Complaining|A sycophant is marked by flattery; a braggart by boasting.
Counterfeiter : Currency :: Plagiarist : ?|Writing|Money|Signatures|Identity|A counterfeiter fakes currency; a plagiarist steals and passes off someone else's writing.
Mutiny : Ship :: Coup : ?|Government|Army|Company|Parliament|A mutiny is a revolt against authority on a ship; a coup is the overthrow of a government.
Sabotage : Destruction :: Espionage : ?|Spying|Treason|Bribery|Rebellion|Sabotage is deliberate destruction; espionage is spying.
Ephemeral : Permanent :: Frugal : ?|Extravagant|Thrifty|Poor|Careful|These are opposites: ephemeral–permanent, frugal–extravagant.
Lethargic : Energy :: Apathetic : ?|Interest|Anger|Money|Health|A lethargic person lacks energy; an apathetic person lacks interest.
Gregarious : Company :: Reclusive : ?|Solitude|Crowds|Parties|Travel|A gregarious person seeks company; a reclusive person seeks solitude.
Philanthropist : Generosity :: Misanthrope : ?|Distrust of people|Love of books|Fear of water|Dislike of work|A philanthropist is marked by generosity to people; a misanthrope by dislike and distrust of people.
Cartographer : Maps :: Lexicographer : ?|Dictionaries|Laws|Coins|Stamps|A cartographer compiles maps; a lexicographer compiles dictionaries.
Horology : Clocks :: Oenology : ?|Wine|Birds|Eggs|Teeth|Horology is the study of clocks; oenology is the study of wine.
Oology : Eggs :: Odontology : ?|Teeth|Bones|Birds|Smells|Oology is the study of eggs; odontology is the study of teeth.
Mycology : Fungi :: Herpetology : ?|Reptiles|Insects|Birds|Fish|Mycology studies fungi; herpetology studies reptiles (and amphibians).
Speleology : Caves :: Selenology : ?|The Moon|The Sun|Stars|Volcanoes|Speleology is the study of caves; selenology is the study of the Moon.
Apiary : Bees :: Formicary : ?|Ants|Birds|Fish|Horses|An apiary houses bees; a formicary is an ant colony or nest.
Arboretum : Trees :: Herbarium : ?|Dried plants|Insects|Animals|Rocks|An arboretum is a collection of living trees; a herbarium is a collection of dried plants.
Loquacious : Taciturn :: Parsimonious : ?|Generous|Stingy|Talkative|Careful|These are opposites: loquacious–taciturn, parsimonious–generous.
Obdurate : Stubborn :: Obsequious : ?|Servile|Rebellious|Honest|Arrogant|These are synonyms: obdurate means stubborn; obsequious means servile.
Candour : Deceit :: Valour : ?|Cowardice|Honesty|Pride|Loyalty|These are opposites: candour–deceit, valour–cowardice.
Salient : Prominent :: Latent : ?|Hidden|Obvious|Late|Active|Salient means prominent; latent means hidden.
Nadir : Zenith :: Dearth : ?|Abundance|Scarcity|Death|Poverty|These are opposites: nadir–zenith, dearth–abundance.
Mitigate : Aggravate :: Augment : ?|Diminish|Increase|Enlarge|Argue|These are opposites: mitigate–aggravate, augment–diminish.
Laconic : Words :: Frugal : ?|Spending|Speech|Sleep|Work|A laconic person is sparing with words; a frugal person is sparing with spending.
Fry : Fish :: Joey : ?|Kangaroo|Goat|Horse|Swan|A fry is a young fish; a joey is a young kangaroo.
Cygnet : Swan :: Leveret : ?|Hare|Lion|Deer|Owl|A cygnet is a young swan; a leveret is a young hare.
Stallion : Mare :: Gander : ?|Goose|Duck|Hen|Ewe|Stallion is a male horse and mare a female; gander is a male goose and goose the female.
Ram : Ewe :: Drake : ?|Duck|Goose|Hen|Doe|A ram is a male sheep and a ewe the female; a drake is a male duck and a duck the female.
Eyrie : Eagle :: Drey : ?|Squirrel|Rabbit|Bee|Beaver|An eyrie is an eagle's nest; a drey is a squirrel's nest.
Sett : Badger :: Lodge : ?|Beaver|Fox|Otter|Rabbit|A sett is a badger's home; a lodge is a beaver's home.
Cote : Doves :: Coop : ?|Poultry|Horses|Pigs|Bees|Doves are kept in a cote; poultry in a coop.
Pod : Whales :: Gaggle : ?|Geese|Crows|Owls|Bees|A group of whales is a pod; a group of geese is a gaggle.
Xenophobia : Foreigners :: Agoraphobia : ?|Open spaces|Heights|Water|Darkness|Xenophobia is fear of foreigners; agoraphobia is fear of open or crowded spaces.
Nyctophobia : Darkness :: Ophidiophobia : ?|Snakes|Spiders|Dogs|Birds|Nyctophobia is fear of darkness; ophidiophobia is fear of snakes.
Regicide : King :: Fratricide : ?|Brother|Father|Mother|Sister|Regicide is killing a king; fratricide is killing one's brother.
Matricide : Mother :: Infanticide : ?|Infant|Father|King|Brother|Matricide is killing one's mother; infanticide is killing an infant.
Monarchy : A single ruler :: Oligarchy : ?|A small group|All citizens|The clergy|The army|A monarchy is rule by one person; an oligarchy is rule by a small group.
Theocracy : Priests :: Plutocracy : ?|The wealthy|The military|The elderly|Scholars|A theocracy is rule by priests; a plutocracy is rule by the wealthy.
Gerontocracy : The elderly :: Meritocracy : ?|The most able|The wealthy|The clergy|The military|A gerontocracy is rule by the old; a meritocracy is rule by the most able.
Bibliophile : Books :: Oenophile : ?|Wine|Flowers|Music|Food|A bibliophile loves books; an oenophile loves wine.
Dermatology : Skin :: Haematology : ?|Blood|Heart|Liver|Bones|Dermatology deals with skin; haematology deals with blood.
Nephron : Kidney :: Neuron : ?|Nervous system|Heart|Lung|Muscle|The nephron is the functional unit of the kidney; the neuron is that of the nervous system.
Alveoli : Lungs :: Villi : ?|Small intestine|Stomach|Kidney|Heart|Alveoli are tiny structures in the lungs; villi are tiny projections in the small intestine.
Chlorophyll : Leaf :: Haemoglobin : ?|Blood|Bone|Skin|Hair|Chlorophyll is the pigment in leaves; haemoglobin is the pigment in blood.
Insulin : Pancreas :: Bile : ?|Liver|Kidney|Stomach|Heart|Insulin is produced by the pancreas; bile is produced by the liver.
Lactometer : Milk :: Hydrometer : ?|Density of liquids|Humidity|Pressure|Rainfall|A lactometer tests the purity (density) of milk; a hydrometer measures the density of liquids.
Sphygmomanometer : Blood pressure :: Altimeter : ?|Altitude|Speed|Depth|Temperature|A sphygmomanometer measures blood pressure; an altimeter measures altitude.
Piscivore : Fish :: Granivore : ?|Seeds|Fish|Insects|Leaves|A piscivore eats fish; a granivore eats seeds.
Arid : Moisture :: Barren : ?|Vegetation|Heat|Sand|Wind|Arid land lacks moisture; barren land lacks vegetation.
Gale : Breeze :: Deluge : ?|Drizzle|Flood|Storm|Torrent|A gale is a violent breeze; a deluge is a violent drizzle — the pairs differ in intensity.
Nibble : Devour :: Sip : ?|Gulp|Drink|Taste|Chew|To devour is to nibble greedily; to gulp is to sip greedily — each pair goes from mild to intense.
Chuckle : Guffaw :: Simmer : ?|Boil|Cool|Freeze|Heat|A guffaw is an intense chuckle; boiling is intense simmering.
Tepid : Scalding :: Cool : ?|Frigid|Warm|Mild|Humid|Scalding is an extreme of tepid; frigid is an extreme of cool.
Admire : Idolise :: Dislike : ?|Loathe|Like|Ignore|Accept|To idolise is to admire intensely; to loathe is to dislike intensely.
Famous : Notorious :: Clever : ?|Cunning|Wise|Brilliant|Dull|Notorious is the negative form of famous; cunning is the negative form of clever.
Thrifty : Miserly :: Confident : ?|Arrogant|Shy|Modest|Brave|Miserly is thrift taken too far; arrogant is confidence taken too far.
Brave : Reckless :: Cautious : ?|Timid|Careful|Bold|Wise|Reckless is bravery taken too far; timid is caution taken too far.
Shehnai : Wind :: Tabla : ?|Percussion|String|Reed|Brass|The shehnai is a wind instrument; the tabla is a percussion instrument.
Sonnet : Fourteen :: Haiku : ?|Three|Five|Seven|Fourteen|A sonnet has fourteen lines; a haiku has three.
Hexagon : 720° :: Pentagon : ?|540°|360°|600°|450°|The interior angles of a hexagon total 720°; those of a pentagon total 540°.
Bauxite : Aluminium :: Haematite : ?|Iron|Copper|Zinc|Lead|Bauxite is the ore of aluminium; haematite is an ore of iron.
Galena : Lead :: Cinnabar : ?|Mercury|Tin|Iron|Silver|Galena is the ore of lead; cinnabar is the ore of mercury.
Graphite : Carbon :: Quartz : ?|Silica|Calcium|Iron|Sodium|Graphite is a form of carbon; quartz is a form of silica.
Brass : Copper and zinc :: Bronze : ?|Copper and tin|Iron and carbon|Copper and nickel|Lead and tin|Brass is an alloy of copper and zinc; bronze is an alloy of copper and tin.
Polo : Chukka :: Boxing : ?|Round|Set|Innings|Quarter|A polo match is divided into chukkas; a boxing match into rounds.
Amnesty : Pardon :: Embargo : ?|Trade ban|Tax|Treaty|Alliance|An amnesty is a general pardon; an embargo is a ban on trade.
Armistice : War :: Adjournment : ?|Proceedings|Victory|Election|Journey|An armistice suspends a war; an adjournment suspends proceedings.
Quiver : Arrows :: Bandolier : ?|Cartridges|Swords|Maps|Medals|A quiver holds arrows; a bandolier is a belt that holds cartridges.
Reconnaissance : Information :: Sortie : ?|Attack|Rest|Surrender|Training|A reconnaissance mission is flown to gather information; a sortie is flown to attack.
Sanguine : Hopeful :: Saturnine : ?|Gloomy|Planetary|Cheerful|Saturated|These are synonyms: sanguine means cheerfully hopeful; saturnine means gloomy and sullen.
Vexillology : Flags :: Sigillography : ?|Seals|Signatures|Signs|Cigars|Vexillology is the study of flags; sigillography is the study of seals.
Ichthyology : Fish :: Malacology : ?|Molluscs|Diseases|Insects|Minerals|Ichthyology studies fish; malacology studies molluscs.
Pedology : Soil :: Limnology : ?|Lakes and inland waters|Limbs|Oceans|Rocks|Pedology is the study of soils; limnology is the study of lakes and other inland waters (oceanography covers the sea).
Hygrometer : Humidity :: Pyrometer : ?|Very high temperatures|Air pressure|Fire alarms|Radiation|A hygrometer measures humidity; a pyrometer measures very high temperatures, as in furnaces.
Obstreperous : Quiet :: Intransigent : ?|Compromising|Stubborn|Transient|Intolerant|These are opposites: obstreperous (noisy, unruly) vs quiet; intransigent (refusing to compromise) vs compromising.
Pellucid : Clear :: Turbid : ?|Muddy|Turbulent|Swollen|Transparent|These are synonyms: pellucid means clear; turbid means muddy or cloudy — 'turbulent' is a look-alike trap.
Recondite : Obscure :: Perfunctory : ?|Cursory|Perfect|Functional|Thorough|These are synonyms: recondite means obscure; perfunctory means cursory, done without care.
Gauche : Tact :: Callow : ?|Experience|Callousness|Colour|Courage|A gauche person lacks tact; a callow person lacks experience.
Lachrymose : Tears :: Bibulous : ?|Drink|Books|Bibles|Bubbles|Lachrymose means given to tears; bibulous means given to drinking.
Somnambulist : Sleep :: Funambulist : ?|Tightrope|Funerals|Fun|Ambulances|A somnambulist walks in their sleep; a funambulist walks on a tightrope.
Cacophony : Euphony :: Dissonance : ?|Harmony|Melody|Noise|Rhythm|These are opposites: cacophony–euphony, dissonance–harmony.
Petrology : Rocks :: Pomology : ?|Fruit|Poems|Flowers|Potatoes|Petrology is the study of rocks; pomology is the science of growing fruit.
Apiculture : Bees :: Sericulture : ?|Silkworms|Serums|Fish|Birds|Apiculture is bee-keeping; sericulture is the rearing of silkworms.
Pisciculture : Fish :: Vermiculture : ?|Earthworms|Vermin|Vegetables|Silkworms|Pisciculture is fish farming; vermiculture is the rearing of earthworms.
Viticulture : Grapes :: Olericulture : ?|Vegetables|Olives|Oilseeds|Flowers|Viticulture is grape growing; olericulture is vegetable growing — 'olives' is the trap.
Kilogram : Mass :: Candela : ?|Luminous intensity|Electric current|Temperature|Amount of substance|The kilogram is the SI base unit of mass; the candela is the SI base unit of luminous intensity.
Pascal : Pressure :: Weber : ?|Magnetic flux|Power|Frequency|Magnetic flux density|The pascal measures pressure; the weber measures magnetic flux (the tesla measures flux density).
Hertz : Frequency :: Henry : ?|Inductance|Capacitance|Charge|Resistance|The hertz is the unit of frequency; the henry is the unit of inductance.
Farad : Capacitance :: Siemens : ?|Conductance|Resistance|Inductance|Power|The farad measures capacitance; the siemens measures electrical conductance.
Tungsten : Bulb filament :: Nichrome : ?|Heating element|Fuse wire|Permanent magnet|Solder|Tungsten is used for bulb filaments; nichrome for heating elements.
Pinaka : Rocket launcher :: Arjun : ?|Main battle tank|Missile|Helicopter|Rifle|Pinaka is India's multi-barrel rocket launcher; Arjun is its main battle tank.
Vikrant : Aircraft carrier :: Kalvari : ?|Submarine|Destroyer|Frigate|Corvette|INS Vikrant is an aircraft carrier; INS Kalvari is a Scorpène-class submarine.
Field Marshal : Five-star :: Lieutenant General : ?|Three-star|Two-star|Four-star|One-star|A Field Marshal holds five-star rank; a Lieutenant General holds three-star rank.
Division : Major General :: Corps : ?|Lieutenant General|General|Brigadier|Colonel|A division is commanded by a Major General; a corps by a Lieutenant General.
Jharia : Coal :: Kolar : ?|Gold|Mica|Iron ore|Coal|Jharia is known for its coalfields; Kolar for its gold fields.
Khetri : Copper :: Neyveli : ?|Lignite|Gold|Bauxite|Mica|Khetri is known for copper mines; Neyveli for lignite.
Loktak : Manipur :: Wular : ?|Jammu and Kashmir|Himachal Pradesh|Punjab|Sikkim|Loktak Lake is in Manipur; Wular Lake is in Jammu and Kashmir.
Bhakra Nangal : Sutlej :: Tehri : ?|Bhagirathi|Alaknanda|Yamuna|Ganga|The Bhakra Nangal dam is on the Sutlej; the Tehri dam is on the Bhagirathi.
Nagarjuna Sagar : Krishna :: Mettur : ?|Kaveri|Krishna|Godavari|Tungabhadra|The Nagarjuna Sagar dam is on the Krishna; the Mettur dam is on the Kaveri.
Bihu : Assam :: Nuakhai : ?|Odisha|Assam|Bihar|Punjab|Bihu is a harvest festival of Assam; Nuakhai is a harvest festival of Odisha.
Kaziranga : One-horned rhinoceros :: Keibul Lamjao : ?|Sangai deer|Snow leopard|Red panda|Hoolock gibbon|Kaziranga protects the one-horned rhino; Keibul Lamjao, the floating park of Manipur, protects the sangai deer.
Oxymoron : Contradiction :: Litotes : ?|Understatement|Exaggeration|Comparison|Repetition|An oxymoron joins contradictory terms; litotes is understatement ("not bad"); hyperbole would be exaggeration.
Prologue : Epilogue :: Overture : ?|Finale|Opera|Interlude|Symphony|A prologue opens a play and an epilogue closes it; an overture opens an opera and a finale closes it.
Carpenter : Adze :: Cobbler : ?|Awl|Anvil|Plane|Trowel|An adze is a carpenter's tool; an awl is a cobbler's tool.
Taxonomy : Classification :: Aetiology : ?|Causes of disease|Word origins|Insects|Ethics|Taxonomy deals with classification; aetiology with the causes of disease — etymology (word origins) is the trap.
Aphasia : Speech :: Anosmia : ?|Smell|Memory|Sleep|Hearing|Aphasia is loss of the ability to use speech; anosmia is loss of the sense of smell.
Ataxia : Coordination :: Aphonia : ?|Voice|Hearing|Appetite|Vision|Ataxia is loss of coordination; aphonia is loss of voice.
Fathom : Depth :: Light-year : ?|Distance|Time|Speed|Brightness|A fathom measures depth; a light-year measures distance, not time.
Ohm : Resistance :: Tesla : ?|Magnetic flux density|Magnetic flux|Electric field|Inductance|The ohm measures resistance; the tesla measures magnetic flux density (the weber is flux).
Bharatanatyam : Tamil Nadu :: Sattriya : ?|Assam|Manipur|Odisha|Kerala|Bharatanatyam comes from Tamil Nadu; Sattriya from Assam.
Madhubani : Bihar :: Warli : ?|Maharashtra|Gujarat|Rajasthan|Odisha|Madhubani painting comes from Bihar; Warli painting from Maharashtra.
Pattachitra : Odisha :: Kalamkari : ?|Andhra Pradesh|Kerala|Tamil Nadu|Karnataka|Pattachitra is an art of Odisha; Kalamkari of Andhra Pradesh.
Thomas Cup : Men's badminton :: Uber Cup : ?|Women's badminton|Men's tennis|Women's tennis|Table tennis|The Thomas Cup is the men's world team badminton championship; the Uber Cup is the women's.
Misogyny : Women :: Misandry : ?|Men|Marriage|Mankind|Children|Misogyny is hatred of women; misandry is hatred of men (misanthropy is hatred of mankind).
Filibuster : Delay :: Veto : ?|Reject|Debate|Approve|Amend|A filibuster delays a measure; a veto rejects it.
Hibernation : Winter :: Aestivation : ?|Summer|Autumn|Spring|Monsoon|Hibernation is dormancy in winter; aestivation is dormancy in the hot, dry summer.
Diurnal : Day :: Crepuscular : ?|Twilight|Night|Noon|Winter|Diurnal animals are active by day; crepuscular animals at dawn and dusk (twilight).
Oviparous : Eggs :: Viviparous : ?|Live young|Seeds|Spores|Larvae|Oviparous animals lay eggs; viviparous animals give birth to live young.
Xerophyte : Dry habitat :: Halophyte : ?|Salty soil|Water|Shade|Rock|A xerophyte is adapted to dry places; a halophyte to salty soil or water.
Thyroxine : Thyroid :: Melatonin : ?|Pineal gland|Pituitary gland|Adrenal gland|Pancreas|Thyroxine is secreted by the thyroid; melatonin by the pineal gland.
Scurvy : Vitamin C :: Beriberi : ?|Vitamin B1|Vitamin B12|Vitamin A|Vitamin D|Scurvy is caused by lack of vitamin C; beriberi by lack of vitamin B1 (thiamine).
Isobar : Pressure :: Isohyet : ?|Rainfall|Temperature|Sunshine|Humidity|An isobar joins places of equal pressure; an isohyet joins places of equal rainfall.
Isotherm : Temperature :: Isobath : ?|Water depth|Pressure|Salinity|Height above sea level|An isotherm joins places of equal temperature; an isobath joins points of equal water depth.
Pedagogy : Children :: Andragogy : ?|Adults|Men's health|Mankind|Leaders|Pedagogy is the method of teaching children; andragogy is the method of teaching adults.
Sinecure : Little work :: Pittance : ?|Little money|Little time|Little effort|Little food|A sinecure is a post needing little work; a pittance is a very small amount of money.
Quixotic : Idealistic :: Machiavellian : ?|Cunning|Loyal|Heroic|Cowardly|Quixotic means impractically idealistic; Machiavellian means cunning and unscrupulous.
Herculean : Task :: Draconian : ?|Law|Dragon|Journey|Speech|'Herculean' describes an enormous task; 'draconian' describes an excessively harsh law.
Ahimsa : Non-violence :: Aparigraha : ?|Non-possession|Truthfulness|Non-stealing|Celibacy|Among the Jain vows, ahimsa is non-violence and aparigraha is non-possession (asteya is non-stealing, satya truthfulness).
Chandrayaan : Moon :: Aditya-L1 : ?|Sun|Mars|Venus|Asteroids|Chandrayaan missions study the Moon; Aditya-L1 studies the Sun.
`);

// odd-one-out: three that belong | the odd one | explanation
export const oddWords = lines(`
Whale|Dolphin|Porpoise|Seal|The seal is a pinniped; the others are cetaceans.
Spider|Scorpion|Tick|Centipede|The centipede is not an arachnid; the others are.
Octopus|Squid|Cuttlefish|Starfish|The starfish is an echinoderm; the others are cephalopod molluscs.
Shark|Ray|Skate|Tuna|The tuna has a bony skeleton; the others are cartilaginous fish.
Crocodile|Turtle|Lizard|Salamander|The salamander is an amphibian; the others are reptiles.
Kangaroo|Koala|Wombat|Armadillo|The armadillo is not a marsupial; the others are.
Tomato|Brinjal|Cucumber|Potato|The potato is a stem tuber; the others are botanically fruits.
Ginger|Potato|Onion|Carrot|The carrot is a modified root; the others are modified stems.
Mango|Neem|Banyan|Pine|The pine is a gymnosperm; the others are flowering plants.
Mushroom|Yeast|Mould|Algae|Algae make their own food by photosynthesis; the others are fungi.
Malaria|Kala-azar|Sleeping sickness|Dengue|Dengue is caused by a virus; the others are caused by protozoa.
Rabies|Polio|Measles|Tetanus|Tetanus is caused by bacteria; the others are viral diseases.
Insulin|Adrenaline|Thyroxine|Pepsin|Pepsin is an enzyme; the others are hormones.
Amylase|Lipase|Trypsin|Glucagon|Glucagon is a hormone; the others are digestive enzymes.
Stapes|Malleus|Incus|Sternum|The sternum is the breastbone; the others are bones of the middle ear.
Neon|Argon|Krypton|Nitrogen|Nitrogen is not a noble gas; the others are.
Sodium|Potassium|Lithium|Calcium|Calcium is an alkaline earth metal; the others are alkali metals.
Diamond|Graphite|Charcoal|Quartz|Quartz is not a form of carbon; the others are.
Ruby|Sapphire|Emerald|Pearl|The pearl is formed by a living oyster; the others are mineral gemstones.
Vinegar|Lemon juice|Curd|Soap solution|Soap solution is basic; the others are acidic.
Velocity|Acceleration|Force|Speed|Speed is a scalar quantity; the others are vectors.
Mass|Time|Temperature|Displacement|Displacement is a vector quantity; the others are scalars.
Joule|Erg|Electron-volt|Newton|The newton is a unit of force; the others are units of energy.
Io|Europa|Ganymede|Titan|Titan orbits Saturn; the others are moons of Jupiter.
Troposphere|Stratosphere|Mesosphere|Lithosphere|The lithosphere is the Earth's rocky outer layer; the others are layers of the atmosphere.
Granite|Basalt|Pumice|Marble|Marble is a metamorphic rock; the others are igneous rocks.
Sandstone|Limestone|Shale|Slate|Slate is a metamorphic rock; the others are sedimentary rocks.
Loo|Chinook|Foehn|Blizzard|A blizzard is a cold snowstorm; the others are warm, dry local winds.
Mawsynram|Cherrapunji|Agumbe|Jaisalmer|Jaisalmer is among the driest places in India; the others are among the wettest.
Brahmaputra|Indus|Sutlej|Ganga|The Ganga rises in India; the others rise in Tibet.
Narmada|Tapi|Mahi|Godavari|The Godavari flows east into the Bay of Bengal; the others flow west into the Arabian Sea.
Kaveri|Krishna|Mahanadi|Periyar|The Periyar flows into the Arabian Sea; the others flow into the Bay of Bengal.
Wular|Dal|Loktak|Chilika|Chilika is a brackish-water lagoon; the others are freshwater lakes.
Kangchenjunga|Nanda Devi|Nanga Parbat|K2|K2 lies in the Karakoram range; the others are in the Himalaya.
Kaziranga|Manas|Jim Corbett|Gir|Gir is famous for lions and is not a tiger reserve; the others are tiger reserves.
Dhruv|Rudra|Prachand|Tejas|Tejas is a fighter aircraft; the others are HAL helicopters.
Agni|Prithvi|Shaurya|Akash|Akash is a surface-to-air missile; the others are surface-to-surface ballistic missiles.
INS Arihant|INS Arighaat|INS Chakra|INS Kalvari|INS Kalvari is a conventional (diesel-electric) submarine; the others are nuclear-powered.
Brigadier|Commodore|Air Commodore|Colonel|The other three are equivalent ranks; Colonel is one rank lower.
Lieutenant General|Vice Admiral|Air Marshal|Major General|The other three are equivalent ranks; Major General is one rank lower.
Captain|Lieutenant (Navy)|Flight Lieutenant|Squadron Leader|The Army Captain, Navy Lieutenant and Flight Lieutenant are equivalent; a Squadron Leader equals a Major.
Rajput Regiment|Sikh Regiment|Madras Regiment|Regiment of Artillery|The Regiment of Artillery is an arm of combat support; the others are infantry regiments.
Tololing|Tiger Hill|Point 4875|Longewala|Longewala was a 1971 battle; the others are battles of the 1999 Kargil War.
Kirti Chakra|Ashoka Chakra|Shaurya Chakra|Param Vir Chakra|The Param Vir Chakra is a wartime award; the others are peacetime gallantry awards.
Jnanpith|Sahitya Akademi|Booker|Dronacharya|The Dronacharya award is for sports coaching; the others are literary awards.
Shehnai|Flute|Nadaswaram|Mridangam|The mridangam is a percussion instrument; the others are wind instruments.
Sarangi|Violin|Esraj|Sitar|The sitar is plucked; the others are played with a bow.
Kathakali|Mohiniyattam|Ottan Thullal|Kuchipudi|Kuchipudi is from Andhra Pradesh; the others are art forms of Kerala.
Garba|Dandiya|Tippani|Bihu|Bihu is from Assam; the others are folk dances of Gujarat.
Ellora|Ajanta|Elephanta|Khajuraho|The Khajuraho temples are structural; the others are rock-cut caves.
Qutub Minar|Red Fort|Humayun's Tomb|Charminar|The Charminar is in Hyderabad; the others are in Delhi.
Plassey|Buxar|Wandiwash|Haldighati|Haldighati was fought between Rana Pratap and the Mughals; the others were battles fought by the British East India Company.
Ashoka|Chandragupta Maurya|Bindusara|Samudragupta|Samudragupta was a Gupta emperor; the others were Mauryas.
Babur|Akbar|Aurangzeb|Sher Shah Suri|Sher Shah Suri was a Sur ruler; the others were Mughal emperors.
Tilak|Lala Lajpat Rai|Bipin Chandra Pal|Gokhale|Gokhale was a moderate; the others (Lal-Bal-Pal) were extremist leaders.
Dandi March|Quit India|Non-Cooperation|Swadeshi (1905)|The Swadeshi movement of 1905 predates Gandhi's leadership; Gandhi led the others.
Durand Cup|Santosh Trophy|Subroto Cup|Ranji Trophy|The Ranji Trophy is a cricket tournament; the others are football tournaments.
Ellipse|Parabola|Hyperbola|Cycloid|The cycloid is not a conic section; the others are.
Isosceles|Scalene|Equilateral|Obtuse|'Obtuse' classifies a triangle by its angles; the others classify it by its sides.
Rhombus|Square|Rectangle|Kite|A kite is not a parallelogram; the others are.
Median|Mode|Mean|Range|The range measures spread; the others are measures of central tendency.
Acre|Hectare|Square metre|Furlong|The furlong is a unit of length; the others measure area.
Kelvin|Ampere|Candela|Newton|The newton is a derived unit; the others are SI base units.
Einstein|Bohr|Planck|Darwin|Darwin was a naturalist; the others were physicists.
C.V. Raman|Homi Bhabha|Vikram Sarabhai|Srinivasa Ramanujan|Ramanujan was a mathematician; the others were physicists.
Kalidasa|Banabhatta|Bhavabhuti|Kabir|Kabir wrote in a vernacular Hindi dialect; the others wrote in Sanskrit.
Premchand|Mahadevi Verma|Nirala|Tagore|Tagore wrote mainly in Bengali; the others wrote in Hindi.
Wheat|Mustard|Gram|Rice|Rice is a kharif crop; the others are rabi crops.
Maize|Jowar|Cotton|Barley|Barley is a rabi crop; the others are kharif crops.
Jhum|Podu|Bewar|Terrace farming|Terrace farming is permanent cultivation; the others are regional names for shifting cultivation.
Tamil|Telugu|Kannada|Marathi|Marathi is an Indo-Aryan language; the others are Dravidian.
Simile|Metaphor|Personification|Prologue|A prologue is a section of a work; the others are figures of speech.
Infantry|Armoured Corps|Mechanised Infantry|Army Service Corps|The Army Service Corps is a logistics service; the others are fighting arms.
Corps|Division|Brigade|Flotilla|A flotilla is a naval formation; the others are Army formations.
AWACS|Netra|Phalcon|Pinaka|Pinaka is a rocket launcher; the others are airborne early-warning systems.
Sonar|Radar|Lidar|Laser|A laser is a light source; the others are detection-and-ranging systems.
Asteroid|Comet|Meteoroid|Nebula|A nebula is a vast cloud of gas and dust; the others are small solid bodies of the Solar System.
Oesophagus|Stomach|Duodenum|Trachea|The trachea belongs to the respiratory tract; the others belong to the digestive tract.
Cyan|Magenta|Yellow|Green|Green is not a primary colour of pigment (CMY).
Ozone|Methane|Carbon dioxide|Nitrogen|Nitrogen is not a greenhouse gas; the others are.
Uranium|Thorium|Plutonium|Tungsten|Tungsten is not radioactive; the others are nuclear fuels.
Rubber|Glass|Wood|Graphite|Graphite conducts electricity; the others are insulators.
Sundarbans|Bhitarkanika|Pichavaram|Bandipur|Bandipur is a dry forest national park; the others are mangrove forests.
Haemoglobin|Myoglobin|Cytochrome|Chlorophyll|Chlorophyll has magnesium at its centre; the others contain iron.
Vitamin A|Vitamin D|Vitamin K|Vitamin B12|Vitamin B12 is water-soluble; the others are fat-soluble.
Mitochondrion|Chloroplast|Nucleus|Ribosome|The ribosome has no membrane; the others are bounded by a double membrane.
Diphtheria|Whooping cough|Tuberculosis|Chickenpox|Chickenpox is caused by a virus; the others are bacterial diseases.
Amoeba|Paramecium|Euglena|Hydra|Hydra is multicellular; the others are single-celled organisms.
Bat|Whale|Platypus|Penguin|The penguin is a bird; the others are mammals, even though the platypus lays eggs.
Silicon|Germanium|Arsenic|Carbon|Carbon is a non-metal; the others are metalloids.
Solder|Pewter|Bronze|Invar|Invar (iron–nickel) contains no tin; solder, pewter and bronze all contain tin.
Lignite|Anthracite|Bituminous|Haematite|Haematite is an iron ore; the others are grades of coal.
Jhelum|Chenab|Ravi|Yamuna|The Yamuna belongs to the Ganga system; the others are tributaries of the Indus.
Chambal|Betwa|Ken|Gomti|The Gomti flows into the Ganga; the others are tributaries of the Yamuna.
Tungabhadra|Bhima|Ghataprabha|Indravati|The Indravati is a tributary of the Godavari; the others are tributaries of the Krishna.
Pranhita|Manjira|Indravati|Hemavati|The Hemavati is a tributary of the Kaveri; the others are tributaries of the Godavari.
Zoji La|Banihal|Rohtang|Nathu La|Nathu La is in Sikkim in the eastern Himalaya; the others are passes of the western Himalaya.
Anamudi|Doddabetta|Mahendragiri|Guru Shikhar|Guru Shikhar is in the Aravalli range; the others are peaks of the Western or Eastern Ghats.
Nagarhole|Bandipur|Mudumalai|Kanha|Kanha is in Madhya Pradesh; the others lie in the Nilgiri Biosphere Reserve.
Operation Cactus|Operation Pawan|Operation Rahat|Operation Meghdoot|Operation Meghdoot (Siachen) was carried out on India's own frontier; the others were conducted in other countries (Maldives, Sri Lanka, Yemen).
Mahavir Chakra|Vir Chakra|Param Vir Chakra|Kirti Chakra|The Kirti Chakra is a peacetime gallantry award; the others are wartime awards.
Sam Manekshaw|K.M. Cariappa|Arjan Singh|K. Sundarji|General Sundarji never held five-star rank; the other three did.
Lok Sabha|Rajya Sabha|President|Supreme Court|Parliament consists of the President, the Lok Sabha and the Rajya Sabha; the Supreme Court is not part of it.
Article 14|Article 19|Article 32|Article 44|Article 44 (uniform civil code) is a Directive Principle; the others are Fundamental Rights.
Jupiter|Saturn|Uranus|Mars|Mars has no ring system; the other three have rings.
Rigel|Sirius|Betelgeuse|Andromeda|Andromeda is a galaxy; the others are stars.
Lothal|Dholavira|Rakhigarhi|Nalanda|Nalanda was an ancient university; the others are Indus Valley (Harappan) sites.
Tughlaq|Khilji|Lodi|Mughal|The Mughals did not belong to the Delhi Sultanate; the other three dynasties did.
Ahom|Chola|Pandya|Chera|The Ahoms ruled Assam; the others were dynasties of the far south.
Work|Energy|Torque|Power|Work, energy and torque share the dimensions ML²T⁻²; power is ML²T⁻³.
Stress|Pressure|Young's modulus|Strain|Strain is dimensionless; the others have the dimensions of pressure.
`);

// S:WORD synonym, A:WORD antonym, O:phrase one-word substitution | correct | wrong | wrong | wrong
export const vocab = lines(`
S:OBSEQUIOUS|Servile|Defiant|Obvious|Indifferent
S:LACONIC|Terse|Verbose|Lazy|Gloomy
S:PERFIDIOUS|Treacherous|Loyal|Perfect|Fearful
S:PUSILLANIMOUS|Cowardly|Generous|Petty|Brave
S:EPHEMERAL|Short-lived|Eternal|Ethereal|Fragile
S:UBIQUITOUS|Omnipresent|Rare|Unique|Ambiguous
S:MAGNANIMOUS|Generous|Mean|Huge|Proud
S:CIRCUMSPECT|Cautious|Reckless|Round|Suspicious
S:FASTIDIOUS|Fussy|Fast|Careless|Hungry
S:GARRULOUS|Talkative|Silent|Angry|Elderly
S:IMPETUOUS|Rash|Cautious|Important|Lazy
S:INDEFATIGABLE|Tireless|Exhausted|Undefeated|Idle
S:LUGUBRIOUS|Mournful|Cheerful|Slippery|Lazy
S:MENDACIOUS|Lying|Truthful|Begging|Repairing
S:NEFARIOUS|Wicked|Noble|Famous|Nervous
S:OBDURATE|Stubborn|Flexible|Durable|Obedient
S:PARSIMONIOUS|Stingy|Generous|Religious|Talkative
S:PERSPICACIOUS|Shrewd|Dull|Transparent|Sweaty
S:RECALCITRANT|Defiant|Obedient|Repetitive|Calm
S:SOPORIFIC|Sleep-inducing|Stimulating|Musical|Sour
S:TACITURN|Reserved|Talkative|Tactful|Rude
S:TRUCULENT|Aggressive|Gentle|Truthful|Sluggish
S:VENAL|Corruptible|Honest|Vital|Poisonous
S:VERACIOUS|Truthful|Greedy|Lying|Fierce
S:VORACIOUS|Greedy|Truthful|Talkative|Timid
S:ALACRITY|Eagerness|Reluctance|Sorrow|Anxiety
S:AMELIORATE|Improve|Worsen|Soften|Adore
S:ABSTRUSE|Obscure|Obvious|Absent|Rude
S:BELLICOSE|Warlike|Peaceful|Beautiful|Bulky
A:EXACERBATE|Alleviate|Worsen|Examine|Exaggerate
A:MUNIFICENT|Stingy|Generous|Municipal|Grand
A:PROLIX|Concise|Wordy|Lengthy|Professional
A:ESOTERIC|Commonplace|Mysterious|Obscure|Exotic
A:VITUPERATE|Praise|Abuse|Revive|Criticise
A:ARCANE|Familiar|Mysterious|Ancient|Secret
A:AUSTERE|Luxurious|Strict|Plain|Harsh
A:DILATORY|Prompt|Slow|Tardy|Lazy
A:EFFUSIVE|Reserved|Gushing|Lavish|Emotional
A:FORTUITOUS|Planned|Lucky|Accidental|Chance
A:INNOCUOUS|Harmful|Harmless|Mild|Innocent
A:OSTENTATIOUS|Modest|Showy|Grand|Pretentious
A:PAUCITY|Abundance|Scarcity|Lack|Poverty
A:PLACATE|Provoke|Pacify|Soothe|Appease
A:PRODIGAL|Thrifty|Wasteful|Lavish|Reckless
A:QUIESCENT|Active|Dormant|Silent|Still
A:REPROBATE|Virtuous|Wicked|Rebel|Sinner
A:SPURIOUS|Genuine|False|Fake|Doubtful
A:TIMOROUS|Bold|Fearful|Timid|Nervous
A:VACILLATE|Resolve|Waver|Hesitate|Oscillate
A:ZENITH|Nadir|Peak|Summit|Apex
A:COGENT|Unconvincing|Convincing|Forceful|Sound
A:DEARTH|Plenty|Scarcity|Death|Want
A:ENERVATE|Invigorate|Weaken|Tire|Annoy
A:FECUND|Barren|Fertile|Rich|Fruitful
O:A person who is indifferent to pleasure or pain|Stoic|Hedonist|Cynic|Epicure
O:One who is devoted to the pursuit of pleasure|Hedonist|Stoic|Ascetic|Altruist
O:A person who gives up worldly comforts for spiritual discipline|Ascetic|Hedonist|Atheist|Sceptic
O:One who is devoted to the welfare of others|Altruist|Egoist|Misanthrope|Cynic
O:One who hates mankind|Misanthrope|Misogynist|Philanthropist|Misogamist
O:One who hates women|Misogynist|Misanthrope|Misogamist|Polygamist
O:One who hates marriage|Misogamist|Misogynist|Bigamist|Misanthrope
O:Government by the wealthy|Plutocracy|Aristocracy|Oligarchy|Bureaucracy
O:Government by a few|Oligarchy|Plutocracy|Monarchy|Theocracy
O:Government by the least qualified or worst citizens|Kakistocracy|Kleptocracy|Autocracy|Anarchy
O:Government by thieves or the corrupt|Kleptocracy|Kakistocracy|Plutocracy|Oligarchy
O:A false name adopted by an author|Pseudonym|Anagram|Epithet|Eponym
O:A person after whom something is named|Eponym|Pseudonym|Synonym|Antonym
O:An inscription on a tombstone|Epitaph|Epigraph|Epilogue|Obituary
O:A short witty saying|Epigram|Epitaph|Epilogue|Epistle
O:A concluding section added to a literary work|Epilogue|Prologue|Epigram|Preface
O:The killing of one's own sister|Sororicide|Fratricide|Matricide|Uxoricide
O:The killing of one's wife|Uxoricide|Sororicide|Regicide|Parricide
O:The study of the origin and history of words|Etymology|Entomology|Philology|Ethnology
O:A person who is recovering from an illness|Convalescent|Invalid|Patient|Malingerer
O:One who pretends to be ill to avoid work|Malingerer|Convalescent|Hypochondriac|Invalid
O:One who worries needlessly about his or her health|Hypochondriac|Malingerer|Pessimist|Convalescent
O:Military engineers who build bridges and clear mines|Sappers|Gunners|Troopers|Grenadiers
O:A formal agreement to stop fighting|Armistice|Amnesty|Alliance|Embargo
O:A general pardon, especially for political offences|Amnesty|Armistice|Acquittal|Asylum
O:Protection granted by a state to a political refugee|Asylum|Amnesty|Immunity|Exile
O:A person who switches to the opposing side|Turncoat|Mercenary|Veteran|Recruit
O:Open rebellion by soldiers or sailors against their officers|Mutiny|Coup|Riot|Treason
O:One who cannot be reformed or corrected|Incorrigible|Invincible|Indelible|Irreparable
O:That which cannot be imitated|Inimitable|Inevitable|Indomitable|Invulnerable
O:One whose spirit cannot be subdued|Indomitable|Inimitable|Inevitable|Impeccable
O:A person who is unable to pay his or her debts|Insolvent|Solvent|Miser|Spendthrift
S:INELUCTABLE|Unavoidable|Inexplicable|Inedible|Unintelligible
S:PERNICIOUS|Harmful|Persistent|Petty|Pertinent
S:OBFUSCATE|Confuse|Clarify|Obliterate|Offend
S:REPUDIATE|Reject|Repeat|Repair|Reputed
S:INSOUCIANT|Nonchalant|Insolent|Anxious|Insistent
S:PERIPATETIC|Itinerant|Peripheral|Pathetic|Stationary
S:EXCULPATE|Absolve|Accuse|Excavate|Exclaim
S:SEDULOUS|Diligent|Seductive|Sedentary|Careless
S:TRENCHANT|Incisive|Trembling|Vague|Entrenched
S:SUPERCILIOUS|Haughty|Superficial|Silly|Humble
S:PROPITIOUS|Favourable|Proper|Precarious|Ominous
S:RECONDITE|Obscure|Reconciled|Obvious|Recent
S:INVETERATE|Habitual|Invertebrate|Occasional|Invented
S:PERFUNCTORY|Cursory|Thorough|Functional|Perfumed
S:REDOUBTABLE|Formidable|Doubtful|Redundant|Feeble
A:PROPITIATE|Provoke|Appease|Propagate|Predict
A:EQUANIMITY|Agitation|Composure|Equality|Fairness
A:SANGUINE|Pessimistic|Optimistic|Bloody|Ruddy
A:ABSTEMIOUS|Self-indulgent|Moderate|Absent-minded|Abstract
A:PHLEGMATIC|Excitable|Calm|Sickly|Stolid
A:INTREPID|Timorous|Fearless|Tepid|Intricate
A:DESULTORY|Methodical|Random|Desolate|Sluggish
A:SALUBRIOUS|Unwholesome|Healthy|Salty|Salacious
A:PARSIMONY|Extravagance|Frugality|Parity|Patrimony
O:Rule by the mob|Ochlocracy|Oligarchy|Anarchy|Autocracy
O:A person who walks in their sleep|Somnambulist|Funambulist|Somniloquist|Insomniac
O:A person who talks in their sleep|Somniloquist|Somnambulist|Ventriloquist|Soliloquist
O:The killing of one's own child|Filicide|Infanticide|Fratricide|Patricide
O:A person who is a hundred years old or more|Centenarian|Centurion|Octogenarian|Nonagenarian
O:An abnormal fear of heights|Acrophobia|Agoraphobia|Claustrophobia|Hydrophobia
O:A person new to and inexperienced in an activity|Neophyte|Veteran|Neologist|Novelist
O:A newly coined word or expression|Neologism|Neophyte|Archaism|Anachronism
O:Something placed in a period to which it does not belong|Anachronism|Archaism|Neologism|Chronicle
O:A remedy that counteracts a poison|Antidote|Anecdote|Antibiotic|Antiseptic
O:A place where birds are kept|Aviary|Apiary|Aquarium|Armoury
O:Writing that cannot be read|Illegible|Ineligible|Illiterate|Inaudible
O:A series of three related novels, plays or films|Trilogy|Triad|Trinity|Troika
`);

// A = assumptions, C = conclusions, K = courses of action, R = arguments | question | answer index | explanation
export const statements = lines(`
A|Statement: "To get a good job, you must be a graduate of a reputed institute," a career counsellor tells students. Assumptions: I. In the counsellor's view, reputed institutes produce better-prepared graduates. II. The students want good jobs.|2|The advice rests on the belief that reputed institutes give an edge (I), and it is relevant only if the students want good jobs (II).
A|Statement: The government has raised the minimum age for recruitment to the police from 18 to 21. Assumptions: I. Candidates aged 21 are likely to be more mature than those aged 18. II. Enough candidates aged 21 and above will apply.|2|The change assumes older recruits are better suited (I) and that recruitment will not dry up (II).
A|Statement: "Our newspaper has the largest circulation in the city — advertise with us," says an advertisement. Assumptions: I. Advertisers want their message to reach as many people as possible. II. Other newspapers in the city have no readers.|0|The pitch assumes reach matters to advertisers (I); 'largest' implies others have readers, just fewer.
A|Statement: "If you are an early riser, join our 6 am fitness batch," says a gym notice. Assumptions: I. Some people are early risers. II. Only early risers want to be fit.|0|The notice assumes early risers exist (I); it does not assume that only they want fitness.
A|Statement: The railways have introduced a new superfast train between Delhi and Mumbai that will run only at night. Assumptions: I. Enough passengers are willing to travel overnight. II. Day trains on this route will be discontinued.|0|A night-only train assumes demand for overnight travel (I); nothing implies day trains will stop.
A|Statement: "Despite the rain, the match will be played as scheduled," announced the organisers. Assumptions: I. The rain will stop or the ground can be made playable in time. II. Spectators will stay away because of the rain.|0|The announcement assumes play will be possible (I); it assumes nothing about attendance.
A|Statement: A company has decided to move its office from the city centre to the suburbs to cut costs. Assumptions: I. Running an office in the suburbs is cheaper. II. The move will not seriously harm the company's business.|2|Moving to cut costs assumes the suburbs are cheaper (I) and that the savings will not be wiped out by lost business (II).
A|Statement: The government has announced a 20% hike in teachers' salaries to attract talented people to the profession. Assumptions: I. Salary is an important factor for talented people choosing a career. II. The teaching profession already attracts enough talent.|0|The hike assumes pay influences career choice (I); II contradicts the very reason for the hike.
A|Statement: "Of all detergents, Brand X gives the whitest wash," says an advertisement. Assumptions: I. People prefer a whiter wash. II. Brand X is the cheapest detergent.|0|The claim appeals to a preference for whiteness (I); price is not mentioned.
A|Statement: The college has decided to install CCTV cameras in all examination halls. Assumptions: I. CCTV cameras may deter candidates from using unfair means. II. The invigilators are dishonest.|0|Cameras assume a deterrent effect (I); they do not imply invigilators are dishonest.
A|Statement: "Wait until the light turns green before you cross," a father tells his son. Assumptions: I. The son can recognise the colours of a traffic light. II. Crossing on red may be dangerous.|2|The advice assumes the son can follow it (I) and that crossing on red is risky (II).
A|Statement: The municipal corporation has asked residents to separate dry and wet waste before handing it over. Assumptions: I. Separated waste is easier to process or recycle. II. Residents can tell dry waste from wet waste.|2|The request assumes separation helps (I) and that residents are able to do it (II).
A|Statement: "Take this medicine twice a day for a week and the infection will clear," the doctor told the patient. Assumptions: I. The patient will follow the prescribed schedule. II. The infection can never clear without medicine.|0|The advice assumes the patient will comply (I); it does not claim the infection could never clear on its own.
A|Statement: An airline has announced a 50% discount on tickets booked 60 days in advance. Assumptions: I. Some people plan their travel two months ahead. II. The airline will lose money on these tickets.|0|The offer assumes some people book that early (I); a loss is not implied.
A|Statement: A housing society notice reads: "Visitors must park outside the premises." Assumptions: I. There is space to park outside the premises. II. Parking space inside is limited or reserved for residents.|2|The rule assumes visitors can park outside (I) and reflects limited space inside (II).
A|Statement: "Pay your electricity bill in seconds with our new app," says the power company. Assumptions: I. Many customers have smartphones. II. Customers value paying bills quickly.|2|An app assumes customers can use it (I), and the pitch assumes speed matters to them (II).
A|Statement: The coach announced that the team would be selected only on the basis of performance in the trials. Assumptions: I. Trials are a fair indicator of players' ability. II. Some players were earlier selected on other grounds.|0|Relying on trials assumes they reflect ability (I); nothing implies past selections were unfair.
A|Statement: The state government has decided to open 100 new primary schools in tribal areas. Assumptions: I. There are too few primary schools in tribal areas. II. Teachers will be available to staff the new schools.|2|Opening schools assumes a shortage (I) and that they can be staffed (II).
A|Statement: "Even a small donation will help the flood victims," appeals a relief organisation. Assumptions: I. Some people hesitate to donate because they can give only a little. II. The organisation will use the donations for flood relief.|2|The wording targets people who think small gifts don't matter (I), and the appeal assumes the money goes to relief (II).
A|Statement: The manager asked employees to submit suggestions for improving productivity by Friday. Assumptions: I. Employees are capable of giving useful suggestions. II. The manager will implement every suggestion received.|0|Asking for ideas assumes employees can offer useful ones (I); implementing every one is not implied.
A|Statement: "Buy now — prices go up next month," a dealer tells a customer. Assumptions: I. The customer would prefer not to pay more. II. The dealer expects prices to rise next month.|2|The warning works only if the customer wants to save money (I), and it rests on the dealer's expectation of a rise (II).
A|Statement: The Army has decided to train its soldiers in operating drones. Assumptions: I. Drones will be useful in future operations. II. Soldiers can learn to operate drones.|2|Training assumes drones will be useful (I) and that soldiers can master them (II).
A|Statement: "Keep your valuables in the locker provided in your room," says a hotel notice. Assumptions: I. Valuables left in the open may be stolen. II. Some guests carry valuables.|2|The notice assumes a risk of theft (I) and that guests may have valuables (II).
A|Statement: The library will now lend only two books at a time instead of four. Assumptions: I. The demand for books is more than the library can meet. II. Members will stop using the library.|0|Cutting the limit suggests demand exceeds supply (I); nothing implies members will leave.
A|Statement: A candidate was advised to read newspapers regularly before appearing for the SSB interview. Assumptions: I. Awareness of current affairs is useful in the interview. II. The candidate does not read newspapers at present.|0|The advice assumes awareness helps (I); it may simply reinforce an existing habit, so II is not implied.
A|Statement: The traffic police have introduced an online system for paying fines. Assumptions: I. An online system will make paying fines easier. II. People will commit fewer traffic offences.|0|The system assumes easier payment (I); it says nothing about reducing offences.
A|Statement: "Our students topped the exam for the last three years," says a coaching institute's advertisement. Assumptions: I. Past results influence students' choice of institute. II. Students of other institutes did not pass the exam.|0|The pitch assumes results influence choices (I); 'topped' does not mean others failed.
A|Statement: The government will give a subsidy to farmers who use drip irrigation. Assumptions: I. Drip irrigation is desirable, for example because it saves water. II. The subsidy will encourage farmers to adopt drip irrigation.|2|Subsidising it assumes it is worthwhile (I) and that the incentive will work (II).
A|Statement: The principal decided to hold special classes for students who scored below 40% in the test. Assumptions: I. Extra coaching can help these students improve. II. Students who scored above 40% need no help at all.|0|The classes assume coaching helps (I); nothing implies the others need no help whatsoever.
A|Statement: The Air Force has invited women to apply to become fighter pilots. Assumptions: I. Women can be trained to fly fighter aircraft. II. Men are no longer interested in becoming fighter pilots.|0|The invitation assumes women can be trained (I); it says nothing about men's interest.
A|Statement: A factory has decided to run three shifts instead of two. Assumptions: I. There is enough demand for the extra production. II. Workers will be available for the additional shift.|2|A third shift assumes demand for the output (I) and staff to run it (II).
A|Statement: "Visit our showroom before the festival rush," says an advertisement. Assumptions: I. Showrooms get crowded during festivals. II. Some people prefer to shop without crowds.|2|The message assumes a festival rush (I) and that avoiding it appeals to customers (II).
A|Statement: The school has made it compulsory for all students to learn swimming. Assumptions: I. Swimming is a useful life skill. II. Every student already knows how to swim.|0|Making it compulsory assumes it is valuable (I); II would make the rule pointless.
A|Statement: "Tickets for the show are available only online," announced the organisers. Assumptions: I. Most people interested in the show can book tickets online. II. The show will be sold out.|0|Selling only online assumes the audience can book online (I); a sell-out is not implied.
C|Statement: Most of the cadets who failed the swimming test had joined from inland states. Conclusions: I. Cadets from coastal states are better swimmers than those from inland states. II. All cadets from inland states failed the swimming test.|3|The statement is about those who failed, not about all cadets; I is a generalisation that does not follow, and II is not supported.
C|Statement: No student who has not paid the fees can appear in the examination. Rohan appeared in the examination. Conclusions: I. Rohan has paid the fees. II. Rohan will pass the examination.|0|Only fee-payers can appear, so Rohan paid (I); passing is not implied.
C|Statement: Only graduates can apply for the post. Some graduates are engineers. Conclusions: I. Some engineers can apply for the post. II. Everyone who can apply is a graduate.|1|'Only graduates can apply' makes being a graduate necessary, not sufficient — so I does not follow; but it does mean every applicant is a graduate (II).
C|Statement: The total rainfall in a town in July (31 days) was 300 mm. Conclusions: I. It rained on every day of July. II. On at least one day of July, the rainfall was 9 mm or more.|1|300 ÷ 31 ≈ 9.7 mm, so at least one day had 9.7 mm or more (II); it could all have fallen on a few days, so I does not follow.
C|Statement: All the cadets in Alpha Squadron are good at shooting. Some cadets who are good at shooting are good at swimming. Conclusions: I. Some cadets in Alpha Squadron are good at swimming. II. Some cadets who are good at swimming are good at shooting.|1|II is simply the reverse of the second statement; the good swimmers need not be in Alpha Squadron, so I does not follow.
C|Statement: In a class of 40 students, 25 play cricket and 20 play football. Conclusions: I. At least 5 students play both games. II. At most 20 students play both games.|2|25 + 20 − 40 = 5 is the least possible overlap (I), and the overlap cannot exceed the smaller group, 20 (II).
C|Statement: A train that left Delhi at 10 pm on Monday reached Mumbai 17 hours later. Conclusions: I. The train reached Mumbai on Tuesday afternoon. II. The train's average speed was more than 50 km/h.|0|10 pm + 17 hours = 3 pm on Tuesday (I); the distance is not given, so the speed is unknown.
C|Statement: Every officer in the unit has served in at least one high-altitude posting. Major Rao has never served at high altitude. Conclusions: I. Major Rao is not an officer of this unit. II. Major Rao is not an officer.|0|He cannot belong to the unit (I), but he may well be an officer elsewhere.
C|Statement: The price of petrol rose by 10% in January and fell by 10% in February. Conclusions: I. The price at the end of February was lower than at the start of January. II. The price at the end of February was the same as at the start of January.|0|1.10 × 0.90 = 0.99, so the price ended 1% lower (I), not the same.
C|Statement: Some players in the team are over six feet tall. All players in the team are under 30. Conclusions: I. Some players over six feet tall are under 30. II. No player under 30 is shorter than six feet.|0|The tall players are in the team, so they are under 30 (I); II is not supported.
C|Statement: Ramesh is older than Suresh but younger than Mahesh. Dinesh is older than Mahesh. Conclusions: I. Dinesh is older than Ramesh. II. Suresh is the youngest of the four.|2|Dinesh > Mahesh > Ramesh > Suresh, so both follow.
C|Statement: Anil is taller than Bimal. Chetan is shorter than Deepak. Bimal is taller than Deepak. Conclusions: I. Anil is taller than Chetan. II. Deepak is taller than Anil.|0|Anil > Bimal > Deepak > Chetan, so I follows and II is false.
C|Statement: The bank remains closed on the second and fourth Saturdays of every month. Conclusions: I. The bank is open on the first Saturday of every month. II. The bank is closed on every Sunday.|3|The statement only lists closures; it says nothing definite about other Saturdays or about Sundays.
C|Statement: In a test, Priya scored more than 80% of the candidates. Conclusions: I. Priya scored more than 80 marks. II. At most 20% of the candidates scored more than Priya.|1|Beating over 80% of candidates means fewer than 20% are at or above her (II); her actual marks are unknown.
C|Statement: All members of the committee except Mr Sen voted for the proposal, and it was passed. Conclusions: I. Mr Sen voted against the proposal. II. Mr Sen is a member of the committee.|1|'Except Mr Sen' shows he is a member (II); he may have abstained rather than voted against.
C|Statement: Unless it rains, the crops will fail. The crops did not fail. Conclusions: I. It rained. II. The crops were irrigated.|0|'Unless it rains, the crops fail' means no rain → failure; since they did not fail, it must have rained (I).
C|Statement: If the bridge is repaired, traffic will move faster. Traffic is now moving faster. Conclusions: I. The bridge has been repaired. II. The bridge has not been repaired.|3|Faster traffic could have other causes, so the repair cannot be inferred (a classic fallacy) — and it is not ruled out either.
C|Statement: If the bridge is repaired, traffic will move faster. Traffic is not moving faster. Conclusions: I. The bridge has not been repaired. II. The traffic police are absent.|0|If the repair always speeds traffic, no speed-up means no repair (I); II is unrelated.
C|Statement: Of 60 recruits, 45 cleared the running test and 40 cleared the swimming test; 5 cleared neither. Conclusions: I. 30 recruits cleared both tests. II. 15 recruits cleared only the running test.|2|55 cleared at least one, so both = 45 + 40 − 55 = 30 (I), and only running = 45 − 30 = 15 (II).
C|Statement: Every Sunday, Arjun either goes trekking or plays football, but never both. Last Sunday he did not go trekking. Conclusions: I. Last Sunday Arjun played football. II. Arjun likes football more than trekking.|0|He must do one of the two, so he played football (I); his preference is not stated.
C|Statement: A shopkeeper sold two watches at ₹990 each, gaining 10% on one and losing 10% on the other. Conclusions: I. He neither gained nor lost overall. II. He lost ₹20 overall.|1|Cost prices were ₹900 and ₹1,100 (₹2,000 total) against sales of ₹1,980, a loss of ₹20 (II).
C|Statement: No bird in the sanctuary is migratory. Some birds in the sanctuary are flamingos. Conclusions: I. Some flamingos are not migratory. II. No flamingo is migratory.|0|The sanctuary's flamingos are non-migratory (I); flamingos elsewhere may migrate, so II fails.
C|Statement: A clock shows 3:15. Conclusions: I. The hour and minute hands are at right angles. II. The angle between the hands is less than 90°.|1|At 3:15 the hour hand has moved 7.5° past 3, so the angle is 7.5° — not 90° (I fails, II follows).
C|Statement: The ages of three brothers add up to 45 years, and no two of them are of the same age. Conclusions: I. The eldest is older than 15. II. The youngest is younger than 15.|2|If all three were 15 or younger with different ages, the total would be below 45; so the eldest is over 15 and, likewise, the youngest is under 15.
C|Statement: Some teachers are writers. All writers are readers. Conclusions: I. Some teachers are readers. II. All readers are writers.|0|The teachers who are writers are readers (I); 'all writers are readers' cannot be reversed.
C|Statement: Most soldiers in the battalion are from Punjab. Conclusions: I. Some soldiers in the battalion are from Punjab. II. The battalion was raised in Punjab.|0|'Most' guarantees at least some (I); where the battalion was raised is not stated.
C|Statement: The minimum qualifying mark in each of three papers is 40. Kiran scored 45, 38 and 70. Conclusions: I. Kiran did not qualify. II. Kiran's average score is above 50.|2|38 is below 40, so she did not qualify (I); her average is 153 ÷ 3 = 51 (II).
C|Statement: At a party every guest shook hands with every other guest exactly once, and there were 28 handshakes. Conclusions: I. There were 8 guests. II. Each guest shook hands 7 times.|2|n(n − 1)/2 = 28 gives n = 8 (I), and each guest shook hands with the other 7 (II).
C|Statement: The meeting will be held on the last working day of the month. The month ends on a Sunday, and Saturdays are holidays. Conclusions: I. The meeting will be held on a Friday. II. The meeting will be held on the 29th.|0|The last working day is the Friday (I); its date depends on whether the month has 30 or 31 days.
C|Statement: A is the brother of B. B is the sister of C. Conclusions: I. C is the brother of A. II. A is the brother of C.|1|A is male and a sibling of C, so II follows; C's gender is not given, so I does not.
C|Statement: Every student who scored above 90% was given a scholarship. Meena did not get a scholarship. Conclusions: I. Meena did not score above 90%. II. Meena scored below 50%.|0|Scoring above 90% guarantees a scholarship, so Meena did not (I); nothing sets a lower limit.
C|Statement: The population of a town grew by 20% in 2024 and by another 20% in 2025. Conclusions: I. The population grew by 40% over the two years. II. The population grew by 44% over the two years.|1|1.2 × 1.2 = 1.44, a 44% rise (II), not 40%.
C|Statement: The flight took off two hours late, yet it landed on time. Conclusions: I. The flight took less time than scheduled to cover the distance. II. The weather was bad at take-off.|0|Landing on time after a late start means the journey was faster (I); the cause of the delay is not given.
C|Statement: No two cadets in the platoon are of the same height. Arun is the tallest and Bala the shortest. Conclusions: I. Every other cadet is taller than Bala. II. Arun is taller than every other cadet.|2|With all heights different, both follow directly.
C|Statement: The train runs on all days except Tuesday. Today the train is not running. Conclusions: I. Today is Tuesday. II. Today is not Tuesday.|3|The train may be cancelled for other reasons, so neither can be concluded.
C|Statement: Every candidate who cleared the written test was called for the interview. Karan was called for the interview. Conclusions: I. Karan cleared the written test. II. Some candidates who were called for the interview cleared the written test.|1|Others may also have been called, so I is not certain; but the written-test qualifiers were called, so II follows.
K|Statement: A large number of candidates who cleared the written test did not turn up for the interview. Courses of action: I. The organisation should find out why the candidates did not turn up. II. The written test should be made tougher. Which course(s) of action follow?|0|Understanding the no-shows addresses the problem (I); a tougher test does not.
K|Statement: Accidents on a mountain highway rise sharply every winter because of fog. Courses of action: I. Fog lights and reflective markers should be installed along the highway. II. The highway should be closed every winter. Which course(s) of action follow?|0|Better visibility aids tackle the cause (I); closing a highway for a whole season is impractical.
K|Statement: A survey shows that many school students skip breakfast. Courses of action: I. Schools should teach parents and students why breakfast matters. II. Schools should start a nutritious mid-morning snack programme. Which course(s) of action follow?|2|Awareness (I) and a snack programme (II) both address the problem.
K|Statement: Several employees of a company have been caught leaking confidential data to rivals. Courses of action: I. The company should tighten access to confidential data. II. All employees of the company should be dismissed. Which course(s) of action follow?|0|Tighter access controls help (I); dismissing everyone punishes the innocent.
K|Statement: Many young people in a district are unemployed, though local industries report a shortage of skilled workers. Courses of action: I. Vocational training linked to local industries should be started. II. The industries should be asked to move out of the district. Which course(s) of action follow?|0|Training closes the skills gap (I); driving industry away worsens unemployment.
K|Statement: The monsoon is forecast to be weak this year. Courses of action: I. Farmers should be advised to sow drought-resistant varieties. II. The government should prepare contingency plans for drinking-water supply. Which course(s) of action follow?|2|Both are sensible precautions against a weak monsoon.
K|Statement: A new flyover has developed cracks within six months of opening. Courses of action: I. An inquiry should be held into the quality of construction and those responsible held accountable. II. The flyover should be inspected and, if unsafe, closed for repairs. Which course(s) of action follow?|2|Accountability (I) and immediate safety (II) are both needed.
K|Statement: Many students doze off in the first period after lunch. Courses of action: I. Lighter lunches should be encouraged and that period made more interactive. II. The lunch break should be abolished. Which course(s) of action follow?|0|I addresses the cause; abolishing lunch is harmful.
K|Statement: The number of stray dogs in the city has grown and dog-bite cases are rising. Courses of action: I. The municipality should run a sterilisation and anti-rabies vaccination drive. II. All stray dogs should be killed. Which course(s) of action follow?|0|Sterilisation and vaccination are the humane, lasting measures (I); mass culling is extreme and unlawful.
K|Statement: Many passengers travel without tickets on suburban trains. Courses of action: I. Ticket checking should be intensified and fines raised. II. More ticket counters and digital ticketing options should be provided. Which course(s) of action follow?|2|Enforcement (I) and easier ticketing (II) both reduce ticketless travel.
K|Statement: A student has been absent from school for three weeks without informing anyone. Courses of action: I. The school should contact the parents to find out why. II. The student's name should be struck off the rolls at once. Which course(s) of action follow?|0|Finding the reason comes first (I); striking off immediately is premature.
K|Statement: The water level in the city's main reservoir is at a ten-year low. Courses of action: I. Water supply should be rationed until the reservoir recovers. II. Residents should be urged to conserve water. Which course(s) of action follow?|2|Rationing (I) and conservation (II) both stretch the limited supply.
K|Statement: Many rural girls drop out of secondary school because schools are far from their villages. Courses of action: I. Free bicycles or transport should be provided to girl students. II. More secondary schools should be opened near the villages. Which course(s) of action follow?|2|Transport (I) and nearer schools (II) both remove the distance barrier.
K|Statement: A company's newly launched product is drawing many complaints about defects. Courses of action: I. The company should recall the defective batch and investigate the cause. II. The company should stop making all its products. Which course(s) of action follow?|0|A recall and investigation are proportionate (I); stopping everything is not.
K|Statement: Illegal sand mining is damaging the banks of a river. Courses of action: I. Surveillance of the river banks should be stepped up and offenders prosecuted. II. All construction in the state should be banned. Which course(s) of action follow?|0|Enforcement targets the offence (I); a statewide construction ban is extreme.
K|Statement: A cadet keeps failing the obstacle course because of a fear of heights. Courses of action: I. He should be given supervised, gradual exposure training. II. He should be permanently excused from the obstacle course. Which course(s) of action follow?|0|Graded training builds the ability he needs (I); a permanent exemption lowers the standard.
K|Statement: Many elderly people in the city live alone with no one to help in emergencies. Courses of action: I. A helpline and a neighbourhood volunteer network should be set up. II. The elderly should be compulsorily moved to old-age homes. Which course(s) of action follow?|0|Support networks help (I); compulsory relocation violates their freedom.
K|Statement: Complaints say a hospital's emergency ward keeps patients waiting for hours. Courses of action: I. More staff should be posted to the ward and a triage system introduced. II. The complaints should be ignored because hospitals are always busy. Which course(s) of action follow?|0|Staffing and triage fix the delay (I); ignoring complaints does not.
K|Statement: Electricity theft through illegal connections is causing heavy losses. Courses of action: I. Illegal connections should be traced and removed, and offenders penalised. II. Power to the whole area should be cut permanently. Which course(s) of action follow?|0|I targets the theft; II punishes everyone.
K|Statement: Many applicants for a government scheme cannot fill in the online form correctly. Courses of action: I. Help desks should be set up to assist applicants. II. The form should be simplified and offered in local languages. Which course(s) of action follow?|2|Assistance (I) and a simpler form (II) both help applicants.
K|Statement: The number of candidates for an entrance exam has doubled, but the number of exam centres has not changed. Courses of action: I. More exam centres should be set up. II. The exam should be held in two sessions. Which course(s) of action follow?|2|Either extra centres (I) or an extra session (II) would absorb the load.
K|Statement: During a heatwave several labourers working in the open have suffered heatstroke. Courses of action: I. Outdoor working hours should be moved to the cooler parts of the day. II. Drinking water and shade should be provided at work sites. Which course(s) of action follow?|2|Both reduce heat exposure.
K|Statement: A recruitment rally in a small town drew three times more candidates than expected, causing chaos. Courses of action: I. Future rallies should require online registration with fixed time slots. II. Recruitment rallies should not be held in small towns. Which course(s) of action follow?|0|Registration manages crowds (I); excluding small towns is unfair and unnecessary.
K|Statement: A bird-flu outbreak has been confirmed at a poultry farm. Courses of action: I. Infected birds should be culled and the area disinfected as per health protocols. II. Movement of poultry out of the area should be temporarily restricted. Which course(s) of action follow?|2|Both are standard containment steps.
K|Statement: A popular magazine's sales have fallen steadily for two years. Courses of action: I. The publishers should study how readers' preferences have changed. II. The magazine should immediately cut its price by half. Which course(s) of action follow?|0|Understanding readers comes first (I); a blind price cut may not address the cause.
R|Should military training be made compulsory for all college students? Arguments: I. Yes, it will instil discipline and a sense of national duty in the youth. II. No, it will force students who are unsuited or unwilling into military activity.|2|Both give weighty, relevant reasons.
R|Should mobile phones be banned in schools? Arguments: I. Yes, they distract students from their studies. II. No, everybody uses mobile phones nowadays.|0|I is a real harm; II merely cites popularity.
R|Should the voting age be lowered to 16? Arguments: I. Yes, many 16-year-olds are well informed about public affairs. II. No, other countries have not done so.|0|I is a relevant reason; II merely appeals to what others do.
R|Should private vehicles be banned in city centres? Arguments: I. Yes, it will cut pollution and congestion. II. No, it will cause hardship to residents, the elderly and people with urgent needs in those areas.|2|Both raise significant, relevant consequences.
R|Should there be a single entrance examination for all engineering colleges? Arguments: I. Yes, it will spare students from appearing in many exams. II. No, it will reduce the business of coaching institutes.|0|I is a genuine benefit to students; II is irrelevant to the merits.
R|Should the government end the subsidy on cooking gas? Arguments: I. Yes, the subsidy is a heavy burden on the treasury. II. No, poor families will find cooking gas unaffordable.|2|Both are significant, relevant considerations.
R|Should students be given grades instead of marks? Arguments: I. Yes, it will reduce unhealthy competition and stress. II. No, grades are less precise and make it harder to tell candidates apart for selection.|2|Both are relevant and weighty.
R|Should India open more military schools? Arguments: I. Yes, they prepare young students well for careers in the armed forces. II. No, military schools are very strict.|0|I is a real benefit; strictness alone is not a strong objection.
R|Should all shops be allowed to stay open 24 hours? Arguments: I. Yes, it will create more jobs and convenience. II. No, the safety of workers at night cannot be ensured in many areas.|2|Both are relevant and significant.
R|Should single-use plastic bags be banned completely? Arguments: I. Yes, they cause serious environmental damage. II. No, plastic bags are cheap.|0|I identifies serious harm; cheapness alone does not outweigh it.
R|Should distance education be discouraged? Arguments: I. Yes, it is always inferior to classroom teaching. II. No, it lets working people and those in remote areas study.|1|II is a real benefit; I is a sweeping generalisation.
R|Should the number of holidays in government offices be reduced? Arguments: I. Yes, it will improve productivity and public service. II. No, government employees have always had many holidays.|0|I gives a relevant reason; II merely cites tradition.
R|Should all school students be taught first aid? Arguments: I. Yes, it can help save lives in emergencies. II. No, students can do nothing useful in an emergency.|0|I is a real benefit; II is an unfounded generalisation.
R|Should wheat exports be banned when domestic prices rise sharply? Arguments: I. Yes, it will increase domestic supply and lower prices. II. No, farmers will lose the higher prices available abroad.|2|Both identify real, significant effects.
R|Should only science graduates be allowed into the technical branches of the armed forces? Arguments: I. Yes, the technical branches need a scientific background. II. No, everyone deserves an equal chance.|0|I is tied to job requirements; II is a vague appeal that ignores them.
R|Should competitive examinations be held online? Arguments: I. Yes, results can be declared faster. II. No, many candidates in remote areas lack reliable internet access.|2|Both are relevant, significant considerations.
R|Should India host the Olympic Games? Arguments: I. Yes, it will boost sport and tourism and showcase the country. II. No, it will need huge spending that could meet more pressing needs.|2|Both are weighty and relevant.
R|Should loudspeakers be banned at night? Arguments: I. Yes, night-time noise disturbs people's sleep and health. II. No, people have the right to celebrate.|0|I is a real harm; the right to celebrate does not extend to disturbing others at night.
R|Should cadets be allowed to use mobile phones during training? Arguments: I. Yes, everyone has a mobile phone today. II. No, they may distract cadets from a demanding training schedule.|1|II gives a relevant reason; I merely cites popularity.
R|Should pillion riders also be required to wear helmets? Arguments: I. Yes, pillion riders face the same risk of head injury. II. No, it will be inconvenient for families.|0|I is a safety reason; inconvenience is weak against the risk of injury.
R|Should college admissions be based only on entrance test scores? Arguments: I. Yes, it ensures a uniform standard. II. No, it ignores school performance and other abilities.|2|Both raise valid points.
R|Should homework be abolished? Arguments: I. Yes, children need time to play and rest. II. No, homework helps children revise and practise what they learn.|2|Both are relevant and significant.
R|Should India build more nuclear power plants? Arguments: I. Yes, they will reduce dependence on fossil fuels. II. No, nuclear accidents can have catastrophic long-term effects and waste disposal is difficult.|2|Both are weighty, relevant considerations.
R|Should a year of rural service be made mandatory for all government jobs? Arguments: I. Yes, rural areas badly need qualified people. II. No, people from cities will not like it.|0|I addresses a real need; dislike is not a strong argument.
R|Should the minimum age for a driving licence be lowered to 16? Arguments: I. Yes, many teenagers already drive illegally. II. No, 16-year-olds may lack the maturity needed for safe driving.|1|II is a relevant safety concern; illegal practice does not justify changing the law.
R|Should competitive exams have negative marking? Arguments: I. Yes, it discourages blind guessing. II. No, some candidates will score less.|0|I is a genuine benefit; lower scores for some are not a reason in themselves.
R|Should school start later in the morning? Arguments: I. Yes, adolescents learn better when they are well rested. II. No, families will have to change their routine.|0|I rests on learning outcomes; a change of routine is a weak objection.
R|Should office working hours be flexible? Arguments: I. Yes, it can improve productivity and work–life balance. II. No, coordination between employees may become difficult.|2|Both are relevant and significant.
R|Should all job interviews be video-recorded? Arguments: I. Yes, it will make the process transparent and open to review. II. No, it may make candidates nervous and raises privacy concerns.|2|Both are weighty.
C|Statement: Exactly 70% of the cadets passed the drill test and exactly 80% passed the weapons test. Conclusions: I. At least half of the cadets passed both tests. II. At most 70% of the cadets passed both tests.|2|The overlap is at least 70 + 80 − 100 = 50% (I), and it cannot exceed the smaller group, 70% (II).
C|Statement: Each of 50 people speaks Hindi or English or both; 38 speak Hindi and 30 speak English. Conclusions: I. Exactly 18 people speak both languages. II. Exactly 12 people speak only English.|2|Both = 38 + 30 − 50 = 18 (I); only English = 30 − 18 = 12 (II).
C|Statement: If Ravi is selected, Mohan will not be selected. If Mohan is not selected, Sunil will be selected. Sunil was not selected. Conclusions: I. Mohan was selected. II. Ravi was not selected.|2|Sunil was not selected, so Mohan must have been (the second rule read backwards) — I. Mohan was selected, so Ravi cannot have been (the first rule read backwards) — II.
C|Statement: Every officer who attended the course was promoted. Some officers who were promoted had not attended the course. Major Singh was not promoted. Conclusions: I. Major Singh did not attend the course. II. Every officer who was promoted attended the course.|0|Attending guarantees promotion, so the unpromoted Major Singh did not attend (I). II contradicts the second statement.
C|Statement: A five-digit code uses each of the digits 1 to 5 exactly once. The code is an even number and its first digit is greater than its last digit. Conclusions: I. The last digit is 2 or 4. II. The first digit is not 1.|2|An even code ends in 2 or 4 (I); the first digit is greater than the last, which is at least 2, so it cannot be 1 (II).
C|Statement: Every day this week was warmer than the day before. Thursday was 6°C warmer than Tuesday. Conclusions: I. Wednesday was warmer than Tuesday. II. Wednesday was exactly 3°C warmer than Tuesday.|0|Temperatures rose every day, so I follows; the 6° rise need not be split equally, so II does not.
C|Statement: No one who failed the medical examination was commissioned. Some cadets who were commissioned had been injured in training. Conclusions: I. Some cadets who had been injured in training passed the medical examination. II. Every cadet who passed the medical examination was commissioned.|0|The injured cadets who were commissioned must have passed the medical (I). Passing it is necessary, not sufficient, so II does not follow.
C|Statement: A bag holds only red and blue balls. Any 3 balls drawn from it always include at least one red ball, and any 5 balls always include at least one blue ball. Conclusions: I. There are at most 2 blue balls. II. There are at most 4 red balls.|2|If there were 3 blue balls, drawing them would give no red — so blue ≤ 2 (I). Likewise 5 red balls would give no blue — so red ≤ 4 (II).
C|Statement: Only candidates who cleared Stage I could appear in Stage II. Of the 120 candidates who appeared in Stage II, 40 were recommended. Conclusions: I. At least 120 candidates cleared Stage I. II. Exactly 80 candidates who cleared Stage I were not recommended.|0|All 120 who appeared had cleared Stage I (I). Some who cleared Stage I may not have appeared, so the number not recommended could exceed 80 — II is not certain.
C|Statement: The ages of three children multiply to 36 and add up to 13. Conclusions: I. Two of the children are twins. II. The eldest child is 9 years old.|0|Only (1, 6, 6) and (2, 2, 9) have product 36 and sum 13. Both contain twins, so I follows; the eldest could be 6 or 9, so II does not.
C|Statement: Five friends each bought a different number of books, 20 books in all, and each bought at least one. Conclusions: I. Someone bought at least 6 books. II. Someone bought exactly one book.|0|Five different numbers of at most 5 books add up to at most 1 + 2 + 3 + 4 + 5 = 15, so someone bought at least 6 (I). 2 + 3 + 4 + 5 + 6 = 20 shows nobody need have bought one, so II does not follow.
`);
