.. default-role:: literal


.. _duomenų-tipai:

Duomenų tipai
#############

.. module:: type

.. data:: absent

    .. deprecated:: 0.2

        Šis tipas buvo naudojamas migracijoms ir versijavimui, tačiau nuo 0.2
        versijos, versijavimo struktūros aprašuose atsisakyta.

    Žymi :ref:`savybę <property>`, kuri buvo ištrinta ir nebenaudojama.

    .. seealso::

        :ref:`migrate`

.. data:: boolean

    Loginė reikšmė, pateikiama skaitine forma:

    ==== ======
    `0`  Neigiama reikšmė (*false*).
    `1`  Teigiama reikšmė (*true*).
    ==== ======

    .. topic:: Brandos lygis

        :ref:`L102`
            Duomenyse nėra vientisumo, kartais `true` pateikta kaip `1`, kartais
            kaip `taip`, arba `yes`.

        :ref:`L202`
            Visi duomenys pateikti vienoda, tačiau nestandartine forma. Tarkime
            duomenys pateikti `true`, `false` reikšmėmis, tačiau turėtu būti
            `1`, `0`.

.. data:: integer

    Sveikas skaičius.

    :data:`property.ref` stulpelyje, nurodomi :ref:`matavimo-vienetai`.

    .. topic:: Brandos lygis

        :ref:`L102`
            Duomenys pateikti skirtingais vienetais, pavyzdžui dalis duomenų
            pateikti metrais, dalis kilometrais ir dalis milimetrais.

        :ref:`L105`
            Amžius pateiktas atskirai, nurodant metus, menesius ir dienas. Šiuo
            atveju brandos lygis yra 1, kadangi neaišku, kiek yra dienų metuose
            ir mėnesiuose, kadangi skirtingi metai ir skirtingi mėnesiai turi
            skirtingą dienų skaičių. Tokiais atvejais duomenis reikia pateikti
            dienomis.

        :ref:`L202`
            Duomenys pateikti išskaidant vieną reikšmę į kelias reikšmes,
            skirtingais vienetais. Duomenys turėtu būti pateikti mažiausiu
            detalumu, viename duomenų lauke. Pavyzdžiui atstumas pateiktas
            atskirais duomenų laukais, kur viename nurodomas atstumas
            kilometrais, kitame metrais, trečiame milimetrais. Šiuo atveju,
            duomenys turėtu būti pateikiami milimetrais.

        :ref:`L302`
            Duomenys yra kiekybiniai, tačiau :data:`property.ref` stulpelyje
            nenurodyti vienetai.

.. data:: number

    Realusis skaičius, apvalinamas naudojant `slankiojo kablelio aritmetiką
    <IEEE754_>`_.

    :data:`property.ref` stulpelyje, nurodomi :ref:`matavimo-vienetai`.

    Sveikoji dalis atskiriama `.` simbolių.

.. data:: binary

    Dvejetainiai duomenys. Bendras baitų skaičius turi būti ne didesnis nei 1G.

    Jei reikšmė yra didesnė nei 1G reikųtu naudoti :data:`type.file`.


.. .. _text-types:

.. data:: string

    Simbolių eilutė. Neriboto dydžio, tačiau fiziškai simbolių eilutė turėtu
    būti ne didesnė, nei 1G.

    Simboliu eilutė turėtu būti pateikta UTF-8 koduote.

    Šiuo tipu žymimi duomenų laukai, kuriuose tekstas pateiktas ne žmonių
    kalba. Tai gali būti įvairūs kategoriniai duomenys, identifikatoriai ar
    kito pobūdžio simbolių eilutės, kurios nėra užrašytos natūraliąja žmonių
    kalba.

    Jei :data:`property` pavadinimas turi kalbos žymę `@`, tada `string` tipas
    tampa `text` tipo dalimi. Kablos kodas nurodomas naudojant `ISO 639-1`_
    kodų sąrašą.

    Jei tekstas turi kalbos žyme, :data:`property.ref` galima pateikti teksto
    formatą, nadojant vieną iš šių formatų:

    ======= =============
    `html`  tekstas pateiktas HTML_ formatu.
    `md`    tekstas pateiktas Markdown_ formatu.
    `rst`   tekstas pateitkas reStructuredText_ formatu.
    `tei`   tekstas pateiktas TEI_ formatu.
    ======= =============

    .. admonition:: Pavyzdys

        ==  ==  ==  ==  ===============  =======  ====
        d   r   b   m   property         type     ref 
        ==  ==  ==  ==  ===============  =======  ====
        example                                 
        -------------------------------  -------  ----
        \           Country                     
        --  --  --  -------------------  -------  ----
        \               name\@lt         string       
        \               description\@lt  string   html
        \               description\@en  string   html
        ==  ==  ==  ==  ===============  =======  ====

        Šiame pavyzdyje `@lt` nurodo, kad šalies pavadinimai ir aprašymai
        pateikti Lietuvių kalba, tačiau laukas `description` papildomai turi
        vertimą į anglų kalbą. Papildomai, šalies aprašymo teksto formatas yra
        HTML_ tipo.

    .. topic:: Brandos lygis

        :ref:`L202`
            Tekstas yra užrašytas natūralia žmonių kalba, tačiau neturi kalbos
            žymės.

        :ref:`L202`
            Duomenys pateikti nestandartine koduote. Standartinė koduotė yra
            UTF-8.

        :ref:`L202`
            Duomenys pateikti UTF-8 koduote, tačiau pats tekstas naudoja tam
            tikrą formatavimo sintaksę, kuri nėra nurodyta :data:`property.ref`
            stulpelyje.

.. data:: text

    Natūraliaja žmonių kalba užrašytas tekstas, susidedantis iš vieno ar kelių
    `string` tipo duomenų laukų, pateikiant atskirą duomenų lauką, kiekvienai
    kalbai.

    Dažniausiai tiesiogiai `text` tipas nenaudojamas, kadangi jei `string`
    tipas turi kalbos žymę, tai duomenų laukas yra interpretuojamas kaip `text`
    tipo.

    Pavyzdžiui jei :data:`property` pavadinimas yra `title@lt`, tada `title`
    duomenų laukas yra `text` tipo.

    Atskirai `text` tipo duomenų laukas gali būti nurodomas tais atvejais, kai
    reikia pateikti aprašymą ir :term:`URI` pačiam `text` tipo laukui, o ne
    vienam iš vertimų.

    .. admonition:: Pavyzdys

        ========  ======  =========  =======  ==========  ====================  ============
        dataset   model   property   type     ref         uri                   title       
        ========  ======  =========  =======  ==========  ====================  ============
        example         
        ---------------------------  -------  ----------  --------------------  ------------
        \                            prefix   rdfs        \http://www.w3.org/
                                                          2000/01/rdf-schema#
        \         Country                     name\@lt                                  
        --------  -----------------  -------  ----------  --------------------  ------------
        \                 name       text                 rdfs:label            Pavadinimas 
        \                 name\@lt   string                                                 
        ========  ======  =========  =======  ==========  ====================  ============



.. .. _temporal-types:

.. data:: datetime

    Data ir laikas atitinkantis `ISO 8601`_.

    Mažiausia galima reikšmė: `0001-01-01T00:00:00`.

    Didžiausia galima reikšmė: `9999-12-31T23:59:59.999999`.

    .. _ISO 8601: https://en.wikipedia.org/wiki/ISO_8601

    Pagal `ISO 8601`_ standartą, data gali būti pateikta tokia forma::

        YYYY-MM-DD[*HH[:MM[:SS[.fff[fff]]]][+HH:MM[:SS[.ffffff]]]]

    Simbolis `*` reiškia, kad galima pateikti bet kokį vieną simbolį,
    dažniausiai naudojamas tarpo simbolis, arba raidė `T`.

    :data:`property.ref` stulpelyje, nurodomas `datos ir laiko tikslumas`__
    sekundėmis. Tikslumą galima nurodyti laiko vienetais, pavyzdžiui `Y`,
    `D`, `S`, arba `5Y`, `10D`, `30S`. Visi duomenys turi atitikti vienodą
    tikslumą, tikslumas negali varijuoti. Galimi vienetų variantai:

    =======  ================
    Reikšmė  Prasmė
    =======  ================
    `Y`      Metai
    `M`      Mėnesiai
    `Q`      Metų ketvirčiai
    `W`      Savaitės
    `D`      Dienos
    `H`      Valandos
    `T`      Minutės
    `S`      Sekundės
    `L`      Milisekundės
    `U`      Mikrosekundės
    `N`      Nanosekundės
    =======  ================

    .. __: https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution


    .. topic:: Brandos lygis

        :ref:`L101`
            Data ir laikas pateikti laisvu tekstu, pavyzdžiui `2020 paskutinę
            pirmo mėnesio dieną`.

        :ref:`L102`
            Data ir laikas pateikti naudojant skirtingus formatus, pavyzdžiui
            `2020-01-31`, `01/31/2020`, `31.1.20`.

        :ref:`L202`
            Duomenys pateikti nestandartiniu formatu, tačiau visi duomenys
            pateikti vienodu formatu. Pavyzdžiui visi duomenys pateikti
            `01/31/2020` formatu, tačiau datos turi būti pateiktos `ISO 8601`_
            formatu.

        :ref:`L210`
            Duomenys pateikti atskiruose laukuose, pavyzdžiui metai pateikti
            viename `integer` tipo lauke, o ketvirtis, kitame `integer` tipo
            lauke. Norint didesnio brandos lygio, duomenys turi būti viename
            `date` tipo lauke su :data:`property.ref` = `Q`.

        :ref:`L303`
            Nenurodytas :data:`property.ref`, kuriame turėtu būti pateiktas
            duomenų tikslumas.


