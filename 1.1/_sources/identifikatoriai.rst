.. default-role:: literal

.. _ryšiai:

Asociacija
##########

Pateikiant metaduomenis apie ryšius tarp modelių, duomenų :ref:`brandos lygis
<level>` pakeliamas iki ketvirto lygio.

Ryšiai tarp modelių aprašomi tais atvejais, kai vienoje duomenų lentelėje
naudojami identifikatoriai iš kitos lentelės.

.. _composition:

Kompozicija
===========

Kompozicija arba duomenų normalizavimas yra duomenų modeliavimo principas, kai
atskiros duomenų klasės yra pateikiamos kaip atskiri duomenų modeliai, kurie
gali būti jungiami tarpusavyje, taikant įvairius :ref:`duomenų jungimo būdus
<ref-types>`. 

Pavyzdžiui turint tokią koncepcinio modelio klasių diagramą:

.. mermaid::

   classDiagram
     direction LR

     class Country {
       + code: integer [1..1]
       + name@en: string [1..1]
     }

     class City {
       + name@en: string [1..1]
     }

     City  --> "[1..*]" Country : country

Duomenų modelis, taikant kompoziciją atrodytų taip:

.. _norm-dsa-example-1:
.. table:: Kompozicijos pavyzdys

    ======== ====== ================== ========= ======== ======
    dataset  model  property           type      ref      level 
    ======== ====== ================== ========= ======== ======
    datasets/gov/rc/ar/ws                                       
    ---------------------------------- --------- -------- ------
    \        Country                             code     4     
    -------- ------------------------- --------- -------- ------
    \               code               string             4     
    \               name\@en           string             4     
    \        City                                         3     
    -------- ------------------------- --------- -------- ------
    \               name\@en           string             4     
    \               country            ref       Country  4     
    ======== ====== ================== ========= ======== ======

Taikant kompozicijos principą, kiekvienai klasei kuriamas atskiras
nepriklausomas duomenų modelis, o atskiri modeliai jungiami tarpusavyje
ryšiais.


.. _ref-denorm:

Jungtinis modelis
=================

Jungtinis modelis yra toks duomenų modelis, kuriame apjungiamos savybės iš
daugiau nei vienos koncepcinio modelio klasės. Jungtinis modelis yra priešingas
dalykas :ref:`kompozicijai <composition>`, kur kompozicija išskaido klases į
atskirus modelius, jungtinis modelis atvirkščiai apjungia klases į vieną
modelį.

Jungtinis modelis dar yra vadinamas agregatu arba denormalizuotu duomenų
modeliu.

Jungtinis modelis turi vieną šakninį modelį (angl. *aggregate root*), prie
kurio prijungiami kiti modeliai naudojant vieną iš :ref:`duomenų jungimo būdų
<ref-types>`.

Žiamiau pateikiamas jungtinio modelio pavyzdys.

.. _denorm-dsa-example-1:
.. table:: Jungtinio modelio pavyzdys

    ======== ====== ================== ========= ======= =====
    dataset  model  property           type      ref     level
    ======== ====== ================== ========= ======= =====
    datasets/gov/rc/ar/ws    
    ---------------------------------- --------- ------- -----
    \        Country                             code    4
    -------- ------------------------- --------- ------- -----
    \               code               string            4
    \               name\@en           string            4
    \        City                                        3
    -------- ------------------------- --------- ------- -----
    \               name\@en           string            4
    \               country            ref       Country 4
    \               country.code                         4
    \               country.name\@en                     4
    \               country.name\@lt   string            4
    ======== ====== ================== ========= ======= =====

Pavyzdyje `City` yra jungtinis modelis, kadangi `City` išvardintos ne tik
`City` klasei priklausančios savybės, tačiau įtraukiamos ir kitos klasės
`Country` savybės.

`City` šiame pavyzdyje yra šakninis modelis, o `Country` yra modelis,
prijungtas per `City/country` savybę.

.. seealso::

   | :ref:`Daliniai modeliai <func_model_part>` (`/:part`)


