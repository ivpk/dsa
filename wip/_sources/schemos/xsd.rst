.. default-role:: literal

XSD
###

`XML Schema Definition (XSD)`_ yra schemų kalba skirta XML duomenims aprašyti.

XSD specifikacija susideda iš šių dalių:

- `W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures`_
- `W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes`_

.. _xsd_aggregate_model:

Jungtinis modelis
*****************

Jungtiniai modeliai (angl. *Aggregate Model*) yra modelis, kuris yra sujungtas
iš vieno ar kelių papildomų modelių.

.. _xsd_aggregate_root:

Šakninis modelis
================

Šakninis modelis (angl. *Aggregate Root*) yra jungtinio modelio pradžios
taškas, per kurį pasiekiami kitų jungtinio modelio sudėtyje esančių modelių
duomenys.


.. _xsd_aggregate_part:

Dalinis modelis
===============

Dalinis modelis (angl. *Aggregate Part*) yra Jungtinio modelio sudedamoji dalis
ir atskirai nenaudojamas duomenims gauti. Dalinio modelio duomenys yra teikiami
tik kaip jungtinio modelio dalis.

Dalinio modelio atveju, nėra pildomas :data:`model.source`, kadangi dalinio
modelio duomenys gali būti pasiekiami tik per jungtinį modelį.

.. admonition:: Pavyzdys

    **Duomenys**

    .. code-block:: xml

        <country name="Lietuva">
            <city name="Vilnius" />
        </country>

    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

            <xs:complexType name="city">
                <xs:attribute name="name" type="xs:string" />
            </xs:complexType>

            <xs:element name="country">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element type="city" maxOccurs="unbounded" />
                        <xs:attribute name="name" type="xs:string" />
                    </xs:sequence>
                </xs:complexType>
            </xs:element>

        </xs:schema>

    **Struktūros aprašas**

    ======== =========== ========= ======== ======== ============ ========= ======
    dataset  model       property  type     ref      source       prepare   level 
    ======== =========== ========= ======== ======== ============ ========= ======
    \                              schema   xsd      country.xsd                  
    xsd                                                                           
    ------------------------------ -------- -------- ------------ --------- ------
    \        **Country**                             /country               0     
    -------- --------------------- -------- -------- ------------ --------- ------
    \                    name      string            \@name                       
    \                    cities[]  backref  City     city         expand()        
    \        **City/:part**                                              0     
    -------- --------------------- -------- -------- ------------ --------- ------
    \                    name      string            \@name                 0     
    ======== =========== ========= ======== ======== ============ ========= ======

Pavyzdyje:

- `Country` modelis yra :ref:`xsd_aggregate_model` ir jungtinio modelio
  :ref:`xsd_aggregate_root`.

- `City` yra :ref:`xsd_aggregate_part`, kadangi tai žymi `/:part` žymė, taip
  pat `City` neturi užpildyto :data:`model.source` stulpelio, tai reiškia, kad
  tiesiogiai `City` duomenų gauti galimybės nėra, juos galima gauti tik per
  `Country` jungtinį modelį, kurio sudėtyje yra ir `City`, prieinamas per
  `Country/cities` savybę.

- `Country/cities` savybė turi :func:`expand` funkciją įrašytą į
  :data:`property.prepare`, kuri įtraukia visas tiesiogines `City` savybes į
  jungtinį `Country` modelį.



Elementai
*********

.. _xsd_element:

element
=======

XSD :ref:`xsd_element` atitinka DSA loginio modelio:

- :data:`model` - jei elemento tipas yra :ref:`xsd_complexType`,
- :data:`property` - jei elemento tipas yra :ref:`xsd_simpleType`.

Jei `xsd_element` tipas nėra nurodytas, tada pagal XSD specifikaciją elemento
tipas yra `xs:anyType`. DSA neturi `xs:anyType` analogo, todėl tokiu atveju
turėtu būti naudojamas DSA `string` tipas, kur `xs:anyType` reikšmė yra
pateikiama, kaip tekstinė reprezentacija.

Priklausomai nuo to, kur :ref:`xsd_element` yra deklaruotas
:ref:`xsd_complexType` atžvilgiu, pagal nutylėjimą atliekama sekanti XSD
interpretacija:

- Jei :ref:`xsd_element` (:ref:`xsd_complexType` tipo) yra :ref:`xsd_complexType` sudėtyje, laikoma, kad
  modelis yra kito :ref:`ref-denorm` dalis, todėl pagal nutylėjimą nenurodomas
  :data:`model.source`ir šis modelis žymimas kaip dalinis, prie jo pavadinimo pridedant žymę `/:part`.

- Jei :ref:`xsd_element` (:ref:`xsd_complexType` tipo) nėra :ref:`xsd_complexType` sudėtyje ir deklaruotas
  atskirai, bet XSD schemoje yra bent vienas `complexType`, kurio viduje yra elementas, turintis
  atributą `ref`, kurio reikšmė yra šio elemento pavadinimas, tada laikoma, kad modelis
  yra kito :ref:`ref-denorm` dalis, todėl pagal nutylėjimą nenurodomas :data:`model.source` ir
  šis modelis žymimas kaip dalinis, prie jo pavadinimo pridedant žymę `/:part`.

