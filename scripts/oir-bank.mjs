// Hand-written OIR questions for scripts/gen-oir.mjs. One item per line; test N (11..110) uses line N-11.
// Correct answer is always written first; the generator shuffles options.
const lines = (s) => s.trim().split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l.split("|").map((x) => x.trim()));

// q | correct | wrong | wrong | wrong | explanation
export const analogies = lines(`
Doctor : Hospital :: Teacher : ?|School|Court|Office|Factory|A doctor works in a hospital; a teacher works in a school.
Pen : Write :: Knife : ?|Cut|Cook|Sharpen|Hold|A pen is used to write; a knife is used to cut.
Bird : Nest :: Bee : ?|Hive|Burrow|Den|Stable|A bird lives in a nest; a bee lives in a hive.
Pig : Sty :: Dog : ?|Kennel|Stable|Burrow|Hive|A pig is kept in a sty; a dog is kept in a kennel.
Lion : Roar :: Elephant : ?|Trumpet|Bray|Howl|Bleat|A lion roars; an elephant trumpets.
Puppy : Dog :: Calf : ?|Cow|Horse|Goat|Sheep|A puppy is a young dog; a calf is a young cow.
Kid : Goat :: Cub : ?|Lion|Cow|Horse|Deer|A kid is a young goat; a cub is a young lion.
Fish : Gills :: Human : ?|Lungs|Heart|Skin|Nose|Fish breathe through gills; humans breathe through lungs.
Eye : See :: Ear : ?|Hear|Smell|Speak|Taste|The eye is the organ for seeing; the ear is the organ for hearing.
Author : Novel :: Composer : ?|Symphony|Sculpture|Portrait|Novel|An author creates a novel; a composer creates a symphony.
Carpenter : Saw :: Tailor : ?|Needle|Hammer|Trowel|Chisel|A saw is a carpenter's tool; a needle is a tailor's tool.
Mason : Trowel :: Farmer : ?|Plough|Needle|Spanner|Scalpel|A trowel is a mason's tool; a plough is a farmer's tool.
Cobbler : Shoes :: Potter : ?|Pots|Clothes|Furniture|Jewellery|A cobbler makes shoes; a potter makes pots.
Water : Thirst :: Food : ?|Hunger|Taste|Health|Energy|Water satisfies thirst; food satisfies hunger.
Day : Night :: Summer : ?|Winter|Spring|Autumn|Monsoon|Day is the opposite of night; summer is the opposite of winter.
Hot : Cold :: Brave : ?|Cowardly|Strong|Bold|Loyal|These are pairs of opposites: hot–cold, brave–cowardly.
Wide : Narrow :: Shallow : ?|Deep|Low|Thin|Flat|These are pairs of opposites: wide–narrow, shallow–deep.
Artist : Brush :: Writer : ?|Pen|Canvas|Book|Desk|A brush is the artist's instrument; a pen is the writer's instrument.
Clock : Time :: Odometer : ?|Distance|Speed|Fuel|Pressure|A clock measures time; an odometer measures distance travelled.
Anemometer : Wind speed :: Hygrometer : ?|Humidity|Pressure|Temperature|Rainfall|An anemometer measures wind speed; a hygrometer measures humidity.
Seismograph : Earthquakes :: Ammeter : ?|Electric current|Voltage|Resistance|Power|A seismograph records earthquakes; an ammeter measures electric current.
Petal : Flower :: Page : ?|Book|Pen|Letter|Word|A petal is part of a flower; a page is part of a book.
Finger : Hand :: Toe : ?|Foot|Leg|Knee|Nail|Fingers are part of the hand; toes are part of the foot.
Bank : Money :: Library : ?|Books|Students|Silence|Shelves|A bank keeps money; a library keeps books.
Wool : Sheep :: Silk : ?|Silkworm|Spider|Cotton plant|Goat|Wool comes from sheep; silk comes from the silkworm.
Grapes : Raisins :: Plums : ?|Prunes|Dates|Figs|Apricots|Dried grapes are raisins; dried plums are prunes.
Tree : Forest :: Soldier : ?|Army|Gun|Uniform|Battle|Many trees make a forest; many soldiers make an army.
Star : Galaxy :: Island : ?|Archipelago|Continent|Ocean|Peninsula|A galaxy is a large group of stars; an archipelago is a group of islands.
Book : Chapter :: Building : ?|Storey|Brick|Roof|Door|A book is divided into chapters; a building is divided into storeys.
Kilometre : Distance :: Kilogram : ?|Mass|Volume|Length|Density|The kilometre is a unit of distance; the kilogram is a unit of mass.
Ampere : Current :: Volt : ?|Potential difference|Resistance|Power|Energy|The ampere is the unit of current; the volt is the unit of potential difference.
Watt : Power :: Joule : ?|Energy|Force|Pressure|Current|The watt is the unit of power; the joule is the unit of energy.
Newton : Force :: Pascal : ?|Pressure|Energy|Power|Frequency|The newton is the unit of force; the pascal is the unit of pressure.
Hertz : Frequency :: Ohm : ?|Resistance|Current|Charge|Power|The hertz is the unit of frequency; the ohm is the unit of resistance.
Cardiologist : Heart :: Nephrologist : ?|Kidneys|Liver|Nerves|Skin|A cardiologist treats the heart; a nephrologist treats the kidneys.
Dermatologist : Skin :: Ophthalmologist : ?|Eyes|Ears|Teeth|Bones|A dermatologist treats the skin; an ophthalmologist treats the eyes.
Paediatrics : Children :: Geriatrics : ?|The elderly|Women|Infants|Athletes|Paediatrics deals with children's health; geriatrics deals with the health of the elderly.
Seismology : Earthquakes :: Cartography : ?|Map-making|Coins|Rocks|Weather|Seismology is the study of earthquakes; cartography is the art of making maps.
Numismatics : Coins :: Philately : ?|Stamps|Books|Paintings|Maps|Numismatics is the study/collection of coins; philately is that of stamps.
Astronomy : Stars :: Meteorology : ?|Weather|Meteors|Oceans|Minerals|Astronomy studies stars; meteorology studies the weather (not meteors).
Pathology : Diseases :: Etymology : ?|Word origins|Insects|Races|Fossils|Pathology is the study of diseases; etymology is the study of word origins (not insects — that is entomology).
Palaeontology : Fossils :: Anthropology : ?|Mankind|Animals|Stars|Soil|Palaeontology studies fossils; anthropology studies mankind.
Hunger : Food :: Fatigue : ?|Rest|Water|Medicine|Work|Food removes hunger; rest removes fatigue.
Virus : Disease :: Spark : ?|Fire|Light|Heat|Smoke|A virus causes disease; a spark causes fire.
Problem : Solution :: Question : ?|Answer|Doubt|Query|Test|A problem needs a solution; a question needs an answer.
Ignite : Extinguish :: Advance : ?|Retreat|Attack|March|Halt|These are opposites: ignite–extinguish, advance–retreat.
Ally : Enemy :: Loyalty : ?|Treachery|Courage|Honour|Duty|These are opposites: ally–enemy, loyalty–treachery.
Stethoscope : Doctor :: Easel : ?|Painter|Writer|Singer|Sculptor|A stethoscope is used by a doctor; an easel is used by a painter.
Fish : School :: Wolf : ?|Pack|Herd|Flock|Swarm|A group of fish is a school; a group of wolves is a pack.
Sheep : Flock :: Bee : ?|Swarm|Pack|Pride|Herd|A group of sheep is a flock; a group of bees is a swarm.
Lion : Pride :: Crow : ?|Murder|Pack|School|Gaggle|A group of lions is a pride; a group of crows is called a murder.
Soldier : Regiment :: Ship : ?|Fleet|Harbour|Dock|Crew|Soldiers make up a regiment; ships make up a fleet.
Cygnet : Swan :: Fawn : ?|Deer|Horse|Goat|Fox|A cygnet is a young swan; a fawn is a young deer.
Tadpole : Frog :: Caterpillar : ?|Butterfly|Worm|Beetle|Snake|A tadpole grows into a frog; a caterpillar grows into a butterfly.
Seed : Tree :: Egg : ?|Bird|Nest|Shell|Yolk|A seed grows into a tree; an egg hatches into a bird.
Scissors : Cut :: Needle : ?|Stitch|Prick|Knit|Thread|Scissors are used to cut; a needle is used to stitch.
Ink : Pen :: Lead : ?|Pencil|Paper|Eraser|Sharpener|A pen writes with ink; a pencil writes with lead.
Captain : Team :: Principal : ?|School|Class|Teacher|Student|A captain heads a team; a principal heads a school.
Chef : Kitchen :: Pilot : ?|Cockpit|Runway|Hangar|Airport|A chef works in a kitchen; a pilot works in a cockpit.
Judge : Courtroom :: Surgeon : ?|Operation theatre|Laboratory|Pharmacy|Classroom|A judge works in a courtroom; a surgeon works in an operation theatre.
Calendar : Dates :: Dictionary : ?|Words|Books|Letters|Pages|A calendar lists dates; a dictionary lists words.
Atlas : Maps :: Anthology : ?|Poems|Stamps|Coins|Laws|An atlas is a collection of maps; an anthology is a collection of poems.
Glove : Hand :: Sock : ?|Foot|Shoe|Leg|Toe|A glove covers the hand; a sock covers the foot.
Helmet : Head :: Goggles : ?|Eyes|Ears|Nose|Face|A helmet protects the head; goggles protect the eyes.
Carrot : Root :: Potato : ?|Stem|Fruit|Leaf|Flower|A carrot is a modified root; a potato is a modified underground stem (tuber).
Moon : Satellite :: Earth : ?|Planet|Star|Comet|Galaxy|The Moon is a satellite; the Earth is a planet.
Mercury : Liquid :: Oxygen : ?|Gas|Solid|Metal|Plasma|At room temperature mercury is a liquid and oxygen is a gas.
Iron : Rusting :: Silver : ?|Tarnishing|Melting|Freezing|Glowing|Iron rusts on exposure to air; silver tarnishes.
Paper : Wood :: Glass : ?|Sand|Clay|Stone|Plastic|Paper is made from wood; glass is made from sand.
Cloth : Loom :: Flour : ?|Mill|Oven|Kiln|Press|Cloth is made on a loom; flour is made in a mill.
Bricks : Kiln :: Bread : ?|Oven|Mill|Loom|Furnace|Bricks are baked in a kiln; bread is baked in an oven.
Joy : Sorrow :: Wealth : ?|Poverty|Riches|Money|Fame|These are opposites: joy–sorrow, wealth–poverty.
Abundant : Scarce :: Ancient : ?|Modern|Old|Historic|Antique|These are opposites: abundant–scarce, ancient–modern.
Humble : Arrogant :: Timid : ?|Bold|Shy|Weak|Calm|These are opposites: humble–arrogant, timid–bold.
Expand : Contract :: Ascend : ?|Descend|Climb|Rise|Soar|These are opposites: expand–contract, ascend–descend.
Ocean : Water :: Desert : ?|Sand|Camel|Heat|Cactus|An ocean is a vast expanse of water; a desert is a vast expanse of sand.
Oar : Boat :: Pedal : ?|Bicycle|Car|Train|Aeroplane|An oar propels a boat; a pedal propels a bicycle.
Rudder : Ship :: Steering wheel : ?|Car|Train|Rocket|Bicycle|A rudder steers a ship; a steering wheel steers a car.
Fire : Ashes :: Explosion : ?|Debris|Flame|Sound|Heat|Fire leaves ashes behind; an explosion leaves debris.
Nose : Smell :: Tongue : ?|Taste|Speak|Chew|Swallow|The nose is the organ of smell; the tongue is the organ of taste.
Bee : Honey :: Cow : ?|Milk|Grass|Calf|Dung|Bees produce honey; cows produce milk.
Pearl : Oyster :: Ivory : ?|Elephant|Whale|Deer|Rhinoceros|Pearls come from oysters; ivory comes from elephant tusks.
Cage : Bird :: Aquarium : ?|Fish|Water|Plants|Glass|A bird is kept in a cage; a fish is kept in an aquarium.
Ruler : Line :: Compass : ?|Circle|Direction|Angle|Square|A ruler is used to draw a line; a (geometry) compass is used to draw a circle.
Microscope : Small :: Telescope : ?|Distant|Large|Bright|Hidden|A microscope shows very small things; a telescope shows distant things.
Architect : Building :: Cartographer : ?|Map|Bridge|Ship|Road|An architect designs buildings; a cartographer draws maps.
Novice : Expert :: Apprentice : ?|Master|Student|Trainee|Worker|A novice becomes an expert; an apprentice learns under and becomes a master.
Monday : Tuesday :: January : ?|February|December|March|June|Tuesday follows Monday; February follows January.
Decade : Ten :: Century : ?|Hundred|Thousand|Fifty|Twenty|A decade is ten years; a century is a hundred years.
Pentagon : Five :: Hexagon : ?|Six|Seven|Eight|Four|A pentagon has five sides; a hexagon has six.
Square : Cube :: Circle : ?|Sphere|Cylinder|Cone|Ring|A cube is the 3-D form of a square; a sphere is the 3-D form of a circle.
Engine : Car :: Heart : ?|Body|Blood|Lungs|Chest|The engine drives a car; the heart drives the body.
Letter : Post office :: Money : ?|Bank|Wallet|Shop|Purse|Letters are handled by a post office; money is handled by a bank.
Coal : Mine :: Marble : ?|Quarry|Well|Field|Kiln|Coal is extracted from a mine; marble is extracted from a quarry.
Sword : Sheath :: Arrow : ?|Quiver|Bow|Target|Holster|A sword is kept in a sheath; arrows are kept in a quiver.
Pistol : Holster :: Letter : ?|Envelope|Stamp|Postbox|Paper|A pistol is carried in a holster; a letter is put in an envelope.
Mountain : Peak :: Wave : ?|Crest|Trough|Tide|Foam|The top of a mountain is its peak; the top of a wave is its crest.
Ice : Water :: Water : ?|Steam|Cloud|Rain|Snow|Ice melts into water; water boils into steam.
Diamond : Carat :: Land : ?|Acre|Litre|Kilogram|Tonne|Diamonds are measured in carats; land is measured in acres.
Fathom : Depth :: Knot : ?|Speed|Distance|Weight|Time|The fathom measures depth of water; the knot measures speed at sea.
Brick : Wall :: Word : ?|Sentence|Letter|Book|Page|Bricks make up a wall; words make up a sentence.
Blind : See :: Deaf : ?|Hear|Speak|Walk|Smell|A blind person cannot see; a deaf person cannot hear.
Pilot : Aeroplane :: Jockey : ?|Horse|Car|Ship|Camel|A pilot flies an aeroplane; a jockey rides a horse.
Wrist : Hand :: Ankle : ?|Foot|Knee|Toe|Hip|The wrist joins the hand to the arm; the ankle joins the foot to the leg.
`);

