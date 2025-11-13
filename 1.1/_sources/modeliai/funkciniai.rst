.. default-role:: literal

.. _functional-models:

Funkciniai modeliai
###################

Loginis duomenų modelis formuojamas :data:`model` stulpelyje įvardinant
:ref:`koncepcinio modelio <uml-index>` klasės pavadinimą.

:ref:`uml-index` nėra siejamas su jokiu konkrečiu duomenų šaltiniu, tačiau
loginis modelis yra siejamas su konkrečiu duomenų šaltiniu, tačiau išlaiko
koncepciniame modelyje apibrėžtą duomenų struktūrą.

Dažnai viena koncepcinio modelio klasė, loginio modelio pagalba yra siejama su
keliais skirtingais duomenų šaltinio prieigos taškais, kurie įgyvendina
skirtingas duomenų gavimo funkcijas arba veiksmus.

Tarkime, jei turime tokį koncepcinį modelį:

.. mermaid::

   classDiagram

     class City {
       + code: integer [1..1]
       + name: text [1..1]
     }

Ir turime duomenų šaltinį, kuris leidžia duomenis gauti skirtingais metodais:

======== =================== =========== ========= ======== ====== =============== ========
dataset  resource            model       property  type     ref    source          prepare
======== =================== =========== ========= ======== ====== =============== ========
datasets/gov/example                                                                      
-------------------------------------------------- -------- ------ --------------- --------
\                            **City**                       code                           
-------- ------------------- --------------------- -------- ------ --------------- --------
\                                        code      integer                                 
\                                        name\@lt  string                                  
\        get_all_cities                            json            /cities                 
-------- ----------------------------------------- -------- ------ --------------- --------
\        get_city_by_code                          json            /cities/{code}         
======== ========================================= ======== ====== =============== ========

Šiame pavyzdyje turime duomenų struktūros aprašą, kuriame yra `City` modelis,
atitinkantis koncepcinį modelį, nesusietas su jokiu duomenų šaltinius ir du
duomenų šaltiniai `get_all_cities` ir `get_city_by_code`, nesusieti su
loginiu modeliu.

Norint susieti `get_all_cities` ir `get_city_by_code` duomenų šaltinius su
loginiu modeliu, mums reikia panaudoti funkcinius modelius, kadangi duomenų
šaltinis įgyvendina tik dalį funkcionalumo duomenims gauti.

Galutinis pilnai susietas struktūros aprašas atrodys taip:

======== =================== =========== ========= ======== ====== =============== ========
dataset  resource            model       property  type     ref    source          prepare
======== =================== =========== ========= ======== ====== =============== ========
datasets/gov/example                                                                      
-------------------------------------------------- -------- ------ --------------- --------
\                            **City**                       code                           
-------- ------------------- --------------------- -------- ------ --------------- --------
\                                        code      integer         code                    
\                                        name\@lt  string          title                   
\        get_all_cities                            json            /cities                 
-------- ----------------------------------------- -------- ------ --------------- --------
\                            City/:getall                          data     
-------- ------------------- --------------------- -------- ------ --------------- --------
\        get_city_by_code                          json            /cities/{code}         
-------- ----------------------------------------- -------- ------ --------------- --------
\                            City/:getone                                   
-------- ------------------- --------------------- -------- ------ --------------- --------
\                                        code      integer                         path()  
======== =============================== ========= ======== ====== =============== ========


`City/:getall` ir `City/:getone` yra funkciniai modeliai, nurodantys, kad
duomenų modelis `City` yra siejamas su duomenų šaltiniu, kuris įgyvendina tam
tikras duomenų skaitymo funkcijas.

Duomenų skaitymo funkcijos sutampa su UDTS_ specifikacijoje aprašytais veiksmais,
kuriuos galima atlikti su duomenimis.

Funkciniai modeliai paveldi visas savybes iš pagrindinio modelio, tačiau gali
papildyti pagrindinį modelį naujomis savybėmis, arba pateikti pagrindinio
modelio savybes su kitais metaduomenis, tarkim nurodant kitokią
:data:`property.source` reikšmę.

Jei nenurodytas joks funkcinis modelis, daroma prielaida, kad šaltinis palaiko
visas UDTS_ funkcijas.


Funkcijos
*********

getall
======

Nurodo, kad duomenų šaltinis leidžia gauti visus klasės objektus, netaikant jokių filtrų.

.. admonition:: Pavyzdys

    ======== =================== =========== ========= ======== ====== =============== ========
    dataset  resource            model       property  type     ref    source          prepare
    ======== =================== =========== ========= ======== ====== =============== ========
    datasets/gov/example                                                                      
    -------------------------------------------------- -------- ------ --------------- --------
    \                            **City**                       code                           
    -------- ------------------- --------------------- -------- ------ --------------- --------
    \                                        code      integer         code                    
    \                                        name\@lt  string          title                   
    \        get_all_cities                            json            /cities                 
    -------- ----------------------------------------- -------- ------ --------------- --------
    \                            City/:getall                          data     
    ======== =================== ===================== ======== ====== =============== ========


