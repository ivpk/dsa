.. default-role:: literal
.. _dimensijos:

Dimensijos
##########

Dimensijos leidžia vienoje lentelėje sutalpinti kelias skirtingas lenteles
turinčias bendrų savybių.

DSA lentelėje turime tokius dimensijų stulpelius:

- :ref:`dataset`
- :ref:`resource`
- :ref:`model`
- :ref:`property`

======= ======== ===== ============= ============================== 
dataset resource model property      title                         
======= ======== ===== ============= ============================== 
datasets/gov/rc/ar/ws                Duomenų rinkinys
------------------------------------ ------------------------------ 
\       db                           Duomenų teikimo paslauga
------- ---------------------------- ------------------------------ 
\                **Gyvenviete**      Esybė
------- -------- ------------------- ------------------------------ 
\                      pavadinimas   Savybė
======= ======== ===== ============= ============================== 

Pavyzdyje aukščiau turime tris lenteles, turinčias vieną bendrą stulpelį
`title`.

Daugiamatė lentelė pateikta viršuje, atitiktų tokią vienamatę lentelę:

========== ===================== ============================== 
type       name                  title  
========== ===================== ============================== 
dataset    datasets/gov/rc/ar/ws Duomenų rinkinys
resource   db                    Duomenų teikimo paslauga
model      **Gyvenviete**        Esybė
property   pavadinimas           Savybė
========== ===================== ============================== 

Kadangi DSA lentelė yra daugiamatė, nurodant stulpelį, jei kalbama apie
konkrečios dimensijos stulpelį, reikia nurodyti ir dimensiją, pavyzdžiui
`dataset.title` nurodo būtent apie `dataset` diemensijos `title` stulpelį.



.. _dataset:

dataset
*******

.. module:: dataset

Duomenų rinkinys struktūros apraše nurodomas tam, kad būtų galimybė susieti
duomenų struktūros elementus su duomenų rinkiniais registruotais duomenų
kataloge. Toks susiejimas atliekamas naudojant duomenų rinkinio kodinį
pavadinimą.

.. topic:: Brandos lygis

    :ref:`L203`
        Duomenų rinkinio ar duomenų erdvės kodinis pavadinimas neatitinka
        reikalavimų keliamų kodiniams pavadinimams.

.. note::

    Nurodytas duomenų rinkinio ar vardų erdvės kodinis pavadinimas turi būti
    unikalus tarp visų duomenų struktūros aprašų.

.. seealso::

    | :ref:`ns`
    | :ref:`kodiniai-pavadinimai`

.. data:: id

    Duomenų rinkinio arba duomenų erdvės unikalus identifikatorius.

.. data:: type

    Jei nenurodyta, pagal nutylėjimą naudojama `dataset` reikšmė, kuri nurodo
    duomenų rinkinio kodinį pavadinimą nurodyta :term:`duomenų kataloge
    <duomenų katalogas>`.

    Galimos reikšmės:

    ns
        Vardų erdvė.

    dataset
        Duomenų rinkinys.

    .. admonition:: Pavyzdys

        ======= ======== ===== ============= ==== ================ 
        dataset resource model property      type title           
        ======= ======== ===== ============= ==== ================ 
        datasets/gov/rc                      ns   Registrų centras
        ------------------------------------ ---- ---------------- 
        datasets/gov/rc/ar                   ns   Adresų registras
        ------------------------------------ ---- ---------------- 
        datasets/gov/rc/ar/ws                     Duomenų teikimo paslauga
        ==================================== ==== ================ 

.. data:: ref

    Duomenų rinkinio identifikatorius duomenų kataloge. Alternatyviai, galima
    naudoti :data:`dataset.source`.

    Nenaudojamas jei :data:`dataset.type` yra `ns`.

.. data:: source

    Nuoroda į duomenų rinkinio puslapį duomenų kataloge.

    Nenaudojama, jei `dataset.type` yra `ns`.

.. data:: prepare

    Nenaudojama.

.. data:: level

    Nenaudojamas.

    Duomenų rinkinio brandos lygis yra išskaičiuojamas iš :data:`model.level`
    ir :data:`property.level`.

.. data:: access

    Prieigos lygis, naudojamas pagal nutylėjimą viesiems šios vardų erdvės
    elementams.

.. data:: title

    Duomenų rinkinio ar vardų erdvės pavadinimas.

.. data:: description

    Duomenų rinkinio ar vardų erdvės aprašymas.

.. _resource:

resource
********

.. module:: resource

Fizinis duomenų šaltinis, kuriame saugomi duomenys.

Kiekvienam duomenų šaltiniui suteikiamas :ref:`kodinis pavadinimas <kodiniai
pavadinimai>`, kuris nėra naudojamas formuojant API URI, tačiau naudojamas
identifikuojant patį duomenų šaltinį.

Nurodytas duomenų šaltinio kodinis pavadinimas turi būti unikalus duomenų
rinkinio kontekste.

.. seealso::

    :ref:`duomenu-saltiniai`

.. data:: id

    Duomenų šaltinio unikalus identifikatorius.

.. data:: type

    Duomenų šaltinio tipas. Galimos reikšmės:

    ========= ============================
    `sql`     Reliacinės duomenų bazės
    `csv`     CSV lentelės
    `json`    JSON resursai
    `xml`     XML resursai
    ========= ============================

.. data:: ref

    Identifikatorius, naudojamas konfiguracijoje, kurioje pateikiamas pilnas
    resurso adresas ir kiti parametrai, tokie kaip slaptažodžiai ar
    prisijungimo vardai.

    Alternatyviai resurso pilną adresą galima nurodyti :data:`resource.source`
    stulpelyje.

.. data:: source

    Pilnas resurso adresas URI formatu.

    .. warning::

        Jei duomenų šaltinis reikalauja naudotojo vardo ir slaptažodžio,
        rekomenduojama nerodyti URI struktūros apraše, vietoj to prisijungimo
        duomenis prie šaltinio pateikti atskirame konfigūraciniame faile,
        naudojant :data:`resource.ref` stulpelį.

    **dialect** [ `+` **driver** ] `://` [ **user** `:` **password** `@` ]
    **host** [ `:` **port** ] `/` **path** [ `?` **params** ]

    dialect
        Duomenų šaltinio dialektas arba protokolas, kuriuo teikiami duomenys,
        galimi variantai:

        ================ ===========================
        `postgresql`     PostgreSQL duomenų bazė.
        `mysql`          MySQL duomenų bazė.
        `mariadb`        MariaDB duomenų bazė.
        `sqlite`         SQLite duomenų bazė.
        `oracle`         Oracle duomenų bazė.
        `mssql`          Microsoft SQL Server duomenų bazė.
        `http`, `https`  Duomenų failas publikuojamas HTTP protokolu.
        ================ ===========================

    driver
        Priklauso nuo **dialect** ir nuo naudojamo duomenų agento.

    user
        Duomenų šaltinio naudotojo vardas, jei duomenų šaltinis to reikalauja.

    password
        Duomenų šaltinio slaptažodis, jei duomenų šaltinis to reikalauja.

    host
        Duomenų šaltinio serverio adresas, jei duomenų šaltinis yra
        nuotoliniame serveryje.

    port
        Nuotolinio serverio prievado numeris.

    path
        Duomenų bazės pavadinimas arba kelias iki duomenų failo.

    params
        Papildomi parametrai, priklauso nuo naudojamo **driver**.