// Defence, national and general-knowledge analogies. Same format.
export const gkAnalogies = lines(`
Lieutenant : Army :: Sub-Lieutenant : ?|Navy|Air Force|Coast Guard|BSF|Lieutenant is an Army rank; Sub-Lieutenant is a Navy rank.
Flight Lieutenant : Air Force :: Lieutenant Commander : ?|Navy|Army|Coast Guard|Air Force|Flight Lieutenant is an Air Force rank; Lieutenant Commander is a Navy rank.
Major (Army) : Squadron Leader (Air Force) :: Colonel (Army) : ?|Group Captain|Wing Commander|Air Commodore|Squadron Leader|A Major equals a Squadron Leader; a Colonel equals a Group Captain.
Brigadier (Army) : Commodore (Navy) :: Lieutenant Colonel (Army) : ?|Commander|Captain|Lieutenant Commander|Commodore|A Brigadier equals a Commodore; a Lieutenant Colonel equals a Commander in the Navy.
Lieutenant General : Air Marshal :: Major General : ?|Air Vice Marshal|Air Commodore|Air Marshal|Group Captain|Lieutenant General equals Air Marshal; Major General equals Air Vice Marshal.
Field Marshal : Sam Manekshaw :: Marshal of the Indian Air Force : ?|Arjan Singh|K.M. Cariappa|P.C. Lal|S. Krishnaswamy|Sam Manekshaw was India's first Field Marshal; Arjan Singh was the only Marshal of the IAF.
IMA : Dehradun :: NDA : ?|Khadakwasla|Dehradun|Ezhimala|Chennai|The Indian Military Academy is at Dehradun; the National Defence Academy is at Khadakwasla, Pune.
Indian Naval Academy : Ezhimala :: Air Force Academy : ?|Dundigal|Khadakwasla|Dehradun|Gwalior|The Indian Naval Academy is at Ezhimala; the Air Force Academy is at Dundigal, near Hyderabad.
OTA : Chennai :: IMA : ?|Dehradun|Pune|Mhow|Ezhimala|The Officers Training Academy is at Chennai; the Indian Military Academy is at Dehradun.
Madras Regiment : Wellington :: Sikh Regiment : ?|Ramgarh|Lucknow|Shillong|Jabalpur|The Madras Regimental Centre is at Wellington; the Sikh Regimental Centre is at Ramgarh Cantonment.
Param Vir Chakra : Wartime :: Ashoka Chakra : ?|Peacetime|Wartime|Civil service|Sports|The Param Vir Chakra is the highest wartime gallantry award; the Ashoka Chakra is the highest peacetime one.
Maha Vir Chakra : Param Vir Chakra :: Kirti Chakra : ?|Ashoka Chakra|Shaurya Chakra|Vir Chakra|Sena Medal|The Maha Vir Chakra ranks just below the PVC; the Kirti Chakra ranks just below the Ashoka Chakra.
Arjun : Tank :: INSAS : ?|Rifle|Missile|Aircraft|Submarine|Arjun is a main battle tank; INSAS is a rifle.
Tejas : Fighter aircraft :: Dhruv : ?|Helicopter|Tank|Submarine|Missile|Tejas is a light combat aircraft; Dhruv is an advanced light helicopter.
Agni : Missile :: Arihant : ?|Submarine|Tank|Aircraft|Rifle|Agni is a ballistic missile; INS Arihant is a nuclear-powered submarine.
Prithvi : Surface-to-surface :: Akash : ?|Surface-to-air|Air-to-air|Anti-tank|Anti-ship|Prithvi is a surface-to-surface missile; Akash is a surface-to-air missile.
Nag : Anti-tank missile :: BrahMos : ?|Supersonic cruise missile|Ballistic missile|Torpedo|Assault rifle|Nag is an anti-tank guided missile; BrahMos is a supersonic cruise missile.
INS Vikrant : Aircraft carrier :: INS Kalvari : ?|Submarine|Destroyer|Frigate|Corvette|INS Vikrant is an aircraft carrier; INS Kalvari is a Scorpene-class submarine.
Rafale : France :: Sukhoi Su-30 : ?|Russia|USA|Israel|Sweden|The Rafale was designed in France; the Su-30 was designed in Russia.
Mirage 2000 : France :: MiG-21 : ?|Russia|USA|UK|Sweden|The Mirage 2000 is a French aircraft; the MiG-21 is of Soviet/Russian origin.
Apache : Attack helicopter :: Chinook : ?|Heavy-lift helicopter|Fighter jet|Tanker aircraft|Drone|The Apache is an attack helicopter; the Chinook is a heavy-lift transport helicopter.
Pinaka : Rocket launcher :: K9 Vajra : ?|Self-propelled howitzer|Tank|Missile|Rifle|Pinaka is a multi-barrel rocket launcher; K9 Vajra is a self-propelled howitzer.
Army Day : 15 January :: Navy Day : ?|4 December|8 October|7 December|16 December|Army Day is on 15 January; Navy Day is on 4 December.
Air Force Day : 8 October :: Armed Forces Flag Day : ?|7 December|4 December|15 January|26 July|Air Force Day is 8 October; Armed Forces Flag Day is 7 December.
Kargil Vijay Diwas : 26 July :: Vijay Diwas : ?|16 December|4 December|15 August|26 January|Kargil Vijay Diwas marks 26 July 1999; Vijay Diwas marks the 1971 victory on 16 December.
Operation Vijay : Kargil (1999) :: Operation Meghdoot : ?|Siachen (1984)|Goa (1961)|Sri Lanka (1987)|Bangladesh (1971)|Operation Vijay was fought in Kargil; Operation Meghdoot secured the Siachen Glacier in 1984.
Operation Blue Star : Amritsar :: Operation Cactus : ?|Maldives|Sri Lanka|Siachen|Goa|Operation Blue Star took place in Amritsar; Operation Cactus (1988) was in the Maldives.
Operation Ganga : Ukraine :: Operation Kaveri : ?|Sudan|Yemen|Afghanistan|Israel|Operation Ganga evacuated Indians from Ukraine; Operation Kaveri evacuated them from Sudan (2023).
Operation Devi Shakti : Afghanistan :: Operation Ajay : ?|Israel|Sudan|Ukraine|Yemen|Operation Devi Shakti evacuated Indians from Afghanistan; Operation Ajay evacuated them from Israel (2023).
Siachen : Glacier :: Thar : ?|Desert|Plateau|Delta|Valley|Siachen is a glacier; Thar is a desert.
Rajasthan : Jaipur :: Arunachal Pradesh : ?|Itanagar|Imphal|Kohima|Aizawl|Jaipur is the capital of Rajasthan; Itanagar is the capital of Arunachal Pradesh.
Manipur : Imphal :: Mizoram : ?|Aizawl|Itanagar|Shillong|Agartala|Imphal is the capital of Manipur; Aizawl is the capital of Mizoram.
Nagaland : Kohima :: Tripura : ?|Agartala|Kohima|Gangtok|Dispur|Kohima is the capital of Nagaland; Agartala is the capital of Tripura.
Sikkim : Gangtok :: Meghalaya : ?|Shillong|Dispur|Aizawl|Imphal|Gangtok is the capital of Sikkim; Shillong is the capital of Meghalaya.
Goa : Panaji :: Odisha : ?|Bhubaneswar|Cuttack|Puri|Rourkela|Panaji is the capital of Goa; Bhubaneswar is the capital of Odisha.
Chhattisgarh : Raipur :: Jharkhand : ?|Ranchi|Jamshedpur|Dhanbad|Bokaro|Raipur is the capital of Chhattisgarh; Ranchi is the capital of Jharkhand.
France : Paris :: Australia : ?|Canberra|Sydney|Melbourne|Perth|Paris is the capital of France; Canberra (not Sydney) is the capital of Australia.
Canada : Ottawa :: Brazil : ?|Brasília|Rio de Janeiro|São Paulo|Buenos Aires|Ottawa is the capital of Canada; Brasília is the capital of Brazil.
Turkey : Ankara :: Myanmar : ?|Naypyidaw|Yangon|Mandalay|Dhaka|Ankara is the capital of Turkey; Naypyidaw is the capital of Myanmar.
Nepal : Kathmandu :: Bhutan : ?|Thimphu|Paro|Dhaka|Lhasa|Kathmandu is the capital of Nepal; Thimphu is the capital of Bhutan.
Bangladesh : Taka :: Myanmar : ?|Kyat|Taka|Ngultrum|Rupiah|Bangladesh uses the taka; Myanmar uses the kyat.
Russia : Rouble :: South Korea : ?|Won|Yen|Yuan|Ringgit|Russia's currency is the rouble; South Korea's is the won.
China : Yuan :: Bhutan : ?|Ngultrum|Taka|Kyat|Rupiah|China's currency is the yuan; Bhutan's is the ngultrum.
USA : Dollar :: United Kingdom : ?|Pound sterling|Euro|Franc|Krona|The USA uses the dollar; the UK uses the pound sterling.
India : Parliament :: Japan : ?|Diet|Knesset|Duma|Majlis|India's legislature is Parliament; Japan's is the Diet.
Israel : Knesset :: Russia : ?|Duma|Diet|Congress|Storting|Israel's legislature is the Knesset; Russia's lower house is the State Duma.
Lok Sabha : Speaker :: Rajya Sabha : ?|Chairman|Speaker|Prime Minister|Leader|The Lok Sabha is presided over by the Speaker; the Rajya Sabha by its Chairman (the Vice-President).
Governor : State :: Lieutenant Governor : ?|Union Territory|District|Country|Municipality|A Governor heads a state; a Lieutenant Governor heads a Union Territory with an administrator.
Supreme Commander of the Armed Forces : President :: Head of Government : ?|Prime Minister|President|Chief Justice|Chief of Defence Staff|The President is Supreme Commander; the Prime Minister heads the government.
First Field Marshal : Sam Manekshaw :: First Indian Commander-in-Chief of the Army : ?|K.M. Cariappa|Sam Manekshaw|K.S. Thimayya|J.N. Chaudhuri|Manekshaw was the first Field Marshal; K.M. Cariappa was the first Indian Commander-in-Chief.
Rakesh Sharma : Space :: Tenzing Norgay : ?|Everest|North Pole|Antarctica|English Channel|Rakesh Sharma was the first Indian in space; Tenzing Norgay was among the first to climb Everest.
Neeraj Chopra : Javelin :: Mirabai Chanu : ?|Weightlifting|Wrestling|Boxing|Shooting|Neeraj Chopra is a javelin thrower; Mirabai Chanu is a weightlifter.
Abhinav Bindra : Shooting :: Mary Kom : ?|Boxing|Wrestling|Badminton|Archery|Abhinav Bindra is a shooter; Mary Kom is a boxer.
Milkha Singh : Flying Sikh :: P.T. Usha : ?|Payyoli Express|Flying Sikh|Little Master|The Wall|Milkha Singh was called the Flying Sikh; P.T. Usha is called the Payyoli Express.
Cricket : Ranji Trophy :: Football : ?|Santosh Trophy|Duleep Trophy|Thomas Cup|Davis Cup|The Ranji Trophy is a cricket tournament; the Santosh Trophy is a football tournament.
Tennis : Davis Cup :: Badminton : ?|Thomas Cup|Ryder Cup|Ranji Trophy|Durand Cup|The Davis Cup is for tennis; the Thomas Cup is for badminton.
Football : Durand Cup :: Hockey : ?|Beighton Cup|Davis Cup|Ranji Trophy|Thomas Cup|The Durand Cup is a football tournament; the Beighton Cup is a hockey tournament.
Wimbledon : Tennis :: Tour de France : ?|Cycling|Motor racing|Athletics|Sailing|Wimbledon is a tennis event; the Tour de France is a cycling race.
Wankhede Stadium : Mumbai :: Eden Gardens : ?|Kolkata|Chennai|Delhi|Bengaluru|Wankhede Stadium is in Mumbai; Eden Gardens is in Kolkata.
Arjuna Award : Sports :: Jnanpith Award : ?|Literature|Cinema|Science|Music|The Arjuna Award honours sportspersons; the Jnanpith Award honours literature.
Dadasaheb Phalke Award : Cinema :: Dronacharya Award : ?|Sports coaching|Literature|Music|Journalism|The Phalke Award is for cinema; the Dronacharya Award is for sports coaches.
Pulitzer Prize : Journalism :: Booker Prize : ?|Fiction|Peace|Physics|Film|The Pulitzer honours journalism (among others); the Booker Prize honours fiction.
C.V. Raman : Physics :: Har Gobind Khorana : ?|Medicine|Chemistry|Literature|Economics|Raman won the Nobel in Physics; Khorana won it in Physiology or Medicine.
Amartya Sen : Economics :: Rabindranath Tagore : ?|Literature|Peace|Physics|Medicine|Amartya Sen won the Nobel in Economics; Tagore won it in Literature.
Kalidasa : Abhijnanashakuntalam :: Tulsidas : ?|Ramcharitmanas|Gitanjali|Arthashastra|Meghaduta|Kalidasa wrote Abhijnanashakuntalam; Tulsidas wrote Ramcharitmanas.
Panini : Ashtadhyayi :: Kautilya : ?|Arthashastra|Rajatarangini|Panchatantra|Natyashastra|Panini wrote the Ashtadhyayi; Kautilya wrote the Arthashastra.
Kalhana : Rajatarangini :: Bharata Muni : ?|Natyashastra|Arthashastra|Ashtadhyayi|Panchatantra|Kalhana wrote the Rajatarangini; Bharata Muni wrote the Natyashastra.
Gitanjali : Tagore :: The Discovery of India : ?|Jawaharlal Nehru|Mahatma Gandhi|B.R. Ambedkar|Sardar Patel|Tagore wrote Gitanjali; Nehru wrote The Discovery of India.
Wings of Fire : A.P.J. Abdul Kalam :: My Experiments with Truth : ?|Mahatma Gandhi|Jawaharlal Nehru|B.G. Tilak|Subhas Chandra Bose|Wings of Fire is Kalam's autobiography; My Experiments with Truth is Gandhi's.
Kathak : Uttar Pradesh :: Kathakali : ?|Kerala|Tamil Nadu|Odisha|Manipur|Kathak comes from Uttar Pradesh; Kathakali comes from Kerala.
Bharatanatyam : Tamil Nadu :: Kuchipudi : ?|Andhra Pradesh|Kerala|Assam|Odisha|Bharatanatyam is from Tamil Nadu; Kuchipudi is from Andhra Pradesh.
Odissi : Odisha :: Sattriya : ?|Assam|Manipur|Kerala|Gujarat|Odissi is from Odisha; Sattriya is from Assam.
Bihu : Assam :: Onam : ?|Kerala|Punjab|Tamil Nadu|Gujarat|Bihu is celebrated in Assam; Onam in Kerala.
Pongal : Tamil Nadu :: Baisakhi : ?|Punjab|Kerala|Assam|Goa|Pongal is Tamil Nadu's harvest festival; Baisakhi is Punjab's.
Kaziranga : One-horned rhinoceros :: Gir : ?|Asiatic lion|Tiger|Elephant|Snow leopard|Kaziranga is famous for the rhino; Gir is the home of the Asiatic lion.
Jim Corbett National Park : Uttarakhand :: Sundarbans National Park : ?|West Bengal|Assam|Odisha|Madhya Pradesh|Jim Corbett is in Uttarakhand; the Sundarbans National Park is in West Bengal.
Lotus : National flower :: Banyan : ?|National tree|National fruit|National flower|National plant|The lotus is India's national flower; the banyan is the national tree.
Satyameva Jayate : Mundaka Upanishad :: Vande Mataram : ?|Anandamath|Gitanjali|Rigveda|Godan|'Satyameva Jayate' is from the Mundaka Upanishad; 'Vande Mataram' is from Bankim Chandra's Anandamath.
Jana Gana Mana : Rabindranath Tagore :: Saare Jahan Se Achha : ?|Muhammad Iqbal|Bankim Chandra Chatterjee|Sarojini Naidu|Subramania Bharati|Tagore wrote Jana Gana Mana; Muhammad Iqbal wrote Saare Jahan Se Achha.
Sham No Varunah : Indian Navy :: Nabha Sparsham Deeptam : ?|Indian Air Force|Indian Army|NDA|Coast Guard|'Sham No Varunah' is the Navy's motto; 'Nabha Sparsham Deeptam' (Touch the sky with glory) is the IAF's.
Ganga : Gangotri :: Yamuna : ?|Yamunotri|Gangotri|Mansarovar|Amarkantak|The Ganga rises at Gangotri; the Yamuna rises at Yamunotri.
Narmada : Amarkantak :: Godavari : ?|Trimbakeshwar|Mahabaleshwar|Amarkantak|Talakaveri|The Narmada rises at Amarkantak; the Godavari rises at Trimbakeshwar near Nashik.
Kaveri : Talakaveri :: Krishna : ?|Mahabaleshwar|Trimbakeshwar|Amarkantak|Gangotri|The Kaveri rises at Talakaveri; the Krishna rises near Mahabaleshwar.
Bhakra Nangal : Sutlej :: Hirakud : ?|Mahanadi|Godavari|Krishna|Narmada|The Bhakra Nangal dam is on the Sutlej; the Hirakud dam is on the Mahanadi.
Sardar Sarovar : Narmada :: Tehri Dam : ?|Bhagirathi|Yamuna|Sutlej|Chenab|Sardar Sarovar is on the Narmada; the Tehri Dam is on the Bhagirathi.
Himalayas : Young fold mountains :: Aravallis : ?|Old fold mountains|Volcanic mountains|Block mountains|Young fold mountains|The Himalayas are young fold mountains; the Aravallis are among the oldest fold mountains.
Anamudi : Kerala :: Guru Shikhar : ?|Rajasthan|Gujarat|Maharashtra|Madhya Pradesh|Anamudi is the highest peak of Kerala; Guru Shikhar (Mount Abu) is the highest of Rajasthan.
Nathu La : Sikkim :: Shipki La : ?|Himachal Pradesh|Ladakh|Arunachal Pradesh|Uttarakhand|Nathu La is in Sikkim; Shipki La is in Himachal Pradesh.
Bomdila : Arunachal Pradesh :: Rohtang Pass : ?|Himachal Pradesh|Sikkim|Jammu & Kashmir|Uttarakhand|Bomdila pass is in Arunachal Pradesh; the Rohtang Pass is in Himachal Pradesh.
McMahon Line : India–China :: Durand Line : ?|Afghanistan–Pakistan|India–Pakistan|India–Bangladesh|India–Nepal|The McMahon Line lies between India and China; the Durand Line between Afghanistan and Pakistan.
Palk Strait : India–Sri Lanka :: Strait of Gibraltar : ?|Europe–Africa|Asia–Europe|Asia–Africa|Europe–North America|The Palk Strait separates India and Sri Lanka; the Strait of Gibraltar separates Europe (Spain) and Africa (Morocco).
Suez Canal : Mediterranean–Red Sea :: Panama Canal : ?|Atlantic–Pacific|Atlantic–Indian|Pacific–Arctic|Red Sea–Arabian Sea|The Suez Canal links the Mediterranean and Red Sea; the Panama Canal links the Atlantic and Pacific.
ISRO : Bengaluru :: DRDO : ?|New Delhi|Hyderabad|Bengaluru|Pune|ISRO is headquartered in Bengaluru; DRDO in New Delhi.
Chandrayaan : Moon :: Mangalyaan : ?|Mars|Venus|Sun|Jupiter|Chandrayaan missions went to the Moon; Mangalyaan went to Mars.
Aditya-L1 : Sun :: Gaganyaan : ?|Human spaceflight|Moon landing|Mars orbit|Venus probe|Aditya-L1 studies the Sun; Gaganyaan is India's human spaceflight programme.
Satish Dhawan Space Centre : Sriharikota :: Vikram Sarabhai Space Centre : ?|Thiruvananthapuram|Bengaluru|Ahmedabad|Hyderabad|The launch centre is at Sriharikota; VSSC is at Thiruvananthapuram.
BSF : Land borders :: Indian Coast Guard : ?|Maritime zones|Airports|Railways|Industries|The BSF guards land borders; the Coast Guard protects India's maritime zones.
CISF : Industrial security :: RPF : ?|Railway security|Border security|Coastal security|Forest protection|The CISF protects industrial units; the RPF protects railway property and passengers.
INS : Navy ship :: ICGS : ?|Coast Guard ship|Army vehicle|Air Force base|Merchant ship|'INS' prefixes Navy ships; 'ICGS' prefixes Coast Guard ships.
Rashtrapati Bhavan : President :: Raj Bhavan : ?|Governor|Chief Minister|Prime Minister|Speaker|Rashtrapati Bhavan is the President's residence; a Raj Bhavan is a Governor's residence.
Election Commission : Elections :: CAG : ?|Government accounts|Elections|Foreign policy|Defence research|The Election Commission conducts elections; the Comptroller and Auditor General audits government accounts.
RBI : Monetary policy :: SEBI : ?|Securities market|Insurance|Telecom|Elections|The RBI runs monetary policy; SEBI regulates the securities market.
`);

