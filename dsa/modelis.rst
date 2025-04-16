.. default-role:: literal

.. Object instance.
.. role:: instance
   :class: underline

.. _uml-index:

Koncepcinis modelis
###################

Prieš pradedant darbą su strūktūros aprašais, būtina pasirengti koncepcinio
modelio UML diagramą, vadovaujantis `Conceptual model conventions (UML)`_
reikalavimais.

Koncepcinis modelis vienareikšmiškai apibrėžia duomenų modelį grafine forma ir
naudojamas, kaip vienintelis tiesos šaltinis, kadangi vizualinę duomenų modelio
reprezentaciją nesunkiai gali suprasti skirtingose srityse dirbandys žmonės ir
pasitivrtinti duomenų modelį, kuris vėliau bus taikomas rengiant duomenų
struktūros aprašus.

Kad standartizuoti ir palengvinti modelių paiešką ir atpažinimą VSSA paruošė
UML modelio šabloną kuris nusako papildomus stiliaus ir struktūros elementų
reikalavimus.

Pavyzdinis pavaiksliukas su aprašymais:

.. image:: _static/VSSA-UML-template-example.svg

* Metadata - pagrinde naudojama URI prefiksų žymėjimui, tačiau taip pat ir `rdfs:Property`, nesusietų su jokiomis konkrečiomis savybėmis įtraukimui ir retais atvejais, naujų tipų deklaravimui.
* Reference data - klasifikatoriai, žymėjimas sutampa su `Conceptual model conventions (UML)`_ žymėjimu.
* Master data - pagrindiniai duomenys, registro objektai, žymėjimas sutampa su`Conceptual model conventions (UML)`_ žymėjimu.
* Transactional data - veiksmai ar įvykiai susiję su pagrindiniais duomenimis, tokie kaip adreso registravimo dokumentas, juridinio asmens likvidavimas, kokio nors statusio galiojimo terminas. SEMIC to atskirai nežymi, tačiau BRAIF išskiria tokią duomenų rūšį, todėl įtraukiame atskirą žymėjimą transakciniams duomenims, taip užtikrindami vienareikšmišką komunikaciją.
* Reporting data - statistiniai duomenys, ataskaitos, paslaugos teikiančios agreguotus duomenis, `Conceptual model conventions (UML)`_ neturi tokio žymėjimo, tačiau Lietuvos kontekste matome poreikį šiam žymėjimui, pavyzdžiui VDA duomenims, kur statistinėse ataskaitose nėra identifikatorių, taikomas kiek kitas Data Cube modelis, kuris yra suderinamas su `SDMX`_ standartu, todėl siūlome aiškiai atskirti ataskaitas, nuo kitų duomenų.
* External dependencies - siūlome prefiksus žymėti tik išoriniams žodynams, o tais atvejais, kai naudojami Lietuvos registrai, neįtraukti URI prefikso, o naudoti informacinės sistemos kodinį pavadinimą registruotą duomenų kataloge, pilnas informacinės sistemos URI turėtu būti formuojamas pagal `UDTS URI <https://ivpk.github.io/uapi/#section/Concepts/URI>`_, kur URI formuojamas pagal informacinės sistemos veiklos sritį, nesiejant su institucija, nes institucijų pavadinimai ir veiklų priskyrimas institucijoms gali keistis. Tam reikalingas atskiras informacinių sistemų susiejimas su URI prefiksais. Reikia atkreipti dėmesį, kad IS URI ir Dataset URI yra skirtingi. Pavyzdys, su adresų duomenimis: `https://data.gov.lt/id/adresses/Location`
* Leggaly binding - kaip nurodo `ES Core žodynai`_ arba teisės aktuose (nuostatuose) įrašyti duomenys, kurių valdymas priskirtas konkrečiai Informacinei Sistemai, tokių duomenų teisiškai dubliuoti negalima, privalomas pakartotinis naudojimas.
* Legally binding Missing data - tais atvejais, kai duomenys yra Legally binding, tačiau fiziškai informacinėje sistemoje jų nėra, žymima atskirai.
* Legally non binding - duomenys, kurių nėra nei teisės aktuose, jų nenurodo `ES Core žodynai`_, tačiau jie yra reikalingi Informacinės sistemos veikimui užtikrinti, tokie duomenys gali būti dubliuojami, kadangi teisiškai nėra priskirti jokiai informacinei sistemai, bet jie turėtu būti pažymėti ir gal būt bus perkelti į IS nuostatus. Žymėjimas "_" reiškia, kad duomenys, pagal nuostatus nepriklauso informacinei sistemai, todėl ir žymima brūkšneliu, kuris žymi, kad šie duomenys nėra reguliuojami. Analogiškai žymėjimas yra naudojamas RDF duomenyse, nurodant, kad objektas neturi subjekto, yra anonimis objektas, taip ir šuo atveju, klasė neturi oficialiai priskirtos informacinės sistemos. 