- Jei :ref:`xsd_element` (:ref:`xsd_complexType` tipo) nėra :ref:`xsd_complexType` sudėtyje ir yra deklaruotas
  atskirai, tada laikoma, kad modelis gali būti pasiekiamas tiesiogiai ir tokio
  modelio :data:`model.source` yra pildomas bei šis modelis nežymimas kaip dalinis.

- Jei :ref:`xsd_simpleType` tipo :ref:`xsd_element` yra :ref:`xsd_complexType` sudėtyje,
  iš jo sukuriama :data:`property`, ir pridedama prie :data:`model`, kuris kuriamas iš elemento, kurį
  aprašo šis :ref:`xsd_complexType`. Šios :data:`property.source` formuojamas iš elemento pavadinimo,
  prie jo pridedant `/text()`

- Jei :ref:`xsd_simpleType` tipo :ref:`xsd_element` nėra :ref:`xsd_complexType` sudėtyje, bet yra
  deklaruotas atskirai, bei nėra nei vieno kito elemento, kuris per `ref` ar `type` referuotų
  į šį elementą, iš jo sukuriama :data:`property`, ir pridedama prie specialaus
  `Resource` :data:`model`.

.. admonition:: Pavyzdys

    **Duomenys**

    .. code-block:: xml

        <Country>
          <name>France</name>
          <numberOfMunicipalities>35</numberOfMunicipalities>

          <City>
            <name>Paris</name>
          </City>

          <City>
            <name>Lyon</name>
          </City>

        </Country>

    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

          <xs:element name="Country">
            <xs:complexType>
              <xs:sequence>

                <xs:element name="name" type="xs:string" />

                <xs:element name="numberOfMunicipalities">
                  <xs:simpleType>
                    <xs:restriction base="xs:integer">
                      <xs:minInclusive value="1" />
                    </xs:restriction>
                  </xs:simpleType>
                </xs:element>

                <xs:element ref="governance"/>

                <xs:element name="City" maxOccurs="unbounded">
                  <xs:complexType>
                    <xs:sequence>
                      <xs:element name="name" type="xs:string" />
                    </xs:sequence>
                  </xs:complexType>
                </xs:element>

              </xs:sequence>
            </xs:complexType>
          </xs:element>

          <xs:element name="governance">
            <xs:complexType>
              <xs:sequence>
                <element name="president" type="string" />
              </xs:sequence>
            </xs:complexType>
          </xs:element>

        </xs:schema>


    **Struktūros aprašas**

    ========= =========== ======================== ======== ============== ============ ========= ======
    dataset   model       property                 type       ref           source       prepare   level
    ========= =========== ======================== ======== ============== ============ ========= ======
    \                                               schema     xsd      country.xsd
    xsd
    ---------------------------------------------- -------- -------------- ------------ --------- ------
    \        **Country**                                                    /country               0
    ---------------------------------------------- -------- -------------- ------------ --------- ------
    \                     name                      string                  \@name
    \                     number_of_municipalities
    \                     governance                ref      Governance     governance   expand()
    \                     cities[]                  backref  City           city         expand()
    \        **City/:part**                                                                        0
    ---------------------------------------------- -------- -------------- ------------ --------- ------
    \                     name                      string                  name/text()            0
    \        **Governance/:part**                                                                  0
    ---------------------------------------------- -------- -------------- ------------ --------- ------
    \                     president                 string                  name/text()            0
    ========= =========== ======================== ======== ============== ============ ========= ======


Pavyzdyje:

- `Country` `element` tampa modeliu, nes jis yra pirminio lygio, ir jo tipas yra :ref:`xsd_complexType`.
 XML struktūroje jis tampa šakniniu elementu, todėl iš jo kilęs modelis irgi nurodomas kaip šakninis
 modelis, galintis eiti atskirai, ir nėra žymimas `/:part`.

- `name` `element` tampa :data:`model` `Country` :data:`property`, nes jis yra viduje :ref:`xsd_complexType`,
  kuris yra viduje
`Country` `element` ir pats yra :ref:`xsd_simpleType`. Jo tipas šiuo atveju nurodomas paties elemento aprašyme
  ir yra `string`. Šis `string` tipas DSA taip pat tampa `string` tipu.

- `numberOfMunicipalities` `element` taip pat tampa `Country` modelio :data:`property`. Jam tipas nurodytas
  atskirame :ref:`xsd_simpleType`, kuriame nurodoma, kad jo pagrindas (`base`) yra `integer`,
  ir nurodyti apribojimai (`restriction`). Šis `base` tipas ir yra konvertuojamas į DSA tipą,
  šiuo konkrečiu atveju - į `integer` tipą. Kadangi DSA netaiko apribojimų reikšmėms, tai visi apribojimai,
  kurie yra nurodyti `restriction` (šiame pavyzdyje, `minInclusive`) ignoruojami. Kadangi :data:`property`
  pavadinimas turi būti sudarytas iš mažųjų raidžių, o tarpai tarp žodžių atskiriami pabraukimais (_), tai
  :data:`property` pavadinimas tampa `number_of_municipalities`.

- Sekantis elementas, `<xs:element ref="governance"/>`, neturi pavadinimo, bet jame yra atributas `ref`,
  kas nurodo, kad jo aprašymas referuojamas kitam, globaliam elementui, pavadinimu `governance`.
  Šiuo atveju iš šio :ref:`element` kuriamai :data:`property` suteikiamas pavadinimas pagal
  `ref` atributą, o į jo `ref` stulpelį įrašomas modelio, sukurto iš referuojamo :ref:`element`, pavadinimas.