.. _prop-expand:

Savybių įtraukimas
------------------

Kad jungtiniame modelyje nereikėtu kartoti prijungiamo modelio savybių, galima
pateikti `expand()` funkciją :data:`model.prepare` arba
:data:`property.prepare` stulpeliuose.

Perrašant :ref:`denorm-dsa-example-1` lentelę su `expand()`, gautume, tokią
trumpesnę struktūros aprašo lentelę:

.. table:: Jungtinio modelio pavyzdys su expand()

    ======== ====== ================== ========= ======== =========== ======
    dataset  model  property           type      ref      prepare     level 
    ======== ====== ================== ========= ======== =========== ======
    datasets/gov/rc/ar/ws                                                   
    ---------------------------------- --------- -------- ----------- ------
    \        Country                             code                 4     
    -------- ------------------------- --------- -------- ----------- ------
    \               code               string                         4     
    \               name\@en           string                         4     
    \        City                                                     3     
    -------- ------------------------- --------- -------- ----------- ------
    \               name\@en           string                         4     
    \               country            ref       Country  expand()    4     
    \               country.name\@lt   string                         4     
    ======== ====== ================== ========= ======== =========== ======

Ši lentelė yra lygiai tokia pati kaip ir :ref:`denorm-dsa-example-1`.

Prie `City/country` nurodyta `expand()` funkcija į `City` modelį įtraukia
visas `Country` savybes.

Jei norima įtraukti ne visas `Country` savybes, reikia naudoti `include()`
funkciją, pateikiant sąrašą savybių, kurias norima įtraukti, pavyzdžiui
`include(code)` - bus įtraukta tik viena `Country/code` savybė. Kelias savybes
galima išvardinti, atskiriant savybių pavadinimus kableliu.

Prie `City` modelio yra įtraukta ir `City/country.name\@lt` savybė, kurios nėra
`Country` modelyje.

`expand()` įtraukia visas savybes, kurios išvardintos prie modelio, įskaitant
ir jungtinio modelio savybes iš kitų klasių.


Daugiareikšmiškumas
===================


Duomenų kilmė
=============

Įprastai duomenys yra registruojami vieną kartą pirminiame šaltinyje ir daug
kartų pernaudojami išvestiniuose šaltiniuose. Informacija apie tai iš kokio
pirminio šaldinio duomenys pateko į išvestinį šaltinį, vadinama duomenų kilme.

Struktūros aprašuose, duomenų kilmė pažymima nepildant :data:`property.type`
stulpleio. Jei :data:`property.type` yra neužpildytas, nurodoma, kad modelis
kuriame pateikta savybė, nėra pirminis šios savybės šaltinis.

Jei modelis yra kito jungtinio modelio dalis arba pirminio modelio dalis,
:data:`property.type` stulpelis yra nepildomas, jei savybės modelyje yra
pateikiamos tik skaitymui, be galimybės keisti savybių reikšmių.

- jei :data:`property.type` užpildytas, tada nurodoma, kad ši savybė yra
  :term:`pirminis duomenų šaltinis`, tos savybės duomenys gali būti keičiami
  duomenų modelyje prie kurios savybė yra pateikta,
- jei `type` nenurodytas, tada nurodoma, kad ši savybė nėra :term:`pirminis
  duomenų šaltinis` ir gali būti naudojama tik skaitymui, be galimybės keisti
  savybės reikšias per modelį, kuriame savybė pateikita.

Pavyzdžiui turime jungtinį `City` modelį:

======== ====== ================== ========= ======= =====
dataset  model  property           type      ref     level
======== ====== ================== ========= ======= =====
datasets/gov/rc/ar/ws    
---------------------------------- --------- ------- -----
\        Country                             code    4
-------- ------------------------- --------- ------- -----
\               code               string            4
\               name\@en           string            4
\        City                                        3
-------- ------------------------- --------- ------- -----
\               name\@en           string            4
\               country            ref       Country 4
\               country.code                         4
\               country.name\@en                     4
\               country.name\@lt   string            4
======== ====== ================== ========= ======= =====

