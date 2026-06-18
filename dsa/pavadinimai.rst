.. default-role:: literal

.. _kodiniai-pavadinimai:

Kodiniai pavadinimai
####################

Kadangi :term:`DSA` lentelė skirta naudoti tiek žmonėms tiek automatizuotoms
priemonėms, tam tikros lentelės dalys privalo naudoti sutartinius kodinius
pavadinimus. Kodiniams pavadinimams keliami griežtesni reikalavimai, kadangi
šiuos pavadinimus interpretuos automatizuotos priemonės.

Visi :term:`DSA` lentelės stulpelių pavadinimai turi būti užrašyti tiksliai
taip, kaip nurodyta, kad kompiuterio programos galėtų juos atpažinti.

Kodiniai pavadinimai rašomi naudojant tik lotyniškas raidas. Lietuviškų
raidžių naudoti negalima, todėl geriausia pavadinimus užrašyti anglų kalba,
arba pakeičiant lietuviškas raides į lotyniškos raidės analogą.

Deja, vis dar pasitaiko vietų, kuriose palaikoma tik lotyniška abėcėlė, todėl
ir keliamas toks reikalavimas, siekiant užtikrinti maksimalų suderinamumą
tarp skirtingų sistemų.

Pavadinimai turėtu būti rašomi laikantis tokio stiliaus:


Duomenų rinkiniai
************

Duomenų rinkinio kodinis pavadinimas DSA užrašomas pateikiant pilną jo URI.

Jis formuojamas pagal šias taisykles:

```
datasets/forma/org/is/duomenu_rinkinys
```

- `datasets` - tai statinė URI dalis. Visi Lietuvos duomenu rinkiniai yra identifikuojami kaip `datasets`
- `forma` - tai dinaminė dalis, kuri priklauso nuo instuticijos tipo:
  - nurodoma `gov` kai tai valstybinė institucija
  - nurodoma `com` kai tai ne valstybinė institucija, organizacija
- `org` - tai kodinis institucijos/organizacijos pavadinimas. Pateikiama vertė pagal institucijos/organizacijos registracijos duomenis duomenų kataloge.
- `is` - tai kodinis informacinės sistemos pavadinimas. Pateikiama vertė pagal informacinės sistemos registracijos duomenis duomenų kataloge.
- `duomenu_rinkinys` - tai kodinis duomenų rinkinio pavadinimas. Pateikiama vertė pagal duomenų rinkinio registracijos duomenis duomenų kataloge.

Jei DSA ruošiamas prieš registruojant metaduomenis duomenų kataloge, kodinis pavadinimas turi būti pateikiamas mažosiomis raidėmis, duomenų rinkinio pavadinimui
 stengiantis naudoti vieno žodžio trumpus pavadinimus arba žodžio trumpinius, atskirus žodžius atskiriant `_` ženklu.

Referuojant į išorinius modelius pilnas kodinis duomenų rinkinio pavadinimas pateikiamas prie
kiekvieno modelio pavadinimo, todėl reikia stengtis duomenų rinkinių pavadinimus išlaikyti kiek įmanoma trumpesnius.

Pavyzdys:

```
datasets/gov/rc/ar/text_with_coordinates
```



Modeliai
********

Pavyzdys: `UpperCamelCase`

Kiekvieno modelio pavadinimo pirma raidė didžioji, kitos mažosios.
Pavadinimo žodžiai atskiriami juos užrašant iš didžiosios raidės. Tarp
žodžių neturi būti nei tarpų, nei kitų skyrybos ženklų.

Modelio pavadinimas įprastai užrašomas veinaskaitos forma.

Modelio kodinius pavadinimus užrašome taip, kaip pavadintume vieną objektą,
kuriam yra taikomas duomenų modelis. Tarkime jei aprašome pastatus, tai vienas
pastatas būtų vadinamas vienaskaitos forma `Pastatas`. Tačiau, jei vienas
objektas yra patatų grupė, kuriuos jungia bendra paskirtis, tada galima
pavadinti `Pastatai` arba `PastatuKompleksas`.

Modelio pavadinimas turi atspindėti `duomenų subjekto`__ tipą.
Duomenų subjektas yra dalykas turintis pavadinimą ar unikalų identifikatorių.
Duomenų subjekto tipas yra subjektų grupė priklausančių tai pačiai kategorijai
ar klasei__.

Pateikiami anglų kalba.

__ https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Entity%E2%80%93relationship_model
__ https://en.wikipedia.org/wiki/Class_(knowledge_representation)


Nekartojame vardų erdvės
========================

Modelio pavadinime nekartojamos vardų erdvės, kurioje yra modelis.

Pavyzdys, kaip nereikėtų daryti: `example/planets/EarthPlanet`. Šioje
vietoje nereikia kartoti `Planet`, kadangi tai atsispindi vardų erdvės
pavadinime `planets`.


Duomenų laukai
**************

Pavyzdys: `snake_case`

Visi duomenų lauko žodžiai rašomi mažosiomis raidėmis, atskiriami pabraukimo
ženklu `_`.

Duomenų lauko pavadinimas turi prasidėti mažąja raide.

Pateikiami anglų kalba.


Ryšiai tarp modelių
===================

:data:`ref` tipo laukai rašomi be `id` ar `_id` galūnės, kadangi jis yra
perteklinis.

:data:`ref` tipo laukai atspindi ne konkretų identifikatorių, o visą
objektą. Konkretus identifikatorius yra rezervuotas pavadinimas ir
duomenų struktūros apraše nenurodomas.

Pavyzdžiui vietoje `country_id`, kurio tipas yra `ref`, reikėŧų rašyti
`country`.

== ========== ===== ========
m  property   type  ref     
== ========== ===== ========
Country                     
------------- ----- --------
\  name\@lt   text          
City                        
------------- ----- --------
\  name\@lt   text              
\  country    ref   Country 
== ========== ===== ========

Tais atvejais, kai duomenys yra denormalizuoti, duomenų lauko
pavadinimas užrašomas su tašku, nurodant duomenų lauką iš siejamo
modelio. Plačiau apie tai :ref:`ref-denorm`.


Nekartojame modelio pavadinimo
==============================

Visi modelio duomenų laukai yra konkretaus modelio laukai, todėl
nereikia kartoti duomenų laukuose modelio pavadinimo, pavyzdžiui vietoje
tokių pavadinimų:

== ==================
m  property          
== ==================
City                 
---------------------
\  city_id           
\  city_name
== ==================

Reikėtų rašyti taip:

== ==================
m  property          
== ==================
City                 
---------------------
\  id           
\  name
== ==================

Jei kiti modeliai siejami su `City`, tada nurodant tarkim `city_name` iš
kito modelio, reikėtų rašyti `city.city_name`. Todėl `city.name` yra
aiškesnis pavadinimas, kuriame nesikartoja modelio pavadinimas.


Nekartojame duomenų tipo pavadinimo
===================================

Duomenų lauko pavadinime nereikia kartoti duomenų tipo pavadinimo.

Pavyzdžiui taip nereikėtų daryti:

== ================= ===========
m  property          type       
== ================= ===========
City                            
-------------------- -----------
\  founded_date      date
== ================= ===========

Reikėtų rašyti taip:

== ================= ===========
m  property          type       
== ================= ===========
City                            
-------------------- -----------
\  founded           date
== ================= ===========

Nėra prasmės kartoti duomenų tipo, lauko pavadinime.
