.. default-role:: literal
.. _formulės:

Formulės
########

Formulės rašomos :data:`prepare` stulpelyje. Formulių pagalba galima atlikti
įvairius duomenų transformavimo, nuasmeninimo, filtravimo ir kokybės tikrinimo
veiksmus.

Kadangi yra labai didelė įvairovė duomenų formatų ir duomenų valdymo mechanizmų,
siekiant suvaldyti visą šią įvairovę :term:`DSA` formulės leidžia vieningai
aprašyti veiksmus su duomenimis. Vėliau formulės verčiamos į vieningą AST_, kurį
gali interpretuoti automatizuotos priemonės, priklausomai nuo duomenų šaltinio
ir konteksto ir DSA sluoksnio.

.. _AST: https://en.wikipedia.org/wiki/Abstract_syntax_tree

Gramatika
=========

Formulių sintaksė atitinką šią ABNF_ gramatiką:

.. _ABNF: https://en.wikipedia.org/wiki/Augmented_Backus–Naur_form

.. code-block:: abnf

    formula     = testlist
    testlist    = test *("," test) *1","
    test        = or
    or          = and *("|" and)
    and         = not *("&" not)
    not         = "!" not / comp
    comp        = expr *(compop expr)
    expr        = term *(termop term)
    term        = factor *(factorop factor)
    factor      = sign factor / composition
    composition = atom *trailer
    atom        = "(" *1group ")"
                / "[" *1list "]"
                / func / value / name
    group       = test *("," test) *1","
    list        = test *("," test) *1","
    trailer     = "[" *1filter "]" / method / attr
    func        = name call
    method      = "." name call
    call        = "(" *1arglist ")"
    arglist     = argument *("," argument) *1","
    argument    = test / kwarg
    kwarg       = name ":" test
    filter      = test *("," test) *1","
    attr        = "." name
    value       = null / bool / integer / number / string / star
    compop      = ">=" / "<=" / "!=" / "=" / "<" / ">"
    termpop     = "+" / "-"
    factorop    = "*" / "/" / "%"
    sign        = "+" / "-"
    star        = "*"
    name        = ~/[a-z_][a-z0-9_]*/i
    number      = ~/\d+(\.\d+)?/
    integer     = ~/0|[1-9]\d*/
    bool        = "false" / "true"
    null        = "null"
    string      = ~/(?!"").*?(?<!\\)(\\\\)*?"|'(?!'').*?
                    (?<!\\)(\\\\)*?'/i


Sintaksės medis
===============

Formulės verčiamos į vieningą abstraktų sintaksės medį. Vieningas abstraktus
sintaksės medis leidžia atskirti formulės skaitymo ir interpretavimo veiklas.

Abstraktus sintaksės medis sudarytas iš vienodų elementų turinčių tokias
savybes:

.. describe:: name

    Funkcijos pavadinimas.

.. describe:: args

    Funkcijos argumentų sąrašas, kurį gali sudaryti konkrečios reikšmės ar kiti
    medžio elementai, veiksmai.

Visos formulėje naudojamos išraiškos sintaksės medyje verčiamos į funkcijų ir
argumentų medį. Pavyzdžiui `test("a", "b")` bus verčiamas į:

.. code-block:: python

    {
        "name": "test",
        "args": ["a", "b"],
    }


Funkcijų iškvietimas
====================

Formulės susideda iš vykdomų funkcijų sekos. Pavyzdžiui funkcijos pavadinimu
`test` vykdymas formulėje atrodys taip:

.. code-block:: python

    test()

Aukščiau pavyzdyje pateikta formulė vykdo funkciją `test`, be argumentų. Tačiau
funkcijos gali turėti pozicinius ir vardinius argumentus.


Poziciniai argumentai
=====================

Poziciniai argumentai perduodami taip:

.. code-block:: python

    test(a, b, c)

Pavyzdyje, funkcijai `test` perduodami trys argumentai `a`, `b` ir `c`. Šioje
dokumentacijoje, tais atvejais, kai funkcijos pozicinių argumentų skaičius nėra
fiksuotas, naudojama `*args` išraiška, kur `*` nurodo, kad pozicinių argumentų
gali būti 0 ar daugiau.