// odd-one-out: three that belong | the odd one | explanation
export const oddWords = lines(`
Mercury|Mars|Jupiter|Pluto|Pluto is a dwarf planet; the others are planets.
Hydrogen|Oxygen|Nitrogen|Iron|Iron is a solid metal; the others are gases.
Eagle|Hawk|Falcon|Ostrich|The ostrich cannot fly; the others are flying birds of prey.
Shark|Rohu|Salmon|Whale|The whale is a mammal; the others are fish.
Snake|Lizard|Crocodile|Frog|The frog is an amphibian; the others are reptiles.
Kathak|Bharatanatyam|Kuchipudi|Bhangra|Bhangra is a folk dance; the others are classical dances.
Sitar|Veena|Sarod|Tabla|The tabla is a percussion instrument; the others are string instruments.
Rifle|Pistol|Carbine|Grenade|A grenade is thrown; the others are firearms.
Destroyer|Frigate|Corvette|Tank|A tank is a land vehicle; the others are warships.
Major|Colonel|Brigadier|Commodore|Commodore is a Navy rank; the others are Army ranks.
Wing Commander|Squadron Leader|Group Captain|Lieutenant Colonel|Lieutenant Colonel is an Army rank; the others are Air Force ranks.
Admiral|Commodore|Commander|Brigadier|Brigadier is an Army rank; the others are Navy ranks.
Patna|Lucknow|Bhopal|Indore|Indore is not a state capital; the others are.
Ganga|Yamuna|Godavari|Chilika|Chilika is a lake; the others are rivers.
Dal|Wular|Loktak|Kaveri|Kaveri is a river; the others are lakes.
Everest|Kangchenjunga|Nanda Devi|Sahara|The Sahara is a desert; the others are mountain peaks.
Asia|Africa|Europe|Arctic|The Arctic is an ocean; the others are continents.
Pacific|Atlantic|Indian|Caspian|The Caspian is a sea; the others are oceans.
Nile|Amazon|Volga|Gobi|The Gobi is a desert; the others are rivers.
January|March|May|June|June has 30 days; the others have 31.
April|June|September|December|December has 31 days; the others have 30.
Square|Triangle|Pentagon|Sphere|A sphere is three-dimensional; the others are plane figures.
Cube|Cone|Cylinder|Rectangle|A rectangle is two-dimensional; the others are solids.
Inch|Foot|Yard|Kilogram|The kilogram measures mass; the others measure length.
Litre|Millilitre|Gallon|Metre|The metre measures length; the others measure volume.
Decade|Century|Millennium|Kilometre|The kilometre is a unit of length; the others are periods of time.
Pen|Pencil|Chalk|Eraser|An eraser removes writing; the others are used to write.
Doctor|Nurse|Surgeon|Lawyer|A lawyer is not a medical professional.
Football|Hockey|Cricket|Tennis|Tennis is played by individuals or pairs; the others are eleven-a-side team games.
Chess|Carrom|Ludo|Kabaddi|Kabaddi is an outdoor contact sport; the others are indoor board games.
Apple|Mango|Banana|Carrot|The carrot is a vegetable; the others are fruits.
Spinach|Cabbage|Lettuce|Potato|The potato is a tuber; the others are leafy vegetables.
Rose|Jasmine|Lily|Oak|The oak is a tree; the others are flowers.
Teak|Sal|Deodar|Bamboo|Bamboo is a grass; the others are trees.
Cow|Goat|Buffalo|Tiger|The tiger is a carnivore; the others are herbivores.
Lion|Tiger|Leopard|Elephant|The elephant is a herbivore; the others are big cats.
Crow|Sparrow|Pigeon|Penguin|The penguin cannot fly; the others can.
Butterfly|Bee|Housefly|Spider|The spider is an arachnid with eight legs; the others are insects.
Copper|Silver|Gold|Diamond|Diamond is a form of carbon, a non-metal; the others are metals.
Iron|Aluminium|Copper|Bronze|Bronze is an alloy; the others are pure metals.
Steel|Brass|Bronze|Tin|Tin is an element; the others are alloys.
Heart|Liver|Kidney|Femur|The femur is a bone; the others are organs.
Radius|Ulna|Tibia|Biceps|The biceps is a muscle; the others are bones.
Hindi|Tamil|Telugu|Devanagari|Devanagari is a script; the others are languages.
Rupee|Dollar|Euro|Sensex|The Sensex is a stock market index; the others are currencies.
Venus|Jupiter|Saturn|Sirius|Sirius is a star; the others are planets.
Rain|Snow|Hail|Fog|Fog is suspended water droplets; the others are forms of precipitation.
Cyclone|Tornado|Typhoon|Avalanche|An avalanche is a mass of sliding snow; the others are windstorms.
Microscope|Telescope|Binoculars|Stethoscope|The stethoscope is for listening; the others are optical instruments.
Keyboard|Mouse|Scanner|Printer|The printer is an output device; the others are input devices.
RAM|ROM|Cache|Monitor|The monitor is an output device; the others are types of memory.
Aeroplane|Helicopter|Glider|Submarine|The submarine travels under water; the others fly.
Car|Bus|Truck|Bicycle|The bicycle has no engine; the others are motor vehicles.
Surgeon|Dentist|Physician|Pharmacist|A pharmacist dispenses medicines; the others are doctors who treat patients.
Poet|Novelist|Dramatist|Painter|A painter is not a writer; the others are writers.
Anger|Joy|Sorrow|Honesty|Honesty is a virtue; the others are emotions.
Brave|Bold|Fearless|Timid|Timid is opposite in meaning; the others mean courageous.
Happy|Glad|Cheerful|Gloomy|Gloomy means sad; the others mean happy.
Walk|Run|Jog|Sleep|Sleeping is not a form of movement.
Tabla|Mridangam|Dholak|Shehnai|The shehnai is a wind instrument; the others are percussion instruments.
Himalaya|Aravalli|Vindhya|Deccan|The Deccan is a plateau; the others are mountain ranges.
Thar|Sahara|Kalahari|Sundarbans|The Sundarbans is a mangrove forest; the others are deserts.
Mumbai|Chennai|Kochi|Nagpur|Nagpur is inland; the others are port cities.
Paris|London|Tokyo|Sydney|Sydney is not a national capital; the others are.
Newton|Einstein|Faraday|Shakespeare|Shakespeare was a playwright; the others were scientists.
Tagore|Premchand|Kalidasa|Aryabhata|Aryabhata was a mathematician-astronomer; the others were writers.
Akbar|Babur|Humayun|Shivaji|Shivaji was a Maratha ruler; the others were Mughal emperors.
Plassey|Panipat|Haldighati|Sabarmati|Sabarmati is a river and ashram; the others are famous battlefields.
AK-47|INSAS|SLR|Pinaka|Pinaka is a rocket launcher; the others are rifles.
Prithvi|Agni|Akash|Arjun|Arjun is a tank; the others are missiles.
Tejas|Rafale|Mirage 2000|Chetak|Chetak is a helicopter; the others are fighter aircraft.
INS Vikrant|INS Vikramaditya|INS Viraat|INS Chakra|INS Chakra was a nuclear submarine; the others are/were aircraft carriers.
Param Vir Chakra|Maha Vir Chakra|Vir Chakra|Ashoka Chakra|The Ashoka Chakra is a peacetime award; the others are wartime gallantry awards.
NDA|IMA|OTA|AIIMS|AIIMS is a medical institute; the others are military training academies.
BSF|ITBP|CRPF|ISRO|ISRO is a space agency; the others are armed police forces.
Infantry|Artillery|Armoured Corps|Squadron|A squadron is a sub-unit; the others are arms of the Army.
Section|Platoon|Company|Fleet|A fleet is a naval formation; the others are Army sub-units.
Heptagon|Octagon|Decagon|Ellipse|An ellipse has no straight sides; the others are polygons.
Kelvin|Celsius|Fahrenheit|Pascal|The pascal is a unit of pressure; the others are temperature scales.
Joule|Calorie|Kilowatt-hour|Watt|The watt is a unit of power; the others are units of energy.
Violet|Indigo|Blue|Pink|Pink is not a colour of the rainbow.
Oxygen|Nitrogen|Hydrogen|Carbon dioxide|Carbon dioxide is a compound; the others are elements.
Vitamin A|Vitamin D|Vitamin K|Vitamin C|Vitamin C is water-soluble; the others are fat-soluble.
Measles|Mumps|Chickenpox|Malaria|Malaria is caused by a protozoan parasite; the others are viral diseases.
Cholera|Typhoid|Tuberculosis|Polio|Polio is a viral disease; the others are bacterial.
Carpenter|Blacksmith|Potter|Teacher|A teacher is not an artisan who makes things by hand.
Wheat|Rice|Barley|Mustard|Mustard is an oilseed; the others are cereals.
Groundnut|Mustard|Sunflower|Jute|Jute is a fibre crop; the others are oilseeds.
Tea|Coffee|Rubber|Wheat|Wheat is a food grain; the others are plantation crops.
Coal|Petroleum|Natural gas|Solar energy|Solar energy is renewable; the others are fossil fuels.
Wind|Solar|Tidal|Nuclear|Nuclear energy uses finite uranium; the others are renewable sources.
Assam|Meghalaya|Nagaland|Kerala|Kerala is not a north-eastern state.
Gujarat|Maharashtra|Goa|Bihar|Bihar has no coastline; the others do.
Flute|Trumpet|Saxophone|Harp|The harp is a string instrument; the others are wind instruments.
Stanza|Couplet|Sonnet|Paragraph|A paragraph belongs to prose; the others belong to poetry.
Noun|Verb|Adjective|Sentence|A sentence is not a part of speech.
Frog|Toad|Salamander|Turtle|The turtle is a reptile; the others are amphibians.
Dolphin|Whale|Seal|Shark|The shark is a fish; the others are mammals.
Kidneys|Lungs|Skin|Heart|The heart is not an excretory organ; the others remove waste from the body.
Silk|Wool|Leather|Cotton|Cotton comes from a plant; the others come from animals.
Eyes|Ears|Tongue|Brain|The brain is not a sense organ.
`);