Norint padėti naudotis šiuo šablonu, VSSA rekomenduoja UML diagramų kūrimui naudoti `Draw.io <https://draw.io>`_ diagramų kūrimo įrankį ir šiam įrankiui paruošė šio šablono `elementų biblioteką <_static/UML%20(VSSA).xml>`_


Reikia atkreipti dėmesį, kad koncepcinis modelis yra vienas, o jį atitinkančių
duomenų šaltinių gali būti daug.

Kaip pavyzdį, naudosime žemiau pateiktą koncepcinį duomenų modelį:

.. mermaid::

   classDiagram
     direction LR

     class AdministracijosTipas {
       <<enumeration>> 
       APSKRITIS
       SAVIVALDYBE
     }

     class Administracija {
       + kodas: integer [1..1]
       + pavadinimas: text [1..1]
     }

     class Savivaldybe
     class Apskritis
     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }

   
     Savivaldybe --> "[1..1]" Apskritis : apskritis
     Gyvenviete --> "[1..1]" Savivaldybe : savivaldybe
     Savivaldybe --|> Administracija
     Apskritis --|> Administracija
     Administracija ..> "[1..1]" AdministracijosTipas : tipas


Pagal šį koncepcinį modelį, DSA lentelė atrodytu taip:


== == == ================== ================== =============== =============
d  r  m  property           type               ref             prepare      
== == == ================== ================== =============== =============
datasets/gov/example                                                           
--------------------------- ------------------ --------------- -------------
\     **Administracija**                       kodas                        
-- -- --------------------- ------------------ --------------- -------------
\        kodas              string                                          
\        pavadinimas        string                                          
\        tipas              string                                          
\                           enum                               "APSKRITIS"
\                                                              "SAVIVALDYBE"
\     **Gyvenviete**                           id             
-- -- --------------------- ------------------ --------------- -------------
\        id                 integer                                         
\        pavadinimas        string                                          
\        savivaldybe        ref                **Savivaldybe**  
\     **Apskritis**         **Administracija** kodas, tipas   
-- -- --------------------- ------------------ --------------- -------------
\        kodas              string                                          
\        pavadinimas        string                                          
\        tipas              string                             "APSKRITIS"
\     **Savivaldybe**       **Administracija** kodas, tipas   
-- -- --------------------- ------------------ --------------- -------------
\        kodas              string                                          
\        pavadinimas        string                                          
\        tipas              string                             "SAVIVALDYBE"
\        apskritis          ref                **Apskritis**
== == == ================== ================== =============== =============


Pavadinimai nurodyti koncepciniame modelyje, turi identiškai sutapti su
pavadinimai nurodytais DSA lentelės loginio modelio `model`, `property`,
`type`, `ref` ir `prepare` stulpeluose.

DSA lentelėje fizinio modelio, `source` stulpelyje nurodyti pavadinimai
skirtinguose šaltiniuose gali skirtis, tačiau loginio modelio pavadinimai turi
išlikti tokie patys.


.. _objektas:

Objektas
********

:dfn:`Objektas` yra viena duomenų eilutė, arba vienas duomenų įrašas ar
atvejis. Kalbant apie objektus, naudojamas :instance:`pavyzdys` žymėjimas.

Pavyzdžiui iš aukščiau pateikto duomenų modelio, klasės `Gyvenviete` objektai
gali būti:

- :instance:`Vilnius`
- :instance:`Kaunas`
- :instance:`Klaipeda`

Sąvoka :term:`objektas` kalba apie konkretų individualų atvejį ar pavyzdį.

Imant duomenų lentelę iš `Gyvenviete` modelio, gausime tokius duomenis.

