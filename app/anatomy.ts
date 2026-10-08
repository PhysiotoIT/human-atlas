export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Szkielet',color:'#e2d9ba',description:'Kości tworzą rusztowanie ciała, chronią narządy i są miejscem przyczepu mięśni. Ich wnętrze magazynuje minerały i wytwarza komórki krwi.'},
 {id:'muscular',name:'Mięśnie',color:'#a85b50',description:'Mięśnie szkieletowe wytwarzają ruch, pociągając za swoje przyczepy. Razem ze ścięgnami poruszają stawami, stabilizują postawę i wytwarzają ciepło.'},
 {id:'cardiac',name:'Serce',color:'#b96760',description:'Serce to mięśniowa pompa o czterech jamach. Zastawki kierują krew do przodu przez krążenie płucne i krążenie duże.'},
 {id:'sensory',name:'Narządy zmysłów',color:'#b0c8ce',description:'Struktury zmysłów wzroku, słuchu i równowagi. Ich wyspecjalizowane tkanki odbierają bodźce i przekazują informacje układowi nerwowemu.'},
 {id:'arterial',name:'Tętnice',color:'#c05245',description:'Serce tłoczy krew do naczyń. Tętnice prowadzą krew od serca do tkanek, a w krążeniu płucnym — do płuc.'},
 {id:'venous',name:'Żyły',color:'#527c9f',description:'Żyły prowadzą krew z powrotem do serca. Sieć powierzchowna i głęboka zbiera krew z tkanek; żyły płucne przynoszą utlenowaną krew z płuc.'},
 {id:'nervous',name:'Układ nerwowy',color:'#d8b565',description:'Mózgowie, rdzeń kręgowy i nerwy obwodowe przewodzą i przetwarzają sygnały. Odpowiadają za czucie, ruch, koordynację i automatyczną regulację funkcji ciała.'},
 {id:'respiratory',name:'Układ oddechowy',color:'#b98991',description:'Drogi oddechowe prowadzą powietrze do płuc, gdzie tlen i dwutlenek węgla przechodzą między powietrzem a krwią. Oddychanie zależy od zmian ciśnienia wytwarzanych przez mięśnie oddechowe.'},
 {id:'digestive',name:'Układ pokarmowy',color:'#b8916b',description:'Przewód pokarmowy rozkłada pokarm, wchłania składniki odżywcze i wodę oraz przesuwa resztki dalej. Narządy dodatkowe dostarczają żółć i enzymy trawienne.'},
 {id:'urinary',name:'Układ moczowy',color:'#b47961',description:'Nerki filtrują krew i regulują gospodarkę wodną, elektrolitową i kwasowo-zasadową. Mocz płynie moczowodami do pęcherza i opuszcza go cewką moczową.'},
 {id:'lymphatic',name:'Układ chłonny',color:'#879f7c',description:'Naczynia chłonne zwracają nadmiar płynu tkankowego do krwiobiegu. Węzły chłonne i inne narządy limfatyczne wspierają odporność.'},
 {id:'endocrine',name:'Układ dokrewny',color:'#c5a09a',description:'Gruczoły dokrewne uwalniają hormony do krwi, koordynując m.in. metabolizm, wzrost, reakcję na stres i rozród.'},
 {id:'reproductive',name:'Układ rozrodczy',color:'#bda098',description:'Przedstawione męskie narządy rozrodcze odpowiadają za wytwarzanie, dojrzewanie i transport plemników oraz wytwarzanie hormonów płciowych.'},
 {id:'integumentary',name:'Powierzchnia ciała',color:'#ba9b7d',description:'Powierzchnia ciała jest zewnętrznym punktem odniesienia. Powłoka wspólna tworzy barierę ochronną i bierze udział w czuciu oraz termoregulacji.'},
 {id:'connective',name:'Tkanka łączna',color:'#aec3bb',description:'Chrząstki, więzadła, ścięgna i inne tkanki łączne podpierają, łączą i oddzielają struktury. Stabilizują stawy i rozkładają obciążenia mechaniczne.'},
];
export interface Part {id:string;name:string;pl?:string;mk?:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;pl?:string;mk?:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'Mięśniowa pompa w klatce piersiowej. Prawa połowa tłoczy krew do płuc, lewa — do krążenia dużego.',
 'liver':'Duży narząd pod prawą kopułą przepony. Przetwarza wchłonięte składniki odżywcze, wytwarza żółć i wiele białek krwi.',
 'brain':'Centralny narząd układu nerwowego. Jego połączone obszary odpowiadają za odbiór bodźców, ruch, pamięć, mowę i regulację funkcji ciała.',
 'stomach':'Mięśniowy zbiornik między przełykiem a jelitem cienkim. Magazynuje pokarm i miesza go z kwasem i enzymami, zanim przekaże go do dwunastnicy.',
 'spleen':'Narząd limfatyczny w lewym górnym kwadrancie brzucha. Filtruje krew, usuwa stare krwinki i uczestniczy w odpowiedzi odpornościowej.',
 'pancreas':'Narząd jamy brzusznej o funkcji trawiennej i hormonalnej. Dostarcza enzymy do jelita cienkiego i wydziela m.in. insulinę i glukagon.',
 'urinary bladder':'Mięśniowy zbiornik w miednicy, który gromadzi mocz spływający z nerek moczowodami.',
 'trachea':'Główna droga oddechowa łącząca krtań z oskrzelami. Chrzęstne pierścienie utrzymują ją otwartą podczas oddychania.',
 'diaphragm':'Główny mięsień wdechowy, oddzielający klatkę piersiową od jamy brzusznej. Skurcz przepony zwiększa objętość klatki i zasysa powietrze do płuc; współpracuje z mięśniami brzucha i dna miednicy w stabilizacji tułowia.',
 'calcaneal tendon':'Najgrubsze i najsilniejsze ścięgno ciała: łączy mięśnie brzuchaty łydki i płaszczkowaty z guzem kości piętowej. Przenosi duże siły przy chodzie, bieganiu i skokach — dlatego tendinopatia Achillesa jest częsta u biegaczy, a podstawą jej leczenia jest stopniowane obciążanie.',
 'patella':'Kość trzeszczkowa w ścięgnie mięśnia czworogłowego uda. Ślizga się w bruździe kości udowej i zwiększa ramię dźwigni prostowników kolana. Staw rzepkowo-udowy bywa źródłem bólu przodu kolana, np. przy schodach i przysiadzie.',
 'iliotibial tract':'Pogrubiałe pasmo powięzi szerokiej uda, biegnące od grzebienia biodrowego (napinacz powięzi szerokiej, pośladkowy wielki) do kłykcia bocznego kości piszczelowej. Ból po jego bocznej stronie przy kolanie to częsty problem biegaczy (ITBS).',
 'gluteus medius':'Mięsień na bocznej powierzchni talerza biodrowego, przyczepiony do krętarza większego kości udowej. Odwodzi udo i stabilizuje miednicę w staniu na jednej nodze. Jego ścięgno jest najczęstszym źródłem bólu bocznej strony biodra (GTPS).',
 'supraspinatus':'Mięsień stożka rotatorów leżący w dole nadgrzebieniowym łopatki. Inicjuje odwodzenie ramienia i centruje głowę kości ramiennej w panewce. Jego ścięgno przebiega pod wyrostkiem barkowym i jest najczęściej uszkadzanym ścięgnem stożka.',
 'infraspinatus':'Mięsień stożka rotatorów w dole podgrzebieniowym łopatki. Główny rotator zewnętrzny ramienia i stabilizator stawu ramiennego.',
 'teres minor':'Mały mięsień stożka rotatorów przy bocznym brzegu łopatki; wspólnie z podgrzebieniowym obraca ramię na zewnątrz.',
 'subscapularis':'Największy mięsień stożka rotatorów, na przedniej powierzchni łopatki. Rotuje ramię do wewnątrz i stabilizuje staw ramienny od przodu.',
 'intervertebral disk of lumbar vertebra':'Krążki międzykręgowe odcinka lędźwiowego amortyzują i rozkładają obciążenia między trzonami kręgów. Zmiany w krążkach są częste także u osób bez bólu; przy rwie kulszowej większość objawów łagodnieje bez operacji.',
 'piriformis':'Mięsień biegnący od przedniej powierzchni kości krzyżowej do krętarza większego. Rotuje udo na zewnątrz. Nerw kulszowy zwykle przechodzi tuż pod nim — stąd pojęcie zespołu mięśnia gruszkowatego.',
 'semitendinosus':'Jeden z mięśni kulszowo-goleniowych (tylna grupa uda). Zgina kolano i prostuje biodro; jego ścięgno tworzy gęsią stopkę i bywa pobierane do rekonstrukcji ACL.',
 'soleus':'Głęboki mięsień łydki pod brzuchatym; razem z nim tworzy mięsień trójgłowy łydki i ścięgno Achillesa. Pracuje szczególnie przy zgiętym kolanie — w bieganiu przenosi bardzo duże siły.',
 'anterior cruciate ligament':'Więzadło wewnątrz stawu kolanowego, od kości udowej do piszczeli. Hamuje przesuwanie się piszczeli do przodu i nadmierną rotację; zrywa się najczęściej przy nagłej zmianie kierunku lub lądowaniu.',
 'posterior cruciate ligament':'Grubsze z więzadeł krzyżowych; hamuje przesuwanie się piszczeli do tyłu względem kości udowej.',
 'medial meniscus':'Chrząstka w kształcie litery C między kością udową a piszczelą po stronie przyśrodkowej. Rozkłada obciążenia i stabilizuje kolano; jest mniej ruchoma niż boczna i częściej uszkadzana.',
 'lateral meniscus':'Chrząstka w kształcie niemal zamkniętego pierścienia po bocznej stronie kolana; amortyzuje i stabilizuje staw.',
 'tibial collateral ligament':'Więzadło poboczne przyśrodkowe (MCL) — chroni kolano przed uciekaniem do środka (koślawieniem). Większość uszkodzeń leczy się bez operacji.',
 'fibular collateral ligament':'Więzadło poboczne boczne (LCL) — od kości udowej do głowy strzałki; chroni kolano przed szpotawieniem.',
 'anterior talofibular ligament':'Najczęściej uszkadzane więzadło przy skręceniu kostki do środka; łączy kostkę boczną z kością skokową.',
 'plantar aponeurosis':'Gruba warstwa tkanki łącznej od guza piętowego do palców. Napina sklepienie podłużne stopy podczas chodu i odbicia.',
 'glenoid labrum':'Pierścień włóknisto-chrzęstny na brzegu panewki łopatki; pogłębia ją i stabilizuje bark. Bywa uszkadzany przy zwichnięciu.',
 'acetabular labrum':'Obrąbek panewki stawu biodrowego — pogłębia panewkę i uszczelnia staw.',
 'levator scapulae':'Mięsień od wyrostków poprzecznych górnych kręgów szyjnych do kąta górnego łopatki. Unosi łopatkę i bierze udział w ruchach szyi; często odczuwany jako „sztywny kark”.',
};
export function explanation(name:string,system:SystemId){return EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}

/** Nazwa po polsku (pole pl dopisywane przez atlas_sync.py na marcinchlosta.pl), z rezerwą na nazwę oryginalną. */
export const plName=(x:{name:string;pl?:string}|null|undefined)=>x?(x.pl??x.name):'';
/** Przyczepy, funkcja i unerwienie mięśnia (models/miesnie.json z atlas_sync.py; klucz mk w części/pojęciu). */
export interface MuscleFacts {pl:string;poczatek?:string;koniec?:string;funkcja?:string;unerwienie?:string}