// S:WORD = synonym, A:WORD = antonym, O:phrase = one-word substitution | correct | wrong | wrong | wrong
export const vocab = lines(`
S:VALIANT|Brave|Timid|Wealthy|Clever
S:BENEVOLENT|Kind|Cruel|Lazy|Proud
S:CANDID|Frank|Secretive|Clever|Angry
S:DILIGENT|Hardworking|Careless|Slow|Honest
S:ABANDON|Desert|Keep|Adopt|Protect
S:ABUNDANT|Plentiful|Scarce|Rare|Empty
S:ADVERSITY|Hardship|Prosperity|Victory|Help
S:AMIABLE|Friendly|Hostile|Shy|Serious
S:ARDUOUS|Difficult|Easy|Pleasant|Short
S:AUDACIOUS|Daring|Cowardly|Polite|Quiet
S:BRISK|Quick|Slow|Lazy|Dull
S:CONCEAL|Hide|Reveal|Show|Display
S:DEFER|Postpone|Hasten|Cancel|Refuse
S:EMINENT|Distinguished|Unknown|Tall|Wealthy
S:ERRONEOUS|Wrong|Correct|Careful|Honest
S:FEEBLE|Weak|Strong|Loud|Brave
S:FRUGAL|Thrifty|Wasteful|Generous|Poor
S:GALLANT|Heroic|Cowardly|Rude|Slow
S:HOSTILE|Unfriendly|Kind|Calm|Helpful
S:IMMINENT|About to happen|Distant|Famous|Important
S:LUCID|Clear|Confusing|Dark|Lazy
S:METICULOUS|Careful|Careless|Hasty|Rough
S:OBSTINATE|Stubborn|Flexible|Obedient|Gentle
S:PRUDENT|Wise|Foolish|Rash|Proud
S:RESILIENT|Tough|Fragile|Rigid|Weak
S:TENACIOUS|Persistent|Weak|Lazy|Hesitant
S:VIGILANT|Watchful|Careless|Sleepy|Brave
S:ZEAL|Enthusiasm|Apathy|Anger|Fear
S:VALOUR|Courage|Fear|Wealth|Wisdom
S:INTREPID|Fearless|Afraid|Clever|Cautious
A:COURAGE|Cowardice|Bravery|Strength|Valour
A:EXPAND|Contract|Grow|Enlarge|Spread
A:ARTIFICIAL|Natural|Fake|Man-made|Synthetic
A:BOLD|Timid|Brave|Daring|Loud
A:COMPULSORY|Optional|Necessary|Mandatory|Required
A:DEFEND|Attack|Protect|Guard|Support
A:EXTRAVAGANT|Thrifty|Lavish|Wasteful|Generous
A:GENUINE|Fake|Real|Honest|Pure
A:INFERIOR|Superior|Lower|Lesser|Poor
A:MAXIMUM|Minimum|Most|Greatest|Highest
A:OBEDIENT|Rebellious|Dutiful|Loyal|Humble
A:PERMANENT|Temporary|Lasting|Stable|Fixed
A:PROSPERITY|Poverty|Wealth|Success|Growth
A:REJECT|Accept|Refuse|Deny|Discard
A:RIGID|Flexible|Stiff|Firm|Hard
A:TRANSPARENT|Opaque|Clear|Visible|Thin
A:VICTORY|Defeat|Win|Triumph|Success
A:WISDOM|Folly|Knowledge|Sense|Insight
A:ACQUIT|Convict|Release|Free|Pardon
A:ASSEMBLE|Disperse|Gather|Collect|Unite
A:CAUTIOUS|Reckless|Careful|Alert|Wary
A:ENCOURAGE|Discourage|Inspire|Support|Motivate
A:FERTILE|Barren|Fruitful|Rich|Green
A:GRADUAL|Sudden|Slow|Steady|Gentle
A:MAJORITY|Minority|Most|Bulk|Mass
A:EXPORT|Import|Send|Ship|Trade
A:FOREIGN|Native|Alien|Strange|Distant
A:VOLUNTARY|Forced|Willing|Free|Optional
A:SUPERFICIAL|Deep|Shallow|Surface|Slight
A:HONEST|Deceitful|Truthful|Sincere|Frank
O:One who cannot be defeated|Invincible|Invisible|Invaluable|Indelible
O:A person who does not believe in the existence of God|Atheist|Theist|Agnostic|Pagan
O:A person who can speak many languages|Polyglot|Linguist|Bilingual|Orator
O:One who loves his or her country|Patriot|Traitor|Pilgrim|Emigrant
O:One who betrays his or her country|Traitor|Patriot|Pilgrim|Veteran
O:A building where soldiers live|Barracks|Hangar|Arsenal|Dockyard
O:A place where arms and ammunition are stored|Arsenal|Barracks|Hangar|Granary
O:A shed where aircraft are kept|Hangar|Dock|Garage|Arsenal
O:A person who leaves his or her own country to settle in another|Emigrant|Immigrant|Refugee|Tourist
O:A person who comes into a country to settle there|Immigrant|Emigrant|Nomad|Pilgrim
O:A speech made without any preparation|Extempore|Monologue|Eulogy|Soliloquy
O:Government by the people|Democracy|Monarchy|Autocracy|Anarchy
O:Government by one person with absolute power|Autocracy|Democracy|Oligarchy|Theocracy
O:That which cannot be read|Illegible|Invisible|Ineligible|Indelible
O:That which cannot be seen|Invisible|Illegible|Inaudible|Invincible
O:That which cannot be heard|Inaudible|Invisible|Inedible|Illegible
O:That which cannot be eaten|Inedible|Inaudible|Indelible|Invaluable
O:That which cannot be erased|Indelible|Illegible|Invincible|Inaudible
O:The life story of a person written by himself or herself|Autobiography|Biography|Obituary|Epitaph
O:The life story of a person written by someone else|Biography|Autobiography|Obituary|Epitaph
O:One who always looks on the bright side of things|Optimist|Pessimist|Realist|Cynic
O:A person who flies an aircraft|Aviator|Navigator|Astronaut|Mariner
O:A person trained to travel in space|Astronaut|Aviator|Mariner|Pilot
O:A person who offers to work without payment|Volunteer|Mercenary|Employee|Servant
O:A soldier who fights for money in a foreign army|Mercenary|Volunteer|Veteran|Cadet
O:A person with long experience, especially a former soldier|Veteran|Recruit|Novice|Cadet
O:A person newly enlisted in the armed forces|Recruit|Veteran|Mercenary|Deserter
O:A soldier who runs away from duty|Deserter|Mercenary|Recruit|Sentry
O:A soldier posted to keep guard|Sentry|Deserter|Veteran|Recruit
O:The scientific study of the mind and behaviour|Psychology|Physiology|Philosophy|Sociology
O:The killing of a king|Regicide|Homicide|Genocide|Patricide
O:A remedy for all diseases|Panacea|Placebo|Antidote|Vaccine
O:A medicine that counteracts a poison|Antidote|Antibiotic|Panacea|Vaccine
O:Fear of heights|Acrophobia|Claustrophobia|Hydrophobia|Agoraphobia
O:Fear of closed spaces|Claustrophobia|Acrophobia|Hydrophobia|Xenophobia
O:A person who travels on foot|Pedestrian|Passenger|Pilgrim|Commuter
O:Animals that eat both plants and flesh|Omnivores|Herbivores|Carnivores|Insectivores
O:Something that can be carried easily|Portable|Potable|Durable|Edible
O:Water that is fit for drinking|Potable|Portable|Palatable|Soluble
O:A place where birds are kept|Aviary|Apiary|Aquarium|Kennel
O:A place where bees are kept|Apiary|Aviary|Arsenal|Nursery
`);