Vardiniai argumentai
====================

Vardiniai argumentai funkcijai perduodami taip:

.. code-block:: python

    test(a: 1, b: 2, c: 3)

Pozicinius argumentus būtina perduoti tiksliai tokia tvarka, kokios tikisi
funkcija. Tačiau vardinius argumentus, galima perduoti, bet kuria tvarka.

Jei vardinių argumentų sąrašas nėra fiksuotas, dokumentacijoje toks argumentų
sąrašas užrašomas `**kwargs` forma, kur `**` nurodo, kad vardinių argumentų
gali būti 0 ar daugiau.


Alternatyvus funkcijos iškvietimas
==================================

Funkcijų iškvietimas gali būti užrašomas įprastiniu būdu, pavyzdžiui:

.. code-block:: python

    test(test(test(a), b), c)

Arba funkcijų grandinės (angl. `Method chain`_) būdu:

.. _Method chain: https://en.wikipedia.org/wiki/Method_chaining

.. code-block:: python

    a.test().test(b).test(c)

Kadangi formulės dažnai naudojamos tam tikros reikšmės transformavimui, todėl
dažnai formulė yra lengviau skaitoma, naudojant funkcijų grandinę.

`test(a)` yra `a.test()` arba `test(a, b)` ir `a.test(b)` yra ekvivalentūs
(UFCS_).

.. _UFCS: https://en.wikipedia.org/wiki/Uniform_Function_Call_Syntax


Standartinės funkcijos
======================

Priklausomai nuo duomenų šaltinio ar konteksto gali būti naudojami skirtingi
veiksmai, tačiau žemiau yra pateikti bendrosios paskirties veiksmai:

.. function:: bind(name)

    Rodo į reikšmę pavadinimu `name` iš konteksto. Reikšmės ieškoma tokia
    tvarka:

    - :func:`var`

    - :func:`param`

    - :func:`item`

    - :func:`prop`

.. function:: prop(name)

    Modelio savybė pavadinimu `name` iš :data:`property` stulpelio.

.. function:: item(name)

    Sąrašo elemento savybė pavadinimu `name`.

.. function:: param(name)

    Parametras pavadinimu `name`. Žiūrėti :ref:`param`.

.. function:: var(name)

    Kintamasis apibrėžtas :func:`set` funkcijos pagalba.

.. function:: self

    Rodo į aktyvią reikšmę, naudojamas :data:`property.prepare` formulėse.

.. function:: or(*args)

    Taip pat galima naudoti tokia išraiška::

        a | b | c

    Grąžiną pirmą netuščią reikšmę. Pirmoji netuščia reikšmė nutraukia sekančių
    `args` argumentų interpretavimą.

.. function:: and(*args)

    Taip pat galima naudoti tokia išraiška::

        a & b & c

    Grąžina pirmą tuščią reikšmę arba paskutinę reikšmę, jei prieš tai esančios
    reikšmės netuščios.

.. function:: not(arg)

    Taip pat galima naudoti tokia išraiška::

        !arg

    Jei `arg` tuščia grąžina `true`, priešingu atveju `false`.

.. function:: eq(a, b)

    Taip pat galima naudoti tokia išraiška::

        a = b

    `a` lygus `b`.

.. function:: ne(a, b)

    Taip pat galima naudoti tokia išraiška::

        a != b

    `a` nelygus `b`.

.. function:: lt(a, b)

    Taip pat galima naudoti tokia išraiška::

        a < b

    `a` mažiau už `b`.

.. function:: le(a, b)

    Taip pat galima naudoti tokia išraiška::

        a <= b

    `a` mažiau arba lygu už `b`.

.. function:: gt(a, b)

    Taip pat galima naudoti tokia išraiška::

        a > b

    `a` daugiau už `b`.

.. function:: ge(a, b)

    Taip pat galima naudoti tokia išraiška::

        a >= b

    `a` daugiau arba lygu už `b`.