Kuriame prie `City` prijungiama `Country` klasė.`country.code` ir
`country.name\@en` neturi :data:`property.type`, nurodant, kad `City` jungtinis
modelis nėra šių savybių pirminis šaltinis ir šios savybės gali būti naudojamos
tik skaitymo tikslais.

Tačiau `City/country.name\@lt` turi :data:`property.type`, todėl `City`
jungtinis modelis yra šios savybės pirminis šaltinis.

Jei ta pati savybė turi daugiau nei vieną pirminį šaltinį, tada savybės, kuri
nurodo :data:`property.type` ir yra pateikta prie išvestinio arba jungtinio
modelio, brandos lygis yra `2`, kadangi negali būti du pirminiai duomenų
šaltiniai viename objektui.


.. _ref-types:

Jungimo būdai
=============

Per pirminį raktą
-----------------

Pavyzdžiui, jei turime tokias dvi duomenų lenteles:

== ======= ====
Country
---------------
id name    code
== ======= ====
1  Lietuva lt
2  Latvija lv
== ======= ====

== ======= =======
City
------------------
id name    country
== ======= =======
1  Vilnius lt
2  Kaunas  lt
3  Ryga    lv
== ======= =======

Šiuo atveju, jei norime parengti aukščiau pateiktų duomenų struktūros aprašą,
jis atrodytų taip:


== == == == == ================== ========= =========== =====
id d  r  b  m  property           type      ref         level
== == == == == ================== ========= =========== =====
1  datasets/gov/example/countries
-- ------------------------------ --------- ----------- -----
2           Country                         code        4
-- -- -- -- --------------------- --------- ----------- -----
3              id                 integer               4
4              name               string                4
5              code               string                4
6           City                            id          4
-- -- -- -- --------------------- --------- ----------- -----
7              id                 integer               4
8              name               string                4
9              country            ref       Country     4
== == == == == ================== ========= =========== =====

Šiame duomenų struktūros apraše, 9-oje eilutėje `country` stulpelio tipas yra
`ref`, tai reiškia, kad šis stulpelis yra kito modelio išorinis raktas.
`property.ref` stulpelyje nurodyta kurio modelio išorinis raktas šis
stulpelis yra. Šiuo atveju, tai yra `Country` modelis, kuris apibrėžtas 2-oje
eilutėje.

Pagal nutylėjimą, ryšys su kitu modeliu nustatomas naudojant kitos lentelės
pirminį raktą nurodytą :data:`model.ref` stulpelyje. Šiuo atveju, `City
.country` yra jungiamas per `Country.code`. Tai reiškia, kad `City.country`
duomenų tipas turi sutapti su `Country.code` duomenų tipu, kuris yra `string`.

`property.ref` reikšmė gali būti pateikiama vienu iš šių variantų:

.. describe:: property.ref

    .. describe:: model

        `model` nurodo kito :data:`model` pavadinimą kurio :data:`model.ref`
        siejamas su :data:`property`.

        Jei :data:`model.ref` pirminiam raktui naudoja daugiau nei vieną lauką,
        tada :data:`property.source` laukas turi būti tuščias, o
        :data:`property.prepare` turi būti pateikiamos kableliu atskirtos
        property reikšmės, kurios bus naudojamos susiejimui.

    .. describe:: model[property]

        Tais atvejais, kai :data:`property` duomenys nesutampa su siejamo
        :data:`model.ref`, galima nurodyti :data:`property` iš :data:`model`.

    .. describe:: model[*property]

        Jei susiejimui reikia daugiau nei vieno duomenų lauko ir jie nesutampa
        su model.ref, tada galima nurodyti kelias property reikšmes atskirtas
        kableliu. Tačiau šiuo atveju taip pat būtina nurodyti ir
        :data:`property.prepare` kelias reikšmes atskirtas kableliu, o
        :data:`property.source` reikšmė turi būti tuščia.
        :data:`property.prepare` stulpelyje nurodomi kiti modelio
        :data:`property` pavadinimai iš kurių duomenų reikšmių turi būti
        formuojamas sudėtinis raktas.