.. data:: level

    Duomenų šaltinio :ref:`brandos lygis <level>`, vertinant tik pagal formatą,
    nežiūrint į šaltinyje esančių duomenų turinį.

.. data:: access

    Duomenų šaltinio :ref:`prieigos lygis <access>`.

    Pildyti neprivaloma, jei nurodytas, tada visoms žemesnio lygio dimensijoms,
    pagal nutylėjimą taikomas nurodytas šaltinio prieigos lygis.

.. data:: title

    Duomenų šaltinio pavadinimas.

.. data:: description

    Duomenų šaltinio aprašymas.


Funkcijos
=========

.. module:: resource

.. function:: http(method="GET", body="form")

    Papildomi parametrai, reikaling konstruojant HTTP užklausas.

    **Argumentai**

    method (vardinis)
        HTTP `methodas <mdn-http-methods_>`_.

    body (vardinis)
        HTTP užklausos perduodamų duomenų formatas.

        Galimi variantai:

        ======= =============
        `json`  Duomenys perduodami JSON formatu.
        `xml`   Duomenys perduodami XML formatu.
        `form`  Duomenys perduodami `application/x-www-form-urlencoded` arba
                `multipart/form-data` (jei formoje pateikiami failai) formatu.
        ======= =============

    .. admonition:: Pavyzdys

        ========== ===== ====== ====================== ========
        resource   type  ref    source                 prepare
        ========== ===== ====== ====================== ========
        resource1  json         \https://example.com/  
        \          param name1  NAME1                  `query("value1")`
        \                name2  NAME2                  `query("value2")`
        ========== ===== ====== ====================== ========

        Bus konstruojamas toks URI:

        .. code-block:: uri

            https://example.com/?NAME1=value1&NAME2=value2




.. _base:

base
****

.. module:: base

Modelio bazė naudojama objekto identifikatoriams susieti, kai keli skirtingi
duomenų modeliai aprašo tą pačią realaus pasaulio esybę.

.. data:: ref

    :data:`model.property` reikšmė, kurios pagalba :data:`model` objektai
    siejami su :data:`base` objektais. Jei susiejimas pagal vieną :data:`model.property`
    yra neįmanomas, galima nurodyti kelis :data:`model.property` pavadinimus
    atskirtus kableliu.

    Galima naudoti tik tuos :data:`model.property`, kurie neturi nurodyto
    :data:`property.type`, kas reiškia, kad toks pat laukas turi būti tiek
    :data:`base`, tiek :data:`model` laukų sąraše.

    Tais atvejais, kai :data:`base.ref` rodo į modelio lauką, kuris turi tipą,
    tada :data:`base.level` negali būti didesnis nei `3`, kadangi jei modelio
    laukas turi tipą, tai reiškia, kad jo duomenys nesutampa su bazės
    duomenimis ir todėl jungimas negali būti daromas.

.. data:: level

    :ref:`Brandos lygis <level>`, nurodantis modelio susiejamumą su nurodytu
    baziniu modeliu. Plačiau žiūrėti :ref:`Ryšiai tarp modelių | Brandos lygis
    <ref-level>`.

    Jei brandos lygis yra žemesnis nei `3`, tada identifikatorių siejimas nėra
    atliekamas, tokiu būdu tiesiog nurodomas semantinis susiejimas metaduomenų,
    o ne duomenų lygmenyje.

.. data:: access

    Nenaudojamas.


Išoriniai identifikatoriai
==========================

Modelis ir jo bazė turi vienodus išorinius identifikatorius, nors vidiniai
šaltinio identifikatoriai gali skirtis.

Siejant :data:`model` ir :data:`base` duomenis tarpusavyje, :data:`model`
lentelė įgauna lygiai tokius pačius unikalius identifikatorius, kurie yra
:data:`base` lentelėje. Tai reiškia, kad :data:`model` lentelėje negali būti
duomenų, kurių nėra :data:`base` lentelėje.

Identifikatorių apjungimas atliekamas pagal :data:`model.ref` ir
:data:`base.ref` pateiktus pirminius raktus, kurie turi sutapti.

Visi :data:`base.ref` laukai turi būti aprašyti tiek :data:`base`, tiek
:data:`model` modeliusoe.


Paveldimumas
============

:data:`model` paveldi visus laukus iš :data:`base`, įskaitant ir tuos, kurie
nėra nurodyti prie :data:`model` laukų sąrašo. Tai reiškia, kad galima skaityti
ir rašyti duomenis į :data:`base`, per :data:`model`. Jei skaitomas ar rašomas
laukas, kurio nėra :data:`model` laukų sąraše, tada to lauko duomenys skaitomi
iš arba rašomi į :data:`base` modelį.

Skaitymas ir rašymas iš base įmanomas tik tuo atveju, jei tai palaiko duomenų
šaltinis.


Duomenų lokalumas
=================

Visi modelio laukai, kurie neturi :data:`property.type`, fiziškai saugomi
:data:`base` modelio šaltinyje.

Jei :data:`base` stulpelyje nurodoma `/` reikšmė, tai reiškia, kad
:data:`model` neturi bazės, arba modelio bazė yra panaikinama. `/` naudojamas
tais atvejais, kai norima vieną ar kelis modelius prijungti prie vienos bazės,
tačiau sekantys modeliai nebeturi priklausyti jokiai bazei.

Persidengimas
=============

Tais atvejais, kai :data:`property` yra saugomas tiek :data:`base`, tiek
:data:`model` lentelėse, norint gauti persidengiančios savybės duomenis iš
:data:`base`, reikia naudoti `_base.` prefiksą.

`_base` rodo į bazinį modelė.


Pavyzdžiai
==========

.. admonition:: Pavyzdys

    ======== ===== ====== =========== ========= ========= ==================
    dataset  base  model  property    type      ref       source
    ======== ===== ====== =========== ========= ========= ==================
    example                                                           
    --------------------------------- --------- --------- ------------------
    \              Location                     id       
    -------- ----- ------------------ --------- --------- ------------------
    \                     id          integer
    \                     name\@lt    text
    \                     population  integer
    \        Loocation                          name\@lt 
    -------- ------------------------ --------- --------- ------------------
    \              City                         name\@lt  CITY
    -------- ----- ------------------ --------- --------- ------------------
    \                     name\@lt                        NAME
    \                     population                      POPULATION
    \        /
    -------- ------------------------ --------- --------- ------------------
    \              Village                      name\@lt  VILLAGE
    -------- ----- ------------------ --------- --------- ------------------
    \                     name\@lt                        VILLAGE
    \                     population                      POPULATION
    \                     region      ref       Location  REGION
    \        /
    ======== ======================== ========= ========= ==================

    Šiame pavyzdyje esminis skirtumas yra tas, kad nurodyta kaip daromas jungimas.
    `City` ir `Village` su `Location` jungiame per `name\@lt` lauką.


.. .. _duomenų-modelis:
.. _model:

model
*****

.. module:: model

Duomenų modelio :ref:`kodinis pavadinimas <kodiniai-pavadinimai>`. Užrašomas
vienaskaitos forma iš didžiosios raidės, jei pavadinimas iš kelių žodžių,
žodžiai atskiriami didžiąja raide.

.. admonition:: Pavyzdžiai

    | `Gyvenviete`
    | `AdministracinisTipas`

Modelis yra siejamas su realaus pasaulio esybėmis. Viena esybė gali turėti
kelis skirtingus duomenų modelius, su skirtingomis savybėmis, tačiau skirtingi
vienos esybės modeliai turi turėti vienodus identifikatorius.