.. function:: add(a, b)

    Taip pat galima naudoti tokia išraiška::

        a + b

    `a` ir `b` suma.

.. function:: sub(a, b)

    Taip pat galima naudoti tokia išraiška::

        a - b

    `a` ir `b` skirtumas.

.. function:: mul(a, b)

    Taip pat galima naudoti tokia išraiška::

        a * b

    `a` ir `b` sandauga.

.. function:: div(a, b)

    Taip pat galima naudoti tokia išraiška::

        a / b

    `a` ir `b` dalyba.

.. function:: mod(a, b)

    Taip pat galima naudoti tokia išraiška::

        a % b

    `a` ir `b` modulis.

.. function:: positive(a)

    Taip pat galima naudoti tokia išraiška::

        +a

    Gali būti interpretuojamas skirtingai, priklausomai nuo konteksto.
    Įprastiniu atveju keičia skaičiaus ženklą.

.. function:: negative(a)

    Taip pat galima naudoti tokia išraiška::

        -a

    Gali būti interpretuojamas skirtingai, priklausomai nuo konteksto.
    Įprastiniu atveju keičia skaičiaus ženklą.

.. function:: tuple(*args)

    Taip pat galima naudoti tokia išraiška::

        (*args)

    Grupė argumentų.

    ()
        Tuščia grupė.

    a, b
        Tas pats, kas `tuple(a, b)`.

.. function:: list(*args)

    Taip pat galima naudoti tokia išraiška::

        [*args]

    Sąrašas reikšmių.

.. function:: getattr(object, attr)

    Taip pat galima naudoti tokia išraiška::

        object.attr

    Gaunamos reikšmės pagal atributą arba raktą.

.. function:: getitem(object, item)

    Taip pat galima naudoti tokia išraiška::

        a[item]

    Gaunamos reikšmės pagal atributą arba raktą.

    :func:`getitem` gali būti interpretuojamas kaip sąrašo reikšmių filtras::

        a[b > c]


.. function:: dict(**kwargs)

    Taip pat galima naudoti tokia išraiška::

        {a: b}

    Sudėtinė duomenų struktūra.

.. function:: set(**kwargs)

    Taip pat galima naudoti tokia išraiška::

        {a, b}

    Reikšmių aibė.

.. function:: op(operator)

    Taip pat galima naudoti tokia išraiška::

        a(*)

    Operatoriai gali būti naudojami kaip argumentai.


.. function:: stack(columns, values, exclude)

    Visus stulpelius išskyrus `exclude` verčia į vieną stulpelių eilutei
    suteikiant `columns` pavadinimą, o reikšmių stulpeliui `values` pavadinimą.
    Pavyzdžiui:

    ==========  ======  ======
    vertinimas  2015P2  2016P2
    ==========  ======  ======
    Neigiamai   0       1
    Teigiamai   39      28
    ==========  ======  ======

    Tokiai lentelei pritaikius `stack("data", "rodiklis", ["vertinimas"])`
    transformaciją, gausime tokį rezultatą:

    ==========  ======  ========
    vertinimas  data    rodiklis
    ==========  ======  ========
    Neigiamai   2015P2  0
    Neigiamai   2016P2  1
    Teigiamai   2015P2  39
    Teigiamai   2016P2  28
    ==========  ======  ========


.. function:: datetime(str, format)

    Išgaunama data ir laikas iš str, naudojant strftime_ formatą.

    .. _strftime: https://strftime.org/

.. function:: date(str, format)

    išgaunama data iš str, naudojant strftime_ formatą.

    .. _strftime: https://strftime.org/

.. function:: date(datetime)

    Gražinama data iš datos ir laiko.


.. _failai:

Failai
======

Dažnai duomenys teikiami failų pavidalu, kurie gali būti saugomi tiek lokaliai
failų sistemoje, tiek nuotoliniame serveryje. Failai gali būti suspausti ir
patalpinti į archyvo konteinerius. :term:`DSA` leidžia aprašyti įvairius
prieigos prie duomenų, saugomų failuose, atvejus.