getone
======

Nurodo, kad duomenų šaltinis leidžia gauti vieną klasės objektą nurodžius
objekto identifikatorių.

.. admonition:: Pavyzdys

    ======== =================== =========== ========= ======== ====== =============== ========
    dataset  resource            model       property  type     ref    source          prepare
    ======== =================== =========== ========= ======== ====== =============== ========
    datasets/gov/example                                                                      
    -------------------------------------------------- -------- ------ --------------- --------
    \                            **City**                       code                           
    -------- ------------------- --------------------- -------- ------ --------------- --------
    \                                        code      integer         code                    
    \                                        name\@lt  string          title                   
    \        get_city_by_code                          json            /cities/{code}         
    -------- ----------------------------------------- -------- ------ --------------- --------
    \                            City/:getone                                   
    -------- ------------------- --------------------- -------- ------ --------------- --------
    \                                        code      integer                         path()  
    ======== =============================== ========= ======== ====== =============== ========

`getone` veiksmo atveju, modelis turi turėti pirminį raktą, nurodytą
:data:`model.ref` stulpelyje. Pirminis raktas gali būti paveldimas iš
pagrindinio modelio arba gali būti nurodomas kitas pirminis raktas prie
funkcinio modelio.

Sąsajai su duomenų šaltiniu, pirminio rakto savybės turėtų nurodyti funkciją,
kuri siejama su duomenų šaltinio parametrais. Konkrečiai, pavyzdyje aukščiau
prie `City/:getone/code` savybės yra nurodyta `path()` funkcija
:data:`proprty.prepare` stulpelyje, kuri nurodo, kad `code` savybė yra
naudojama kaip duomenų šaltinio URI path parametras, pažymėtas
:data:`resource.source` stulpelyje `{}` riestiniuose skliausteliuose, tuo pačiu
pavadinimu, kaip ir :data:`property` pavadinimas.

Per UDTS_ protokolą, bus tikimasi gauti tokią užklausią:

.. code-block:: http

   GET /datasets/gov/example/City/87a1d91a-e00d-4981-8287-d1810243d160 HTTP/1.1

Tokia UDTS_ užklausa, pagal pateiktą duomenų struktūros aprašo pavyzdį, bus
konvertuota į tokią duomenų šaltiniui skirtą užklausą:

.. code-block:: http

   GET /cities/42 HTTP/1.1

Kad tai veiktu, duomenų agentas, turi saugoti išorinių ir vidinių
identifikatorių lentelę, kurioje yra susietas išorinis
`87a1d91a-e00d-4981-8287-d1810243d160` su vidiniu `42`, kas leidžia konvertuoti
tarp vidinių ir išorinių identifikatorių.

.. table:: Identifikatorių susiejimas

    =====================================  =============
    _id (išorinis)                         id (vidinis)
    =====================================  =============
    87a1d91a-e00d-4981-8287-d1810243d160   42
    =====================================  =============

Visų duomenų šaltinių lokalūs identifikatoriai, siejami su vienu esybės
išoriniu identifikatoriumi.


search
======

Nurodo, kad duomenų šaltinis leidžia gauti ne visus klasės objektus, o tam
tikrą objektų imtį, pagal nurodytą duomenų filtrą.


Statiniai filtrai
-----------------

Statiniai filtrai nurodo, kad duomenys pateikiami naudojant konkrečias filtrų
reikšmes nurodytas struktūros apraše.

.. admonition:: Pavyzdys

    ======== =================== =========== ============== ======== ========== =============== ========
    dataset  resource            model       property       type     ref        source          prepare
    ======== =================== =========== ============== ======== ========== =============== ========
    datasets/gov/example                                                                               
    ------------------------------------------------------- -------- ---------- --------------- --------
    \                            **Country**                         code                               
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        code           string                                      
    \                            **City**                            code                               
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        code           integer             city_code               
    \                                        name\@lt       string              city_name               
    \                                        country        ref      Country                            
    \                                        country.code   string                              "lt"    
    \        get_all_cities                                 json                /cities                 
    -------- ---------------------------------------------- -------- ---------- --------------- --------
    \                            City?country.code="lt"                                       
    ======== =================== ========================== ======== ========== =============== ========

Pavyzdyje nurodyta, kad funkcinis `City?country.code="lt"` modelis grąžina ne
visus duomenis, o tik Lietuvos miestų duomenis.


Dinaminiai filtrai
------------------

Dinaminiai filtrai nurodo, kad duomenys pateikiami naudojanti filtrų reikšmes,
kurias pateikia duomenų naudotojas, per UDTS_ užklausą, pateikti duomenys
konvertuojami ir perduodami duomenų šaltiniui.

Dinaminiai filtrai veikia lygiai taip pat, kaip ir statiniai filtrai, tik
dinaminio filtro atveju, nenurodoma statinė reikšmė.