- iš atskirai apibrėžto elemento `<xs:element ref="governance"/>` sukuriamas :data:`model` Governance.


Santrauka: XSD elementų ir DSA Atitikimas
-----------------------------------------

+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+
| **XSD konstrukcija**                                        | **Generuojami objektai**                                | **Detalės**                                                                                       |
+=============================================================+=========================================================+===================================================================================================+
| Elemente yra `ref` atributas                                | Vienas :data:`property`                              | DSA tipas `ref` arba `backref`. `ref` stulpelyje yra :data:`model` pavadinimas.                |
+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+
| Elemente yra `name` atributas su išoriniu :ref:`simpleType` | Vienas :data:`property`                              | DSA tipas nustatytas pagal `type` atributą.                                                       |
+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+
| Elemente yra `name` atributas su išoriniu :ref:`complexType`| Vienas :data:`property`                             | `backref` arba `ref`. `ref` stulpelyje yra :data:`model` pavadinimas.                          |
+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+
| Elemente yra `name` su įterptu :ref:`simpleType`            | Vienas :data:`property`                              | Tipas nustatytas iš :ref:`simpleType`.                                                            |
+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+
| Elemente yra `name` su įterptu :ref:`complexType`           | Vienas ar daugiau :ref:`xsd_model` + susietas :data:`property` | Modeliai atspindi :ref:`complexType` struktūrą.                                                  |
+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+
| Elemente yra :ref:`complexType` su :ref:`<choice>` viduje (jei :ref:`choice` atributas `maxOccurs` yra "1") | Daug :data:`model`                                   | Iš kiekvienos :ref:`choice` šakos kuriamas atskiras modelis.                                                      |
+-------------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------------------------------------------------+


.. _xsd_attribute:

attribute
=========

XSD :ref:`xsd_attribute` atitinka DSA loginio modelio :data:`property`.

Iš :ref:`xsd_attribute` atributo `name` formuojamas :data:`property` pavadinimas. Jei `name`
susideda iš kelių žodžių, :data:`property` pavadinimas taip pat susidės iš kelių žodžių,
tačiau jie bus mažosiomis raidėmis ir atskirti pabraukimo ženklu (_).

:data:`property.source` yra formuojamas iš :ref:`xsd_attribute` atributo `name`, priekyje pridedant `@`.

Jei `attribute` tipas yra nurodytas `attribute` elemente esančiu :ref:`xsd_type` atributu,
tai :data:`property` tipas formuojamas iš :ref:`xsd_attribute`,  naudojantis :ref:`xd_type_conversion`.

Jei `attribute` tipas aprašytas :ref:`xsd_simpleType`, tai :data:`property.type` formuojamas iš šio
:ref:`simpleType` viduje esančio :ref:`xsd_restriction` :ref:`xsd_base` nurodyto :ref:`xsd_type`.

Jei `attribute` elemento sudėtyje yra :ref:`annotation`, iš jo formuojamas aprašymas -
:data:`property.description`.

Jei `attribute` turi atributą :ref:`xsd_use` su reikšme `required`, tai prie :data:`property`
pavadinimo pridedama `required` žymė, reiškianti, kad ši :data:`property` yra privaloma.


.. admonition:: Pavyzdys

    **Duomenys**

    .. code-block:: xml

        <country name="France" capital="Paris" />

    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

            <xs:element name="country">
                <xs:complexType>
                    <xs:attribute name="name" type="xs:string" use="required"/>
                    <xs:attribute name="capital" type="xs:string" use="required"/>
                </xs:complexType>
            </xs:element>

        </xs:schema>

    **Struktūros aprašas**

    ======== =========== ========= ======== ======== ============ ========= ======
    dataset  model       property  type     ref      source       prepare   level
    ======== =========== ========= ======== ======== ============ ========= ======
    \                              schema   xsd      country.xsd
    xsd
    ------------------------------ -------- -------- ------------ --------- ------
    \        **Country**                             /country               0
    -------- --------------------- -------- -------- ------------ --------- ------
    \                    name      string            \@name
    \                    capital   string            \@capital
    ======== =========== ========= ======== ======== ============ ========= ======


Pavyzdyje:

- XSD `attribute` kurio `name` reikšmė yra `name` tampa :data:`property` su pavadinimu `name`.
  Jo tipas yra `string`, tai konvertuojasi į DSA :data:`property.type` `string`. :data:`property.source`
  padaromas iš `attribute` `name` `name`, prie jo pridedant `@` ir tampa `@name`.

- XSD `attribute` kurio `name` reikšmė yra `capital` tampa :data:`property` su pavadinimu `capital`.
  Jo tipas yra `string`, todėl konvertuojasi į DSA :data:`property.type` `string`. :data:`property.source`
  padaromas iš `attribute` `name` `capital`, prie jo pridedant `@` ir tampa `@capital`.


.. _xsd_simpleType:

simpleType
==========

Jei elemento ar atributo tipas aprašytas naudojant `simpleType`, į DSA tipą jis
konvertuojamas naudojant konvertavimo lentelę :ref:`xsd_type_conversion`.

`simpleType` viduje gali būti :ref:`restriction` arba :ref:`extension`. Jie abu naudojami smulkesniam
`simpleType` aprašymui. Dauguma jų naudojami duomenų validavimui, o DSA duomenų validavimo
taisyklės netaikomos, tai šie apribojimai dažniausiai yra ignoruojami. Jų aprašymus rasite žemiau.