// blood relations: q | correct | wrong | wrong | wrong | explanation
export const relations = lines(`
A is the father of B. B is the brother of C. C is the daughter of D. How is D related to A?|Wife|Sister|Mother|Daughter|B and C are siblings, so A is also C's father; C's other parent D is A's wife.
X is the son of Y. Y is the daughter of Z. How is Z related to X?|Grandfather or grandmother|Grandfather|Grandmother|Uncle|Z is Y's parent and Y is X's mother, so Z is X's grandparent — Z's gender is not given.
P is the brother of Q. Q is the sister of R. R is the son of S. How is P related to S?|Son|Daughter|Brother|Nephew|P, Q and R are siblings; R is S's son, so P (a male) is also S's son.
M is the mother of N. N is the wife of O. How is O related to M?|Son-in-law|Son|Brother|Nephew|O is married to M's daughter N, so O is M's son-in-law.
A is the husband of B. B is the sister of C. C is the father of D. How is A related to D?|Uncle|Father|Grandfather|Cousin|B is D's aunt (father's sister), so her husband A is D's uncle.
K is the sister of L. L is the father of M. M is the brother of N. How is K related to N?|Aunt|Mother|Sister|Grandmother|L is N's father too, and K is L's sister, so K is N's aunt.
E is the mother of F. F is the father of G. G is the sister of H. How is E related to H?|Grandmother|Mother|Aunt|Sister|F is H's father too, and E is F's mother, so E is H's grandmother.
J is the only son of K. L is the wife of J. M is the daughter of J and L. How is K related to M?|Grandfather or grandmother|Grandfather|Grandmother|Father|K is the parent of M's father J; K's gender is not given.
A and B are sisters. C is the son of B. D is the father of A. How is C related to D?|Grandson|Son|Nephew|Brother|D is the father of both sisters, so B's son C is D's grandson.
P is the wife of Q. R is the brother of Q. S is the son of R. How is P related to S?|Aunt|Mother|Sister|Grandmother|Q is S's uncle (father's brother), so Q's wife P is S's aunt.
X is the brother of Y. Z is the father of X. W is the mother of Z. How is Y related to W?|Grandson or granddaughter|Grandson|Granddaughter|Son|Z is Y's father too, and W is Z's mother; Y's gender is not given.
A is the son of B. C is the daughter of B. D is the husband of C. How is D related to A?|Brother-in-law|Brother|Cousin|Uncle|D is married to A's sister C, so D is A's brother-in-law.
M is the father of N. O is the wife of M. P is the mother of O. How is P related to N?|Grandmother|Mother|Aunt|Sister|O is N's mother, and P is O's mother, so P is N's (maternal) grandmother.
F is the sister of G. H is the husband of F. I is the son of H and F. How is G related to I?|Uncle or aunt|Uncle|Aunt|Cousin|G is the sibling of I's mother F; G's gender is not given.
Q is the daughter of R. S is the father of R. T is the brother of S. How is T related to Q?|Grand-uncle|Uncle|Grandfather|Brother|S is Q's grandfather, and T is S's brother, so T is Q's grand-uncle.
D is the brother of E. E is the husband of F. G is the son of F. How is D related to G?|Uncle|Father|Brother|Grandfather|E is G's father, and D is E's brother, so D is G's uncle.
U is the mother-in-law of V. V is the husband of W. How is U related to W?|Mother|Aunt|Mother-in-law|Sister|V's mother-in-law is the mother of V's wife W.
Kiran's mother is the sister of Lokesh. How is Lokesh related to Kiran?|Maternal uncle|Father|Paternal uncle|Grandfather|Lokesh is the brother of Kiran's mother, so he is Kiran's maternal uncle.
Tina is a girl. Ayesha is the wife of the only son of Tina's father. How is Ayesha related to Tina?|Sister-in-law|Mother|Sister|Cousin|The only son of Tina's father is Tina's brother; his wife Ayesha is Tina's sister-in-law.
P is the son of Q. Q is the only daughter of R. R is the husband of S. How is P related to S?|Grandson|Son|Nephew|Brother|Q is S's daughter, so Q's son P is S's grandson.
J is the brother of K. K is the mother of L. L is the brother of M. How is J related to M?|Maternal uncle|Father|Grandfather|Cousin|K is M's mother too, and J is K's brother, so J is M's maternal uncle.
G is the father of H. I is the brother of G. J is the daughter of I. How is J related to H?|Cousin|Sister|Niece|Aunt|J's father I and H's father G are brothers, so J and H are cousins.
B is the wife of C. D is the son of B. E is the father of C. How is E related to D?|Grandfather|Father|Uncle|Great-grandfather|C is D's father, and E is C's father, so E is D's grandfather.
Y is the sister of Z, who is a boy. X is the mother of Y. W is the husband of X. How is Z related to W?|Son|Nephew|Brother|Grandson|Z is Y's brother, so X and her husband W are his parents; Z is W's son.
N is the husband of O. O is the sister of P. P is the mother of Q. How is N related to Q?|Uncle|Father|Grandfather|Brother|O is Q's aunt (mother's sister), so her husband N is Q's uncle.
A is the mother of B. C is the father of A. D is the son of C. How is D related to B?|Maternal uncle|Father|Grandfather|Brother|D is A's brother, and A is B's mother, so D is B's maternal uncle.
H is the daughter of I. I is the wife of J. K is the sister of J. How is K related to H?|Aunt|Mother|Sister|Cousin|J is H's father and K is J's sister, so K is H's (paternal) aunt.
R is the brother of S. T is the father of R. U is the sister of T. V is the son of U. How is V related to S?|Cousin|Brother|Uncle|Nephew|T is S's father too; U is T's sister, so U's son V is S's cousin.
E is the son of F. F is the brother of G. G is the mother of H. How is E related to H?|Cousin|Brother|Uncle|Nephew|E's father F and H's mother G are siblings, so E and H are cousins.
L is the father of N. N is the father of M. O is the wife of N. How is L related to O?|Father-in-law|Father|Grandfather|Brother-in-law|L is the father of O's husband N, so L is O's father-in-law.
A is the brother of B. B is the son of C. D is the father of C. E is the wife of D. How is A related to E?|Grandson|Son|Nephew|Great-grandson|A is C's son; C is the child of D and E, so A is E's grandson.
S is the sister of T. T is the son of U. U is the son of V. How is S related to V?|Granddaughter|Daughter|Niece|Grandmother|S is U's daughter, and U is V's son, so S is V's granddaughter.
W is the husband of X. Y is the son of X. Z is the wife of Y. How is W related to Z?|Father-in-law|Father|Brother-in-law|Husband|W is the father of Z's husband Y, so W is Z's father-in-law.
C is the wife of D. E is the mother of D. F is the only son of E. How is F related to C?|Husband|Brother-in-law|Father-in-law|Son|D is E's son; since F is E's only son, F is D himself — C's husband.
G is the sister of H. H is the only son of I. J is the wife of I. How is J related to G?|Mother|Aunt|Grandmother|Sister|G and H are I's children; I's wife J is their mother.
K is the son of L. L is the only daughter of M. N is the only son of M. How is N related to K?|Maternal uncle|Father|Grandfather|Brother|N is the brother of K's mother L, so N is K's maternal uncle.
O and P are husband and wife, and their only child is a daughter, R. Q is the grandson of P. How is R related to Q?|Mother|Aunt|Sister|Grandmother|P's only child is R, so P's grandson Q must be R's son.
T is the father of U. U is the sister of V. W is the wife of V. How is T related to W?|Father-in-law|Father|Uncle|Brother-in-law|T is the father of W's husband V, so T is W's father-in-law.
X is the daughter of Y. Z is the brother of Y. A is the son of Z. How is A related to X?|Cousin|Brother|Nephew|Uncle|A's father Z and X's parent Y are siblings, so A and X are cousins.
B is the son of C. D is the brother of C. E is the wife of D. How is E related to B?|Aunt|Mother|Sister|Grandmother|D is B's uncle, so D's wife E is B's aunt.
F is the mother of G. G is the father of H. I is the sister of H. How is I related to F?|Granddaughter|Daughter|Niece|Sister|G is I's father and F is G's mother, so I is F's granddaughter.
J is the brother of K. L is the husband of K. M is the daughter of K and L. How is J related to M?|Maternal uncle|Father|Grandfather|Cousin|J is the brother of M's mother K, so J is M's maternal uncle.
Rahul's sister is Priya's mother. How is Rahul related to Priya?|Maternal uncle|Father|Brother|Grandfather|Rahul is the brother of Priya's mother, so he is Priya's maternal uncle.
Meena is the daughter of Suresh. Suresh is the brother of Kavita. Kavita's son is Rohan. How is Rohan related to Meena?|Cousin|Brother|Nephew|Uncle|Rohan's mother and Meena's father are siblings, so they are cousins.
Vijay is the husband of Anita. Anita's brother is Karan. Karan's daughter is Isha. How is Vijay related to Isha?|Uncle|Father|Grandfather|Cousin|Anita is Isha's aunt (father's sister), so Anita's husband Vijay is Isha's uncle.
Neha is the sister of Arjun. Arjun is the father of Dev. Dev's wife is Pooja. How is Neha related to Pooja?|Husband's aunt|Mother-in-law|Sister-in-law|Husband's sister|Neha is Dev's aunt (father's sister), so she is the aunt of Pooja's husband.
Ravi is the son of Mohan. Mohan is the husband of Sita. Sita's father is Gopal. How is Gopal related to Ravi?|Maternal grandfather|Paternal grandfather|Uncle|Father|Sita is Ravi's mother, and Gopal is her father, so Gopal is Ravi's maternal grandfather.
Leela is the sister of Ajay's father. Leela's husband is Prakash. How is Prakash related to Ajay?|Uncle|Father|Cousin|Brother-in-law|Leela is Ajay's paternal aunt, so her husband Prakash is Ajay's uncle.
Sonia is the wife of Raj. Raj is the only son of Kamla. Kamla's husband is Dinesh. How is Dinesh related to Sonia?|Father-in-law|Father|Uncle|Husband|Dinesh is the father of Sonia's husband Raj, so he is Sonia's father-in-law.
Tarun and Varun are brothers. Tarun's daughter is Riya. Varun's son is Kabir. How is Kabir related to Riya?|Cousin|Brother|Nephew|Uncle|Their fathers are brothers, so Kabir and Riya are cousins.
Aman is the grandson of Bhola. Bhola has only one child, a daughter named Chitra. How is Chitra related to Aman?|Mother|Aunt|Sister|Grandmother|Bhola's only child is Chitra, so his grandson Aman must be Chitra's son.
Deepa is the mother of Esha. Esha is the sister of Farhan. Farhan's son is Gaurav. How is Deepa related to Gaurav?|Grandmother|Mother|Aunt|Great-grandmother|Deepa is Farhan's mother too, so she is Gaurav's grandmother.
Harish's wife is Indu. Indu's only sister is Jaya. Jaya's son is Kunal. How is Harish related to Kunal?|Uncle|Father|Grandfather|Brother|Indu is Kunal's maternal aunt, so her husband Harish is Kunal's uncle.
Lata is the daughter-in-law of Mahesh. Mahesh has only one son, Nitin. How is Nitin related to Lata?|Husband|Brother|Father-in-law|Brother-in-law|A daughter-in-law is a son's wife; Mahesh's only son is Nitin, so Nitin is Lata's husband.
Om is the father of Pari. Pari is married to Qasim. Qasim's sister is Rukhsana. How is Rukhsana related to Pari?|Sister-in-law|Sister|Cousin|Mother-in-law|Rukhsana is the sister of Pari's husband, so she is Pari's sister-in-law.
Sunil is Tina's brother. Tina is Uday's mother. Uday's sister is Vani. How is Sunil related to Vani?|Maternal uncle|Father|Grandfather|Brother|Tina is Vani's mother too, so Tina's brother Sunil is Vani's maternal uncle.
Yash is the son of Zoya. Zoya is the daughter of Amar. Amar's wife is Bina. How is Yash related to Bina?|Grandson|Son|Nephew|Great-grandson|Zoya is Bina's daughter, so Zoya's son Yash is Bina's grandson.
Chetan's father is the only son of Dhruv. Dhruv's wife is Ela. How is Ela related to Chetan?|Grandmother|Mother|Aunt|Great-grandmother|Chetan's father is Dhruv's son, so Dhruv's wife Ela is Chetan's grandmother.
Farida is Gul's daughter. Gul is the sister of Hamid. Hamid's son is Imran. How is Imran related to Farida?|Cousin|Brother|Uncle|Nephew|Imran's father and Farida's mother are siblings, so they are cousins.
Jatin's mother is Kusum. Kusum's mother is Lalita. Lalita's husband is Madan. How is Madan related to Jatin?|Maternal grandfather|Paternal grandfather|Uncle|Great-grandfather|Madan is the father of Jatin's mother, so he is Jatin's maternal grandfather.
Prerna is the only daughter of Qadir. Qadir is the son of Rehana. How is Rehana related to Prerna?|Grandmother|Mother|Aunt|Great-grandmother|Rehana is the mother of Prerna's father, so she is Prerna's grandmother.
Kamal is the father of Lokesh. Lokesh is the father of Manav. Manav is the father of Nakul. How is Kamal related to Nakul?|Great-grandfather|Grandfather|Great-uncle|Father|Kamal → Lokesh → Manav → Nakul spans three generations, so Kamal is Nakul's great-grandfather.
Ojas and Pranav are brothers. Pranav's wife is Rashmi. Rashmi's daughter is Sanya. How is Ojas related to Sanya?|Uncle|Father|Grandfather|Brother|Sanya is Pranav's daughter, and Ojas is Pranav's brother, so Ojas is her uncle.
Tanya is the sister of Uma. Uma is the wife of Vikas. Vikas and Uma have a son, Waman. How is Tanya related to Waman?|Maternal aunt|Mother|Paternal aunt|Grandmother|Tanya is the sister of Waman's mother Uma, so she is his maternal aunt.
Anjali's husband Bharat has a sister Charu. Charu's husband is Daksh. How is Daksh related to Bharat?|Brother-in-law|Brother|Father-in-law|Cousin|Daksh is married to Bharat's sister, so he is Bharat's brother-in-law.
Girish is the only son of Hema. Juhi is Girish's wife. Kartik is Juhi and Girish's son. How is Hema related to Kartik?|Grandmother|Mother|Aunt|Mother-in-law|Hema is the mother of Kartik's father Girish, so she is Kartik's grandmother.
Laxmi is the mother of Mukesh and Neelam. Neelam's son is Omprakash. How is Mukesh related to Omprakash?|Maternal uncle|Father|Grandfather|Cousin|Mukesh is the brother of Omprakash's mother Neelam, so he is his maternal uncle.
Parth's paternal grandfather is Raghav. Raghav's only daughter is Sneha. How is Sneha related to Parth?|Paternal aunt|Mother|Maternal aunt|Grandmother|Parth's father is Raghav's son; Raghav's daughter Sneha is his sister, so she is Parth's paternal aunt.
Tushar is the son of Usha and her husband Mohan. Mohan's brother is Vinod. How is Vinod related to Tushar?|Paternal uncle|Maternal uncle|Father|Grandfather|Vinod is the brother of Tushar's father Mohan, so he is Tushar's paternal uncle.
Anu's mother's brother is Bala. Bala's daughter is Chhavi. How is Chhavi related to Anu?|Cousin|Sister|Niece|Aunt|Chhavi's father is Anu's maternal uncle, so they are cousins.
Dinesh's son Eshwar has a daughter Falguni. Falguni has a brother Ganesh. How is Dinesh related to Ganesh?|Grandfather|Father|Uncle|Great-grandfather|Ganesh is Eshwar's son too, and Dinesh is Eshwar's father, so Dinesh is Ganesh's grandfather.
Heena's husband's father is Iqbal. Iqbal's wife is Jahanara. How is Jahanara related to Heena?|Mother-in-law|Mother|Sister-in-law|Grandmother|Jahanara is the mother of Heena's husband, so she is Heena's mother-in-law.
Kavya's brother is Lakshay. Lakshay's wife is Mansi. Mansi's son is Nikhil. How is Kavya related to Nikhil?|Paternal aunt|Maternal aunt|Mother|Sister|Lakshay is Nikhil's father and Kavya is Lakshay's sister, so she is Nikhil's paternal aunt.
Omkar is the husband of Pallavi. Pallavi is the only daughter of Rakesh. How is Rakesh related to Omkar?|Father-in-law|Father|Brother-in-law|Uncle|Rakesh is the father of Omkar's wife, so he is Omkar's father-in-law.
Sagar has two children, Tara and Udit. Tara is married to Vivek. How is Vivek related to Udit?|Brother-in-law|Brother|Cousin|Father-in-law|Vivek is the husband of Udit's sister Tara, so he is Udit's brother-in-law.
Waheeda's father is Yusuf. Yusuf's brother is Zaid. Zaid's grandson is Aslam. How is Aslam related to Yusuf?|Grand-nephew|Grandson|Nephew|Cousin|Aslam is the grandson of Yusuf's brother, so he is Yusuf's grand-nephew.
Charu is the wife of Dhiraj. Dhiraj's mother is Ela. Ela's only daughter is Garima. How is Garima related to Charu?|Sister-in-law|Sister|Mother-in-law|Cousin|Garima is the sister of Charu's husband Dhiraj, so she is Charu's sister-in-law.
Himesh is the father of Ira. Ira is the mother of Jai. Jai's wife is Kaira. How is Himesh related to Kaira?|Husband's maternal grandfather|Father-in-law|Husband's paternal grandfather|Uncle|Himesh is the father of Jai's mother, i.e. the maternal grandfather of Kaira's husband.
Lalit and Mohit are brothers. Nisha is Lalit's wife. Ojasvi is Mohit's daughter. How is Nisha related to Ojasvi?|Aunt|Mother|Sister|Grandmother|Lalit is Ojasvi's uncle, so his wife Nisha is her aunt.
Pooja has a son Raman. Raman's sister is Sakshi. Sakshi's husband is Tarun. How is Tarun related to Pooja?|Son-in-law|Son|Brother|Nephew|Sakshi is Pooja's daughter, so her husband Tarun is Pooja's son-in-law.
Uday's paternal grandmother Vimla has only one son, Waman. How is Waman related to Uday?|Father|Uncle|Grandfather|Brother|Uday's father is a son of Vimla; her only son is Waman, so Waman is Uday's father.
Yamini's brother Zubin has a son Aarav. Aarav's mother is Bela. How is Bela related to Yamini?|Sister-in-law|Sister|Mother|Cousin|Bela is Zubin's wife, i.e. Yamini's brother's wife — her sister-in-law.
Chanda and her husband Firoz have only one son, Gautam. Chanda is the grandmother of Dev, and Dev's father is Eklavya. How is Eklavya related to Chanda?|Son-in-law|Son|Brother|Nephew|Chanda's only son is Gautam, so Dev's father Eklavya is not her son; Chanda must be Dev's maternal grandmother, making Eklavya her son-in-law.
Hari's mother Indira is the sister of Jagat. Jagat's wife is Kamini. How is Kamini related to Hari?|Maternal uncle's wife|Paternal aunt|Mother|Grandmother|Jagat is Hari's maternal uncle, so Kamini is his maternal uncle's wife (mami).
Lokesh is the only son of Maya and Narayan. Om is the only son of Lokesh. How is Narayan related to Om?|Grandfather|Father|Uncle|Great-grandfather|Narayan is the father of Om's father Lokesh, so he is Om's grandfather.
Pinky is Rohit's daughter. Rohit is Sachin's only brother. Sachin's wife is Tina. How is Tina related to Pinky?|Aunt|Mother|Grandmother|Sister|Sachin is Pinky's uncle, so his wife Tina is her aunt.
Umang is the son of Vasudha. Vasudha's father is Yogesh. Yogesh's only son is Zorawar. How is Zorawar related to Umang?|Maternal uncle|Father|Grandfather|Brother|Zorawar is the brother of Umang's mother Vasudha, so he is Umang's maternal uncle.
Aditi is Bhushan's daughter-in-law. Bhushan's daughter is Chhaya. How is Chhaya related to Aditi?|Sister-in-law|Sister|Mother-in-law|Cousin|Chhaya is the sister of Aditi's husband (Bhushan's son), so she is Aditi's sister-in-law.
Daman is married to Esha. Esha's father is Faiyaz. Faiyaz's wife is Gauri, Esha's mother. How is Gauri related to Daman?|Mother-in-law|Mother|Sister-in-law|Aunt|Gauri is the mother of Daman's wife, so she is his mother-in-law.
Hemant's daughter Ishita is married to Jeevan. Jeevan's father is Kishore. How is Kishore related to Hemant?|Daughter's father-in-law|Father-in-law|Brother-in-law|Son-in-law|Kishore is the father of Hemant's son-in-law, i.e. his daughter's father-in-law.
Lalita has only two children, Manohar and Nalini. Nalini's daughter is Omisha. How is Manohar related to Omisha?|Maternal uncle|Father|Paternal uncle|Grandfather|Manohar is the brother of Omisha's mother Nalini, so he is her maternal uncle.
Prem's wife Rekha is the daughter of Sohan. Sohan's other daughter is Tanu. How is Tanu related to Prem?|Sister-in-law|Sister|Mother-in-law|Wife|Tanu is the sister of Prem's wife, so she is his sister-in-law.
Ujjwal is the father of Vikram. Vikram's brother Yuvraj has a son, Zoravar. How is Ujjwal related to Zoravar?|Grandfather|Father|Uncle|Great-grandfather|Yuvraj is also Ujjwal's son, so Yuvraj's son Zoravar is Ujjwal's grandson.
Anand's sister Bindu has a daughter Chitra. Chitra's husband is Dhawal. How is Anand related to Dhawal?|Wife's maternal uncle|Father-in-law|Wife's paternal uncle|Brother-in-law|Anand is Chitra's maternal uncle, so he is Dhawal's wife's maternal uncle.
Esha is the only daughter of Farhan's only sister. How is Farhan related to Esha?|Maternal uncle|Father|Paternal uncle|Grandfather|Esha's mother is Farhan's sister, so Farhan is her maternal uncle.
Kamla is the mother of Lalit's father. How is Kamla related to Lalit?|Grandmother|Mother|Aunt|Great-grandmother|The mother of one's father is one's (paternal) grandmother.
Mitali's husband's only brother is Nirav. Nirav's son is Om. How is Mitali related to Om?|Aunt|Mother|Grandmother|Sister|Mitali is the wife of Om's father's brother, so she is Om's aunt.
Ruchi is the sister of Sahil. Sahil is the son of Tejas. Tejas is the husband of Urmila. How is Ruchi related to Urmila?|Daughter|Sister|Niece|Granddaughter|Ruchi and Sahil are the children of Tejas and Urmila, so Ruchi is Urmila's daughter.
Vaibhav's mother's father is Yashwant. Yashwant's wife is Aruna. How is Aruna related to Vaibhav?|Maternal grandmother|Paternal grandmother|Aunt|Mother|Aruna is the mother of Vaibhav's mother, so she is his maternal grandmother.
Bimal is the brother of Deepali. Deepali's son is Eshan. How is Bimal related to Eshan?|Maternal uncle|Father|Grandfather|Brother|Bimal is the brother of Eshan's mother, so he is Eshan's maternal uncle.
Girija has three children: Hitesh, Isha and Jaya. Isha's son is Kanav. How is Jaya related to Kanav?|Maternal aunt|Paternal aunt|Mother|Grandmother|Jaya is the sister of Kanav's mother Isha, so she is his maternal aunt.
Mohan is the father of Nilesh. Nilesh's wife is Omana. Omana and Nilesh have a son, Paras. How is Mohan related to Paras?|Grandfather|Father|Uncle|Great-grandfather|Mohan is the father of Paras's father Nilesh, so he is Paras's grandfather.
Rani is the daughter of Sameer. Sameer's sister Tulsi has a son Uday. Uday's wife is Vidya. How is Vidya related to Rani?|Cousin's wife|Sister|Aunt|Niece|Uday is Rani's cousin (her father's sister's son), so his wife Vidya is Rani's cousin's wife.
Wasim and Xara are siblings. Xara's daughter is Yasmin. Yasmin's son is Zayan. How is Wasim related to Zayan?|Grand-uncle|Uncle|Grandfather|Great-grandfather|Wasim is the brother of Zayan's grandmother Xara, so he is Zayan's grand-uncle.
`);