== =========== ===========
id pavadinimas savivaldybe
== =========== ===========
1  Vilnius     10
2  Kaunas      11
3  Klaipeda    12
== =========== ===========

Šioje lentelėje yra trys objektai.

Objekto pavyzdys UML diagramoje:

.. mermaid::

   classDiagram
     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
       + savivaldybe: integer [1..1]
     }

     class Vilnius["<u>Vilnius: Gyvenviete</u>"] {
       id = 1
       pavadinimas = "Vilnius"
       savivaldybe = 10
     }
     class Kaunas["<u>Kaunas: Gyvenviete</u>"] {
       id = 2
       pavadinimas = "Kaunas"
       savivaldybe = 11
     }
     class Klaipeda["<u>Klaipeda: Gyvenviete</u>"] {
       id = 3
       pavadinimas = "Klaipeda"
       savivaldybe = 12
     }

     Vilnius --|> Gyvenviete
     Kaunas --|> Gyvenviete
     Klaipeda --|> Gyvenviete


UML diagramoje turime tris objetus :instance:`Vilnius`, :instance:`Kaunas` ir
:instance:`Klaipeda`, priskirti klasei `Gyvenviete`.


Skirtingi objektai gali būti klasifikuojami į klases arba esybes.


Klasė
*****

Klasė arba Esybė yra vienodas savybes ir vienodą apibrėžimą turinčių objektų
aibė, kuriems suteikiamas tam tikras pavadinimas.

Tarkime :instance:`Vilniaus`, :instance:`Kauno` ir :instance:`Klaipėdos`
objektus galime priskirti vienai klasei ir suteikti tai klasei pavadinimą
`Gyvenviete`.

Klasės pavyzdys UML diagramoje:

.. mermaid::

   classDiagram

     class Gyvenviete


Klasė gali neturėti jokių savybių, arba gali turėti savybes, kurios apibūdina
pačią klasę.

Tarkime modelis `Gyvenvietė` turi savybę `pavadinimas`, tačiau tai nėra klasės
savybė, todėl, kad `pavadinimas` yra duomenų atributas, kuris nėra klasę
apibūdinanti savybė.

Nurodžius savybes prie klasės, iškeliamas griežtas reikalavimas, visiems
modeliams ir subklasėms, atitikti visas klasės savybes.

Tuo tarpu duomenų modelis, gali atitikti tam tikrą klasę, bet gali būti
pateikiamas su skirtingomis savybėmis.

Sudarant ontologijas, pateikiami klasių apibrėžimai, dažniausiai be savybių,
kad neriboti klasės taikymo. Tačiau tam tikrais atvejais, ontologijoje klasės
pateikiamos ir su keliomis savybėmis, kurios apibrėžia pačią klasę.


.. _modelis:

Modelis
*******

.. image:: _static/modelis.png

Klasės savybės apibrežia pačią klasę ir tampa klasės dalimi, tačiau modelio
savybės neturi įtakos klasės semantiniam apibrėžimui, tai yra tiesiog duomenų
laukų sąrašas pateikiams su klase.

Viena klasė gali turėti daug skirtingų modelių, su skirtingomis savybėmis arba
su skirtingais duomenų laukais.

Modelis, schema arba profilis yra konkretus savybių, duomenų tipų sąrašas,
kuriame nurodoma kurios savybės yra privalomos, kurios gali turėti daugiau nei
vieną reikšmę ir kitas detales.

Sudarant taikymo profilius (angl. *Application profile*) UML klasių diagramoje
pateikiami konkretūs duomenų modeliai, su konkrečiomis savybėmis ir jų tipais.


Modelio pavyzdys UML diagramoje:

.. mermaid::

   classDiagram

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }

Modelis atvaizduojas lygiai taip pat, kaip ir klasės. Ar tai yra klasės ar
modelis galima atskirti tik pagal diagramos pavadinimą, jei diagrama vaizduoja
ontologiją, tada joje yra klasės, jei taikymo profilį, tada diagramoje yra
modeliai.

Jei UML diagramose prie klasių yra pateikti pilni sąrašai savybių su tipais,
tada tai greičiausiai yra taikymo profilis.


.. _uml-generalization:

Apibendrinimas
**************

Objektai gali būti skirstomi į klases, tačiau pačios klasės gali būti
skirstomos į bendresnes klases, toks apibendrinimo procesas vadinamas
generalizacija.