.. topic:: Brandos lygis

    :ref:`L203`
        Modelio kodinis pavadinimas neatitinka reikalavimų keliamų kodiniams
        pavadinimams.

.. data:: type

    .. versionchanged:: 0.2

        Nuo 0.2 versijos nurodo modelio bazę.

    Nurodo modelio bazę arba esybę, kurios pagalba skirtingiems modeliams
    suteikiami vienodi identifikatoriai.

    Jei nurodyta modelio bazė, :data:`model.ref` nurodytas pirminis raktas turi
    sutapti su bazinio modelio pirminiu raktu.

    Taip pat turi sutapti ir modelio savybės su baziniu modeliu. Tačiau modelis
    gali turėti ir papildomų savybių, kurių nėra baziniame modelyje.
    Vienintelis privalomas reikalavimas yra pirminio rakto susiejimas, kad
    modelis ir bazinis modelis turėtu vienodus identifikatorius.

    .. topic:: Brandos lygis

        :ref:`L103`
            Modelis yra susietas su bazinio registro esybe metaduomenų
            lygmeniu, tačiau nėra tokio identifikatoriaus kuris leistu susieti
            ir pačius duomenis.

        :ref:`L209`
            Modelis nėra susietas su baziniame registre apibrėžta esybe.

    .. admonition:: Pavyzdys

        **Duomenų modelis**

        .. mermaid::
        
           classDiagram
        
             class ns1Gyvenviete["ns1:Gyvenviete"]
             class ns2Gyvenviete["ns2:Gyvenviete"]
             class Location["locn:Location"] {
               + code: integer [1..1]
               + name: text [1..1]
             }
             ns1Gyvenviete --|> Location
             ns2Gyvenviete --|> Location

        |

        **Struktūros aprašas**

        ======= ===== ======== ================== ====
        dataset model property type               ref
        ======= ===== ======== ================== ====
        locn                                     
        ---------------------- ------------------ ----
        \       **Location**                      code
        ------- -------------- ------------------ ----
        \             code     integer           
        \             name\@en string            
        ns1                                      
        ---------------------- ------------------ ----
        \       **Gyvenviete** **/locn/Location** code
        ------- -------------- ------------------ ----
        \             code     integer           
        \             name\@lt string            
        ns2                                      
        ---------------------- ------------------ ----
        \       **Gyvenviete** **/locn/Location** code
        ------- -------------- ------------------ ----
        \             code     integer           
        \             name\@lt string            
        ======= ===== ======== ================== ====

        Pavyzdyje turime tris modelius iš skirtingų duomenų rinkinių,
        `ns1:Gyvenviete` ir `ns2:Gyvenviete` nurodo `locn:Location` kaip šių
        modelių bazę, tai reiškia, kad visi trys modeliai realiame pasaulyje
        yra viena esybė, turinti vienodus identifikatorius skirtinguose
        modeliuose.

.. data:: ref

    Kableliu atskirtas sąrašas :data:`model.property` duomenų laukų pavadinimų,
    kurie kartu unikaliai identifikuoja vieną duomenų eilutę (pirminis lentelės
    raktas arba identifikatorius).

    Jei nurodytas :data:`model.type`, pirminis raktas būtinai turi sutapti su
    :data:`model.type` pirminiu raktu.

    Jei modelio objektą unikaliai identifikuoja keli duomenų laukai,
    :data:`model.ref` stulpelyje galima nurodyti kelis duomenų laukus atskirtus
    kableliu.

    .. topic:: Brandos lygis

        :ref:`L003`
            Nenurodytas objekto identifikatorius.

        :ref:`L104`
            Nurodytas objekto identifikatorius nėra unikalus, turi
            pasikartojančių reikšmių.

        :ref:`L204`
            Nurodytas objekto identifikatorius yra unikalus, tačiau
            nepatikimas, kadangi nurodytas duomenų laukas, kuris gali keistis,
            tarkime pavadinimas.

        :ref:`L301`
            Nurodytas objekto identifikatorius yra patikimas, tačiau nėra
            siejamas su globaliu objekto identifikatoriumi.

.. data:: source

    Modelio duomenų šaltinis, vieta ar pavadinimas fiziniame duomenų modelyje.

    Kas įrašoma į šį stulpelį priklauso nuo duomenų šaltinio :data:`resource.type`.

    SQL atveju, tai bus lentelės pavadinimas, XML atveju - XPath išraiška, JSON
    atveju - JSONPath išraiška, skirtingi duomenų šaltiniai gali naudoti
    skirtingą sintaksę vietai (kur fiziškai saugomi duomenys) apibūdinti.

    Jei duomenys publikuojami :ref:`vidinėje saugykloje <internal-backend>`,
    :data:`model.source` pildyti nereikia, kadangi vidinės saugyklos fizinio ir
    loginio modelio pavadinimai yra tokie patys.

    .. topic:: Brandos lygis

        :ref:`L004`
            Nenurodytas modelio duomenų šaltinis :data:`model.source` ir duomenys nėra
            publikuojami :ref:`vidinėje saugykloje <internal-backend>`.

.. data:: prepare

    Formulė skirta duomenų filtravimui ir paruošimui, iš dalies priklauso nuo
    :data:`resource.type`.

    .. seealso::

        | :ref:`formulės`
        | :ref:`duomenų-atranka`


.. data:: level

    Modelio :ref:`brandos lygis <level>`, nusakantis pačio modelio brandos
    lygį, pavyzdžiui ar nurodytas pirminis raktas, ar modelio pavadinimas
    atitinka kodiniams pavadinimams keliamus reikalavimus.

    .. seealso::

        :ref:`ref-level`

.. data:: access

    Modeliui priklausančių laukų :ref:`prieigos lygis <access>`.

    Modelio prieigos lygis yra išskaičiuojamas iš modeliui priskirtų duomenų laukų, imant didžiausią prieigos lygmenį nurodytą prie duomenų lauko. Pavyzdžiui, jei bent vienas duomenų laukas turi aukščiausią `open` prieigos lygmenį, tada ir viso modelio prieigos lygis tampa `open`.

    .. seealso::

        :ref:`access`

.. data:: uri

    Sąsaja su OWL_, RDFS_ ontologijomis ar SKOS_ kontroliuojamais žodynais.

    Jei nenurodyta, generuojamas pavadinimas pagal tokį šabloną:

    `https://data.gov.lt/id/` **dataset** `/` **model**

    .. admonition:: Pavyzdys

        ::

            https://data.gov.lt/id/datasets/gov/rc/ar/ws/Location

    Struktūros apraše galima nurodyti automatiškai generuojamus URI.

    .. admonition:: Pavyzdys

        ======= ===== ================ ================== ==== ============ 
        dataset model property         type               ref  uri        
        ======= ===== ================ ================== ==== ============
        adresai                                                            
        ------------------------------ ------------------ ---- ------------
        \                              prefix             ar   \https://data.gov.lt/id/adresai/
        \       **Location**                              code             
        ------- ---------------------- ------------------ ---- ------------
        \             code             integer                 ar:code     
        \             name\@en         string                  ar:name     
        datasets/gov/ivpk/dp/api                                           
        ------------------------------ ------------------ ---- ------------
        \                              prefix             ar   \https://data.gov.lt/id/adresai/
        \       **Gyvenviete**                            code ar:Location 
        ------- ---------------------- ------------------ ---- ------------
        \             code             integer                 ar:code     
        \             name\@lt         string                  ar:name
        ======= ===== ================ ================== ==== ============

        Šiame pavyzdyje `ar:Location` yra URI, kuris yra automatiškai
        generuojamas `adresai` duomenų rinkinyje.

    .. seealso::

        :ref:`vocab`