Jei `simpleType` elementas turi :ref:`xsd_annotation`, jo turinys pridedamas prie iš šį `simpleType`
naudojančio elemento sukurtos `property` aprašymo: :data:`property.description`.

`simpleType` gali būti aprašomas ir atskirai. Tokiu atveju, iš jo nustatytas :data:`property.type` bus
pridėtas toms :data:`property`, kurios sukurtos iš į šį tipą referuojančių elementų arba atributų.

.. admonition:: Pavyzdys

    **Duomenys**

    .. code-block:: xml

        <numberOfMunicipalities>5</numberOfMunicipalities>

    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

            <xs:element name="country">
                <xs:complexType>
                    <xs:element name="population">
                  <xs:simpleType>
                    <xs:restriction base="xs:integer">
                      <xs:minInclusive value="1" />
                    </xs:restriction>
                  </xs:simpleType>
                </xs:element>
                </xs:complexType>
            </xs:element>

        </xs:schema>

    **Struktūros aprašas**

    ======== =========== ========== ======== ======== ============ ========= ======
    dataset  model       property  type     ref      source       prepare   level
    ======== =========== ========== ======== ======== ============ ========= ======
    \                               schema   xsd      country.xsd
    xsd
    ------------------------------- -------- -------- ------------ --------- ------
    \        **Country**                               /country               0
    -------- ---------------------- -------- -------- ------------ --------- ------
    \                    population  string            population/text()
    ======== =========== ========== ======== ======== ============ ========= ======

Pavyzdyje:

- iš `simpleType`, kurio viduje nurodytas :ref:`xsd_restriction`, kurio :ref:`xsd_base` yra `string`,
  gaunamas DSA :data:`property.type` `string`.

.. _xsd_complexType:

complexType
===========

:ref:`xsd_complexType` gali būti arba :ref:`xsd_element` sudėtyje, arba atskirai.
Jei :ref:`xsd_complexType` yra :ref:`xsd_element` sudėtyje, iš jų abiejų
kartu kuriamas :data:`model`. :data:`model` struktūra nustatoma iš :ref:`xsd_complexType`, o
pavadinimas - iš :ref:`xsd_element` atributo `name`.

Jei :ref:`xsd_complexType` yra aprašytas atskirai, iš jo kuriamas :data:`model`,
kurio pavadinimas nustatomas iš :ref:`xsd_complexType` pavadinimo.

:ref:`xsd_complexType` gali turėti atributą `mixed`. Jis reiškia, kad šiuo :ref:`xsd_complexType`
aprašytas :ref:`xsd_element` turės galimybę viduje turėti teksto. Tokiu atveju, prie :data:`model`
pridedama :data:`property` su pavadinimu `text` ir tipu `string`. Jos :data:`property.source` yra `text()`.

Jei `complexType` sudėtyje yra :ref:`xsd_choice` elementas ir šio elemento atributas :ref:`xsd_maxOccurs`
yra daugiau, nei `1` arba yra `unbounded`, iš šio complexType kuriama po vieną :data:`model` kiekvienam
:ref:`xsd_choice` pasirinkimui, kai šis pasirinkimas pridedamas prie kitų :ref:`property`.

Jei `complexType` viduje yra :ref:`complexContent`, kurio viduje yra :ref:`extension`, kurio :ref:`base`
rodo į kitą, atskirai apibrėžtą elementą, tai prie :data:`model`, stulpelyje `prepare`, nurodoma
funkcija :function:`extends()`, jos parametru nurodžius :data:`model`, kuris buvo sukurtas iš to tipo.

`complexType` sudėtyje gali būti įvairios konstrukcijos, aprašančios atributus ir elementus, iš kurių šiam
:data:`model` formuojamos :data:`property`:

- :ref:`attribute`
- :ref:`sequence`
- :ref:`choice`
- :ref:`all`
- :ref:`simpleContent`
- :ref:`complexContent`

.. _xsd_sequence:

sequence
========

`sequence` elementas būna :ref:`complexType` sudėtyje. Jis nurodo :ref:`element` elementų seką.
Kiekvienas `sequence` viduje esantis :ref:`element` yra apdorojamas, ir iš jo sukurta savybė ar savybės
pridedamos prie iš :ref:`complexType` sukurto modelio.

Jei `sequence` viduje yra :ref:`xsd_choice`, kurio :ref:`xsd_maxOccurs` yra "1", tai kiekvienam šio
:ref:`xsd_choice` pasirinkimui iš jo ir likusių savybių kuriamas atskiras modelis.

