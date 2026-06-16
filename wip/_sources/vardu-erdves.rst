.. default-role:: literal

.. _ns:

Vardų erdvės
############

:data:`dataset` ir :data:`model` esantys pavadinimai turi būti globaliai
(Lietuvos mastu) unikalūs. Kad užtikrinti pavadinimų unikalumą :data:`dataset`
ir :data:`model` pavadinimai formuojami pasitelkiant vardų erdves.

.. describe:: /{vocabulary}/

    **Standartinių žodynų vardų erdvė**

    Standartinių žodynų vardų erdvė formuojama egzistuojančių standartų ir
    išorinių žodynų pagrindu suteikiant vardų erdvei `{vocabulary}` žodyno
    sutrumpintą pavadinimą. Pavyzdžiui duomenų katalogo metaduomenų žodynas
    DCAT turėtų keliauti į `/dcat/` vardų erdvę. Standartų sutrumpintus
    pavadinimus rekomenduojame imti iš `Linked Open Vocabularies`_ katalogo.

    .. _Linked Open Vocabularies: https://lov.linkeddata.es/dataset/lov/

.. describe:: /datasets/{form}/{org}/

    **Įstaigų vardų erdvė**

    Konkrečios organizacijos vietinė rinkinio vardų erdvė. Rekomenduojama
    `{org}` reikšmei naudoti organizacijos trumpinį, kad bendras modelio
    pavadinimas nebūtų per daug ilgas.

    Galimos `{form}` reikšmės:

    ===== =====================
    `gov` Valstybinės įstaigos.
    `com` Verslo įmonės.
    ===== =====================

.. describe:: /datasets/{form}/{org}/{catalog}/

    **Informacinių sistemų vardų erdvė**

    Informacinės sistemos vardų erdvė, kuri teikia duomenų rinkinius.


.. describe:: /datasets/{form}/{org}/{catalog}/{dataset}/

    **Įstaigų duomenų rinkinių vardų erdvė**

    Įstaigos duomenų rinkinio vardų erdvė į kurią patenka visi įstaigos duomenų
    modeliai.

Naujai atveriami :term:`duomenų struktūros aprašai <DSA>` sudaromi :term:`ŠDSA`
pagrindu. Įprastai duomenų bazių struktūra nėra kuriama vadovaujantis
standartais. Vidinės struktūros dažniausiai kuriamos vadovaujantis sistemai
keliamais reikalavimais. Todėl naujai atveriamų duomenų rinkiniai turi keliauti
į duomenų rinkinio vardų erdvę `/datasets/{form}/{org}/{catalog}/{dataset}/`,
išlaikant pirminę duomenų struktūrą ir neprarandant duomenų.

Tačiau su laiku, dalis įstaigos duomenų iš duomenų rinkinio vardų erdvės turėtu
būti perkeliami į globalią duomenų erdvę. Į globalią duomenų erdvę pirmiausiai
turėtų būti perkeliami tie duomenys, kurie yra plačiai naudojami. Perkėlimas į
globalią duomenų erdvę nepanaikina duomenų rinkinio iš ankstesnės vardų erdvės,
tiesiog duomenų rinkinio duomenų pagrindu kuriama kopija į globalią duomenų
erdvę.


.. _relative-model-names:

Reliatyvūs pavadinimai
**********************

Modelio pavadinimas gali būti absoliutus arba reliatyvus. Absoliutūs
pavadinimai prasideda `/` simboliu, reliatyvūs pavadinimai prasideda be `/`
simbolio ir yra jungiami su vardų erdvės pavadinimu, kurios kontekste yra
apibrėžtas modelis.

Pavyzdžiui, turinti tokį duomenų struktūros aprašą:

+----+-----+-----+-----+-----+----------+-------+
| id | d   | r   | b   | m   | property | type  |
+====+=====+=====+=====+=====+==========+=======+
| 1  | **dcat**                         | ns    |
+----+-----+-----+-----+-----+----------+-------+
| 2  |     |     |     | **dataset**    |       |
+----+-----+-----+-----+-----+----------+-------+
| 3  |     |     |     |     | title    |       |
+----+-----+-----+-----+-----+----------+-------+
| 4  | **datasets/gov/ivpk/adk**        |       |
+----+-----+-----+-----+-----+----------+-------+
| 5  |     | adk                        |       |
+----+-----+-----+-----+-----+----------+-------+
| 6  |     |     | **/dcat/dataset**    | alias |
+----+-----+-----+-----+-----+----------+-------+
| 7  |     |     |     | **dataset**    |       |
+----+-----+-----+-----+-----+----------+-------+
| 8  |     |     |     |     | title    |       |
+----+-----+-----+-----+-----+----------+-------+

Matome, kad yra apibrėžti du modeliai:

- `dcat/dataset`
- `datasets/gov/ivpk/adk/dataset`

Vienas `dataset` modelis yra apibrėžtas `dcat` vardų erdvės kontekste, kitas
`datasets/gov/ivpk/adk` vardų erdvės kontekste.

Kai modelio pavadinimas yra naudojamas vardų erdvės kontekste ir pavadinimas
neprasideda `/` simboliu, tada tai yra reliatyvus modelio pavadinimas.
Reliatyvus modelio pavadinimas yra jungiamas su vardų erdvės pavadinimu,
kurios kontekste yra apibrėžtas modelis.

Jei tam tikros vardų erdvės kontekste norime įvardinti modelį, kuris yra už
tos vardų erdvės konteksto ribų, būtina naudoti absoliutų modelio pavadinimą,
kuris prasideda `/` simboliu. Taip yra padaryta 6-oje eilutėje, kur nurodyta,
kad `datasets/gov/ivpk/adk/dataset` bazė yra `dcat/dataset` modelis iš kitos
vardų erdvės.

Visais atvejais, kai modelio pavadinimas naudojamas nenurodant jokio vardų
erdvės konteksto, `/` simbolio pavadinimo pradžioje naudoti nereikia.
Pavyzdžiui šiame tekste įvardinti `dcat/dataset` ir
`datasets/gov/ivpk/adk/dataset` modelių pavadinimai neprasideda `/` simboliu.