.. data:: title

    Trumpas modelio pavadinimas pirmas žodis iš didžiosios raidės, pavadinimo
    gale taško nereikia.

    Pavadinime nereikia kartoti duomenų rinkinio pavadinimo. Modelio
    pavadinimas rašomas duomenų rinkinio kontekste.

.. data:: description

    Modelio aprašymas.

.. data:: property

    Modeliui priklausantis duomenų laukas.


Funkcijos
=========

.. module:: model

.. function:: distinct()

    Jei :data:`model.ref` pirminis raktas nėra unikalus ir norma panaikinti
    besidubliuojančias reikšmes, galima nurodyti `distinct()` funkciją, kuri
    panaidins objktus su besidubliuojančiais pirminiais raktais.

    .. admonition:: Pavyzdys

        Turint tokius duomenis duomenų šaltinyje:

        ========= ==========
        CITY      COUNTRY
        ========= ==========
        Vilnius   Lithuania
        Kaunas    Lithuania
        ========= ==========

        Ir struktūros aprašą, kuriame `COUNTY` aprašytas, kaip atskiras
        modelis:

        ====== =========  ======== ============= ======== ============= ======= ========
        model  property   type     ref           source   prepare       level   access
        ====== =========  ======== ============= ======== ============= ======= ========
        **Country**                name\@en      CITIES   `distinct()`  4      
        ----------------  -------- ------------- -------- ------------- ------- --------
        \      name\@en   string                 COUNTRY                4       open
        **City**                   name\@en      CITIES                 4      
        ----------------  -------- ------------- -------- ------------- ------- --------
        \      name\@en   string                 CITY                   4       open
        \      country    ref      **Country**   COUNTRY                3       open
        ====== =========  ======== ============= ======== ============= ======= ========

        `distinct()` funkcija panaikina besidubliuojančius objektus ir grąžina
        tik vieną šalį.

.. .. _savybė:
.. _property:

property
********

.. module:: property

Savybė yra duomenų laukas, modelio atributas.

.. data:: source

    Duomenų lauko pavadinimas šaltinyje. Prasmė priklauso nuo
    :data:`resource.type`.

.. data:: prepare

    Formulė skirta duomenų tikrinimui ir transformavimui arba statinės reikšmės
    pateikimui.

.. data:: type

    Nurodomas loginis duomenų tipas. Dėl galimų tipų sąrašo žiūrėti
    :ref:`duomenų-tipai`.

    Loginis duomenų tipas yra toks tipas, kurį tikitės gauti publikuojant
    duomenis per API. Loginis tipas gali skirtis nuo duomenų šaltinio tipo.

    Visi duomenų tipai gali turėti tokius parametrus:

    - `required` - nurodo, kad šis duomenų laukas yra privalomas, tai reiškia,
      kad šio duomenų lauko reikšmė visada turi būti pateikta. Pagal nutylėjimą
      visi modelio duomenų laukai yra neprivalomi.

    Kai kurie duomenų tipai, gali turėti konkrečiam duomenų tipui pateikiamus
    papildomus parametrus, tokie parametrai nurodomi skliausteliuose.

    Dupmenų tipų pavyzdžiai:

    - `integer`

    - `integer required`

    - `geometry`

    - `geometry(linestringm, 3345) required`

.. data:: ref

    Priklauso nuo `property.type`, nurodo matavimo vienetus, laiko ar vietos
    tikslumą, :ref:`klasifikatorių <enum>` arba :ref:`ryšį su kitais modeliais
    <ryšiai>`. Ką tiksliai reiškia šis laukas, patikslinta skyrelyje
    :ref:`duomenų-tipai`.

.. data:: level

    Nurodo duomenų lauko brandos lygį. Žiūrėti :ref:`level`.

.. data:: access

    Nurodo prieigos prie duomenų lygį. Žiūrėti skyrių :ref:`access`.

.. data:: uri

    Sąsaja su išoriniu žodynu. Žiūrėti :ref:`vocab`.

.. data:: title

    Duomenų lauko pavadinimas. Šis pavadinimas yra skirtas skaityti žmonėms
    ir bus rodomas duomenų laukų sąrašuose ir antraštėse. Jei nenurodyta, bus
    naudojamas :data:`property` kodinis pavadinimas.

.. data:: description

    Duomenų lauko aprašymas.

.. data:: enum

    Žiūrėti :ref:`enum`.


.. _papildomos-dimensijos:

Papildomos dimensijos
#####################

.. .. _išorinių-žodynų-prefiksai:
.. _prefix:

prefix
******

.. module:: prefix

Sąsają su išoriniais žodynais galima pateikti :data:`model.uri` ir
:data:`property.uri` stulpeliuose. Tačiau prieš naudojant žodynus, pirmiausia
reikia apsirašyti žodynų prefiksus. Žodynų prefiksai aprašomi taip:


.. data:: ref

    Prefikso pavadinimas.

    Rekomenduojama naudoti prefix.cc_ paslaugą URI prefiksų pavadinimams.

.. data:: uri

    Išorinio žodyno URI.

.. data:: title

    Prefikso antraštė.

.. data:: description

    Prefikso aprašymas.

Rekomenduojama naudoti LOV_ prefiksus.

.. _LOV: https://lov.linkeddata.es/dataset/lov/

Aprašyti prefiksai gali būti naudojami :data:`model.uri` ir :data:`property.uri`
stulpeliuose tokiu būdu: `prefix:name`.

Pavyzdys:

== == == == ============ ======== ========= ====================================================
d  r  b  m  property     type     ref       uri                                                 
== == == == ============ ======== ========= ====================================================
dataset1                                                                                        
------------------------ -------- --------- ----------------------------------------------------
\                        prefix   spinta    \https://github.com/atviriduomenys/spinta/issues/
\                                 dsa       \https://ivpk.github.io/dsa/
\                                 dct       \http://purl.org/dc/dcmitype/
dataset2                                                                                        
------------------------ -------- --------- ----------------------------------------------------
\                        prefix   dcat      \http://www.w3.org/ns/dcat#
\                                 dct       \http://purl.org/dc/terms/
\                                 dctype    \http://purl.org/dc/dcmitype/
\                                 foaf      \http://xmlns.com/foaf/0.1/
\                                 owl       \http://www.w3.org/2002/07/owl#
\                                 prov      \http://www.w3.org/ns/prov#
\                                 rdf       \http://www.w3.org/1999/02/22-rdf-syntax-ns#
\                                 rdfs      \http://www.w3.org/2000/01/rdf-schema#
\                                 sdo       \http://schema.org/
\                                 skos      \http://www.w3.org/2004/02/skos/core#
\                                 vcard     \http://www.w3.org/2006/vcard/ns#
\                                 xsd       \http://www.w3.org/2001/XMLSchema#
== == == == ============ ======== ========= ====================================================

Prefiksai turi būti apibrėžti duomenų rinkinio kontekste, kadangi skirtingi
duomenų rinkiniai gali naudoti skirtingus prefiksus, tiems patiems URI.
Pavyzdžiui abiejuose rinkinių pavyzdžiuose aukščiau, `dct` iš `dataset1` ir
`dctype` iš `dataset2` rodo į tą patį URI.


.. _enum:

enum
****

.. module:: enum

.. _Categorical data: https://pandas.pydata.org/pandas-docs/stable/user_guide/categorical.html