Tarkime statinis `country.code="lt"` filtras gali būti dinaminis pašalinus
`="lt"` dalį ir paliekant tik `country.code`.

.. admonition:: Pavyzdys

    ======== =================== =========== ============== ======== ========== =============== ========
    dataset  resource            model       property       type     ref        source          prepare
    ======== =================== =========== ============== ======== ========== =============== ========
    datasets/gov/example                                                                               
    ------------------------------------------------------- -------- ---------- --------------- --------
    \                            **Country**                         code                               
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        code           string                                      
    \                            **City**                            code                               
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        code           integer             city_code               
    \                                        name\@lt       string              city_name               
    \                                        country        ref      Country                            
    \                                        country.code   string              country_code            
    \        get_cities_by_country                          json                /cities                 
    -------- ---------------------------------------------- -------- ---------- --------------- --------
    \                            City?country.code                                            
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        country.code   string              country         query() 
    ======== =================== =========== ============== ======== ========== =============== ========

Šiame pavyzdyje turime `City?country.code` funkcinį modelį, kuriame naudojamas
dinaminis filtras pagal `country.code`.

Kadangi `City?country.code` modelis nurodo `country.code` savybę su :func:`query`
formule :data:`property.prepare` stulpelyje, tai reiškia, kad konvertuojant
užklausą į duomenų šaltinio protokolą, `country.code` reikšmė bus perduota kaip
URI query parametras.

Per UDTS_ protokolą, bus tikimasi gauti tokią užklausią:

.. code-block:: http

   GET /datasets/gov/example/City?country.code="lt" HTTP/1.1

Tokia UDTS_ užklausa, pagal pateiktą duomenų struktūros aprašo pavyzdį, bus
konvertuota į tokią duomenų šaltiniui skirtą užklausą:

.. code-block:: http

   GET /cities?country="lt" HTTP/1.1


Operatoriai
-----------

Funkciniam modeliui galima perduoti daugiau nei vieną filtro parametrą,
naudojant skirtingus filtravimui skirtus operatorius.

.. seealso::

    | :ref:`duomenų-atranka`

Pavyzdžiui funkcinis modelis naudojantis dinaminį filtravimą pagal du
kriterijus atrodytų taip::

    City?country.code&code

Šiuo atveju, duomenys pateikiami naudojant filtrą pagal šalies ir miesto kodus.


select
======

Nurodo, kad duomenų šaltinis grąžina ne visas klasės savybes, o tik tam tikras.

.. admonition:: Pavyzdys

    ======== =================== =========== ============== ======== ========== =============== ========
    dataset  resource            model       property       type     ref        source          prepare
    ======== =================== =========== ============== ======== ========== =============== ========
    datasets/gov/example                                                                               
    ------------------------------------------------------- -------- ---------- --------------- --------
    \                            **City**                            code                               
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        code           integer             city_code               
    \                                        name\@lt       string              city_name               
    \        get_cities                                     json                /cities                 
    -------- ---------------------------------------------- -------- ---------- --------------- --------
    \                            City?select(code)                                            
    ======== =================== ========================== ======== ========== =============== ========

Pavyzdyje nurodoma, kad `get_cities` duomenų šaltinis grąžina ne visas `City`
klasės savybes (`code` ir `name`), o tik vieną `code`.

:func:`select` funkcijai galima nurodyti kelias savybes, atskiriant jas kableliu:

.. code-block:: sparql

    select(code, name@lt)

Taip pat galima naudoti ir kitas savybių atrankos funkcijas.

.. seealso::

   | :func:`select`

   | Kitos savybių atrankos funkcijos:
   | :func:`include`
   | :func:`exclude`
   | :func:`expand`


sort
====

Nurodo, kad duomenų šaltinis grąžina surūšiuotus duomenis, pagal tam tikras
savybių reikšmes.


.. seealso::

   | :func:`sort`


.. _func_model_part:

part
====

Nurodo, kad duomenų šaltinis neleidžia tiesiogiai pasiekti modelio duomenų ir
šis modelis yra naudojamas tik kaip sudėtinė, vieno ar kelių kitų
:ref:`jungtinių modelių <ref-denorm>`.


.. admonition:: Pavyzdys

    ======== =================== =========== ============== ======== ========== =============== ========
    dataset  resource            model       property       type     ref        source          prepare
    ======== =================== =========== ============== ======== ========== =============== ========
    datasets/gov/example                                                                               
    ------------------------------------------------------- -------- ---------- --------------- --------
    \                            **City**                            code                               
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        code           integer             city_code               
    \                                        name\@lt       string              city_name               
    \        get_cities                                     json                /cities                 
    -------- ---------------------------------------------- -------- ---------- --------------- --------
    \                            City?select(code)                                            
    -------- ------------------- -------------------------- -------- ---------- --------------- --------
    \                                        id             integer             page            query() 
    ======== =================== =========== ============== ======== ========== =============== ========


.. _UDTS: https://ivpk.github.io/uapi