.. describe:: resource.source

    Nutolusiame serveryje saugomo failo :term:`URI` arba kelias iki lokalaus
    katalogo. Lokalaus katalogo kelias gali būti pateikiamas tiek :term:`POSIX`,
    tiek :term:`DOS` formatais, priklausomai nuo to, kokioje operacinėje
    sistemoje failai saugomi.

.. describe:: resource.prepare

    .. function:: file(resource, encoding: "utf-8")

        :arg resource: Kelias arba URI iki failo.
        :arg encoding: Failo koduotę.

        Ši funkcija leidžia nurodyti failo koduotę, jei failas yra užkoduotas
        kita, nei UTF-8 koduote. Pilną palaikomų koduočių sąrašą galite rasti
        `šiame sąraše`__.

        __ https://docs.python.org/3/library/codecs.html#standard-encodings

    .. function:: extract(resource, type)

        :arg resource: Kelias arba URI iki archyvo failo arba failo objektas.
        :arg type: Archyvo tipas.

        Išpakuoja archyvą, kuriame saugomi failai. Galimos `type` reikšmės:

        .. describe:: zip

        .. describe:: tar

        .. describe:: rar

        Funkcijos rezultatas yra archyvo objektas, kuris leidžia pasiekti
        esančius archyvo failus :func:`getitem` funkcijos pagalba.

    .. function:: decompress(resource, type)

        :arg resource: Kelias arba URI iki archyvo failo arba failo objektas.
        :arg type: Archyvo tipas.

        Taikomas srautinis failo glaudinimo filtras. Galimos `type` reikšmės:

        .. describe:: gz

        .. describe:: bz2

        .. describe:: xz


.. _stulpeliai-lentelėje:

Stulpeliai lentelėje
====================

CSV ar skaičiuoklių lentelėse stulpelių pavadinimai pateikiami pačioje
lentelėje. Eilutė, kurioje surašyti pavadinimai nebūtinai gali būti pirma.
Stulpelių pavadinimai gali būti pateikti keliose eilutėse iš kurių formuojamos
kompleksinės struktūros (žiūrėti :ref:`kompleksinės-struktūros`). Įvairias
situacijas galima aprašyti formulių pagalba.

.. describe:: model.prepare

    .. function:: header(*line)

        .. describe:: null

            Lentelėje eilučių pavadinimų nėra. Tokiu atveju,
            :data:`property.source` stulpelyje reikia pateikti stulpelio numerį,
            pradedant skaičiuoti nuo 0.

        .. describe:: line

            Nurodomas eilutės numeris, pradedant eilutes skaičiuoti nuo 0, kur
            yra pateikti lentelės stulpelių pavadinimai. Pagal nutylėjimą
            stulpelių pavadinimų ieškoma pirmoje eilutėje.

        .. describe:: *line

            Jei lentelė turi kompleksinę stulpelių struktūrą, tada galima
            pateikti daugiau nei vieną eilutės numerį iš kurių bus nustatomi
            stulpelių pavadinimai.

    .. function:: head(n)

        Praleisti `n` einančių po stulpelių pavadinimų eilutės.

    .. function:: tail(n)

        Ignoruoti `n` eilučių failo pabaigoje.

.. describe:: property.source

    Jei naudojamas :func:`header(null) <header>`, tada nurodomas stulpelio
    numeris, pradedant nuo 0.

    Jei naudojamas :func:`header(line) <header>`, tada nurodomas stulpelio
    pavadinimas, toks koks įrašytas lentelės line eilutėje.

    Jei naudojamas :func:`header(*line) <header>`, tada nurodomas stulpelio
    pavadinimas, toks koks įrašymas lentelės pirmajame line argumente.

.. describe:: property.prepare

    Jei naudojamas `header(*line)`, žiūrėti :ref:`kompleksinės-struktūros`.


.. _duomenų-atranka:

Duomenų atranka
===============