.. **

.. _ref-fkey:

Per nepirminį raktą
-------------------

Jei modelius reikia jungti ne per pirminį raktą, o per kitus laukus, tada
naudojama `model[property]` forma.

Pavyzdžiui, jei turime tokius duomenis:

== ======= ====
Country
---------------
id name    code
== ======= ====
1  Lietuva lt
2  Latvija lv
== ======= ====

== ======= =======
City
------------------
id name    country
== ======= =======
1  Vilnius lt
2  Kaunas  lt
3  Ryga    lv
== ======= =======

Kur `Country` pirminis raktas yra `id` ir norime jungti `City.country` per
`Country.code`, tuomet duomenų struktūros aprašas atrodys taip:

== == == == == ================== ========= ================= =====
d  d  r  b  m  property           type      ref               level
== == == == == ================== ========= ================= =====
1  datasets/gov/example/countries
-- ------------------------------ --------- ----------------- -----
2           Country                         id                4
-- -- -- -- --------------------- --------- ----------------- -----
3              id                 integer                     4
4              name               string                      4
5              code               string                      4
6           City                            id                4
-- -- -- -- --------------------- --------- ----------------- -----
7              id                 integer                     4
8              name               string                      4
9              country            ref       Country[code]     4
== == == == == ================== ========= ================= =====

9-oje eilutėje `property.ref` stulpelyje pateikta `Country[code]` reikšmė, kuri
`Country` nurodo su kokiu modeliu jungiame, o `code` nurodo su kokiu `Country`
stulpeliu jungiame. Jei pateiktas tik modelis, tada jungiama per to modelio
pirminį raktą, jei pateiktas stulpelis laužtiniuose skliausteliuose, tada
jungiama per nurodytą stulpelį.


Per kompozicinį raktą
---------------------

Jei modelius reikia jungti per kelis laukus, tada naudojama
`model[*property]` forma, kur laužtiniuose skliaustuose pateikiami keli
stulpeliai atskirti kableliais.

Pavyzdžiui, jei turime tokius duomenis:

== ======= ====
Country
---------------
id name    code
== ======= ====
1  Lietuva lt
2  Latvija lv
== ======= ====

== ======= ======= ==========
City
-----------------------------
id name    country country_id
== ======= ======= ==========
1  Vilnius lt      1
2  Kaunas  lt      1
3  Ryga    lv      2
== ======= ======= ==========

Kur `City` su `Country` yra jungiamas per du `country` ir `country_id`
stulpelius, tuomet reikia įtraukti išvestinį duomenų lauką, kuriame formulės
įrašomos į :data:`property.prepare` pagalba apjungiami keli laukai į vieną
kompozicinį raktą. Šiuo atveju duomenų struktūros aprašas atrodys taip:

== == == == == ================== ========= ================ ========================== =====
d  d  r  b  m  property           type      ref              prepare                    level
== == == == == ================== ========= ================ ========================== =====
1  datasets/gov/example/countries
-- ------------------------------ --------- ---------------- -------------------------- -----
2           Country                         id                                          4
-- -- -- -- --------------------- --------- ---------------- -------------------------- -----
3              id                 integer                                               4
4              name               string                                                4
5              code               string                                                4
6           City                            id                                          4
-- -- -- -- --------------------- --------- ---------------- -------------------------- -----
7              id                 integer                                               4
8              name               string                                                4
9              country_code       string                                                4
10             country_id         integer                                               4
11             country            ref       Country[id,code] country_id, country_code   4
== == == == == ================== ========= ================ ========================== =====

Čia matome, kad 11-oje eilutėje buvo įtrauktas išvestinis laukas `country`,
kuris išskaičiuojamas apjungiant `country_id` ir `country_code`. O ryšiui su
`Country`, laužtiniuose skliausteliuose nurodyti du laukai iš jungiamo
`Country` modelio. Abiejų jungiamų pusių pateiktas laukų sąrašas turi būti
vienodo eiliškumo, o jungiami laukai turi turėti vienodus tipus.