Tam tikri duomenų laukai turi fiksuotą reikšmių variantų aibę. Dažnai duomenų
bazėse fiksuotos reikšmės saugomos skaitine forma ar kitais kodiniais
pavadinimais. Tokias fiksuotas reikšmes duomenų struktūros apraše galima
pateikti neužpildant hierarchinių stulpelių ir nurodant `type` reikšmę
`enum`, pavyzdžiui:

+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
| id | d | r | b | m | property | type    | ref | source    | prepare   | level | access | uri | title   | description |
+====+===+===+===+===+==========+=========+=====+===========+===========+=======+========+=====+=========+=============+
|  1 | datasets/example/places  |         |     |           |           |       |        |     |         |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  2 |   | places               | sql     |     | sqlite:// |           |       |        |     |         |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  3 |   |   |   | Place        |         | id  | PLACES    |           |       |        |     |         |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  4 |   |   |   |   | id       | integer |     | ID        |           | 3     | open   |     |         |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  5 |   |   |   |   | type     | string  |     | CODE      |           | 3     | open   |     |         |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  6 |   |   |   |   |          | enum    |     | 1         | "city"    |       |        |     | City    |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  7 |   |   |   |   |          |         |     | 2         | "town"    |       |        |     | Town    |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  8 |   |   |   |   |          |         |     | 3         | "village" |       |        |     | Village |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+
|  9 |   |   |   |   | name     | string  |     | NAME      |           | 3     | open   |     |         |             |
+----+---+---+---+---+----------+---------+-----+-----------+-----------+-------+--------+-----+---------+-------------+

Šiame pavyzdyje `Place.type` laukas yra klasifikatorius, kurio reikšmės yra
kodai 1, 2 ir 3, kurios duomenų struktūros apraše keičiamos į `city`, `town`
ir `village`, papildomai `title` stulpelyje nurodant reikšmės pavadinimą.

Jei tas pats klasifikatorius gali būti naudojamas keliose skirtingose vietose,
tada galima iškelti klasifikatorių ir suteikti jam pavadinimą, pavyzdžiui:

+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
| id | d | r | b | m | property | type    | ref     | source    | prepare       | level | access | uri | title   | description |
+====+===+===+===+===+==========+=========+=========+===========+===============+=======+========+=====+=========+=============+
|  1 | datasets/example/places  |         |         |           |               |       |        |     |         |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  2 |   |   |   |   |          | enum    | place   | 1         | "city"        |       |        |     | City    |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  3 |   |   |   |   |          |         |         | 2         | "town"        |       |        |     | Town    |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  4 |   |   |   |   |          |         |         | 3         | "village"     |       |        |     | Village |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  5 |   | places               | sql     |         | sqlite:// |               |       |        |     |         |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  6 |   |   |   | Place        |         | id      | PLACES    |               |       |        |     |         |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  7 |   |   |   |   | id       | integer |         | ID        |               | 3     | open   |     |         |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  8 |   |   |   |   | type     | string  | place   | CODE      |               | 3     | open   |     |         |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+
|  9 |   |   |   |   | name     | string  |         | NAME      |               | 3     | open   |     |         |             |
+----+---+---+---+---+----------+---------+---------+-----------+---------------+-------+--------+-----+---------+-------------+

Šiuo atveju, klasifikatoriui buvo suteiktas pavadinimas `place` įrašytas
`enum.ref` stulpelyje, 2-oje eilutėje. O `Place.type` laukui, `property.ref`
stulpelyje nurodyta, kad šis laukas naudoja vardinį `place` klasifikatorių.


.. data:: ref

    Pasirinkimų sąrašo pavadinimas.

.. data:: source

    Pateikiama originali reikšmė, taip kaip ji saugoma duomenų šaltinyje.
    Pateiktos reikšmės turi būti unikalios ir negali kartotis.

    Jei pageidaujama aprašyti tuščią šaltinio reikšmę, tada
    :data:`property.prepare` celėje reikia nurodyti formulę, kuri tuščią
    reikšmę pakeičia, į kokią nors kitą. Formulės pavyzdys:

    .. code-block:: python

        swap('', '-')

.. data:: prepare

    Pateikiama reikšmė, tokia kuri bus naudojama atveriant duomenis.
    :data:`model.prepare` filtruose taip pat bus naudojama būtent ši
    reikšmė.

    `enum.prepare` reikšmės gali kartotis, tokiu būdu, kelios skirtingos
    `enum.source` reikšmės bus susietos su viena `enum.prepare` reikšme.

.. data:: level

    Nurodo klasifikatoriaus sąvokos brandos lygį. Žiūrėti :ref:`level`.




.. data:: access

    Klasifikatoriams galima nurodyti skirtingas prieigos teises, tokiu
    atveju, naudotojas turintis `open` prieigą matys tik tuos duomenis,
    kurių klasifikatorių reikšmės turi `open` prieigos teises, visi kiti bus
    išfiltruoti.

.. data:: uri

    Sąsaja su išoriniu žodynu, pateikiant `skos:Concept` URI. Žiūrėti :ref:`vocab`.

.. data:: title

    Fiksuotos reikšmės pavadinimas.

.. data:: description

    Fiksuotos reikšmės aprašymas.

Pagal nutylėjimą, jei :data:`property.prepare` yra tuščias ir :data:`property`
turi :ref:`enum` sąrašą, tada jei šaltinis turi neaprašytą reikšmę, turėtų
būti fiksuojama klaida.

Jei yra poreikis fiksuoti tik tam tikras reikšmes, o visas kitas palikti tokias,
kokios yra šaltinyje, tada :data:`property.prepare` stulpelyje reikia įrašyti
`self.choose(self)`.


.. _param:

param
*****

.. module:: param

Parametrai leidžia iškelti tam tikras duomenų paruošimo operacijas į parametrus
kurie gali būti naudojami :ref:`dimensijos`, kurioje apibrėžtas parametras
kontekste. Parametrai gali gražinti :term:`iteratorius`, kurių pagalba galima
dinamiškai kartoti :data:`resource` duomenų skaitymą, panaudojant aprašytus
parametrus. Taip pat parametrų pagalba galima sudaryti reikšmių sąrašus, kurių
pagalba galima kartoti :data:`resource` su kiekviena reikšme.

Parametrai dažniausiai naudojami žemesnio brandos lygio duomenų šaltiniams
aprašyti, o taip pat API atvejais, kai duomenys atiduodami dinamiškai.

Parametrai aprašomi pasitelkiant papildomą :ref:`param` dimensiją.

=== === === ============ ========= ======================= ============================= ======================= 
d   r   m   property     type      ref                     source                        prepare                
=== === === ============ ========= ======================= ============================= ======================= 
datasets/example/cities
------------------------ --------- ----------------------- ----------------------------- ----------------------- 
\   places               csv                               \https://example.com/{}.csv                          
--- -------------------- --------- ----------------------- ----------------------------- ----------------------- 
\       **Country**                id                      countries                                            
--- --- ---------------- --------- ----------------------- ----------------------------- ----------------------- 
\           code         string                            CODE                                                 
\           title        string                            TITLE                                                
\       **City**                   country, title          cities/{code}
--- --- ---------------- --------- ----------------------- ----------------------------- ----------------------- 
\                        param     code                    **Country**                   read().code           
\           country      ref       **Country**             code                          param()
\           title        string                            TITLE                                                
=== === === ============ ========= ======================= ============================= ======================= 

.. data:: ref

    Parametro :term:`kodinis pavadinimas`.