UML diagramose gneralizacija žymima užpildyta rodykle, kurios krypts iš labiau
specializuotos siauresnę prasmę turinčios klasės, į labiau apibendrintą,
platesnę prasmę turinčią klasę, pavyzdžiui:

.. mermaid::

   classDiagram
     direction LR

     class Savivaldybe
     class Administracija

     Savivaldybe --|> Administracija

Šiame pavyzdyje nurodome, kad `Savivaldybe` yra `Administracija` poaibis. Arba
`Administracija` yra platesnė klasė, o `Savivaldybę` yra siauresnė, labiau
specifinę prasmę nurodanti klasė.


Identifikatorius
****************

Kad galėtume vienareikšmiškai įvardinti ar nurodyti tam tikrą objektą, visi
objektai privalo turėti unikalius identifikatorius.

Kiekvienam objektui priskiriamas vienas globalus identifikatorius :rfc:`UUID
<9562>` formatu, tačiau objektas gali turėti vieną ar daugiau lokalius
identifikatorius.

Globalūs identifikatoriai priskiriami esybei ir atspindi vieną realaus pasaulio
objektą, lokalus identifikatorius yra siejams su konkrečiu duomenų modeliu ar
duomenų šaltiniu ir skirtinguose modeliuose gali būti naudojami keli skirtingi
lokalūs identifikatoriai rodantys į vieną realaus pasaulio objektą.


.. mermaid::

   classDiagram

     class Gyvenviete

     class City {
       + id: integer [1..1]
       + name: text [1..1]
     }

     class Miestas {
       + kodas: integer [1..1]
       + pavadinimas: text [1..1]
     }

     class VilniusCity["<u>dd79d2a6-d3d6-4fc2-83bb-da9dd15b2a89: City</u>"] {
       id = 7
       name = "Vilnius"
     }
     class VilniusMiestas["<u>dd79d2a6-d3d6-4fc2-83bb-da9dd15b2a89: Miestas</u>"] {
       kodas = 23
       pavadinimas = "Vilnius"
     }

     VilniusCity --|> City
     VilniusMiestas --|> Miestas
     City --|> Gyvenviete
     Miestas --|> Gyvenviete

UML diagramoje aukščiau turime du skirtingus duomenų objektus, kurie turi
vienodą globalų identifikatorių `dd79d2a6-d3d6-4fc2-83bb-da9dd15b2a89`, tačiau
skirtingus lokalius `id = 7` ir `kodas = 23`.

Globalus identifikatorius suteikiamas esybei `Gyvenviete`, lokalūs
identifikatoriai suteikiami konkrečiam duomenų modeliui ir konkrečiam duomenų
šaltiniui.

Rengiant :term:`DSA` lentelę globalūs identifikatoriai žymimi :data:`model.ref`
stulpelyje arba rezervuotu savybės pavadinimu `_id` ir yra privalomas.


Savybė
******

UML diagramos savybės žymimos sutartine forma:

.. admonition:: Sintaksė

   **access** **property** `:` **type** `[` **cardinality** `..` **multiplicity** `]`

access
    Prieigos lygis. Gali būti naudojami tokie žymėjimai:

    - `+` - atviri duomenys, žiūrėti :data:`open`.
    - `#` - vieši duomenys, žiūrįti :data:`public`.
    - `~` - duomenys teikiami pagal sutartį, žiūrėti :data:`protected`.
    - `-` - nepublikuojami duomenys, žiūrėti :data:`private`.

property
    Savybė, žiūrėti :data:`property`. Nurodoma savybės URI forma.

type
    Duomenų tipas, žiūrėti :ref:`duomenų-tipai`. UML diagramose, jei duomenų
    tipas yra :data:`ref` arba :data:`backref`, tada nurodomas modelio
    pavadinimas, URI forma, su kuriuo daroma asociacija.

cardinality
    Nurodo ar laukas yra privalomas:

    - `0` - laukas yra neprivalomas.
    - `1` - laukas yra privalomas.

multiplicity
    Nurodo kiek kartų gali būti pateikta lauko reikšmė.

    - `1` - lauko reikšmė gali būti pateikta tik vieną kartą.
    - `*` - laukė reikšmė gali būti pateikta daugiau nei veiną kartą.

Pavyzdys:

.. mermaid::

   classDiagram

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }

UML diagramoje matote `Gyvenviete` duomenų modelį, kuris turi dvi savybes::

    + id: integer [1..1]
    + pavadinimas: text [1..1]

Abi savybės turi atvirą prieigos lygmenį, `id` ir `pavadinimas` kodinius
savybės pavadinimus, `integer` ir `text` duomenų tipus ir abi savybės yra
privalomos ir gali turėti tik vieną reikšmę.


Asociacija
**********

Per duomenų tipą
===========================

UML diagramose nurodant ryšį su kitomis esybėmis, galima naudoti įprastą
savybių žymėjimo formą `+ savivaldybe: Savivaldybe [1..1]`, kur po `:`
dvitaškio nurodomas kitas modelis, su kuriuo daroma asociacija.

.. mermaid::

   classDiagram

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
       + savivaldybe: Savivaldybe [1..1]
     }

     class Savivaldybe {
       + kodas: integer [1..1]
       + pavadinimas: text [1..1]
     }
   
Tokia asociacija daroma, kai siejame su išoriniais modeliais, arba kai turime
per daug asociacijų ir norime UML diagramoje sumažinti rodyklių skaičių.


Tiesioginė
==========

Tiesioginė asociacija nurodoma rodyklės pagalba, jei yra pateikta rodyklė, tada
savybių sąraše, savybės, kuri yra pateikta prie rodyklės neberodome.

.. mermaid::

   classDiagram
     direction LR

     class Savivaldybe {
       + kodas: integer [1..1]
       + pavadinimas: text [1..1]
     }

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }
   
     Gyvenviete --> "[1..1]" Savivaldybe : savivaldybe


Rodyklės kryptis visada rodo iš modelio, prie kurio savybė yra apibrėžta, į
kitą modelį, su kuriuo savybė yra siejama.

Tiesioginė asociacija :term:`DSA` yra nurodoma :data:`type.ref` pagalba.


Atvirkštinė
===========

Asociacijai gali būti naudojami ir atvirkštiniai ryšiai, pavyzdžiui:

.. mermaid::

   classDiagram
     direction LR

     class Savivaldybe {
       + kodas: integer [1..1]
       + pavadinimas: text [1..1]
     }

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }
   
     Gyvenviete "[0..*]" <-- Savivaldybe : gyvenvietes

Šiuo atveju nurodome :data:`type.backref` tipo atvirkštinę asociaciją, rodyklės
kryptis ir daugiareikšmiškumas keičiasi, turime vieną savyvaldybę, kuri gali
turėti daug gyvenviečių.


Klasifikatorius
***************

Klasifikatoriai arba kontroliuojami žodynai, yra galimų reikšmių sąrašas
naudojamas tam tikrai savybei.

UML diagramoje klasifikatoriai pateikiami naudojant `<<enumeration>>`
stereotipą ir punktyrinę priklausomybės rodyklę:

.. mermaid::

   classDiagram
   
     class AdministracijosTipas {
       <<enumeration>> 
       APSKRITIS
       SAVIVALDYBE
     }
   
     class Administracija {
       + kodas: integer [1..1]
       + pavadinimas: text [1..1]
     }
   
     Administracija ..> "[1..1]" AdministracijosTipas : tipas

`AdministracijosTipas` yra klasifikatorius, turintis kontroliuojamą žodyną,
kuriame apibrėžtos dvi galimos reikšmės `APSKRITIS` ir `SAVIVALDYBE`.

Struktūros apraše klasifikatoriai aprašomi naudojant :data:`enum` dimensiją.


Žodynas
*******

Visos klasės ir savybės (:dfn:`sąvokos`) yra skirstomos į žodynus. Dažnai
viename duomenų modelyje yra naudojamos :term:`sąvokos <sąvoka>` iš skirtingų
žodynų.

Kad atskirti, kuri sąvoka yra iš kokio žodyno, naudojami žodyno prefiksai.


.. mermaid::

   classDiagram
     direction LR

     class Location["locn:Location"] {
       + dct:identifier: integer [1..1]
       + rdfs:label: text [1..1]
     }

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }
   
     Gyvenviete --|> Location

Žodyno prefiksai gali būti naudojami tiek klasės pavadinime, tie savybių ir
tipų pavadinimuose.

Jei žodyno prefiksas nėra nurodytas, tai reiškia, kad naudojamas esamas
žodynas, kuris yra apibrėžtas duomenų modelyje.