Jei `Country` pirminis raktas būtų :term:`kompozicinis <kompozicinis raktas>`,
pavyzdžiui `id, code`, tuomet, 11-oje eilutėje `property.ref` užtektu nurodyti
tik `Country`.


.. _atgalinis-ryšys:

Atgalinis ryšys
---------------

Jungiant modelius atgaliniu ryšiu kuriamas išvestinis arba virtualus laukas,
kuriame analogiškai kaip ir paprasto ryšio atveju, apjungiami du modeliai,
tik šiuo atveju kuriamas daug su vienas tipo ryšys.

Pavyzdžiui, jei turime tokius duomenis:

== =======
Country
----------
id name
== =======
1  Lietuva
2  Latvija
== =======

== ======= =======
City
------------------
id name    country
== ======= =======
1  Vilnius 1
2  Kaunas  1
3  Ryga    2
== ======= =======

Ir šiuos duomenis atitinkantį duomenų modelį:

.. mermaid::

    classDiagram
        direction LR

        class Country {
          + id: integer [1..1]
          + name@lt: string [1..1]
        }

        class City {
          + id: integer [1..1]
          + name@lt: string [1..1]
        }

        City --> "[1..1]" Country : country
        City "[1..*]" <-- Country : cities

|

Tai norint sukurti atgalinį ryšį iš `City` modelio į `Country` modelį, duomenų
struktūros aprašas atrodys taip:

======  =========  ========  ============  ======
model   property   type      ref           level
======  =========  ========  ============  ======
**Country**                  id            4
-----------------  --------  ------------  ------
\       id         integer                 4
\       name\@lt   string                  4
\       cities[]   backref   **City**      4
**City**                     id            4
-----------------  --------  ------------  ------
\       id         integer                 4
\       name\@lt   string                  4
\       country    ref       **Country**   4
======  =========  ========  ============  ======

Čia atgalinis ryšys nurodytas 5-oje eilutėje, pateikiant virtualų
`Country.cities` lauką, kuris jungiamas per `City.country` lauką, kadangi
`City.country` turi ryšį su `Country`.

Jei `City` modelyje būtų pateikti keli stulpeliai susieti su `Country`, tada
5-oje eilutėje `property.ref` reikšmė turėtų nurodyti konkretų lauką, per
kurį jungiama, pavyzdžiui `City[country]`.


.. _polimorfinis-ryšys:

Polimorfinis jungimas
---------------------

.. note:: Tokio tipo jungimas kol kas dar nėra įgyvendintas.

Polimorfinis jungimas yra toks ryšys tarp modelių, kai vieno modelio laukas
yra siejamas su daugiau nei vienu kitu modeliu. Tokiam ryšiui nurodyti
polimorfinis laukas turi dvi reikšmes, išorinio modelio pavadinimą ir to
modelio stulpelio per kurį jungiama reikšmę.

== =======
Country
----------
id name
== =======
1  Lietuva
2  Latvija
== =======

== ======= =======
City
------------------
id name    country
== ======= =======
1  Vilnius 1
2  Ryga    2
== ======= =======

== ============ ========= ======================================
Event
----------------------------------------------------------------
id name         object_id object_model
== ============ ========= ======================================
1  Įkūrimas     1         datasets/gov/example/countries/Country
2  Įkūrimas     2         datasets/gov/example/countries/Country
3  Įkūrimas     1         datasets/gov/example/countries/City
4  Įkūrimas     2         datasets/gov/example/countries/City
== ============ ========= ======================================

Pavyzdyje aukščiau matome, kad yra du modeliai `Country` ir `City`, kuriuos
jungia `Event` modelis per `object_id` ir `object_model` laukus. Pavyzdžiui
`Event` kurio `id` yra 1, siejamas su `Country` modeliu, kurio `id` yra 1.