.. data:: date

    Tas pats kas `datetime` tik dienos tikslumu. Šio tipo reikšmės taip pat
    turi atitikti `ISO 8601`_::

        YYYY-MM-DD

    :data:`property.ref` stulpeyje nurodomas datos tikslumas:

    =======  ================
    Reikšmė  Prasmė
    =======  ================
    Y        Metai
    M        Mėnesiai
    Q        Metų ketvirčiai
    W        Savaitės
    D        Dienos
    =======  ================

    Jei duomenys pateikti žemesniu nei dienos tikslumu, tada datos rekšmės turi
    būti nurodytos `YYYY-MM-DD` formatu, pakeičiant `MM` ir arba `DD~ į `01`.

    .. admonition:: Pavyzdys

        Turint tokį struktūros aprašą:

        ======  =============  =======  ==========
        model   property       type     ref       
        ======  =============  =======  ==========
        Country                         id        
        ---------------------  -------  ----------
        \       id             integer            
        \       independence   date     Y         
        ======  =============  =======  ==========

        Nors `independence` duomenų lauko tiksluas yra metų, tačiau pateikiant
        duomenis būtina nurodyti mėnesį ir dieną taip pat:

        .. code-block:: json

            {
                "id": 1,
                "independence": "1990-01-01",
            }

        Šiuo atveju, kadangi datos tiksluas yra metai, `-01-01` dalis datoje
        neturi jokios reikšmės ir yra pateikiama tik tam, kad reikšmė atitiktu
        `ISO 8601`_ reikalavimus.


.. data:: time

    Dienos laikas, be konkrečios datos. Šio tipo reikšmės, kaip ir kiti
    su laiku susiję tipai turi atitikti `ISO 8601`_::

        HH[:MM[:SS[.fff[fff]]]][+HH:MM[:SS[.ffffff]]]

    Jei norima nurodyti žemesnio nei sekundžių tikslumo laiką, tada
    vietoj minučių ir/ar sekundžių galima naudoti `00` ir
    :data:`property.ref` stulpelyje nurodyti tikslumą:

    =======  ================
    Reikšmė  Prasmė
    =======  ================
    `H`      Valandos
    `T`      Minutės
    `S`      Sekundės
    `L`      Milisekundės
    `U`      Mikrosekundės
    `N`      Nanosekundės
    =======  ================

.. data:: temporal
    :noindex:

    .. deprecated:: 0.2

    Apibrėžtis laike.

    Šis tipas atitinka `datetime`, tačiau nurodo, kad visas model yra
    apibrėžtas laike, būtent pagal šią savybę. Tik viena model savybė gali
    turėti `temporal` tipą. Pagal šios savybės reikšmes apskaičiuojamas ir
    įvertinamas `dct:temporal`_.

    .. _dct:temporal: https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal


.. .. _spatial-types:

.. data:: geometry

    Erdviniai duomenys. Duomenys pateikiami WKT_ formatu, naudojant EPSG_
    duomenų bazės parametrus, skirtingoms projekcijoms išreikšti.

    .. _WKT: https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry
    .. _EPSG: https://epsg.org/home.html
    .. _WKB: https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary

    :data:`property.ref` stulpelyje nurodomas tikslumas metrais. Tikslumą
    galima pateikti naudojanti SI vienetus, pavyzdžiui `m`, `km` arba `10m`,
    `100km`.

    `geometry` tipas gali turėti du argumentus `geometry(form, crs)`:

    - `form` - geometrijos forma
    - `crs` - koordinačių sistema

    Pats tipas gali būti pateiktas vienu iš šių variantų:

    - `geometry(form, crs)` - nurodant formą ir koordinačių sistemą
    - `geometry(crs)` - nurodant tik koordinačių sistemą
    - `geometry(form)` - nurodant tik formą
    - `geometry` - be argumentų.

    **Geometrijos forma** (`form`)

    Galimi tokie geometrijos tipai:

    - `point` - taškas.
    - `linestring` - linija.
    - `polygon` - daugiakampis (pradžios ir pabaigos taškai **turi** sutapti).
    - `multipoint` - keli taškai.
    - `multilinestring` - kelios linijos.
    - `multipolygon` - keli daugiakampiai (kiekvieno daugiakampio pradžios ir pabaigos taškai **turi** sutapti).

    Kiekviena iš formų gali turėti tokias galūnes nurodančias papildomą dimensiją:

    - `z` - aukštis.
    - `m` - pasirinktas matmuo (pavyzdžiui laikas, atstumas, storis ir pan.)
    - `zm` - aukštis ir pasirinktas matmuo.

    Jei geometrijos forma nenurodyta, tada duomenys gali būti bet kokios
    geometrinės formos. Jei forma nurodyta, tada visi duomenys turi būti tik
    tokios formos, kokia nurodyta.

    **Koordinačių sistema** (`crs`)

    Antrasis `geometry` argumentas nurodomas pateikiant SRID_ numerį, kuris yra
    konkrečios koordinačių sistemos identifikacinis numeris EPSG_ duomenų
    bazėje. Jei koordinačių sistemos numeris nenurodytas, tuomet daroma
    prielaida, kad erdviniai duomenys atitinka `4326` (WGS84_) koordinačių
    sistemą.

    .. _SRID: https://en.wikipedia.org/wiki/Spatial_reference_system#Identifier

    Svarbu, kad pateikiant duomenis, koordinačių ašių eiliškumas atitiktų tokį
    eiliškumą, kuris nurodytas EPSG_ parametrų duomenų bazėje, konkrečiai
    koordinačių sistemai, kuria pateikiami duomenys.

    Svarbu, kad pateikiant duomenis, koordinačių ašių eiliškumas atitiktų tokį
    eiliškumą, kuris nurodytas EPSG_ parametrų duomenų bazėje, konkrečiai
    koordinačių sistemai, kuria pateikiami duomenys.

    .. admonition:: Pavyzdys

        a) pateikiant duomenis  LKS 94 (SRID:3346) ir WGS84 (SRID:4326)
           koordinačių sistemose į ADP Saugyklą turi būti laikomasi eiliškumo:
           pirmiausia pateikiama X (į šiaurę/platumos/latitude), o po to Y (į
           rytus/ilgumos/longitute) reikšmės;

        b) tačiau pateikiant duomenis  WGS84/Pseudo-Merkator (SRID:3857)
           koordinačių sistemoje jau atvirkščiai – pirmiausia pateikiama  rytų
           ilgumos, o po to šiaurės platumos reikšmės.  

    Pilną SRID_ kodų sąrašą galite rasti `epsg.io`_ svetainėje. Keletas
    dažniau naudojamų SRID_ kodų:

    .. _epsg.io: https://epsg.io/

    ======  =======================  ===================================================================  ===================  ============
    SRID    CRS                      Pavyzdys                                                             ašys                 orientacija 
    ======  =======================  ===================================================================  ===================  ============
    4326_   WGS84                    `POINT(54.6981 25.2738) <ex4326_>`_                                  lat, lon             north, east
    3346_   LKS94                    `POINT(6063156 582111) <ex3346_>`_                                   north, east (x, y)   north, east
    3857_   WGS84 / Pseudo-Merctor   `POINT(2813472 7303494) <ex3857_>`_                                  lon, lat             east, north
    4258_   ETRS89                   `POINT(54.6981 25.2738) <ex4258_>`_                                  lat, lon             north, east
    ======  =======================  ===================================================================  ===================  ============

    .. _4326: https://epsg.io/4326
    .. _3346: https://epsg.io/3346
    .. _3857: https://epsg.io/3857
    .. _4258: https://epsg.io/4258

    .. _ex4326: https://get.data.gov.lt/_srid/4326/54.6981/25.2738
    .. _ex3346: https://get.data.gov.lt/_srid/3346/6063156/582111
    .. _ex3857: https://get.data.gov.lt/_srid/3857/2813472/7303494
    .. _ex4258: https://get.data.gov.lt/_srid/4258/54.6981/25.2738

    .. note::

        Atkreipkite dėmesį, kad LKS94 koordinačių sistemoje geometrinės ašys
        neatitinka įprastinio ašių eiliškumo naudojamo GIS sistemose. LKS94 pirmas
        skaičius yra apytiksliai 6,000,000 metrų nuo pusiaujo į šiaurę, o antrasis
        skaičius apytiksliai 500,000 metrų į rytus, skaičiuojant nuo 24º rytų
        meridiano, atėmus 500km. Teikiant duomenis, taškai turėtu atrodyti taip:
        `6000000 500000`, pirmas ilgesnis, antras trumpesnis.

            Ašinio meridiano projekcija yra abscisių (x) ašis. Šios ašies
            teigiamoji kryptis nukreipta į šiaurę. Ordinačių (y) ašies
            teigiamoji kryptis nukreipta į rytus.

            Išvyniojus cilindrą, gaunamos stačiakampės koordinatės su x
            šiaurinės abscisės pradžia pusiaujuje ir y rytinės ordinatės
            reikšme 24°C meridiane 500 000 metrų.

            -- https://www.e-tar.lt/portal/lt/legalAct/TAR.6D575923F94A

    Prieš publikuojant duomenis, galite pasitikrinti, ar koordinačių ašys
    pateikiamos teisinga tvarka, naudotami taško atvaizdavimo įrankį.

    Pavyzdžiui, norint patikrinti Vilniaus Katedros varpinės bokšto taško
    koordinates, LKS94 (EPSG:3346) sistemoje, galite naršyklės adreso juostoje
    pateikti šį adresą:

    https://get.data.gov.lt/_srid/3346/6061789/582964

    Jei ašių eiliškumas teisingas, gausite tašką ten kur tikėjotės, jei ašys
    sukeistos vietomis, tada taškas žemėlapyje gali būti visai kitoje vietoje,
    nei tikėjotės.

    Adreso formatas::
    
        /_srid/{srid}/{ašis1}/{ašis2}

    - `{srid}` - EPSG_ duomenų bazėje esančios koordinačių sistemos SRID_ kodas
    - `{ašis1}` - pirmosios ašies reikšmė (kryptis priklauso nuo `{srid}`)
    - `{ašis2}` - antrosios ašies reikšmė (kryptis priklauso nuo `{srid}`)


    .. admonition:: Pavyzdinės :data:`property.type` reikšmės

        - `geometry` - WGS84 projekcijos, bet kokio  tipo geometriniai
          objektai.

        - `geometry(3346)` - LKS94 projekcijos, bet kokio tipo geometriniai
          objektai.

        - `geometry(point)` - GWS84 projekcijos, bet `point` tipo geometriniai
          objektai.

        - `geometry(linestringm, 3345)` - LKS94 projekcijos, `linestringm` tipo
          geometriniai objektai su pasirinktu matmeniu, kaip trečia dimensija.


    .. admonition:: Pavyzdys (duomenys)

        Vilniaus Katedros varpinės bokšto taškas, LKS94 (EPSG:3346) koordinačių
        sistemoje:

        .. code-block:: json

            {
                "koordinates": "POINT (6061789 582964)"
            }


    .. topic:: Brandos lygis

        :ref:`L101`
            Pateiktas adresas, nenurodant adreso koordinačių.

        :ref:`L102`
            Nenurodytas koordinačių sistema ir duomenys pateikti skirtingomis
            koordinatėmis.

        :ref:`L102`
            Sumaišytos ašys, pavyzdžiui vieni duomenys pateikiami x, y, kiti y,
            x.

        :ref:`L102`
            Sumaišyti vienetai, pavyzdžiui vieni duomenys pateikti metrais,
            kiti laipsniais.

        :ref:`L201`
            Nenurodyta koordinačių sistema, tačiau visi duomenys pateikti
            naudojant vienodą koordinačių sistemą.

        :ref:`L210`
            Taško koordinatės pateiktos, kaip du atskiri duomenų laukai.

        :ref:`L303`
            Nenurodytas :data:`property.ref`, kuriame turėtu būti pateiktas
            duomenų tikslumas metrais.



.. data:: spatial
    :noindex:

    .. deprecated:: 0.2

    Apibrėžtis erdvėje.

    Šis tipas atitinka `geometry`, tačiau nurodo, kad visas model yra
    apibrėžtas erdvėje, būtent pagal šią savybę.  Tik viena model savybė
    gali turėti `spatial` tipą. Pagal šios savybės reikšmes apskaičiuojamas ir
    įvertinamas `dct:spatial`_.

    .. _dct:spatial: https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial


.. data:: money

    Valiuta. Saugomas valiutos kiekis, nurodant tiek sumą, tiek valiutos
    kodą naudojant `ISO 4217`_ kodus.

    Valiutos kodas nurodomas :data:`property.ref` stulpelyje.

    .. _ISO 4217: https://en.wikipedia.org/wiki/ISO_4217

    Pavyzdys:

    ==  ==  ==  ==  ========  =====  ===  =======
    d   r   b   m   property  type   ref  source 
    ==  ==  ==  ==  ========  =====  ===  =======
    example                                      
    ------------------------  -----  ---  -------
    \           Product                   PRODUCT
    --  --  --  ------------  -----  ---  -------
    \               price     money  EUR  PRICE  
    ==  ==  ==  ==  ========  =====  ===  =======

    Jei valiutos suma ir pavadinimas saugomi atskirai, tuomet valiutą galima
    aprašyti taip:

    ==  ==  ==  ==  ========  =====  ===  =============  =======================
    d   r   b   m   property  type   ref  source         prepare                
    ==  ==  ==  ==  ========  =====  ===  =============  =======================
    example                                                                     
    ------------------------  -----  ---  -------------  -----------------------
    \           Product                   PRODUCT                               
    --  --  --  ------------  -----  ---  -------------  -----------------------
    \               amount                PRICE                                 
    \               currency              CURRENCY_CODE                         
    \               price     money                      money(amount, currency)
    ==  ==  ==  ==  ========  =====  ===  =============  =======================

    Šio tipo duomenys pateikiami viena iš šių formų::

        123
        123.45
        123 EUR
        123.45 EUR


.. data:: file

    Šis duomenų tipas yra sudėtinis, susidedantis iš tokių duomenų:

    id
        Laukas, kuris unikaliai identifikuoja failą, šis laukas duomenų
        saugojimo metu pavirs failo identifikatoriumi, jam suteikiant unikalų
        UUID.

    name
        Failo pavadinimas.

    type
        Failo `media tipas`__.

        __ https://en.wikipedia.org/wiki/Media_type

    size
        Failo turinio dydis baitais.

    content
        Failo turinys.

    Šiuos metaduomenis galima perduoti `file()` funkcijai, kaip vardinius
    argumentus.

    .. admonition:: Pavyzdys

        ==  ==  ==  ==  ==============  ======  ==============  =======  =======
        d   r   b   m   property        type    source          prepare  access
        ==  ==  ==  ==  ==============  ======  ==============  =======  =======
        datasets/example
        ------------------------------  ------  --------------  -------  -------
        \           Country
        --  --  --  ------------------  ------  --------------  -------  -------
        \               name            string  NAME                     open
        \               flag_file_name  string  FLAG_FILE_NAME           private
        \               flag_file_data  binary  FLAG_FILE_DATA           private
        \               flag            file                    |file|   open
        ==  ==  ==  ==  ==============  ======  ==============  =======  =======

        .. |file| replace:: file(name: flag_file_name, content: flag_file_data)

        Šiame pavyzdyje, iš `flag_file_name` ir `flag_file_data` laukų
        padaromas vienas `flag` laukas, kuriame panaudojami duomenys iš dviejų
        laukų. Šiuo atveju, `flag_file_name` ir `flag_file_data` laukai tampa
        pertekliniais, todėl :data:`access` stulpelyje jie pažymėti `private`.

        Analogiškai, tokius pačius duomenis galima aprašyti ir nenaudojant
        formulių:

        ==  ==  ==  ==  ==============  ======  ==============  =======  =======
        d   r   b   m   property        type    source          prepare  access
        ==  ==  ==  ==  ==============  ======  ==============  =======  =======
        datasets/example
        ------------------------------  ------  --------------  -------  -------
        \           Country
        --  --  --  ------------------  ------  --------------  -------  -------
        \               name            string  NAME                     open
        \               flag            file                             open
        \               flag._name              FLAG_FILE_NAME           open
        \               flag._content           FLAG_FILE_DATA           open
        ==  ==  ==  ==  ==============  ======  ==============  =======  =======


.. data:: image

    Paveiksliukas. `image` tipas turi tokias pačias savybes kaip `file`
    tipas.


.. .. _ref-types:

.. data:: ref

    Ryšys su modeliu. Šis tipas naudojamas norint pažymėti, kad lauko
    reikšmė yra :data:`property.ref` stulpelyje nurodyto modelio objektas.

    Pagal nutylėjimą, jungimas su kito modelio objektais daromas per siejamo
    pirminį raktą (:data:`model.ref`), tačiau yra galimybė nurodyti ir kitą,
    nebūtinai pirminį raktą.

    Jei jungimas daromas, ne per pirminį raktą, tuomet, laukai per kuriuos
    daromas jungimas nurodomi :data:`property.ref` stulpelyje laužtiniuose
    sklaustuose, pavyzdžiui::

        Country[code]

    Čia jungiama su `Country` modeliu, per `Country` modelio `code` duomenų
    lauką.

    Jei laukas, per kurį daromas jungimas nenurodytas, pavyzdžiui::

        Country

    Tada, jungimas daromas per `Country` modelio pirminį raktą, kuris nurodytas
    :data:`model.ref` stulpelyje.


    Šio objekto reikšmės yra pateikiamos, kaip dalis objekto į kurį rodoma. Jei
    `ref` tipo lauko brandos lygis (:data:`property.level`) yra 4 ar didesnis,
    tuomet šio duomenų tipo reikšmės atrodo taip:

    .. code-block:: json

        {"_id": "69c98b0f-9e4e-424b-9575-9f601d79b68e"}

    Jei brandos lygis (:data:`property.level`) yra žemesnis nei 4, tada reikšmė
    atrodo taip:

    .. code-block:: json

        {"id": "69c98b0f-9e4e-424b-9575-9f601d79b68e"}

    Čia `id` yra :data:`model.ref` arba :ref:`kitas laukas <ref-fkey>`, per
    kurį daromas jungimas. Jei nenurodytas nei :data:`model.ref`, nei
    :ref:`kitas laukas <ref-fkey>`, tada jungimas daromas per `_id`, tačiau
    netikrinama ar toks `_id` egzistuoja jungiamame modelyje.

    .. seealso::

        :ref:`ryšiai`

.. data:: backref

    Atgalinis ryšys su modeliu.

    Jei ryšys tarp dviejų modlių yra daug su vienu, tada `property` pavadinimas
    nurodomas su `[]` simboliu.

    .. admonition:: Pavyzdys

        Koncepcinis modelis

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

        Struktūros aprašas

        ======  =========  ========  ============
        model   property   type      ref         
        ======  =========  ========  ============
        **Country**                  id          
        -----------------  --------  ------------
        \       id         integer               
        \       name\@lt   string                
        \       cities[]   backref   **City**
        **City**                     id          
        -----------------  --------  ------------
        \       id         integer               
        \       name\@lt   string                
        \       country    ref       **Country**
        ======  =========  ========  ============

    .. seealso::

        :ref:`atgalinis-ryšys`

.. data:: generic

    Dinaminis ryšys su modeliu.

    Šis tipas naudojamas tada, kai yra poreikis perteikti dinaminį ryšį, t.
    y. duomenys siejami ne tik pagal id, bet ir pagal modelio pavadinimą.
    Tokiu būdu, vieno modelio laukas gali būti siejamas su keliais
    modeliais.

    .. seealso::

        :ref:`polimorfinis-ryšys`

    Šis duomenų tipas yra sudėtinis, susidedantis iš tokių duomenų:

    object_model
        Pilnas modelio pavadinimas, su kuriuo yra siejamas objektas.

    object_id
        `object_model` modelio objekto id.


.. .. _sudėtiniai-tipai:

.. data:: object

    :term:`Sudėtinis tipas <sudėtinis tipas>`, apjungiantis kelias savybes į
    grupę, po vienu pavadinimu.

    Šis tipas naudojamas apibrėžti sudėtiniams duomenims, kurie aprašyti
    naudojant kelis skirtingus tipas. Kompozicinio tipo atveju property
    stulpelyje komponuojami pavadinimai atskiriami taško simboliu.

    Sudarant duomenų modelį, rekomenduojama laikytis plokščios struktūros ir
    komponavimą įgyvendinti siejant modelius per `ref` ar `generic` tipus.

.. data:: array

    :term:`Sudėtinis tipas <sudėtinis tipas>`, nurodo reikšmių masyvą.

    Šis tipas naudojamas apibrėžti duomenų masyvams. Jei masyvo elementai
    turi vienodus tipus, tada elemento tipas pateikiamas property pavadinimo
    gale prirašant [] sufiksą, kuris nurodo, kad aprašomas ne pats masyvas,
    o masyvo elementas.


.. .. _other-types:

.. data:: url

    Unikali resurso vieta (URL) (angl. *Uniform Resource
    Locator*).

    Šis tipas naudojamas pateikiant nuorodas į išorinius šaltinius.

    https://en.wikipedia.org/wiki/Uniform_Resource_Locator


.. data:: uri

    Universalus resurso identifikatorius (URI) (angl. *Universal Resource
    Identifier*).

    Šis tipas naudojamas tais atvejais, kai pateikiamas išorinio resurso
    identifikatorius, RDF duomenų modelyje tai yra subjeto identifikatorius.

    https://en.wikipedia.org/wiki/Uniform_Resource_Identifier


.. _HTML: https://en.wikipedia.org/wiki/HTML
.. _IEEE754: https://en.wikipedia.org/wiki/IEEE_754
.. _Markdown: https://spec.commonmark.org/
.. _TEI: https://en.wikipedia.org/wiki/Text_Encoding_Initiative
.. _reStructuredText: https://docutils.sourceforge.io/rst.html
.. _ISO 639-1: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
.. _RDF Turtle: https://www.w3.org/TR/turtle/#turtle-literals