Žodynai taip pat gali būti nurodomi naudojant UML paketus arba vardų erdves:

.. mermaid::

   classDiagram
     direction LR

     class Gyvenviete {
       + id: integer [1..1]
       + pavadinimas: text [1..1]
     }

     Gyvenviete --|> Location

     namespace locn {
         class Location {
           + dct:identifier: integer [1..1]
           + rdfs:label: text [1..1]
         }
     }
   
Sąvokoms, kurios yra vardų erdvės rėmuose, žodyno prefiksai nenurodomi. Žodyno
prefiksai nurodomi tik tuo atveju, jei sąvoka yra iš kito žodyno.


IRI
***

Visos sąvokos, tokios kaip klasės, savybės, duomenų tipai, taip pat yra
objektai, turintys savo identifikatorius.

UML diagramose nurodomi būtent sąvokų identifikatoriai sutrumpinta IRI forma.

IRI yra identifikatorius schema sudaryta iš sekančių komponentų:

**scheme** `://` **host** `/` **path** `?` **query** `#` **fragment**


Lietuvos viešąjame sektoriuje naudojama sekanti URI schema:


`https://data.gov.lt/id/` **vocab** `/` **term** [ `/` **id** ]

vocab
    Žodyno kodinis pavadinimas.

term
    Sąvokos kodinis pavadinimas.

id
    Objekto identifikatorius.


Jei mūsų kuriamam žodynui būtų suteiktas kodinis pavadinimas `adresai`, tada
mūsų sąvokoms būtų suteikti tokie IRI identifikatoriai::

    https://data.gov.lt/id/adresai/Gyvenviete
    https://data.gov.lt/id/adresai/id
    https://data.gov.lt/id/adresai/pavadinimas

Kadangi pilnas IRI yra gan ilgas, UML diagramose naudojame sutrumpintą IRI
formą su prefiksu. Šiuo atveju, galime deklaruoti, kad `ar` prefiksas atitinka
`https://data.gov.lt/id/adresai/` URI, todėl sutrumpinta forma atrodys taip:

.. code-block:: turtle

    @prefix ar: <https://data.gov.lt/id/adresai/>

    ar:Gyvenviete
    ar:id
    ar:pavadinimas


UML diagramoje naudojame sutrumpintus URI pavadinimus, tačiau kartu su diagrama
būtina pateikti ir prefiksų sąrašą, kad būtų ašku, ką reiškia kiekvienas
prefikas:

=========  =================================
Prefiksas  Vardų erdvės IRI
=========  =================================
ar         \https://data.gov.lt/id/adresai/
locn       \http://www.w3.org/ns/locn#
dct        \http://purl.org/dc/terms/
rdfs       \http://www.w3.org/2000/01/rdf-schema#
=========  =================================

.. mermaid::

   classDiagram
     direction LR

     class Location["locn:Location"] {
       + dct:identifier: integer [1..1]
       + rdfs:label: text [1..1]
     }

     class Gyvenviete["ar:Gyvenviete"] {
       + ar:id: integer [1..1]
       + ar:pavadinimas: text [1..1]
     }
   
     Gyvenviete --|> Location


.. _SDMX: https://sdmx.org/standards-2/
.. _OWL: https://www.w3.org/TR/owl2-overview/
.. _RDFS: https://www.w3.org/TR/rdf-schema/
.. _IRI: https://www.ietf.org/rfc/rfc3987.txt
.. _RDF: https://www.w3.org/TR/rdf11-concepts/
.. _FOAF: http://xmlns.com/foaf/spec/
.. _SKOS: https://www.w3.org/TR/skos-primer/
.. _owl:Thing: https://www.w3.org/TR/2004/REC-owl-semantics-20040210/syntax.html#owl_Thing_syntax
.. _foaf:Person: http://xmlns.com/foaf/spec/#term_Person
.. _foaf:member: http://xmlns.com/foaf/spec/#term_member
.. _foaf:Group: http://xmlns.com/foaf/spec/#term_Group
.. _foaf:Agent: http://xmlns.com/foaf/spec/#term_Agent
.. _Conceptual model conventions (UML): https://semiceu.github.io/style-guide/1.0.0/gc-conceptual-model-conventions.html
.. _ES Core žodynai: https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/core-vocabularies