Tokių duomenų struktūros aprašas atrodys taip:

== == == == == ================== ========= ======= ======================= =====
d  d  r  b  m  property           type      ref     prepare                 level
== == == == == ================== ========= ======= ======================= =====
1  datasets/gov/example/countries
-- ------------------------------ --------- ------- ----------------------- -----
2           Country                         id                              4
-- -- -- -- --------------------- --------- ------- ----------------------- -----
3              id                 integer                                   4
4              name               string                                    4
5              cities[]           backref   City                            4
6           City                            id                              4
-- -- -- -- --------------------- --------- ------- ----------------------- -----
7              id                 integer                                   4
8              name               string                                    4
9              country            ref       Country                         4
10          Event                           id                              4
-- -- -- -- --------------------- --------- ------- ----------------------- -----
11             id                 integer                                   4
12             name               string                                    4
13             object_id          integer                                   4
14             object_model       string                                    4
15             object             generic   Country object_model, object_id 4
16                                          City
== == == == == ================== ========= ======= ======================= =====

15-oje eilutėje įtrauktas virtualus `Event.object` laukas, kuris 15-oje ir
16-oje eilutėse, :data:`property.ref` stulpelyje išvardina du modelius
`Country` ir `City`, su kuriais jungiamas šis laukas, per `object_model` ir
`object_id` laukus, kurie aprašyti atskirai.

`object_id` ir `object_model` aprašomi atskirai tik todėl, kad duomenys
ateina iš išorinio šaltinio. Jei duomenys rašomi tiesiogiai į :ref:`Saugyklą
<saugykla>`, tada atskirai `generic` laukų apsirašyti nereikia.



.. _ref-level:

Brandos lygis
=============

Apibrėžiant ryšius tarp modelių, brandos lygis įrašomas :data:`level`
stulpelyje atlieka svarbų vaidmenį. Nuo brandos lygio, priklauso, kaip turi būti
interpretuojamas išorinis raktas, siejamas su kitu modeliu.

1 brandos lygis: Susiejimas neįmanomas
    Duomenys pateikti tokia forma, kurios pagalba dviejų modelių jungimas nėra
    įmanomas.

    Pavyzdžiui, pateikta adreso tekstinė forma, kuri nesutampa su tekstine
    forma pateikiama oficialiame adresų registre arba naudojamas toks tam
    tikras identifikatorius, kuris nėra surištas su siejamo modelio pirminiu
    raktu.

2 brandos lygis: Susiejimas nepatikimas
    Duomenys pateikiami tam tikra forma, kuri neužtikrina patikimo duomenų
    susiejimo, tačiau siejimas atliekamas pagal siejamo modelio atributą, kuris
    negarantuoja unikalaus objekto identifikavimo.

    Pavyzdžiui siejimas atliekamas pagal pavadinimą, kuris gali keistis arba ne
    visais atvejais sutampa.

3 brandos lygis: Susiejimas ne per pirminį raktą
    Duomenims susieti naudojamas patikimas identifikatorius, kuris yra surištas su
    siejamo modelio pirminiu raktu, tačiau naudojamas ne pirminis raktas, o
    kitas identifikatorius.

4 brandos lygis: Susiejimas per pirminį raktą
    Susiejimas daromas per pirminį raktą.



Susiejimas neįmanomas
---------------------

Jei `ref` tipui nurodytas 1 arba žemesnis brandos lygis, tai reiškia, duomenų
jungimas nėra įmanomas. Tokiu atveju, atveriant duomenis, `property` įgaus tokį
tipą, koks yra lauko su kuriuo siejamas ryšys tipas.

Pavyzdžiui:


== == == == ================== ========= ========= =====
d  r  b  m  property           type      ref       level
== == == == ================== ========= ========= =====
example                                           
------------------------------ --------- --------- -----
\        Country                         name\@lt  4
-- -- -- --------------------- --------- --------- -----
\           name\@lt           string              4
\        City                            name      4
-- -- -- --------------------- --------- --------- -----
\           name\@lt           string              4
\           country            ref       Country   1
== == == == ================== ========= ========= =====

