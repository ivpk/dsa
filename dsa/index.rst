.. default-role:: literal

Duomenų struktūros aprašas
##########################

Čia rasite *Duomenų struktūros aprašo* (:term:`DSA`) lentelės specifikaciją.

:dfn:`Duomenų struktūros aprašas` yra lentelė skirta fizinio, loginio ir
semantinio duomenų modelių susiejimui, prieigos lygio nustatymui ir duomenų
brandos lygio vertinimui.

.. image:: _static/dsa_overview.png

:dfn:`Koncepcinis modelis` yra UML klasių diagrama, sudaryta laikantis
`Conceptual model conventions (UML)`_ reikalavimų. Koncepcinis modelis laikomas
kaip vienintelis tiesios šaltinis ir yra sudaromas remiantis teisės aktais,
informacinės sistemos nuostatais, semantiniais žodynais ir duomenų modeliu iš
duomenų šaltinio.

:dfn:`Fizinis modelis` šio dokumento kontekste yra duomenų schema apibūdinanti
kur ir kaip duomenys yra saugomi ir kaip juos pasiekti. Schema apibrėžianti
duomenų modelį priklauso nuo duomenų saugojimo formato. Jei duomenys saugomi
SQL duomenų bazėse, tada DSA lentelėje nurodomi lentelių ir stulpelių
pavadinimai, XML atveju nurodomos XPath_ išraiškos, JSON atveju nurodomos
JSONPath_ išraiškos. DSA lentelėje fizinis modelis nurodomas :ref:`source`
stulpelyje.

:dfn:`Loginis modelis` yra duomenų schema, kuri naudojama duomenų apsikeitimui
UDTS_ protokolu, loginis modelis rengiamas pagal koncepcinį modelį ir yra
artimas semantiniam modeliui, tačiau skirtas duomenų publikavimui per API.
Loginis modelis siejamas su fiziniu ir semantiniu modeliais.

:dfn:`Semantinis modelis` yra nepriklausomas nuo to, kaip duomenys saugomi ar
perduodami fiziškai, siejamas su tarptautiniais standartais ir plačiai
naudojamais sąvokų žodynais.



Specifikacijos
**************

- `Universali duomenų teikimo sąsaja`_ (UDTS)
- `Duomenų katalogo Lietuvos taikymo profilis`_ (DCAT-AP-LT)



.. _UDTS: https://ivpk.github.io/uapi
.. _Universali duomenų teikimo sąsaja: https://ivpk.github.io/uapi
.. _Duomenų katalogo Lietuvos taikymo profilis: https://ivpk.github.io/DCAT-AP-LT
.. _Conceptual model conventions (UML): https://semiceu.github.io/style-guide/1.0.0/gc-conceptual-model-conventions.html


Turinys
*******

.. toctree::
    :maxdepth: 2

    modelis
    formatas
    dimensijos
    tipai
    pavadinimai
    vienetai
    apibendrinimas
    identifikatoriai
    modeliai/funkciniai
    branda
    prieiga
    schemos/index
    saltiniai
    vardu-erdves
    zodynai
    formules
    savokos
    keitimai

.. _XPath: https://www.w3.org/TR/2010/REC-xpath20-20101214/
.. _JSONPath: https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html