Duomenų filtravimui naudojamas :data:`model.prepare` stulpelis, kuriame galima
apriboti iš šaltinio skaitomų duomenų imtį.

Tarkime, jei turime tokias dvi duomenų lenteles:

======= =======
COUNTRIES
---------------
COUNTRY CODE
======= =======
Lietuva lt
Latvija lv
======= =======

====== ======= =======
CITIES
----------------------
ID     CITY    COUNTRY
====== ======= =======
1      Vilnius lt
2      Kaunas  lt
3      Ryga    lv
====== ======= =======

Jei norėtume atveri ne visų šalių duomenis, o tik Lietuvos, tada duomenų
struktūros aprašas turėtu atrodyti taip:

+---+---+---+---+------------+---------+---------+-----------+-----------------+
| d | r | b | m | property   | type    | ref     | source    | prepare         |
+===+===+===+===+============+=========+=========+===========+=================+
| datasets/example/countries |         |         |           |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   | salys                  | sql     |         | sqlite:// |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   | Country        |         | code    | COUNTRIES | **code = "lt"** |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   |   | name       | string  |         | COUNTRY   |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   |   | code       | string  |         | CODE      |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   | City           |         | id      | CITIES    |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   |   | id         | integer |         | ID        |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   |   | name       | string  |         | CITY      |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+
|   |   |   |   | country    | ref     | Country | COUNTRY   |                 |
+---+---+---+---+------------+---------+---------+-----------+-----------------+

Kaip ir visur, formulės reikia naudoti pavadinimus ne iš :data:`source`
stulpelio, o iš :data:`property`, :data:`model` arba :data:`dataset`.

Jei lentelės yra susijusios ryšiais tarpusavyje, užtenka filtrą nurodyti tik
vienoje lentelėje, visose kitose susijusios lentelėse filtrai bus taikomi
automatiškai, kad užtikrinti duomenų vientisumą.

Nurodant filtrus yra galimybė naudoti ne tik vienos lentelės laukus, bet ir
susijusių lentelių laukus, pavyzdžiui yra galimybė nurodyti tokį filtrą:

+---+---+---+---+------------+---------+---------+-----------+-------------------------+
| d | r | b | m | property   | type    | ref     | source    | prepare                 |
+===+===+===+===+============+=========+=========+===========+=========================+
|   |   |   | City           |         | id      | CITIES    | **country.code = "lt"** |
+---+---+---+---+------------+---------+---------+-----------+-------------------------+

Tačiau šiuo atveju, toks filtras būtų perteklinis, nes toks filtras
generuojamas automatiškai ir susijusio `Country` modelio, kadangi negalime
publikuoti Latvijos miestų, jei publikuojama tik Lietuvos šalis.

Pilnas galimų filtrų sąrašas:

.. describe:: model.prepare

    .. function:: eq(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a = b

        Sąlyga tenkinama, jei `a` ir `b` reikšmės yra lygios.

    .. function:: ne(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a != b

        Sąlyga tenkinama, jei `a` ir `b` reikšmės nėra lygios.

    .. function:: gt(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a > b

        Sąlyga tenkinama, jei `a` reikšmė yra didesnė už `b`.

        Ši funkcija veikia tik su kiekybiniais duomenimis, kuriuos galima palyginti.

    .. function:: lt(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a < b

        Sąlyga tenkinama, jei `a` reikšmė yra mažesnė už `b`.

        Ši funkcija veikia tik su kiekybiniais duomenimis, kuriuos galima palyginti.

    .. function:: ge(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a >= b

        Sąlyga tenkinama, jei `a` reikšmė yra didesnė arba lygi `b` reikšmei.

        Ši funkcija veikia tik su kiekybiniais duomenimis, kuriuos galima palyginti.

    .. function:: le(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a <= b

        Sąlyga tenkinama, jei `a` reikšmė yra mažesnė arba lygi `b` reikšmei.

        Ši funkcija veikia tik su kiekybiniais duomenimis, kuriuos galima palyginti.

    .. function:: in(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a.in(b)

        Sąlyga tenkinama, jei `a` lygi bent vienai iš `b` sekos reikšmių.

    .. function:: notin(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a.notin(b)

        Sąlyga tenkinama, jei `a` nelygi nei vienai iš `b` sekos reikšmių.

    .. function:: contains(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a.contains(b)

        Sąlyga tenkinama, jei bent viena `a` sekos reikšmių sutampa su `b` reikšme.

    .. function:: startswith(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a.startswith(b)

        Sąlyga tenkinama, jei `a` simbolių eilutė prasideda `b` simbolių eilute.

    .. function:: endswith(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a.endswith(b)

        Sąlyga tenkinama, jei `a` simbolių eilutė baigiasi `b` simbolių eilute.

    .. function:: and(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a & b

        Sąlyga tenkinama, jei abi `a` ir `b` sąlygos tenkinamos.

    .. function:: or(a, b)

        Sutrumpinta forma:

        .. code-block:: python

            a | b

        Sąlyga tenkinama, jei bent viena `a` arba `b` sąlyga tenkinama.

    .. function:: sort(+a, -b)

        Rūšiuoti didėjimo tvarka  pagal `a` ir mažėjimo tvarka pagal `b`.

    .. function:: select(*props)

        Pateikiant duomenis, grąžinamos tik nurodytos savybės.

        Jei nenurodyta jokia savybė, įtraukia visas, išskyrus daugiareikšmes
        savybes.

    .. function:: include(*props)

        Prie grąžinamų savybių, papildomai įtraukiamos nurodytos savybės. Gali
        būti naudojama kartu su `select()`, papildomai įtraukiant
        daugiareikšmes ar sudėtinių tipų savybės.

    .. function:: exclude(*props)

        Pašalina savybę iš `select()` ar `expand()` funkcijos pagalba atrinktų
        savybių sąrašo.

    .. function:: expand(*props)

        Veikia panašiai, kaip `include()`, tačiau įtraukia visas nurodyto
        sudėtinio tipo savybes.

        Jei nenurodyta konkreti savybė, įtraukia visų sudėtinių tipų savybes.

        `expand()` veikia tik su tiesiogiai modeliui priklausančiomis savybėmis.

        .. seealso::
        
            - :ref:`prop-expand`

    .. function:: extends(model, *props)

        Įtraukia nurodyto `model` modelio `props` savybes.

        Jei nenurodytas `model` ir `props`, įtraukia visas :data:`base` modelio savybes.

        Jei nenurodyta `props`, įtraukia, visas `model` modelio savybes.

    .. function:: limit(num)

        Riboja gražinamų objektų skaičių iki nurodyti `num` skaičiaus.

        Gali būti naudojamas su :func:`page`.

    .. function:: page(*props)

        Nurodo sekančio `next` puslapio reikšmę.

Periodiškumas
=============

Periodiškumui nurodyti naudojamas model.prepare stulpelis, kuriame galima
naudoti tokias formules:

.. describe:: model.prepare

    .. function:: cron(line)

        Duomenų atnaujinimo laikas, analogiškas `cron
        <https://en.wikipedia.org/wiki/Cron>`__ formatui.

        `line` argumentas aprašomas taip:

        `n`\ m
            `n`-toji minutė, `n` ∊ 0-59.

        `n`\ h
            `n`-toji valanda, `n` ∊ 0-23.

        `n`\ d
            `n`-toji mėnesio diena, `n` ∊ 1-31.

        $d
            Paskutinė mėnesio diena.

        `n`\ M
            `n`-tasis mėnuo, `n` ∊ 1-12.

        `n`\ w
            `n`-toji savaitės diena, `n` ∊ 0-6 (sekmadienis-šeštadienis).

        `n`\ #\ `i`\ w
            `n`-toji savaitės diena, `i`-toji mėnesio savaitė, `i` ∊ 1-6.

        `n`\ $\ `i`\ w
            `n`-toji savaitės diena, `i`-toji savaitė nuo mėnesio galo, `i`
            ∊ 1-6.

        ,
            Kableliu galim atskirt kelias laiko vertes.

        \-
            Brūkšneliu galima atskirti laiko verčių intervalą.

        /
            Pasvyruoju brūkšniu galima atskirti laiko verčių kartojimo
            žingsnį.

        Laiko vertės atskiriamos tarpo simbolių. Jei laiko vertė nenurodyta,
        reiškia įeina visos įmanomos laiko vertės reikšmės.

    .. function:: hourly()

        :func:`cron('0m') <cron>`

    .. function:: daily()

        :func:`cron('0m 0d') <cron>`

    .. function:: weekly()

        :func:`cron('0m 0h 0w') <cron>`

    .. function:: monthly()

        :func:`cron('0m 0h 1d') <cron>`

    .. function:: yearly()

        :func:`cron('0m 0h 1d 1M') <cron>`

Statinės reikšmės
=================

Statinės reikšmės arba konstantos duomenų laukams gali būti nurodomos
:data:`property.prepare` stulpelyje naudojant formulės sintaksę. Plačiau apie
formules žiūrėti :ref:`formulės` skyrelyje.


Transformavimas
===============

:data:`property.prepare` stulpelyje gauta šaltinio reikšmė gali būti pasiekiama
per `self` kintamąjį.

:data:`property.prepare` formulėje gali būti aprašomos kelios reikšmės atskirtos
kableliu, tai naudojama ryšio laukams, kai ryšiui aprašyti reikia daugiau nei
vieno duomenų lauko.

Formulėje galima naudoti kitus to pačio modelio property pavadinimus, kai
aprašomo :data:`property` reikšmės formuojamos dinamiškai naudojant vieną ar
kelis jau aprašytus laukus.

:data:`property.prepare` stulpelyje galima naudoti tokias formules:

.. describe:: property.prepare

    .. function:: null()

        Grąžina `null` reikšmę, jei toliau einančios transformacijos grąžina
        `null`.

    .. function:: replace(old, new)

        Pakeičia visus `old` į `new` simbolius eilutėje.

    .. function:: re(pattern)

        Grąžina atitinkančią reguliariosios išraiškos `pattern` reikšmę arba
        pirmos grupės reikšmę jei naudojama tik viena grupė arba reikšmių grupę
        jei `pattern` yra daugiau nei viena grupė.

    .. function:: cast(type)

        Konvertuoja šaltinio tipą į nurodytą `type` tipą. Tipų konvertavimas yra
        įmanomas tik tam tikrais atvejais. Jei tipų konvertuoti neįmanoma, tada
        metodas turėtų grąžinti klaidą.

    .. function:: split()

        Dalina simbolių eilutę naudojant `\s+` :term:`reguliariąją išraišką
        <reguliarioji išraiška>`. Grąžina masyvą.

    .. function:: strip()

        Pašalina tarpo simbolius iš pradžios ir pabaigos.

    .. function:: lower()

        Verčia visas raides mažosiomis.

    .. function:: upper()

        Verčia visas raides didžiosiomis.

    .. function:: len()

        Grąžina elementų skaičių sekoje.

    .. function:: choose(default)

        Jei šaltinio reikšmė nėra viena iš :ref:`enum`, tada grąžinama default
        reikšmė.

        Jei `default` nepateiktas, grąžina vieną iš :data:`property.enum`
        reikšmių, jei duomenų šaltinio reikšmė nėra viena iš
        :data:`property.enum`, tada grąžinama klaida.

    .. function:: switch(*cases)
    .. function:: case(cond, value)
    .. function:: case(default)

        Grąžina `value`, jei tenkina `cond` arba `default`. Jei `case(default)`
        nepateiktas, tada grąžina pradinę reikšmę.

        Jei, `cases` nepateikti, grąžina vieną iš :data:`switch.source`
        reikšmių, tenkinančių switch prepare sąlygą.

    .. function:: swap(old, new)

        Pakeičia `old` reikšmę `new`, jeigu `self` atitinka `old`.

    .. function:: return()

        Nutraukia transformacijų grandinę ir grąžina reikšmę.

    .. function:: set(name)

        Išsaugo reikšmę į kintamąjį `name`.

    .. function:: url()

        Skaido URI į objektą turintį tokias savybes:

        scheme
            URI schema.

        netloc
            Visada URI dalis tarp scheme ir path.

        username
            Naudotojo vardas.

        password
            Slaptažodis.

        host
            Domeno vardas arba IP adresas.

        port
            Prievado numeris.

        path
            Kelias.

        query
            URL dalis einanti tarp `?` ir `#`.

        fragment
            URL dalis einanti po #.

    .. function:: query()

        Funkcija skirta darbui su URI query, skaido URI query dalį į parametrus
        arba leidžia pakeisti duomenų šaltinio URI query naujomis reikšmimis.

        .. seealso::

            | :func:`param.query`

    .. function:: path()

        Skaido failų sistemos arba URI kelią į tokias savybes:

        parts
            Skaido kelią į dalis (plačiau__).

            .. __: https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.parts

        drive
            Diskas (plačiau__).

            .. __: https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.drive

        root
            Šaknis (plačiau__).

            .. __: https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.root

        .. seealso::

            | :func:`param.path`


.. _kompleksinės-struktūros:

Kompleksinės struktūros
=======================

Daugelis duomenų šaltiniu turi galimybę saugoti kompleksines struktūras. Jei
duomenys yra kompleksiniai, tada :data:`property.source` stulpelyje galima
nurodyti tik duomens pavadinimą iš pirmojo lygmens, gilesniuose lygmenyse
esančius duomenis galima aprašyti naudojant formules :data:`property.prepare`
stulpelyje.

Analogiškai duomenų atranką galima daryti ir `model` eilutėse, jei tai leidžia
duomenų šaltinis.

Kaip pavyzdį naudosime tokią :term:`JSON` duomenų struktūrą:

.. code-block:: json

    {
        "result": {
            "count": 1,
            "results": [
                {
                    "type": "dataset",
                    "tags": ["CSV"]
                }
            ]
        }
    }

.. describe:: property.prepare

    .. function:: getattr(object, name)

        Grąžina `object` savybę `name`.

        .. code-block:: python

            >>> self.result.count
            1

    .. function:: getitem(object, item)

        Grąžina `object` objekto `item` savybę arba `object` masyvo `item`
        elementą.

        .. code-block:: python

            >>> self["result"]["count"]
            1

        :func:`getitem` ir :func:`getattr` gali būti naudojami kartu.

        .. code-block:: python

            >>> self.result.results[0].type
            "dataset"

        :func:`getitem` gali būti naudojamas, kaip masyvo elementų filtras
        pateikiant filtro sąlygą.

        .. code-block:: python

            >>> self.result.results[tags = "CSV"].type
            ["dataset"]

            >>> self.result.results[item(tags) = "CSV"].type
            ["dataset"]

        Norint gauti visus masyvo elementus, galima naudoti tokią išraišką:

        .. code-block:: python

            >>> self.result.results[].tags[]
            ["CSV"]

    .. function:: first(object, default)

        Grąžina pirmą `object` sąrašo reikšmę, jei sąrašas tuščias, tada
        grąžina `default` reikšmę, jei `default` nenurodytas, tada nutraukia
        vykdymą su klaidą.

        .. code-block:: python

            >>> self.result.results[].tags.first()
            "CSV"
            
        Jei `self.result.results[].tags būtų tuščias, tada:

        .. code-block:: python

            >>> self.result.results[].tags.first(null)
            null


Analogiška struktūra gali būti gaunama ir lentelėse, kai stulpelių pavadinimai
nurodyti keliose eilutėse, pavyzdyje pateiktą struktūrą atitiktų tokia lentelė:

======  =======  ====
result
count   results
\       type     tags
======  =======  ====
1       dataset  CSV
======  =======  ====


Šioje lentelėje stulpelių pavadinimai pateikti trijose eilutėse, todėl
`model.prepare` reikėtų naudoti :func:`header(0, 1, 2) <header>`.