.. data:: prepare

    Formulė, kuri grąžina sąrašą reikšmių aprašomam parametrui.

.. data:: source

    Nurodoma parametro reikšmė šaltinyje, kuri yra pateikiama kaip pirmas
    :data:`param.prepare` funkcijos argumentas.

    Jei :data:`param.prepare` nenurodyta jokia formulė, tada bus naudojam
    konstanta nurodyta :data:`param.source` stulpelyje.

    .. admonition:: Pavyzdys

        Jei :data:`param.prepare` pateikta formulė :func:`param.read`, o
        :data:`param.source` nurodyta `Country`, tai formulė bus iškviesta kaip
        `read("Country")`.

Jei parametro reikšmė yra :term:`iteratorius`, tada :term:`dimensija`, kurios
kontekste yra aprašytas :ref:`parametras <param>` yra kartojama tiek kartų,
kiek reikšmių grąžina :term:`iteratorius`.

Jei yra keli :ref:`param` grąžinantys :term:`iteratorius`, tada iš
visų :term:`iteratorių <iteratorius>` sudaroma `Dekarto sandauga`_ ir
:data:`resource` dimensija vykdoma su kiekviena sandaugos rezultato reikšme.

.. _Dekarto sandauga: https://lt.wikipedia.org/wiki/Dekarto_sandauga

Jei sekančioje :term:`DSA` eilutėje, einančioje po eilutės, kurioje aprašytas
:ref:`param`, nenurodytas :data:`type` ir neužpildytas joks kitas
:term:`dimensijos <dimensija>` stulpelis, tada parametras tampa
:term:`iteratoriumi <iteratorius>`, kurio reikšmių sąrašą sudaro sekančiose
eilutėse patektos :data:`source` ir :data:`prepare` reikšmės. Pavyzdžiui
anksčiau pateiktą pavyzdį galima būtų perdaryti taip:

======== ========= ====== ========= ======= =============== ============================= ================= 
dataset  resource  model  property  type    ref             source                        prepare          
======== ========= ====== ========= ======= =============== ============================= ================= 
datasets/example/cities                                                                            
----------------------------------- ------- --------------- ----------------------------- ----------------- 
\        places                     csv                     \https://example.com/{}.csv                    
-------- -------------------------- ------- --------------- ----------------------------- ----------------- 
\                  **Country**              id              countries                                      
-------- --------- ---------------- ------- --------------- ----------------------------- ----------------- 
\                         code      string                  CODE                                           
\                         title     string                  TITLE                                          
\                  **City**                 country, title  cities/{country}                               
-------- --------- ---------------- ------- --------------- ----------------------------- ----------------- 
\                                   param   country         lt
\                                                           lv
\                                                           ee
\                         country   ref     **Country**                                   `param(country)`
\                         title     string                  TITLE                                          
======== ========= ====== ========= ======= =============== ============================= ================= 

Šiame pavyzdyje, parametras `country` grąžins tris šalies kodus: lt, lv ir
ee, kurie bus panaudojami `cities/{country}` pavadinime, pakeičiant
`{country}` dalį.

:ref:`param` reikšmės pasiekiamos naudojant pavadinimą įrašytą
:data:`param.ref` stulpelyje. Pavyzdžiui, jei :data:`param.ref` stulpelyje
įrašyta `x`, tada `x` parametro reikšmę galima gauti taip:

source
    `{x}`.

prepare
    `x` arba `param(x)`.

Funkcijos
=========

Parametrų generavimui galima naudoti tokias formules:

.. module:: param

.. function:: read(model)

    Sukuriama priklausomybė nuo kito modelio, skaitomi duomenys iš kito modelio
    ir su kiekvienu objektu, kreipiamasi į :data:`resource.source`, panaudojant
    nuskaitytą objektą kaip parametrą formuojant šaltinio užklausą.

.. function:: range(stop)

    Sveikų skaičių generavimas nuo 0 iki `stop`, `stop` neįeina.

.. function:: range(start, stop)
    :noindex:

    Sveikų skaičių generavimas nuo `start` iki `stop`, `stop` neįeina.

.. function:: path(name, value)

    Parametras pateikia URI path dalies parametrą.

    :data:`resource.source` URI path parametrų vieta pateikiama `{}` skliaustų
    viduje, pavyzdžiui `/cities/{id}` nurodytas parametras `id`.

    Funkcija gali būti iškviestai tokiais būdais:

    - `path(value)`
    - `path(name, value)`

    **Argumentai**

    name
        Parametro pavadinimas nurodytas `{}` riestinių skliaustelių viduje. Jei
        nenurodyta, tada naudojamas :data:`param.source`, jei šis nenurodytas,
        tada naudojamas :data:`param.ref` pavadinimas.

    value
        Parametro reikšmė, gali būti statinė arba dinaminė.

    .. admonition:: Pavyzdys

        ========== ===== ====== ================ ========
        resource   type  ref    source           prepare
        ========== ===== ====== ================ ========
        resource1  json         \/cities/{id}/   
        \          param id                      `path(42)`
        ========== ===== ====== ================ ========

        Bus konstruojamas toks URI:

        .. code-block:: uri

            /cities/42/


.. function:: query(name, value)

    Parametras pateikia URI query dalies parametrą.

    Jei :data:`resource.source` jau turi query parametrus, jei bus papildyti
    arba perrašyti.

    **Argumentai**

    name
        Nurodo URI query parametro pavadinimą, nurodomas :data:`param.source`
        stulpelyje.

    value
        URI query paramtro reikšmė.

    .. admonition:: Pavyzdys

        ========== ===== ====== ====================== ========
        resource   type  ref    source                 prepare
        ========== ===== ====== ====================== ========
        resource1  json         \https://example.com/  
        \          param name1  NAME1                  `query("value1")`
        \                name2  NAME2                  `query("value2")`
        ========== ===== ====== ====================== ========

        Bus konstruojamas toks URI:

        .. code-block:: uri

            https://example.com/?NAME1=value1&NAME2=value2


.. function:: header(name, value)

    Parametras pateikiamas, kaip HTTP antraštė.

    **Argumentai**

    name
        Nurodo HTTP antraštės pavadinimą, nurodomas :data:`param.source`
        stulpelyje.

    value
        HTTP antraštės reikšmė.

    .. admonition:: Pavyzdys

        ========== ===== ====== ====================== ========
        resource   type  ref    source                 prepare
        ========== ===== ====== ====================== ========
        resource1  json         \https://example.com/  
        \          param name1  X-Name1                `header("value1")`
        \                name2  X-Name2                `header("value2")`
        ========== ===== ====== ====================== ========

        Bus konstruojama tokia HTTP užklausa:

        .. code-block:: http

            GET / HTTP/1.1
            X-Name1: value1
            X-Name2: value2