Šiuo atveju, `City.country` yra siejamas su `Country.name`. Kadangi
`City.country` brandos lygis yra 2, tai reiškia, kad `City.country` ir
`Country.name` pavadinimai nesutampa ir jungimo atlikti neįmanoma. Tokiu
atveju, `City.country` tipas bus ne `ref`, o toks pat, kaip `Country.name`,
t.y. `string`.

Tačiau, metaduomenyse išliks informacija, apie tai, kad šios lentelės yra
susijusios. Dėl prasto duomenų brandos lygios, realus susiejimas nėra
įmanomas.

Jei modeliai yra susiję, tačiau, tokio duomenų lauko, per kurį galima būtų
atlikti susiejimą iš vis nėra, tuomet, tokį lauką galima sukurti, nurodant
brandos lygį 0. Pavyzdžiui:

== == == == ================== ========= ================= =====
d  r  b  m  property           type      ref               level
== == == == ================== ========= ================= =====
example                                                   
------------------------------ --------- ----------------- -----
\        Country                         name\@lt          4
-- -- -- --------------------- --------- ----------------- -----
\           name\@lt           string                      4
\           name\@en           string                      0
\        City                            name              4
-- -- -- --------------------- --------- ----------------- -----
\           name\@en           string                      4
\           country            ref       Country[name\@en] 1
== == == == ================== ========= ================= =====

Šioje vietoje `City.country` tampa `country@en`, kurio tipas yra `string`. O į
`Country` yra įtrauktas papildomas laukas `name@en`, per kurį ir atliekamas
susiejimas, t.y. per kurį galėtų būti atliktas susiejimas, jei toks laukas
egzistuotų ne tik `City.country`, bet ir `Country.name@en`.


Susiejimas nepatikimas
----------------------

Jei `ref` tipui suteiktas 2 brandos lygis, tai reiškia, kad susiejimas yra
įmanomas, tačiau nėra garantijos, kad jis veiks visais atvejais.

Susiejimas laikomas nepatikimu, tada, kai siejimas atliekamas ne patikimo
unikalaus identifikatoriaus pagalba, o per pavadinimą ar panašiais būdais.

Pavadinimai gali keistis, gali dubliuotis, gali skirtis jų užrašymo forma, todėl
toks jungimas laikomas nepatikimu.

Toks jungimas ir 2 brandos lygio žymėjimas taikomas tik tais atvejais, kai
jungimas daromas, per jungiamo modelio atributą. Pavyzdžiui:

== == == == ================== ========= ========= =====
d  r  b  m  property           type      ref       level
== == == == ================== ========= ========= =====
example                                           
------------------------------ --------- --------- -----
\        Country                         name\@lt  4
-- -- -- --------------------- --------- --------- -----
\           name\@lt           string              4
\        City                            name      4
-- -- -- --------------------- --------- --------- -----
\           name\@lt           string              4
\           country            ref       Country   2
== == == == ================== ========= ========= =====

Šiuo atveju, kadangi `City.country` brandos lygis yra `2`, tai reiškia, kad
`City.country` duomenys yra realiai paimti iš `Country.name@lt`. Jei
`City.country` būtų paimti ne iš `Country.name@lt`, o iš kokio nors kito
šaltinio ir gali nesutapti, tada brandos lygis turėtu būti `1`.

Tai reiškia, kad `2` brandos lygis žymimas tik tais atvejais, kai išorinis
raktas yra paimtas iš siejamo modelio atributo.


Susiejimas ne per pirminį raktą
-------------------------------

Jei `ref` tipui suteiktas 3 ar didesnis brandos lygis, vadinasi susiejimas yra
patikimas. Duomenys siejami naudojant patikimus unikalius identifikatorius,
kurie nesidubliuoja, nesikeičia ir užrašomi visada vienodai.