// "pointing / introducing" relations. Same format.
export const pointing = lines(`
Pointing to a man, Arun said, "His mother is the only daughter of my mother." How is Arun related to the man?|Maternal uncle|Father|Brother|Grandfather|The only daughter of Arun's mother is Arun's sister; she is the man's mother, so Arun is his maternal uncle.
Pointing to a boy, Kavita said, "He is the son of the only son of my father." How is the boy related to Kavita?|Nephew|Son|Brother|Cousin|The only son of Kavita's father is her brother; his son is Kavita's nephew.
Ravi, who has no brothers or sisters, pointed to a woman and said, "She is the mother of my father's only grandson." How is the woman related to Ravi?|Wife|Mother|Sister|Daughter|Ravi is an only child, so his father's only grandson is Ravi's son; that boy's mother is Ravi's wife.
Pointing to a man, Neha said, "He is the brother of my father's only daughter." How is the man related to Neha?|Brother|Father|Uncle|Cousin|Neha is her father's only daughter, so the man is Neha's brother.
Pointing to a girl, Manoj said, "Her father is the only brother of my wife." How is the girl related to Manoj?|Niece|Daughter|Sister|Cousin|The girl is the daughter of Manoj's wife's brother, i.e. Manoj's niece.
Pointing to a man, Priya said, "His only brother is the father of my daughter." How is the man related to Priya?|Brother-in-law|Husband|Father-in-law|Uncle|The father of Priya's daughter is Priya's husband; the man is his brother, so he is Priya's brother-in-law.
Pointing to a woman, Arjun said, "She is the daughter of my mother's only brother." How is the woman related to Arjun?|Cousin|Sister|Niece|Aunt|She is the daughter of Arjun's maternal uncle, so she is Arjun's cousin.
Introducing a boy, Sunita said, "He is the son of the daughter of my father's only son." How is the boy related to Sunita?|Grand-nephew|Nephew|Grandson|Son|Her father's only son is her brother; his daughter is her niece, and the niece's son is her grand-nephew.
Pointing to a man, Rekha said, "He is the only son of my mother's father." How is the man related to Rekha?|Maternal uncle|Father|Grandfather|Brother|The only son of Rekha's maternal grandfather is her mother's brother — her maternal uncle.
Pointing to a photograph, Amit said, "Her mother's husband is my father's only son-in-law." How is the girl in the photograph related to Amit?|Niece|Daughter|Sister|Cousin|Amit's father's only son-in-law is Amit's sister's husband; he is the girl's father, so she is Amit's niece.
Introducing a man, a woman said, "His wife is the only daughter of my father." How is the man related to the woman?|Husband|Brother|Father|Son-in-law|The only daughter of the woman's father is the woman herself, so the man is her husband.
Pointing to a boy, Veena said, "He is the son of my husband's only brother." How is the boy related to Veena?|Nephew|Son|Brother|Cousin|He is the son of Veena's brother-in-law, so he is her nephew.
Pointing to a girl, Harish said, "She is the daughter of the only child of my grandmother." How is the girl related to Harish?|Sister|Daughter|Niece|Cousin|The only child of Harish's grandmother is Harish's parent; that parent's daughter is Harish's sister.
Pointing to a woman, Deepak said, "Her son's father is my father's only son-in-law." How is the woman related to Deepak?|Sister|Wife|Mother|Cousin|The only son-in-law of Deepak's father is Deepak's sister's husband; the woman is his wife — Deepak's sister.
Pointing to a lady, Vikas said, "She is the mother-in-law of the wife of my father's only son." How is the lady related to Vikas?|Mother|Mother-in-law|Grandmother|Aunt|Vikas is his father's only son; his wife's mother-in-law is Vikas's mother.
Pointing to a boy, Kiran said, "He is the son of my brother's only sister." Kiran is a woman. How is the boy related to Kiran?|Son|Nephew|Brother|Cousin|Her brother's only sister is Kiran herself, so the boy is her son.
Pointing to a man, a girl said, "He is the only son of my paternal grandfather." How is the man related to the girl?|Father|Uncle|Brother|Grandfather|The only son of her paternal grandfather must be her father.
Pointing to a woman, Sanjay said, "Her father is the father-in-law of my mother." How is the woman related to Sanjay?|Paternal aunt|Mother|Sister|Grandmother|The father-in-law of Sanjay's mother is his paternal grandfather; his daughter is Sanjay's father's sister.
Pointing to a boy, Lata said, "His mother's father is the only son of my father." How is the boy related to Lata?|Grand-nephew|Nephew|Grandson|Son|Lata's father's only son is her brother; the boy is his daughter's son, i.e. Lata's grand-nephew.
Pointing to a girl, Nikhil said, "She is the only daughter of my wife's mother-in-law." How is the girl related to Nikhil?|Sister|Daughter|Wife|Niece|Nikhil's wife's mother-in-law is Nikhil's mother; her only daughter is Nikhil's sister.
Pointing to a man, Radha said, "He is the son of the only son of my father's wife." Radha's father has only one wife. How is the man related to Radha?|Nephew|Son|Brother|Cousin|Her father's wife is her mother; her mother's only son is Radha's brother, whose son is Radha's nephew.
Pointing to a lady, Tarun said, "Her husband is the son of my father's only brother." How is the lady related to Tarun?|Cousin's wife|Aunt|Niece|Wife|Her husband is Tarun's cousin (his uncle's son), so she is Tarun's cousin's wife.
Introducing a girl, Mohit said, "Her mother is the wife of my father's only son." How is the girl related to Mohit?|Daughter|Sister|Niece|Cousin|Mohit is his father's only son, so the girl's mother is Mohit's wife and the girl is his daughter.
Pointing to a man, Gita said, "His sister's husband is my husband." Gita's husband has only one wife. How is the man related to Gita?|Brother|Husband|Brother-in-law|Cousin|The man's sister is married to Gita's husband, so the sister is Gita herself; the man is Gita's brother.
Pointing to an elderly lady, Rakesh said, "Her only daughter is my wife's mother." How is the lady related to Rakesh?|Wife's grandmother|Mother-in-law|Grandmother|Aunt|The lady is the mother of Rakesh's mother-in-law, i.e. his wife's maternal grandmother.
Pointing to a boy, Anjali said, "He is the only grandson of my father-in-law's only son." How is the boy related to Anjali?|Grandson|Son|Nephew|Grand-nephew|Her father-in-law's only son is Anjali's husband; his only grandson is also Anjali's grandson.
Showing a photograph, Kishore said, "This man's father's only daughter is my mother." How is the man related to Kishore?|Maternal uncle|Father|Grandfather|Brother|The man's sister is Kishore's mother, so the man is Kishore's maternal uncle.
Pointing to a girl, Babita said, "She is the granddaughter of the only son of my father." How is the girl related to Babita?|Grand-niece|Niece|Granddaughter|Daughter|Babita's father's only son is her brother; his granddaughter is Babita's grand-niece.
Pointing to a man, Nitin said, "His father is the only brother of my father." How is the man related to Nitin?|Cousin|Brother|Uncle|Nephew|The man's father is Nitin's uncle, so the man is Nitin's cousin.
Pointing to a boy, Seema said, "He is the brother of the daughter of my mother's only son-in-law." Seema is her mother's only daughter. How is the boy related to Seema?|Son|Nephew|Brother|Grandson|Her mother's only son-in-law is Seema's husband; the brother of his daughter is his son — Seema's son.
Pointing to a woman, Kapil said, "She is the wife of the only son of my paternal grandfather." How is the woman related to Kapil?|Mother|Aunt|Grandmother|Sister|The only son of Kapil's paternal grandfather is Kapil's father; his wife is Kapil's mother.
Pointing to a girl, Rajni said, "Her father's wife is my mother's only daughter." How is the girl related to Rajni?|Daughter|Niece|Sister|Granddaughter|Rajni's mother's only daughter is Rajni herself; the girl's father's wife is Rajni, so the girl is Rajni's daughter.
Pointing to a lady, Hemant said, "Her brother's father is the only son of my paternal grandfather." How is the lady related to Hemant?|Sister|Aunt|Cousin|Mother|The only son of Hemant's paternal grandfather is his father; the lady is also that man's child — Hemant's sister.
Pointing to a woman, Mahesh said, "She is the daughter-in-law of my mother's only child." How is the woman related to Mahesh?|Daughter-in-law|Wife|Sister-in-law|Daughter|Mahesh is his mother's only child, so the woman is Mahesh's own daughter-in-law.
Pointing to a man, Leela said, "His son is my son's only paternal uncle." How is the man related to Leela?|Father-in-law|Husband|Father|Brother-in-law|Leela's son's paternal uncle is her husband's brother; that uncle's father is Leela's father-in-law.
Pointing to a woman, Karan said, "She is the only sister of my wife's only brother." How is the woman related to Karan?|Wife|Sister-in-law|Sister|Mother-in-law|Karan's wife is a sister of her brother; as he has only one sister, the woman is Karan's wife.
Pointing to a man, Rita said, "He is the son of the only son of my mother's mother." Rita's mother has only one brother. How is the man related to Rita?|Cousin|Brother|Nephew|Uncle|The only son of her maternal grandmother is her maternal uncle; his son is Rita's cousin.
Pointing to a woman, Gaurav said, "She is the mother of my mother's husband." How is the woman related to Gaurav?|Paternal grandmother|Maternal grandmother|Mother|Aunt|Gaurav's mother's husband is his father; the father's mother is Gaurav's paternal grandmother.
Pointing to a boy, Shalini said, "His father is my father's son-in-law, and I am my father's only child." How is the boy related to Shalini?|Son|Nephew|Brother|Cousin|As the only child, Shalini is the one married to her father's son-in-law; the boy's father is her husband, so the boy is her son.
Pointing to a man, Tanvir said, "His wife's father-in-law is my father's only brother." How is the man related to Tanvir?|Cousin|Brother|Uncle|Nephew|The man's wife's father-in-law is the man's father, who is Tanvir's uncle; so the man is Tanvir's cousin.
Pointing to a woman, Rohit said, "Her mother-in-law's only son is my father." How is the woman related to Rohit?|Mother|Aunt|Grandmother|Sister|Her mother-in-law's only son is her husband, who is Rohit's father, so she is Rohit's mother.
Pointing to a man, Prachi said, "His father-in-law is the father of my only brother, and I have no sister." How is the man related to Prachi?|Husband|Brother|Father|Brother-in-law|The man's father-in-law is Prachi's father, whose only daughter is Prachi, so the man is Prachi's husband.
Pointing to a girl, Manish said, "She is the daughter of the wife of my wife's only brother." How is the girl related to Manish?|Niece|Daughter|Sister|Cousin|She is the daughter of Manish's brother-in-law (wife's brother), i.e. his niece.
Pointing to a boy, Divya said, "He is the only son of my father-in-law's only daughter-in-law." How is the boy related to Divya?|Son|Nephew|Brother|Grandson|Her father-in-law's only daughter-in-law is Divya herself, so the boy is her son.
Pointing to a woman, Anuj said, "Her only brother is my son's maternal uncle. My wife has no sister." How is the woman related to Anuj?|Wife|Sister|Sister-in-law|Mother-in-law|Anuj's son's maternal uncle is his wife's brother; since the wife has no sister, that man's sister must be Anuj's wife.
Pointing to a man, Esha said, "He is the father-in-law of my brother's wife." How is the man related to Esha?|Father|Father-in-law|Uncle|Grandfather|The father-in-law of Esha's brother's wife is her brother's father, i.e. Esha's father.
Pointing to an old man, Bhavya said, "His daughter's son is my father." How is the old man related to Bhavya?|Great-grandfather|Grandfather|Uncle|Father|The old man's daughter is Bhavya's paternal grandmother, so the old man is Bhavya's great-grandfather.
Pointing to a man, Shweta said, "He is the only son of my mother-in-law's husband." How is the man related to Shweta?|Husband|Brother-in-law|Father-in-law|Son|Her mother-in-law's husband is her father-in-law; his only son is Shweta's husband.
Pointing to a girl, Parul said, "Her mother is the only sister of my husband." How is the girl related to Parul?|Niece|Daughter|Sister|Cousin|The girl is the daughter of Parul's sister-in-law, i.e. her niece.
Pointing to a man, Ankit said, "His mother is the wife of my father's only son." How is the man related to Ankit?|Son|Nephew|Brother|Grandson|Ankit is his father's only son, so the man's mother is Ankit's wife and the man is Ankit's son.
Pointing to a lady, Om said, "She is the only daughter of the father of my father's only brother." How is the lady related to Om?|Paternal aunt|Mother|Grandmother|Sister|The father of Om's uncle is Om's grandfather; his only daughter is Om's father's sister.
Pointing to a woman, Rajat said, "Her son is my son's only brother." How is the woman related to Rajat?|Wife|Sister|Mother|Sister-in-law|Rajat's son's only brother is Rajat's other son, so the woman is Rajat's wife.
Pointing to a girl, Ravi said, "She is the sister of the only son of my father's wife." Ravi's father has one wife, Ravi's mother. How is the girl related to Ravi?|Sister|Daughter|Niece|Cousin|The only son of Ravi's mother is Ravi himself, so the girl is Ravi's sister.
Pointing to a woman, Mukul said, "Her father is the brother of my mother." How is the woman related to Mukul?|Cousin|Sister|Aunt|Niece|Her father is Mukul's maternal uncle, so she is Mukul's cousin.
Pointing to a boy, Poonam said, "His father's only sister is my mother." How is the boy related to Poonam?|Cousin|Brother|Nephew|Uncle|The boy's father is Poonam's maternal uncle, so the boy is her cousin.
Pointing to a man, Garima said, "He is the father of my mother's brother's son." How is the man related to Garima?|Maternal uncle|Father|Grandfather|Cousin|The father of her mother's brother's son is her mother's brother himself — Garima's maternal uncle.
Pointing to a lady, Uday said, "Her daughter's father is my brother's father-in-law." How is the lady related to Uday?|Brother's mother-in-law|Mother|Aunt|Mother-in-law|The lady's husband is Uday's brother's father-in-law, so she is his brother's mother-in-law.
Pointing to an old man, Lina said, "His son's son is my father's only son." Lina is a girl. How is the old man related to Lina?|Grandfather|Father|Uncle|Great-grandfather|Lina's father's only son is her brother; the old man's grandson is her brother, so the old man is Lina's grandfather.
Pointing to a boy, Asha said, "He is the son of my mother's only daughter-in-law." How is the boy related to Asha?|Nephew|Son|Brother|Cousin|Her mother's only daughter-in-law is Asha's brother's wife; her son is Asha's nephew.
Pointing to a girl, Dhruv said, "She is the only daughter of my father's only daughter-in-law, and I have no brothers." How is the girl related to Dhruv?|Daughter|Niece|Sister|Granddaughter|With no brothers, the only daughter-in-law of Dhruv's father is Dhruv's wife, so the girl is his daughter.
Pointing to a woman, Sagar said, "Her mother's only son is my wife's father." How is the woman related to Sagar?|Wife's paternal aunt|Mother-in-law|Aunt|Sister-in-law|The woman's brother is Sagar's father-in-law, so she is the paternal aunt of Sagar's wife.
Pointing to a man, Kriti said, "He is the husband of the only daughter of my maternal grandmother." How is the man related to Kriti?|Father|Uncle|Grandfather|Brother|The only daughter of Kriti's maternal grandmother is Kriti's mother; her husband is Kriti's father.
Pointing to a woman, Sonal said, "Her husband is the only son of my mother." How is the woman related to Sonal?|Sister-in-law|Sister|Mother|Aunt|The only son of Sonal's mother is Sonal's brother; his wife is Sonal's sister-in-law.
Pointing to a man, Kabir said, "His only sister is my mother's mother." How is the man related to Kabir?|Grand-uncle|Uncle|Grandfather|Cousin|The man is the brother of Kabir's maternal grandmother, so he is Kabir's grand-uncle.
Pointing to a girl, Rehan said, "Her father's mother is the only sister of my father." How is the girl related to Rehan?|Cousin's daughter|Niece|Sister|Daughter|The girl's grandmother is Rehan's aunt, so the girl's father is Rehan's cousin and she is his cousin's daughter.
Pointing to an old lady, Tushar said, "She is the mother of my father's only sister." How is the lady related to Tushar?|Grandmother|Aunt|Mother|Great-grandmother|The mother of his father's sister is his father's mother — Tushar's grandmother.
Pointing to a boy, Mansi said, "He is the grandson of my mother's only son-in-law. I am my mother's only daughter." How is the boy related to Mansi?|Grandson|Son|Nephew|Grand-nephew|Her mother's only son-in-law is Mansi's husband, so his grandson is also Mansi's grandson.
Pointing to a woman, Aakash said, "Her son's sister is my daughter." How is the woman related to Aakash?|Wife|Sister|Mother|Daughter|The woman's daughter is Aakash's daughter, so the woman is Aakash's wife.
Pointing to a man, Chaya said, "His daughter is my son's only sister." How is the man related to Chaya?|Husband|Father|Brother|Son|Chaya's son's only sister is Chaya's daughter; her father is Chaya's husband.
Pointing to a girl, Pavan said, "She is the only daughter of my only sister." How is the girl related to Pavan?|Niece|Daughter|Cousin|Sister|The daughter of one's sister is one's niece.
Pointing to a man, Rupal said, "His father's wife's only daughter is me." How is the man related to Rupal?|Brother|Father|Husband|Cousin|The man's mother's only daughter is Rupal, so the man is Rupal's brother.
Pointing to a lady, Sohan said, "She is the sister of the wife of my father's only son." How is the lady related to Sohan?|Sister-in-law|Sister|Wife|Cousin|Sohan is his father's only son; the lady is his wife's sister — his sister-in-law.
Pointing to a boy, Ananya said, "His mother's mother is my mother, and I have no children." How is the boy related to Ananya?|Nephew|Son|Grandson|Brother|The boy's mother is a daughter of Ananya's mother but not Ananya (who has no children), so she is Ananya's sister; the boy is her nephew.
Pointing to a man, Kunal said, "He is the son-in-law of my father's only daughter." How is the man related to Kunal?|Niece's husband|Son-in-law|Brother-in-law|Nephew|Kunal's father's only daughter is Kunal's sister; her son-in-law is the husband of Kunal's niece.
Pointing to a woman, Veer said, "She is the daughter-in-law of my paternal grandfather's only son, and I have no brother." How is the woman related to Veer?|Wife|Mother|Sister|Sister-in-law|The only son of Veer's paternal grandfather is Veer's father; with no brothers, his daughter-in-law is Veer's wife.
Pointing to a man, Heena said, "His mother is the only daughter-in-law of my mother." How is the man related to Heena?|Nephew|Son|Brother|Cousin|The only daughter-in-law of Heena's mother is Heena's brother's wife; her son is Heena's nephew.
Pointing to a woman, Paras said, "She is the daughter of my mother's only sister." How is the woman related to Paras?|Cousin|Sister|Niece|Aunt|She is the daughter of Paras's maternal aunt, so she is his cousin.
Pointing to an old man, Zoya said, "His wife is the mother of my mother's only brother." How is the old man related to Zoya?|Maternal grandfather|Paternal grandfather|Uncle|Father|His wife is Zoya's maternal grandmother, so he is Zoya's maternal grandfather.
Pointing to a boy, Irfan said, "His mother's brother is the only son of my mother." How is the boy related to Irfan?|Nephew|Son|Brother|Cousin|The only son of Irfan's mother is Irfan; the boy's mother is Irfan's sister, so the boy is his nephew.
Pointing to a woman, Manav said, "Her husband's only brother is my father." How is the woman related to Manav?|Aunt|Mother|Grandmother|Sister|Her husband is Manav's father's brother (Manav's uncle), so she is Manav's aunt.
Pointing to a man, Bela said, "His only brother's wife is my daughter." How is the man related to Bela?|Daughter's brother-in-law|Son-in-law|Son|Nephew|The man's brother is Bela's son-in-law, so the man is her daughter's brother-in-law.
Pointing to a lady, Jay said, "Her only son's wife is my sister." How is the lady related to Jay?|Sister's mother-in-law|Mother|Aunt|Mother-in-law|Jay's sister is married to the lady's son, so the lady is his sister's mother-in-law.
Pointing to a man, Anita said, "He is the only brother of my son's wife." How is the man related to Anita?|Daughter-in-law's brother|Son-in-law|Nephew|Brother-in-law|Anita's son's wife is her daughter-in-law; the man is her brother.
Pointing to a woman, Ramesh said, "Her mother is the only daughter of my mother-in-law." How is the woman related to Ramesh?|Daughter|Wife|Sister-in-law|Niece|The only daughter of Ramesh's mother-in-law is Ramesh's wife; her daughter is Ramesh's daughter.
Pointing to an old man, Sheetal said, "He is the father of my father's father." How is the old man related to Sheetal?|Great-grandfather|Grandfather|Great-uncle|Father|The father of one's grandfather is one's great-grandfather.
Pointing to a girl, Mridul said, "Her father's father is my mother's husband, and I am my parents' only child." How is the girl related to Mridul?|Daughter|Niece|Sister|Granddaughter|The girl's grandfather is Mridul's father; as Mridul is the only child, the girl must be Mridul's daughter.
Pointing to a woman, Lavanya said, "Her son is the husband of my only daughter." How is the woman related to Lavanya?|Daughter's mother-in-law|Mother-in-law|Sister|Aunt|The woman's son is Lavanya's son-in-law, so she is Lavanya's daughter's mother-in-law.
Pointing to a man, Kartik said, "He is the father of the only sister of my father." How is the man related to Kartik?|Grandfather|Uncle|Great-grandfather|Father-in-law|The father of Kartik's father's sister is Kartik's father's father — his grandfather.
Pointing to a woman, Om said, "She is the wife of my mother's only brother." How is the woman related to Om?|Maternal uncle's wife|Paternal aunt|Mother|Sister-in-law|The wife of Om's maternal uncle is his mami, i.e. his maternal uncle's wife.
Pointing to a boy, Neelam said, "He is my father's only grandson, and I am my father's only child." How is the boy related to Neelam?|Son|Nephew|Brother|Grandson|As her father's only child, any grandson of his must be Neelam's son.
Pointing to a man, Vidya said, "His mother is my mother's mother." How is the man related to Vidya?|Maternal uncle|Father|Grandfather|Brother|The man is a son of Vidya's maternal grandmother, i.e. her mother's brother.
Pointing to a woman, Yusuf said, "She is the only daughter of my mother's father." How is the woman related to Yusuf?|Mother|Aunt|Grandmother|Sister|The only daughter of Yusuf's maternal grandfather is Yusuf's mother.
Pointing to a man, Hina said, "His father is my son's maternal grandfather." How is the man related to Hina?|Brother|Father|Uncle|Husband|Hina's son's maternal grandfather is Hina's father; the man is also his son, so he is Hina's brother.
Pointing to a woman, Aditya said, "Her father's only grandson is my son, and she has no brother." How is the woman related to Aditya?|Wife|Sister|Mother|Sister-in-law|With no brother, her father's grandson must be her own son; he is Aditya's son, so she is Aditya's wife.
Pointing to a lady, Farah said, "Her son is my father's only brother." How is the lady related to Farah?|Grandmother|Aunt|Mother|Great-grandmother|The lady's son is Farah's uncle, the brother of Farah's father, so she is Farah's (paternal) grandmother.
Pointing to a girl, Bharat said, "Her mother is my wife's only sister." How is the girl related to Bharat?|Niece|Daughter|Sister|Cousin|The girl is the daughter of Bharat's sister-in-law, so she is his niece.
Pointing to a man, Gunjan said, "He is the brother of my father's mother." How is the man related to Gunjan?|Grand-uncle|Uncle|Grandfather|Cousin|The brother of Gunjan's grandmother is his grand-uncle.
Pointing to a girl, Shekhar said, "She is the daughter of my wife's mother-in-law's only son." How is the girl related to Shekhar?|Daughter|Niece|Sister|Wife|His wife's mother-in-law is Shekhar's mother, whose only son is Shekhar, so the girl is his daughter.
Pointing to a woman, Laksh said, "Her mother-in-law is my paternal grandmother, and my father has no brothers." How is the woman related to Laksh?|Mother|Aunt|Sister|Grandmother|Her husband is a son of Laksh's paternal grandmother; the only such son is Laksh's father, so she is Laksh's mother.
Pointing to a man, Pallavi said, "His son is my husband's only nephew. My husband has only one sibling, a brother." How is the man related to Pallavi?|Brother-in-law|Husband|Father-in-law|Brother|The nephew's father must be her husband's only brother, i.e. Pallavi's brother-in-law.
Pointing to a woman, Ritesh said, "She is the wife of the only son of my father's father." How is the woman related to Ritesh?|Mother|Aunt|Grandmother|Sister|The only son of Ritesh's paternal grandfather is his father; his wife is Ritesh's mother.
`);