Jei `sequence` turi atributą :ref:`xsd_maxOccurs` ir jo reikšmė yra daugiau nei 1 ar yra "unbounded",
tai kiekviena :data:`property`, sukurto iš `sequence viduje esančių elementų, tampa masyvu, kas reiškia,
kad prie jos pavadinimo prisideda `[]`, o jei jos tipas būtų buvęs `ref`, jis pasikeičia į `backref`.


.. _xsd_choice:

choice
======

Jei `choice` elemento atributas :ref:`xsd_maxOccurs` yra lygus "1", tai `choice` verčiamas į DSA lygiai
taip pat, kaip ir :ref:`xsd_sequence`.

Jei `choice` elemento atributas :ref:`xsd_maxOccurs` yra daugiau nei "1" arba yra "unbounded", tai su
kiekvienu šio `choice` viduje esančiu pasirinkimu (tai gali būti :ref:`xsd_element`, :ref:`xsd_sequence`
ar kitas `choice`) bus kuriamas atskiras :data:`model` iš :ref:`xsd_complexType`, kurio sudėtyje yra šis
`choice` (tiesiogiai, ar kito :ref:`xsd_sequence` ar `choice` viduje).

.. admonition:: Pavyzdys

    **Duomenys**

    Pirmas variantas:

    .. code-block:: xml

        <country>
            <population>800000</population>
            <area>700.5</area>
            <king_or_queen>Elžbieta II</king_or_queen>
        </country>

    Antras variantas:

    .. code-block:: xml

        <country>
            <population>1000000</population>
            <area>500.0</area>
            <president>Ona Grybauskaitė</president>
        </country>


    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

            <xs:element name="country">
                <xs:complexType>
                    <xs:element name="population" type="xs:integer" />
                    <xs:element name="area" type="xs:decimal" />
                    <xs:choice maxOccurs="1">
                        <xs:element name="president" type="xs:string" />
                        <xs:element name="king_or_queen" type="xs:string" />
                    </xs:choice>

                </xs:complexType>
            </xs:element>

        </xs:schema>

    **Struktūros aprašas - **

    ======== =========== ============== ======== ======== ============ ========= ======
    dataset  model       property       type     ref      source       prepare   level
    ======== =========== ============== ======== ======== ============ ========= ======
    \                                    schema   xsd      country.xsd
    xsd
    ----------------------------------- -------- -------- ------------ --------- ------
    \        **Country**                                   /country               0
    -------- -------------------------- -------- -------- ------------ --------- ------
    \                    population      string             population/text()
    \                    area            integer            area/text()
    \                    president       string             president/text()
    ----------------------------------- -------- -------- ------------ --------- ------
    \        **Country1**                                  /country               0
    -------- -------------------------- -------- -------- ------------ --------- ------
    \                    population      string            population/text()
    \                    area            integer           area/text()
    \                    king_or_queen   string            king_or_queen/text()
    ======== =========== ============== ======== ======== ============ ========= ======


.. _xsd_all:

all
===

Elementas `all` reiškia, kad jo viduje aprašyti elementai turi eiti nurodyta tvarka, ir maksimalliai
gali būti po 1 kartą. Minimaliai gali būti taip, kaip nurodyta prie kiekvieno elemento naudojant
:ref:`xsd_minOccurs`. Taigi, iš kiekvieno `all` viduje esamų elementų bus kuriama savybė,
ir galbūt modelis, kaip nurodyta :ref:`xsd_element`.

.. _xsd_complex_content:

complexContent
==============

`complexContent` būna :ref:`xsd_complexType` viduje ir aprašo sudėtinį turinį.

`complexContent` viduje būna :ref:`xsd_extension`, kuris turi atributą :ref:`xsd_base`.
Šis atributas nurodo, kokio kito tipo pagrindu kuriamas šis tipas. Iš :ref:`xsd_base` nurodomo
tipo sukurtas modelis įdedamas į iš šio `complexContent` tėvinio :ref:`complexType` prepare
stulpelyje nurodomą funkciją :function:`extends()`.

:ref:`xsd_extension` viduje
gali būti :ref:`xsd_sequence`, :ref:`xsd_choice` ir :ref:`xsd_all`, o taip pat :ref:`xsd_attribute`.

Iš šių :ref:`xsd_attribute` bei iš :ref:`xsd_sequence`, :ref:`xsd_choice` ir :ref:`xsd_all` viduje
esančių :ref:`xsd_element` kuriamos savybės, ir pridedamos prie iš :ref:`xsd_complexType` sukurto
modelio, pagal tas pačias taisykles, kaip ir iš tiesiogiai :ref:`xsd_complexType` esančių tokių
pačių elementų.


.. admonition:: Pavyzdys

    **Duomenys**

    .. code-block:: xml

        <example>
            <country id="C1">
                <name>Lithuania</name>
                <capital>Vilnius</capital>
            </country>

            <city id="CT1">
                <name>Kaunas</name>
                <country>Lithuania</country>
            </city>
        </example>

    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

            <xs:complexType name="Place">
                <xs:sequence>
                    <xs:element name="name" type="xs:string"/>
                </xs:sequence>
                <xs:attribute name="id" type="xs:string" use="required"/>
            </xs:complexType>

            <xs:complexType name="Country">
                <xs:complexContent>
                    <xs:extension base="Place">
                        <xs:sequence>
                            <xs:element name="capital" type="xs:string"/>
                        </xs:sequence>
                    </xs:extension>
                </xs:complexContent>
            </xs:complexType>

            <xs:complexType name="City">
                <xs:complexContent>
                    <xs:extension base="Place">
                        <xs:sequence>
                            <xs:element name="country" type="xs:string"/>
                        </xs:sequence>
                    </xs:extension>
                </xs:complexContent>
            </xs:complexType>

            <xs:element name="country" type="Country"/>
            <xs:element name="city" type="City"/>

        </xs:schema>


    **Struktūros aprašas - **

    ======== =========== ============== ======== ======== ============ ========= ======
    dataset  model       property       type     ref      source       prepare   level
    ======== =========== ============== ======== ======== ============ ========= ======
                                        schema   xsd      country.xsd
    xsd
    -------- ----------- -------------- -------- -------- ------------ --------- ------
              **Place**                                   /place                0
    -------- ----------- -------------- -------- -------- ------------ --------- ------
                          name           string             name/text()
                          id             string             @string
    -------- ----------- -------------- -------- -------- ------------ --------- ------
              **Country**                                 /country      extends("Place") 0
    -------- ----------- -------------- -------- -------- ------------ --------- ------
                          name           string             name/text()
                          capital        string             capital/text()
    -------- ----------- -------------- -------- -------- ------------ --------- ------
              **City**                                    /city         extends("Place") 0
    -------- ----------- -------------- -------- -------- ------------ --------- ------
                          name           string             name/text()
                          country        string             country/text()
    ======== =========== ============== ======== ======== ============ ========= ======

Pavyzdyje:

- :ref:`complexType` Place tampa :data:`model` Place, o :ref:`complexType` Place viduje esantis
  :ref:`xsd_element` `name` ir :ref:`xsd_attribute` `id` tampa jo savybėmis (:data:`property`).

- :ref:`complexType` City tampa :data:`model` City, o :ref:`complexType` City viduje esančiame
  :rex:`xsd_extension` esantis :ref:`xsd_element` `country` tampa :data:`property` `country`.

  :ref:`xsd_extension` :ref:`xsd_base` atributas nurodo į :ref:`complexType` `Place`, todėl
  iš jo sukurtas :data:`model` `Place` nurodomas :data:`model` `City` `prepare` stulpelyje
  esančioje :function:`extends` funkcijoje. Tai reiškia, kad vėliau, interpretuojant šį DSA,
  visos :data:`model` `Place` esančios :data:`property` įtraukiamos į :data:`model` City.

- analogiškai su `Country`.


.. _xsd_simple_content:

simpleContent
==============

`simpleContent` elementas būna viduje `complexType` elemento. Viduje `simpleContent` elemento gali
būti arba :ref:`xsd_restriction` arba :ref:`xsd_extension` elementas.

Jei `simpleContent` viduje naudojamas :ref:`xsd_extension`, tai :ref:`xsd_extension` viduje nurodomi
:ref:`xsd_attribute`. Iš kiekvieno jų kuriama :data:`property` ir pridedama prie :data:`model`, sukurto
iš :ref:`xsd_complex_type`, kurio viduje yra. Taip pat, prie modelio, sukurto iš :ref:`xsd_complex_type` pridedama :data:`property` pavadinimu
`text` ir jai priskiriamas tipas, kuris gaunamas iš :ref:`xsd_base`, pagal tipų siejimo lentelę
:ref:`xsd_type_conversion`.

Jei `simpleContent` viduje naudojamas :ref:`xsd_restriction`, tai reiškia, kad tipas, kurio viduje
yra šis mazgas, yra apribojamas. Apribojimai gali būti tokie, kaip minimalios ar maximalios reikšmės,
ilgis ar kitos duomenų validacijos taisyklės. Dauguma jų yra ignoruojami, nes DSA duomenų reikšmių
apribojimui įrankių neturi. Tačiau, jei :ref:`xsd_restriction` viduje yra :ref:`enumeration`,
tai išvardintos reikšmės perkeliamos į :ref:`enum`. Išsamiau paaiškinta prie :ref:`xsd_enumeration`.


.. _xsd_enumeration:

enumeration
===========

`enumeration` išvardija reikšmes, iš kurių gali būti pasirenkama :ref:`xsd_element` arba `xsd_attribute`
reikšmė. DSA jo atitiktis yra :ref:`enum`. `enumeration` būna :ref:`xsd_simple_type` sudėtyje esančio
:ref:`xsd_restriction` viduje, o šis :ref:`xsd_simple_type` aprašo :ref:`xsd_element` arba
:ref:`xsd_attribute` tipą. Taigi, iš `enumeration` gautas reikšmių sąrašas perkeliamas
į DSA savybės, suformuotos iš :ref:`xsd_element` arba :ref:`xsd_attribute` :ref:`enum` reikšmes.


.. admonition:: Pavyzdys

    **Duomenys**

    Pirmas variantas:

    .. code-block:: xml

        <country>
            <population>800000</population>
            <area>700.5</area>
            <king_or_queen>Elžbieta II</king_or_queen>
        </country>

    Antras variantas:

    .. code-block:: xml

        <country>
            <population>1000000</population>
            <area>500.0</area>
            <president>Ona Grybauskaitė</president>
        </country>


    **Schema**

    .. code-block:: xml

<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

    <xs:element name="Country">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="name" type="xs:string" />
                <xs:element name="head_of_state">
                    <xs:simpleType>
                        <xs:restriction base="xs:string">
                            <xs:enumeration value="President" />
                            <xs:enumeration value="Monarch" />
                            <xs:enumeration value="PrimeMinister" />
                        </xs:restriction>
                    </xs:simpleType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>

    **Struktūros aprašas - **

    ======== =========== ============== ======== ======== ====================== ========= ======
    dataset  model       property       type     ref      source       prepare   level
    ======== =========== ============== ======== ======== ====================== ========= ======
    \                                    schema   xsd      country.xsd
    xsd
    ----------------------------------- -------- -------- ---------------------- --------- ------
    \        **Country**                                   /country               0
    -------- -------------------------- -------- -------- ---------------------- --------- ------
    \                    name            string            name/text()
    \                    head_of_state   string            head_of_state/text()
    \                                    enum              President
    \                                                      Monarch
    \                                                      PrimeMinister
    ======== =========== ============== ======== ======== ====================== ========= ======


.. _xsd_annotation:

annotation
==========

`annotation` viduje būna informacija apie elementą, kurio viduje jis yra. Jo viduje gali būti
elementai :ref:`xsd_documentation` ir :ref:`xsd_appinfo`. :ref:`xsd_appinfo` elementas ignoruojamas,
o :ref:`xsd_documentation` viduje esantis tekstas perkeliamas į lauką :data:`property.description`
arba į :data:`model.description`, kuris kuriamas iš :ref:`element` ar :ref:`attribute`, kurio
viduje `annotation` yra.

.. admonition:: Pavyzdys

    **Duomenys**

    .. code-block:: xml

        <Country name="Lithuania">
            <Capital>Vilnius</Capital>
        </Country>

    **Schema**

    .. code-block:: xml

        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

            <xs:element name="Country">
                <xs:annotation>
                    <xs:documentation>
                        Represents a country, with its name as and its capital.
                    </xs:documentation>
                </xs:annotation>
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="Capital" type="xs:string">
                            <xs:annotation>
                                <xs:documentation>
                                    Represents the capital city of the country.
                                </xs:documentation>
                            </xs:annotation>
                        </xs:element>
                    </xs:sequence>
                    <xs:attribute name="name" type="xs:string" use="required">
                        <xs:annotation>
                            <xs:documentation>
                                Specifies the name of the country.
                            </xs:documentation>
                        </xs:annotation>
                    </xs:attribute>
                </xs:complexType>
            </xs:element>

        </xs:schema>


    **Struktūros aprašas**

    ========= =========== ======================== ======== ======== ============ ========= ====== =====================================================
    dataset   model       property                 type     ref      source       prepare   level   description
    ========= =========== ======================== ======== ======== ============ ========= ====== =====================================================
    \                                               schema     xsd      country.xsd
    xsd
    ---------------------------------------------- -------- -------- ------------ --------- ------ -----------------------------------------------------
    \        **Country**                                              /country               0      Represents a country, with its name as an attribute and its capital as a nested element.
    ---------------------------------------------- -------- -------- ------------ --------- ------ -----------------------------------------------------
    \                     name                      string            \@name                        Specifies the name of the country.
    \                     Capital                   string            Capital/text()                Represents the capital city of the country.
    ========= =========== ======================== ======== ======== ============ ========= ====== =====================================================


.. _xsd_documentation:

documentation
=============

`documentation` elementas visada būna viduje :ref:`xsd_annotation` elemento ir iš jų abiejų kartu
formuojamas aprašymas - :data:`model.description` arba :data:`model.description`. Daugiau
informacijos prie :ref:`xsd_annotation`

.. _xsd_restriction:

restriction
===========

`restriction` yra taikomas galimų duomenų reikšmių ribojimui, kaip pavyzdžiui, minimalioms ar
maksimalioms reikšmėms, teksto ilgio ribojimams. DSA šie ribojimai neaprašomi, taigi dauguma šių
žymių ignoruojama.

Vienintelis atvejis, kai `restriction` perkeliamas į DSA, yra, kai jis naudojamas kartu
su :ref:`xsd_enumeration`. Tai naudojama aprašyti išvardijamoms galimoms reikšmėms. Daugiau
aprašyta prie :ref:`xsd_enumeration`.

.. _xsd_extension:

extension
=========

`extension` mazgas visada eina viduje :ref:`xsd_simple_type` arba :ref:`xsd_complex_type`.
Kaip jis veikia šiuose mazguose, aprašyta prie jų.

.. _xsd_union:

union
=====

.. _xsd_appinfo:

union
=====


Atributai
*********

.. _xsd_base:

base
====

`base` naudojamas viduje :ref:`xsd_extension` arba :ref:`xsd_restriction`, kai norima išplėsti arba
susiaurinti tam tikro tipo reikšmes. Daugiau apie `base` naudojimą aprašyta prie
:ref:`xsd_complex_content` ir prie :ref:`xsd_simple_content`.


.. _xsd_unique:

unique
======

.. _xsd_minOccurs:

minOccurs
=========

`minOccurs` naudojamas nurodyti elemento minimalų pasikartojimų skaičių. Pagal šį atributą taip pat
galim nustatyti, ar elementas privalomas, ar ne. Jei `minOccurs` yra lygus `0`, tai elementas
neprivalomas, o jei didesnis nei 0, elementas privalomas. DSA privalomumas nurodomas prie
:data:`property.name` pridedant `required` jei ji yra privaloma, arbe nepridedant nieko, jei neprivaloma.

Jei :ref:`xsd_element` turi atributą `minOccurs`, kurio reikšmė lugi '0', reiškia iš šio elemento
sukurta savybė yra neprivaloma, ir žymė `required` nepridedama, o jei `minOccurs` atributo reikšmė
yra `1` arba didesnė, arba jei šis atributas visai nenurodytas (pagal nutylėjimą jo reikšmė lygi `1`),
reiškia, kad iš jo sukurta savybė yra privaloma ir prie jos pavadinimo pridedama žymė `required`.

.. _xsd_maxOccurs:

maxOccurs
=========

`maxOccurs` žymi, kiek daugiausiai kartų elementas gali pasikartoti. Jei ši reikšmė yra 1, arba jei
šis atributas iš viso nenurodytas (jo numatytoji reikšmė yra 1), reiškia elementas gali būti tik
vieną kartą. Tokiu atveju, DSA tai yra įprasta, vieną objektą ar savybę žyminti :data:`property`.
Jei `maxOccurs` reikšmė yra daugiau nei `1` arba `unbounded`, tai reiškia, kad elementas gali
pasikartoti daug kartų, tai iš jo padaryta :data:`property` bus masyvas, ir prie jos pavadinimo
bus pridėti laužtiniai skliaustai (`[]`), o jei tai yra į kitą :data:`model` rodanti savybė, tai
jos tipas bus ne :data:`ref`, bet :data:`backref`.

.. _xsd_nillable:

nillable
========

.. _xsd_type:

type
====

XSD tipas gali būti nurodytas pačiame elemente, nurodant atributą `type`, arba aprašytas po jo
einančiame :ref:`simpleType` arba :ref:`complexType`.

Jei tipas aprašytas pačiame elemente ar atribute, į DSA :data:`property.type` jis konvertuojamas naudojant
konvertavimo lentelę :ref:`xsd_type_conversion`.

Taip pat elemento tipas gali būti aprašytas naudojant :ref:`simpleType` ir :ref:`complexType`.

.. _xsd_use:

use
===

`use` naudojamas aprašant :ref:`xsd_attribute`, ir nurodo, ar elementas yra privalomas,
ar ne. Jei `use` nenurodytas, naudojama jo numatytoji reikšmė, kuri yra `optional`,
ir tai reiškia, kad :ref:`xsd_attribute` nėra privalomas, taigi DSA jis taip pat nežymimas
kaip privalomas. Jei `use` reikšmė yra "required", reiškia, kad šis :ref:`xsd_attribute` yra
privalomas, ir DSA prie jo pavadinimo pridedama žymė `required`.

Duomenų tipai
*************

.. _xsd_type_conversion:

Tipų konvertavimo lentelė
-------------------------

+---------------------+----------------------+
| XSD tipas (type)    | DSA tipas (type)     |
+=====================+======================+
| string              | string               |
+---------------------+----------------------+
| boolean             | boolean              |
+---------------------+----------------------+
| decimal             | number               |
+---------------------+----------------------+
| float               | number               |
+---------------------+----------------------+
| double              | number               |
+---------------------+----------------------+
| duration            | string               |
+---------------------+----------------------+
| dateTime            | datetime             |
+---------------------+----------------------+
| time                | time                 |
+---------------------+----------------------+
| date                | date                 |
+---------------------+----------------------+
| gYearMonth          | date;enum;M          |
+---------------------+----------------------+
| gYear               | date;enum;Y          |
+---------------------+----------------------+
| gMonthDay           | string               |
+---------------------+----------------------+
| gDay                | string               |
+---------------------+----------------------+
| gMonth              | string               |
+---------------------+----------------------+
| hexBinary           | string               |
+---------------------+----------------------+
| base64Binary        | binary;prepare;base64|
+---------------------+----------------------+
| anyURI              | uri                  |
+---------------------+----------------------+
| QName               | string               |
+---------------------+----------------------+
| NOTATION            | string               |
+---------------------+----------------------+
| normalizedString    | string               |
+---------------------+----------------------+
| token               | string               |
+---------------------+----------------------+
| language            | string               |
+---------------------+----------------------+
| NMTOKEN             | string               |
+---------------------+----------------------+
| NMTOKENS            | string               |
+---------------------+----------------------+
| Name                | string               |
+---------------------+----------------------+
| NCName              | string               |
+---------------------+----------------------+
| ID                  | string               |
+---------------------+----------------------+
| IDREF               | string               |
+---------------------+----------------------+
| IDREFS              | string               |
+---------------------+----------------------+
| ENTITY              | string               |
+---------------------+----------------------+
| ENTITIES            | string               |
+---------------------+----------------------+
| integer             | integer              |
+---------------------+----------------------+
| nonPositiveInteger  | integer              |
+---------------------+----------------------+
| negativeInteger     | integer              |
+---------------------+----------------------+
| long                | integer              |
+---------------------+----------------------+
| int                 | integer              |
+---------------------+----------------------+
| short               | integer              |
+---------------------+----------------------+
| byte                | integer              |
+---------------------+----------------------+
| nonNegativeInteger  | integer              |
+---------------------+----------------------+
| unsignedLong        | integer              |
+---------------------+----------------------+
| unsignedInt         | integer              |
+---------------------+----------------------+
| unsignedShort       | integer              |
+---------------------+----------------------+
| unsignedByte        | integer              |
+---------------------+----------------------+
| positiveInteger     | integer              |
+---------------------+----------------------+
| yearMonthDuration   | integer              |
+---------------------+----------------------+
| dayTimeDuration     | integer              |
+---------------------+----------------------+
| dateTimeStamp       | datetime             |
+---------------------+----------------------+
|                     | string               |
+---------------------+----------------------+



.. `W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures`_


.. _XML Schema Definition (XSD): https://www.w3.org/TR/xmlschema11-1/
.. _W3C XML Schema Definition Language (XSD) 1.1 Part 1\: Structures: https://www.w3.org/TR/xmlschema11-1/
.. _W3C XML Schema Definition Language (XSD) 1.1 Part 2\: Datatypes: https://www.w3.org/TR/xmlschema11-2/