Dažniausiai patikimais identifikatoriais laikomi sveiki skaičiai, tam tikri
sutartiniai kodai ir kiti specializuoti identifikatoriai, tokie kaip UUID.

Tačiau, naudojamas ne pirminis raktas, o kitas duomenų laukas. Pavyzdžiui:

== == == == ================== ========= ============= =====
d  r  b  m  property           type      ref           level
== == == == ================== ========= ============= =====
example                                               
------------------------------ --------- ------------- -----
\        Country                         id            4
-- -- -- --------------------- --------- ------------- -----
\           id                 integer                 4
\           code               string                  4
\           name\@lt           string                  4
\        City                            name          4
-- -- -- --------------------- --------- ------------- -----
\           name\@lt           string                  4
\           country            ref       Country[code] 3
== == == == ================== ========= ============= =====

Skirtumas tarp `3` ir `4` brandos lygio iš esmės susijęs su duomenų saugojimu
Saugykloje ar kitoje vietoje, kur pirminiai raktai yra generuojami ir jų
negalima keisti. Jei naudojamas `3` brandos lygis, tuomet saugykloje saugomas,
ne išorinis saugyklos identifikatorius UUID, o vidinis duomenų rinkinio
identifikatorius.

Publikuojant duomenis iš tam tikro šaltinio, išorinis raktas visada turėtu
būti konvertuojamas į išorinį pirminį raktą, tačiau tais atvejais, jei dėl tam
tikrų priežasčių tas nėra daroma, tuomet žymimas 3 brandos lygis ir
publikuojami ne išoriniai pirminiai raktai, o šaltinio vidiniai.

Pavyzdžiui, jei turime tokius duomenis:

=====================================  ====  =====  =========
example/Country                      
-------------------------------------------------------------
_id                                    id    code   name\@lt
=====================================  ====  =====  =========
4dbb1b77-a930-4f2a-8ef4-f05b89f0fcfe   1     lt     Lietuva
=====================================  ====  =====  =========

Ir jei `City.country` turi brandos lygį `3`, tada `City` duomenys atrodys taip:

=====================================  =========  ============
example/City
--------------------------------------------------------------
_id                                    name\@lt   country._id
=====================================  =========  ============
096e054e-7a4c-44cc-8f27-98af815080d5   Vilnius    lt          
=====================================  =========  ============


Susiejimas per pirminį raktą
----------------------------

Šiuo atveju, brandos lygis žymimas `4` ir skirtumas nuo `3` brandos lygio yra
toks, kad duomenyse naudojamas išorinis pirminis raktas. Pavyzdžiui:

== == == == ================== ========= ======== =====
d  r  b  m  property           type      ref      level
== == == == ================== ========= ======== =====
example                                          
------------------------------ --------- -------- -----
\        Country                         id       4
-- -- -- --------------------- --------- -------- -----
\           id                 integer            4
\           code               string             4
\           name\@lt           string             4
\        City                            name     4
-- -- -- --------------------- --------- -------- -----
\           name\@lt           string             4
\           country            ref       Country  4
== == == == ================== ========= ======== =====

Turint tokį struktūros aprašą, kur `City.country` brandos lygis yra `4`,
duomenys atrodys taip:

=====================================  ====  =====  =========
example/Country                      
-------------------------------------------------------------
_id                                    id    code   name\@lt
=====================================  ====  =====  =========
4dbb1b77-a930-4f2a-8ef4-f05b89f0fcfe   1     lt     Lietuva
=====================================  ====  =====  =========

=====================================  =========  =====================================
example/City
---------------------------------------------------------------------------------------
_id                                    name\@lt   country._id                          
=====================================  =========  =====================================
096e054e-7a4c-44cc-8f27-98af815080d5   Vilnius    4dbb1b77-a930-4f2a-8ef4-f05b89f0fcfe
=====================================  =========  =====================================

Matome, kad `City.country._id` yra `Country` pirminis raktas. Tai reiškia, kad
vidiniai duomenų rinkinio raktai konvertuojami į išorinius.