.. function:: body(name, value, parent, type)

    Generuoja XML, JSON ar kito formato dokumentą, kuris pateikiamas HTTP
    užklausos metu.

    **Argumentai**

    name
        JSONPath_ arba XPath_ išraiška, priklauso nuoo :data:`resource.prapare`
        nurodytos :func:`resource.http` `body` tipo.

        Nurodoma :data:`param.source` stulpelyje.

    value
        Reikšmė suteikiama `name` elementui http užklausos struktūroje.

    parent (neprivalomas)
        Parametro pavadinimas, kurio pagrindu konstruojamas naujas dokumentas.

    type (neprivalomas, vardinis)
        Naudojamas konstruojant naują dokumentą, jei nurodytas, kiti argumentai
        turi būti nepateikti.

    .. admonition:: Pavyzdys (JSON)

        ========== ===== ====== ====================== ========
        resource   type  ref    source                 prepare
        ========== ===== ====== ====================== ========
        resource1  json         \https://example.com/  `http(body: json)`
        \          param name1  NAME1                  `body("value1")`
        \                name2  NAME2                  `body("value2")`
        \                name3  NESTED.NAME3           `body("value3")`
        \                name4  ARRAY[].NAME4          `body("value4")`
        \                name5  MATRIX[]               `body()`
        \                       MATRIX[][]             `body("value5")`
        \                       MATRIX[]               `body()`
        \                       MATRIX[][]             `body("value6")`
        \                       MATRIX[][]             `body("value7")`
        ========== ===== ====== ====================== ========

        .. code-block:: json

            {
                "NAME1": "value1",
                "NAME2": "value2",
                "NESTED": {
                    "NAME3": "value3",
                },
                "ARRAY": [
                    {"NAME4": "value4"}
                ],
                "MATRIX": [
                    ["value5"],
                    ["value6", "value7"]
                ]
            }

    .. admonition:: Pavyzdys (XML)

        ========== ===== ====== ====================== ========
        resource   type  ref    source                 prepare
        ========== ===== ====== ====================== ========
        resource1  json         \https://example.com/  `http(body: xml)`
        \          param name1  DATA/\@NAME1           `body("value1")`
        \                name2  DATA/NAME2             `body("value2")`
        \                name3  DATA/NESTED/NAME3      `body("value3")`
        \                name4  DATA/ARRAY/NAME4       `body("value4")`
        \                name5  DATA/ARRAY/NAME4       `body("value5")`
        ========== ===== ====== ====================== ========

        .. code-block:: xml

            <?xml version="1.0" encoding="utf-8"?>
            <DATA NAME1="value1">
                <NAME2>value2</NAME2>
                <NESTED>
                    <NAME3>value3</NAME3>
                </NESTED>
                <ARRAY>
                    <NAME4>value4</NAME4>
                    <NAME4>value5</NAME4>
                </ARRAY>
            </DATA>

    .. admonition:: Pavyzdys (maišytas)

        ========== ===== ====== ====================== ========
        resource   type  ref    source                 prepare
        ========== ===== ====== ====================== ========
        resource1  json         \https://example.com/  `http(body: xml)`
        \          param name1  DATA/\@NAME1           `body("value1")`
        \                name2  DATA/NAME2             `body(name3)`
        \                name3                         `body(type: json)`
        \                name4  NAME4                  `body("value4", name3)`
        \                name5  NAME5                  `body("value5", name3)`
        ========== ===== ====== ====================== ========

        .. code-block:: xml

            <?xml version="1.0" encoding="utf-8"?>
            <DATA NAME1="value1">
                <NAME2><![CDATA[
                    {
                        "NAME4": "value4",
                        "NAME5": "value5"
                    }
                ]]></NAME2>
            </DATA>

Jei užpildytas :data:`param.source` stulpelis, tada :data:`param.prepare`
stulpelyje galima naudoti filtrą nurodyto :data:`param.source` modelio duomenims
filtruoti, o naudojant parametrus galima nurodyti ir modelio laukų pavadinimus,
pavyzdžiui:

source
    `{x.field}`.

prepare
    `x.field` arba `param(x).field`.


.. _switch:

switch
******

.. module:: switch

Tam tikrais atvejais duomenis tenka normalizuoti parenkant tam tikrą reikšmę jei
tenkinama nurodyta sąlyga. Tokias situacijas galima aprašyti pasitelkiant
:data:`switch` dimensiją.

.. data:: switch.source

    Reikšmė, kuri bus atveriama.

.. data:: switch.prepare

    Sąlyga, naudojant einamojo modelio laukus. Jei sąlyga tenkinama, tada
    laukui priskiriama :data:`switch.source` reikšmė. Jei sąlyga
    netenkinama, tada bandoma tikrinti sekančią sąlygą. Parenkama ta
    reikšmė, kurios pirmoji sąlyga tenkinama.

    Jei :data:`switch.prepare` yra tuščias, tada sąlyga visada teigiama ir
    visada grąžinama :data:`switch.source` reikšmė.


.. _comment:

comment
*******

.. module:: comment

Dirbant su :term:`DSA` yra galimybė komentuoti eilutes, naudojant papildomą
:data:`comment` dimensiją, kurią galima naudoti bet kurios kitos dimensijos
kontekste.


.. data:: id

    Komentaro numeris.

.. data:: ref

    Komentuojamo vieno ar kelių kableliu atskirtų :data:`property`
    pavadinimai. Galima nurodyti ne tik stulpelio pavadinimą, bet ir
    dimensiją.

.. data:: source

    Komentaro autorius.

.. data:: prepare

    Keitimo pasiūlymas, naudojant `create()`, `update` ir `delete()` funkcijas. Pavyzdžiui::

        update(property: "pavadinimas@lt", type: "text")

    Šiuo atveju nurodoma, kad siūloma keisti `property` pavadnimą į
    `pavadinimas@lt`, o `type` į `text`.

.. data:: level

    Nurodoma, kad patenkinus keitimo siūlymą, kuris nurodytas
    :data:`comment.prepare` stulplyje, komentuojamai eilutei gali būti
    suteiktas nurodytas brandos lygis.

.. data:: access

    Nurodoma, ar komentaras gali būti publikuojamas viešai.

    private
        Komentaras negali būti publikuojamas viešai. Šis prieigos lygis
        naudojamas pagal nutylėjimą.

    open
        Komentaras gali būti publikuojamas viešai.

.. data:: uri

    Viena ar kelios kableliu atskirtos šaltinio nuorodos, kurios pateikia
    daugiau informacijos apie tai, kas komentuojama. Taip pat gali būti
    nurodytas kito komentaro :data:`comment.id`, nurodant, kad tai yra
    atsakymas į ankstesnį komentarą.

    URI pateikiami sutrumpinta forma, naudojant prefikstus. Žiūrėti skrių
    :ref:`vocab`.

.. data:: title

    Komentaro data, `ISO 8601`_ formatu.

    .. _ISO 8601: https://en.wikipedia.org/wiki/ISO_8601

.. data:: description

    Komentaro tekstas.


**Pavyzdys**


== == == == ============ ======== ========= ================================================== ====== ======= ====================================================
d  r  b  m  property     type     ref       prepare                                            level  access  uri                                                 
== == == == ============ ======== ========= ================================================== ====== ======= ====================================================
example                                                                                                                                                           
------------------------ -------- --------- -------------------------------------------------- ------ ------- ----------------------------------------------------
\                        prefix   spinta                                                                      \https://github.com/atviriduomenys/spinta/issues/
\                                 dsa                                                                         \https://ivpk.github.io/dsa/
\        Imone                                                                                 2                           
-- -- -- --------------- -------- --------- -------------------------------------------------- ------ ------- ----------------------------------------------------
\                        comment  base      update(base: "/jar/JuridinisAsmuo", ref: "id")     4      open    spinta:205, manifest:1290                                                    
\                        comment  ref       update(ref: "id")                                  4      open    vadovas:dsa/dimensijos.html#model.ref                                                    
\           id           integer                                                               4      open                                                        
\           pavadinimas  string                                                                2      open                                                        
\                        comment  ref       update(property: "pavadinimas\@lt", type: "text")  4      open    spinta:204                                                    
== == == == ============ ======== ========= ================================================== ====== ======= ====================================================