// A = assumptions, C = conclusions, K = courses of action | question | answer index | explanation
// Options: Only I / Only II / Both / Neither
export const statements = lines(`
A|Statement: "Wear a helmet while riding a two-wheeler," says a traffic police notice. Assumptions: I. Helmets reduce head injuries in accidents. II. All riders already wear helmets.|0|The notice assumes helmets help (I); if everyone already wore them the notice would be pointless, so II is not assumed.
A|Statement: The Army has invited applications from young graduates for the Short Service Commission. Assumptions: I. Suitable graduates who want to join are available. II. The Army already has more officers than it needs.|0|Inviting applications assumes eligible candidates will apply (I); a recruitment drive suggests a need for officers, not a surplus.
A|Statement: "Buy two, get one free," says a sign outside a shop. Assumptions: I. Free offers attract customers. II. The shop is closing down.|0|The offer is meant to attract buyers (I); nothing suggests the shop is closing.
A|Statement: The school has decided to hold classes on Saturdays to complete the syllabus. Assumptions: I. The syllabus cannot be completed in the regular schedule. II. Students and teachers will attend on Saturdays.|2|Extra classes assume the normal schedule is insufficient (I) and that people will actually attend (II).
A|Statement: "In case of fire, use the stairs; do not use the lift," reads a notice. Assumptions: I. Lifts may be unsafe during a fire. II. People can reach the stairs.|2|The advice only makes sense if lifts are risky (I) and the stairs are usable (II).
A|Statement: The government has launched a campaign to plant one crore trees this year. Assumptions: I. Planting trees is beneficial. II. Enough land and saplings are available.|2|A campaign assumes the goal is worthwhile (I) and achievable with available resources (II).
A|Statement: "Carry your identity card at all times inside the cantonment," says an order. Assumptions: I. Identity cards may be checked inside the cantonment. II. Some people do not have identity cards.|0|The order assumes checks may happen (I); it does not assume anyone lacks a card.
A|Statement: The company will give a bonus to employees who work overtime. Assumptions: I. A bonus will motivate employees to work overtime. II. Employees never work overtime.|0|Offering a bonus assumes it motivates (I); nothing implies nobody ever works overtime.
A|Statement: "Keep medicines out of the reach of children," is printed on the label. Assumptions: I. Children may harm themselves with medicines. II. Adults never misuse medicines.|0|The warning assumes children are at risk (I); it says nothing about adults.
A|Statement: Train tickets can now be booked online. Assumptions: I. Many passengers have access to the internet. II. Ticket counters will be shut down.|0|Online booking assumes internet access (I); it does not imply counters will close.
A|Statement: The principal asked all students to bring their parents to the annual day function. Assumptions: I. Parents will be interested in attending. II. The venue can accommodate the parents.|2|Inviting parents assumes they will come (I) and that there is room for them (II).
A|Statement: "Invest in gold for a secure future," says an advertisement. Assumptions: I. People want a secure future. II. The price of gold will never fall.|0|The advertisement appeals to a desire for security (I); it need not assume prices never fall.
A|Statement: The city council has decided to widen the main road. Assumptions: I. The main road is congested. II. Widening the road will ease traffic.|2|The decision assumes there is a problem (I) and that widening will help (II).
A|Statement: A candidate going to the SSB was advised, "Be yourself during the interview." Assumptions: I. Pretending may be detected in the interview. II. The candidate is naturally shy.|0|The advice assumes pretence can be spotted (I); nothing is said about shyness.
A|Statement: "Drink only boiled water during the monsoon," the health department advised. Assumptions: I. Water may be contaminated during the monsoon. II. Boiling makes water safer to drink.|2|The advice assumes contamination is possible (I) and that boiling helps (II).
A|Statement: The library will remain open till 10 pm during the exams. Assumptions: I. Students will use the library late in the evening. II. The library is normally open till 10 pm.|0|Extending hours assumes students will use them (I); it implies the library normally closes earlier, contradicting II.
A|Statement: "Switch off your mobile phones before the briefing," said the officer. Assumptions: I. Mobile phones may disturb the briefing. II. Everyone present has a mobile phone.|0|The instruction assumes phones can disturb (I); it does not require everyone to own one.
A|Statement: The bank has reduced its interest rate on home loans. Assumptions: I. More people may take home loans at a lower rate. II. The bank will close its other services.|0|Lower rates are meant to attract borrowers (I); nothing suggests closing other services.
A|Statement: "Apply before 30 June; late applications will not be accepted," says a notice. Assumptions: I. Some people may try to apply late. II. The office will shut down after 30 June.|0|The warning assumes late applications may come (I); nothing implies the office will close.
A|Statement: The coach made the team practise in the rain. Assumptions: I. Matches may have to be played in rainy conditions. II. The players dislike the rain.|0|Practising in rain assumes such conditions may occur in matches (I); the players' likes are irrelevant.
A|Statement: "Learn a new language in 30 days," claims an online course. Assumptions: I. People want to learn languages quickly. II. Every language has exactly 30 lessons.|0|The claim appeals to people wanting quick learning (I); II is absurd and not implied.
A|Statement: The government has made yoga compulsory in schools. Assumptions: I. Yoga is beneficial for students. II. Schools can arrange to teach yoga.|2|Making it compulsory assumes it is useful (I) and can be implemented (II).
A|Statement: A soldier on leave was told, "Report back to the unit within 48 hours." Assumptions: I. The soldier can reach the unit within 48 hours. II. The unit is located abroad.|0|An order assumes it can be obeyed (I); nothing indicates the unit is abroad.
A|Statement: "Use public transport and reduce pollution," says a poster. Assumptions: I. Public transport causes less pollution per person than private vehicles. II. People pay attention to posters.|2|The message assumes public transport is cleaner (I) and that posters influence people (II).
A|Statement: The municipality announced that the water supply will be cut for two days for repairs. Assumptions: I. People will store water in advance after the announcement. II. The repairs cannot be done without cutting the supply.|2|Announcing in advance assumes people will prepare (I); cutting supply assumes it is necessary (II).
A|Statement: "Silence, please — examination in progress," reads a board. Assumptions: I. Noise may disturb the candidates. II. The examination will last the whole day.|0|The board assumes noise disturbs candidates (I); nothing is implied about the duration.
A|Statement: A company has advertised for a sales manager with five years' experience. Assumptions: I. Experienced people are better suited to the job. II. People with such experience will apply.|2|Asking for experience assumes it matters (I), and advertising assumes such people will apply (II).
A|Statement: "Do not feed the animals," says a board in the zoo. Assumptions: I. Visitors might feed the animals. II. Wrong food may harm the animals.|2|The board assumes visitors might feed them (I) and that doing so may be harmful (II).
A|Statement: The hospital has installed solar panels on its roof. Assumptions: I. Solar power can meet part of its electricity needs. II. The hospital will never face a power cut again.|0|Installing panels assumes they will help (I); a guarantee against all power cuts is not implied.
A|Statement: The commanding officer ordered an extra hour of physical training every day. Assumptions: I. Extra training will improve fitness. II. The soldiers are completely unfit.|0|The order assumes more training helps (I); it does not imply the soldiers are completely unfit.
A|Statement: "Book early to avoid disappointment," says a travel agency. Assumptions: I. Seats may run out. II. Prices will certainly fall later.|0|The advice assumes limited availability (I); it would not be given if prices were sure to fall.
A|Statement: The state government has decided to give free bicycles to girl students. Assumptions: I. Bicycles will help girls reach school more easily. II. All girl students already own bicycles.|0|The scheme assumes bicycles will help (I); it would be pointless if all already had them.
A|Statement: "Keep left," says a road sign. Assumptions: I. Drivers understand road signs. II. Nobody ever drives on the right.|0|A sign assumes it will be understood (I); if nobody drove on the right, the sign would be unnecessary.
A|Statement: The college will hold a blood donation camp next week. Assumptions: I. Some people will volunteer to donate blood. II. Donated blood is needed by hospitals and patients.|2|A camp assumes donors will come (I) and that the blood is needed (II).
A|Statement: "Carry an umbrella tomorrow," said the weather report. Assumptions: I. It is likely to rain tomorrow. II. Everyone owns an umbrella.|0|The advice assumes rain is likely (I); it does not assume everyone owns an umbrella.
C|Statement: All cadets who passed the physical test were selected for training. Rahul was selected for training. Conclusions: I. Rahul passed the physical test. II. Rahul is a cadet.|3|The statement says passing leads to selection, not that only those who passed were selected; neither conclusion is certain.
C|Statement: The prices of vegetables have doubled after the floods. Conclusions: I. The floods affected the supply of vegetables. II. People will stop eating vegetables.|0|The price rise after floods points to reduced supply (I); people stopping altogether does not follow.
C|Statement: Only those who score above 70% can apply for the scholarship. Meena scored 68%. Conclusions: I. Meena cannot apply for the scholarship. II. Meena is a poor student.|0|68% is below the cut-off, so I follows; one score does not make her a poor student.
C|Statement: Every member of the unit has completed the course. Ravi is a member of the unit. Conclusions: I. Ravi has completed the course. II. Ravi is an officer.|0|Ravi is a member, so he has completed the course (I); nothing says he is an officer.
C|Statement: The match was cancelled because of heavy rain. Conclusions: I. It rained heavily. II. The match will never be played.|0|The reason given is heavy rain (I); a rescheduled match remains possible.
C|Statement: Smoking is injurious to health. Conclusions: I. Non-smokers are always healthy. II. Smoking should be avoided.|1|If smoking harms health, it should be avoided (II); non-smokers can still fall ill.
C|Statement: The new metro line has halved travel time between the two ends of the city. Conclusions: I. The metro is faster than the earlier ways of travelling that route. II. Everyone in the city now uses the metro.|0|Halving travel time means it is faster (I); universal use does not follow.
C|Statement: No one can enter the restricted area without a pass. Amit entered the restricted area. Conclusions: I. Amit had a pass. II. Amit is an officer.|0|Since entry needs a pass, Amit had one (I); his rank is not stated.
C|Statement: The number of candidates recommended by SSBs has increased this year. Conclusions: I. More candidates appeared this year. II. The standard of the SSB has dropped.|3|More recommendations could have many causes; neither conclusion is certain.
C|Statement: All the shops in the market are closed on Mondays. Today the shops in the market are closed. Conclusions: I. Today is Monday. II. Today is a public holiday.|3|Shops close on Mondays, but they may close on other days too; neither follows.
C|Statement: The river water is polluted by factory waste. Conclusions: I. Factories release waste into the river. II. Drinking the river water directly may be harmful.|2|The pollution comes from factory waste (I), and polluted water may be harmful to drink (II).
C|Statement: Raj is taller than Sunil, and Sunil is taller than Mohan. Conclusions: I. Raj is taller than Mohan. II. Mohan is the shortest of the three.|2|Raj > Sunil > Mohan, so both follow.
C|Statement: Some of the new recruits cannot swim. Conclusions: I. Some recruits may need swimming training. II. No recruit can swim.|0|Those who cannot swim may need training (I); 'some' does not mean 'all'.
C|Statement: The last date for applications has been extended by a week. Conclusions: I. Many candidates had failed to apply in time. II. Applications will be accepted for one more week.|1|The extension directly means another week to apply (II); the reason for it is not stated.
C|Statement: The office is open from 9 am to 5 pm on all working days. Conclusions: I. The office is open at 11 am on working days. II. The office is open at 8 am on working days.|0|11 am lies within 9–5, so I follows; 8 am is before opening time.
C|Statement: A vaccine for the disease has been developed and approved. Conclusions: I. The disease can now be prevented to some extent. II. The disease will disappear within a month.|0|A vaccine enables prevention (I); disappearance within a month does not follow.
C|Statement: Every candidate must clear the medical examination to join the academy. Priya has joined the academy. Conclusions: I. Priya cleared the medical examination. II. Priya topped the written exam.|0|Joining required clearing the medical (I); her written-exam rank is not given.
C|Statement: The temperature in the desert falls sharply at night. Conclusions: I. Desert nights are colder than desert days. II. Desert days are cold.|0|A sharp fall at night makes nights colder (I); nothing says days are cold.
C|Statement: Books are the best friends of man. Conclusions: I. Books are valuable to man. II. Man has no other friends.|0|Calling books the best friends shows their value (I); it doesn't mean there are no other friends.
C|Statement: Anil scored the highest marks in the class. Conclusions: I. No one in the class scored more than Anil. II. Anil scored full marks.|0|Highest means nobody scored more (I); it need not be full marks.
C|Statement: Two-thirds of the seats in the train are reserved. Conclusions: I. One-third of the seats are unreserved. II. Reserved seats cost more.|0|The remaining third is unreserved (I); nothing is said about fares.
C|Statement: All the members of the club are above 18 years of age. Karan is 16 years old. Conclusions: I. Karan is not a member of the club. II. Karan will become a member in two years.|0|At 16 Karan cannot be a member (I); becoming one later is not certain.
C|Statement: The patrol left the base at 0600 hours and returned at 1400 hours. Conclusions: I. The patrol was away from the base for eight hours. II. The patrol completed its task.|0|0600 to 1400 is eight hours (I); success of the task is not stated.
C|Statement: This year's monsoon rainfall has been 30% below normal. Conclusions: I. Some reservoirs may hold less water than usual. II. No crops at all will grow this year.|0|Less rain may mean lower reservoirs (I); a total crop failure does not follow.
C|Statement: Neeraj won the gold medal in the javelin throw at the championship. Conclusions: I. Neeraj threw farther than every other competitor there. II. Neeraj will win every future championship.|0|Winning gold means the best throw (I); the future cannot be concluded.
C|Statement: Only 12 of the 40 students of the class went on the trek. Conclusions: I. 28 students of the class did not go on the trek. II. The trek was cancelled.|0|40 − 12 = 28 did not go (I); the trek took place, so II is false.
C|Statement: The cost of fuel has gone up, and airlines have raised their fares. Conclusions: I. Air travel has become costlier. II. Fewer people will travel by train.|0|Higher fares make flying costlier (I); nothing follows about train travel.
C|Statement: All officers attending the conference must reach by 9 am. Major Singh is attending the conference. Conclusions: I. Major Singh must reach by 9 am. II. Major Singh is the chief guest.|0|The rule applies to him (I); nothing says he is the chief guest.
C|Statement: The bridge can carry a maximum load of 20 tonnes. Conclusions: I. A 25-tonne truck should not cross the bridge. II. A 15-tonne truck is within the bridge's load limit.|2|25 t exceeds the limit (I) and 15 t is within it (II).
C|Statement: Anyone who does not follow the rules will be penalised. Vijay was not penalised. Conclusions: I. Vijay followed the rules. II. Vijay is a new member.|0|If breaking rules always leads to a penalty, no penalty means Vijay followed them (I); II is unrelated.
C|Statement: The school bus leaves the stop at 7 am sharp every day. Rohan reached the stop at 7:10 am today. Conclusions: I. Rohan missed the bus today. II. Rohan was absent from school today.|0|The bus had already left (I); he may have reached school some other way.
C|Statement: Tea is grown on hill slopes where rainfall is heavy but water does not collect. Conclusions: I. Tea plants need plenty of rain. II. Standing water is bad for tea plants.|2|Heavy rainfall is needed (I), and slopes are chosen so water does not stand (II).
C|Statement: The book fair will be held from 5 March to 12 March, both days included. Conclusions: I. The book fair lasts eight days. II. The book fair will be held in the city centre.|0|5 to 12 March inclusive is 8 days (I); the venue is not stated.
C|Statement: Although the team lost the final, it played very well throughout the tournament. Conclusions: I. The team reached the final. II. The team played badly in the final.|0|It lost the final, so it reached it (I); 'played well throughout' contradicts II.
C|Statement: Each of the five units in the brigade has its own medical officer. Conclusions: I. The brigade has at least five medical officers. II. Every medical officer is a surgeon.|0|Five units each with its own officer means at least five (I); their speciality is not given.
K|Statement: Several cases of dengue have been reported in the locality. Courses of action: I. The municipality should clear stagnant water and spray insecticide. II. All residents should be asked to leave the locality.|0|Removing mosquito breeding sites is practical (I); evacuating everyone is extreme.
K|Statement: Many students are unable to follow lessons taught in English. Courses of action: I. Remedial English classes should be arranged for them. II. These students should be expelled.|0|Remedial help addresses the problem (I); expulsion does not.
K|Statement: Many road accidents happen at a particular crossing. Courses of action: I. Traffic lights and speed breakers should be installed there. II. Traffic police should be posted at the crossing during peak hours.|2|Both measures directly reduce accidents at the crossing.
K|Statement: Many trees in the city have been cut illegally. Courses of action: I. Those responsible should be identified and punished. II. New trees should be planted to replace them.|2|Punishing offenders deters (I) and replanting repairs the damage (II).
K|Statement: A cadet has been caught cheating in an examination. Courses of action: I. He should be dealt with according to the academy's rules. II. The examination should be cancelled for all cadets.|0|Action against the individual is fair (I); punishing all cadets is not.
K|Statement: The river level is rising rapidly because of heavy rain upstream. Courses of action: I. People living near the banks should be moved to safer places. II. The rain should be stopped.|0|Evacuation is practical (I); stopping rain is impossible.
K|Statement: The number of students in the college has doubled, but the library still has the same number of books. Courses of action: I. More books should be bought for the library. II. Half the students should be sent away.|0|Buying books meets the need (I); sending students away is not a sensible solution.
K|Statement: A fire broke out in a factory because of faulty wiring. Courses of action: I. The wiring in all factories of the area should be inspected. II. All factories should be shut down permanently.|0|Inspections prevent repeats (I); permanent closure is extreme.
K|Statement: Many villagers fall ill because they drink water from a polluted pond. Courses of action: I. A safe drinking-water supply should be arranged. II. Villagers should be told to boil water before drinking it.|2|A safe supply is the long-term fix (I) and boiling water is an immediate precaution (II).
K|Statement: Many candidates who clear the written exam fail the interview because of poor communication skills. Courses of action: I. Candidates should practise speaking and group discussions. II. The interview stage should be removed.|0|Practice fixes the weakness (I); removing the interview avoids rather than solves it.
K|Statement: Drivers using mobile phones have caused many accidents. Courses of action: I. Using a hand-held phone while driving should be a punishable offence. II. Mobile phones should be banned in the country.|0|Penalising phone use while driving targets the cause (I); a national ban is extreme.
K|Statement: Onion prices have risen sharply because of a poor harvest. Courses of action: I. The government should release onions from its buffer stock. II. Onion farmers should be punished.|0|Releasing stock eases supply (I); the harvest failure is not the farmers' fault.
K|Statement: Some shopkeepers are selling adulterated food. Courses of action: I. Food inspectors should carry out surprise checks. II. People should be taught how to spot adulteration.|2|Enforcement (I) and public awareness (II) both tackle the problem.
K|Statement: A bridge on the highway has developed cracks. Courses of action: I. Heavy vehicles should be stopped from using it until it is repaired. II. The highway should be closed permanently.|0|Restricting heavy traffic until repairs is sensible (I); permanent closure is not.
K|Statement: Children in a village school are often absent during the harvest season. Courses of action: I. The school calendar could give a break during harvest. II. Parents should be counselled about the importance of regular schooling.|2|Adjusting the calendar (I) and counselling parents (II) are both practical.
K|Statement: A soldier on sentry duty was found asleep. Courses of action: I. Disciplinary action should be taken against him as per the rules. II. Sentry duty should be abolished.|0|Disciplining the individual is appropriate (I); sentry duty is essential and cannot be abolished.
K|Statement: The city's hospitals are overcrowded. Courses of action: I. New hospitals and health centres should be opened. II. Patients should be refused treatment.|0|Adding capacity solves the problem (I); refusing treatment is wrong.
K|Statement: A school's board-exam results have been poor for three years. Courses of action: I. The reasons should be studied and teaching improved. II. The school should be closed at once.|0|Finding and fixing causes is sensible (I); immediate closure is extreme.
K|Statement: Plastic bags are choking the city's drains. Courses of action: I. The use of plastic bags should be restricted. II. The drains should be cleaned regularly.|2|Restricting plastic stops the cause (I) and cleaning clears the blockage (II).
K|Statement: A tourist has lost his passport in the city. Courses of action: I. He should report the loss to the police and his embassy. II. He should leave the country immediately.|0|Reporting the loss is the right step (I); he cannot leave without travel documents anyway.
K|Statement: Hailstorms have destroyed standing crops in several districts. Courses of action: I. Affected farmers should be given relief and their crop-insurance claims settled quickly. II. Farmers should stop growing crops.|0|Relief helps the farmers (I); giving up farming is not a solution.
K|Statement: A narrow bridge is getting dangerously crowded during a festival. Courses of action: I. Police should regulate the flow of people onto the bridge. II. The festival should be banned forever.|0|Crowd control addresses the danger (I); a permanent ban is extreme.
K|Statement: Several students fainted during the morning assembly on a very hot day. Courses of action: I. On hot days the assembly should be held in the shade or shortened. II. The students who fainted should be given water and first aid.|2|Changing the assembly prevents a repeat (I) and first aid helps those affected (II).
K|Statement: A new recruit is finding the physical training very hard. Courses of action: I. He should be given extra coaching and built up gradually. II. He should be sent home at once.|0|Extra coaching helps him improve (I); sending him home immediately is premature.
K|Statement: Water is being wasted because of leaking pipes in the colony. Courses of action: I. The leaking pipes should be repaired. II. The water supply to the colony should be stopped permanently.|0|Repairing leaks solves the waste (I); cutting supply permanently is absurd.
K|Statement: Unknown persons have been seen near the ammunition depot at night. Courses of action: I. Security around the depot should be tightened. II. The matter should be reported to higher authorities.|2|Both tighter security (I) and reporting (II) are appropriate.
K|Statement: A website crashed because too many users tried to register at once. Courses of action: I. The website's servers should be upgraded. II. Registrations could be spread over several days.|2|More capacity (I) and staggering the load (II) both prevent crashes.
K|Statement: Many pedestrians are being hit while crossing a busy road near a school. Courses of action: I. A foot overbridge or signal-controlled zebra crossing should be built. II. The school should be moved to another city.|0|A safe crossing solves the problem (I); moving the school is impractical.
K|Statement: A team keeps losing matches in the last ten minutes because of fatigue. Courses of action: I. The players' fitness training should be improved. II. The team should stop playing matches.|0|Better fitness addresses fatigue (I); quitting is not a solution.
K|Statement: A village is cut off every monsoon because its only road floods. Courses of action: I. The road should be raised or an alternative route built. II. Villagers should be warned early and supplies stocked before the monsoon.|2|A better road is the permanent fix (I) and early preparation reduces hardship meanwhile (II).
`);