.. _lang:

lang
****

.. module:: lang

.. deprecated:: 0.2


:data:`title` ir :data:`description` stulpeliuose tekstas rašomas lietuvių
kalba, tačiau galima pateikti tekstą ir kita kalba, panaudojus papildomą
:data:`lang` dimensiją, kurią reikia naudoti prieš eilutę, kuriai pateikiamas
tekstas kita kalba.

.. data:: ref

    `ISO 639-1`_ dviejų simbolių kalbos kodas.

    .. _ISO 639-1: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

.. data:: title

    Pavadinimas :data:`lang.ref` stulpelyje nurodyta kalba.

.. data:: description

    Aprašymas :data:`lang.ref` stulpelyje nurodyta kalba.


.. .. _struktūros-keitimas:
.. _migrate:

migrate
*******

.. module:: migrate

.. deprecated:: 0.2

Laikui einant, pirminių duomenų šaltinių arba jau atvertų duomenų struktūra
keičiasi, papildoma naujais :term:`modeliais <modelis>` ar :term:`savybėmis
<savybė>`, keliant duomenų brandos lygį seni duomenys keičiami naujais,
aukštesnio brandos lygio duomenimis.

Visi šie struktūros ar pačių duomenų pasikeitimai fiksuojami papildomos
:data:`migrate` dimensijos pagalba, kuri gali būti naudojama, bet kurios kitos
dimensijos kontekste.

.. note::
    Migracijos naudojamos tik tuo atveju, kai keičiasi duomenų struktūra arba
    patys duomenys. Jei keičiasi tik metaduomenys, tai migracijų sąraše
    neatsispindi.

== == == == == =============== ======== === ========================= ===== ============================= ===================
id d  r  b  m  property        type     ref prepare                   level title                         description
== == == == == =============== ======== === ========================= ===== ============================= ===================
1                              migrate                                      2021-12-21\ |nbsp|\ 16:29     Pirmoji migracija.
2                              migrate  1                                   2021-12-21\ |nbsp|\ 16:33     Antroji migracija.
3                              migrate  2                                   2022-06-21\ |nbsp|\ 16:41     Trečioji migracija.
\  datasets/example/migrate
-- --------------------------- -------- --- ------------------------- ----- ----------------------------- -------------------
\           Country                     id
-- -- -- -- ------------------ -------- --- ------------------------- ----- ----------------------------- -------------------
\              id              integer                                4
-- -- -- -- -- --------------- -------- --- ------------------------- ----- ----------------------------- -------------------
\              code            string                                 3
\                              migrate  1   create(level:\ |nbsp|\ 2)
\                              migrate  3   update(level:\ |nbsp|\ 3)
\              name            string
\                              migrate  2   create()
== == == == == =============== ======== === ========================= ===== ============================= ===================

Pavyzdyje aukščiau matome, kad šis duomenų struktūros aprašas turi tris
migracijas:

1. Pirmosios migracijos metu sukuriamas pradinis duomenų struktūros variantas.
   Pirmoji migracija nežymima prie modelių ir duomenų laukų, nebent daromas
   keitimas, tuomet įtraukiam ir pirmoji migracija, kad būtų matoma, kas
   keitėsi. Būtent toks atvejis parodytas prie `Country.code` lauko, kuri
   trečiojo migracijoje keičiamas brandos lygis.

2. Antrosios migracijos metu buvo įtrauktas naujas duomenų laukas
   `Country.name`.

3. Trečiosios migracijos metu, buvo keičiami `Country.code` lauko duomenys,
   pakeitimo metu brandos lygis buvo pakeltas iki trečio. Atkreipkite dėmesį,
   kad metaduomenų pasikeitimas, kaip šiuo atveju, žymimas migracijose tik tuo
   atveju, jei tai yra susiję su pačių duomenų pasikeitimu.

   Jei brandos lygis būtų pakeistas, nekeičiant pačių duomenų, tuomet tokio
   pakeitimo nereikėtų įtraukti į migracijų sąrašą.

   Kadangi trečiojoje migracijoje buvo atliktas su ankstesne versija
   nesuderinamas pakeitimas, tai šios migracijos data yra 6 mėnesiai
   ateityje, kadangi nesuderinamos migracijos pirmiausia paskelbiamos, o
   įgyvendinamos tik praėjus 6 mėnesiams nuo paskelbimo.

.. data:: id

    Migracijos numeris (UUID). Kiekvienos migracijos metu gali būti
    atliekama eilė operacijų, visos operacijos fiksuojamos naudojant
    migracijos numerį.

    Visų migracijų sąrašas pateikiamas, kai :data:`migrate` nepriklauso
    jokiam dimensijos kontekstui.

.. data:: ref

    Ankstesnės migracijos numeris, pateiktas :data:`migrate.id` stulpelyje,
    arba tuščia, jei prieš tai jokių kitų migracijų nebuvo.

    Naudojamas jei :data:`migrate` nepatenka į jokios dimensijos kontekstą.

    Jei :data:`migrate` aprašomas dimensijos kontekste, tada šis stulpelis
    nenaudojamas.

.. data:: prepare

    Migracijos operacija. Galimos tokios operacijos:

    .. function:: create()

        Priklausomai nuo dimensijos konteksto, prideda naują modelį, arba
        savybę.

        Funkcijai galima perduoti `ref` ir kitus vardinius argumentus,
        kurie atitinka :term:`DSA` lentelės metaduomenų stulpelių
        pavadinimus.

    .. function:: update()

        Taikomas tik duomenų laukams ir nurodo, kad buvo pakeistos esamų
        duomenų reikšmės, keičiant reikšmių dimensiją, matavimo vienetus,
        formatą ir kita.

        Funkcijai galima perduoti `ref` ir kitus vardinius argumentus,
        kurie atitinka :term:`DSA` lentelės metaduomenų stulpelių
        pavadinimus.

        Perduodami tik tie vardiniai argumentai, kuriuos atitinkantys
        metaduomenys keičiasi.

    .. function:: delete()

        Priklausomai nuo dimensijos konteksto, šalina modelį ar savybę.

        Pašalinto modelio ar savybės :data:`type` keičiamas į `absent`
        reikšmę.

    .. function:: filter(where)

        Naudojamas :data:`property` kontekste, kai vykdoma duomenų
        migracija. Nurodo, kad migracija taikoma tik `where` sąlygą
        tenkinantiems duomenims.

    Be šių pagrindinių migracijos operacijų, galima naudoti kitas duomenų
    transformavimo operacijas, kurios vykdomos su kiekviena duomenų eilute
    ir atlikus pateiktas transformacijos funkcijas, pakeista reikšmė
    išsaugoma.

.. data:: title

    Migracijos įvykdymo data ir laikas. Migracijos laikas ir data gali
    būti ir ateityje, tuo atveju, jei daromas nesuderinamas keitimas.

    Naudojamas tik tada, kai :data:`migrate` nepatenka į jokios dimensijos
    kontekstą.

.. data:: description

    Migracijos atliekamo pakeitimo trumpas aprašymas.


.. |nbsp| unicode:: 0xA0
   :trim:


.. _OWL: https://www.w3.org/TR/owl2-overview/
.. _RDFS: https://www.w3.org/TR/rdf-schema/
.. _SKOS: https://www.w3.org/TR/skos-primer/
.. _prefix.cc: https://prefix.cc/
.. _JSONPath: https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html
.. _mdn-http-methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
