.. default-role:: literal

.. _rezervuotos-savybes:

Rezervuotos savybės
###################

Savybės, kurių pavadinimai prasideda pabraukimu `_`, yra rezervuoti DSA
specialių laukų pavadinimai. Tokios savybės yra automatiškai pridedamos prie
visų modelių ir struktūros apraše jų papildomai aprašyti nereikia.

Tačiau, kai duomenys teikiami iš išorinio :ref:`duomenų šaltinio <resource>`,
kai kurias rezervuotas savybes galima įtraukti į struktūros aprašo lentelę
ir nurodyti, iš kurio šaltinio lauko reikšmė bus paimama.

================== ==============================================================
savybė             paskirtis
================== ==============================================================
:data:`_id`        Globalus unikalus modelio objekto identifikatorius.
:data:`_revision`  Objekto versijos identifikatorius.
================== ==============================================================


.. _id:

_id
***

.. module:: _id

`_id` — globalus unikalus modelio objekto identifikatorius. `_id` reikšmė
turi būti unikali visoje duomenų erdvėje.


Kai duomenys teikiami iš išorinio duomenų šaltinio, `_id` savybė gali
būti įrašyta į struktūros aprašo lentelę kaip atskira modelio savybės eilutė.
Tam, kad būtų galima identifikuoti modelio objektus, šiai `_id` eilutei turi
būti užpildytas vienas iš dviejų variantų:

- užpildomas :data:`model.ref` stulpelis,
- arba užpildomas :data:`_id.source` stulpelis su šaltinio lauko pavadinimu,
  iš kurio `_id` reikšmė paimama tiesiogiai.

.. data:: type

    Loginis `_id` tipas. Nuo šio tipo priklauso, kokia forma `_id` reikšmė
    bus pateikiama teikiant duomenis

    ========== ==================================================================
    `integer`  Sveikas skaičius.
    `string`   Simbolių eilutė.
    `uuid`     `UUID` reikšmė tekstine forma.
    `base32`   Reikšmė užkoduota Base32 formatu, žiūrėti :data:`type.base32`.
    ========== ==================================================================

.. data:: source

    Duomenų šaltinio lauko pavadinimas, iš kurio paimama `_id` reikšmė.
    Prasmė priklauso nuo :data:`resource.type`.

.. admonition:: Pavyzdys

    `_id` reikšmė formuojama iš :data:`model.ref` pirminio rakto `id`.
    `_id.source` nepildoma.

    +----------+------------+----------+-----+---------+
    | model    | property   | type     | ref | source  |
    +==========+============+==========+=====+=========+
    | Country  |            |          | id  | COUNTRY |
    +----------+------------+----------+-----+---------+
    |          | _id        |          |     |         |
    +----------+------------+----------+-----+---------+
    |          | id         | integer  |     | ID      |
    +----------+------------+----------+-----+---------+
    |          | name       | string   |     | NAME    |
    +----------+------------+----------+-----+---------+


.. admonition:: Pavyzdys

    Kompozicinis `_id`, kai pirminis raktas sudaromas iš kelių laukų.
    :data:`model.ref` stulpelyje kableliais išvardijami visi laukai, sudarantys
    pirminį raktą. `_id.source` nepildoma.

    +----------+------------+----------+--------+---------+
    | model    | property   | type     | ref    | source  |
    +==========+============+==========+========+=========+
    | Country  |            |          | id,    | COUNTRY |
    |          |            |          | code   |         |
    +----------+------------+----------+--------+---------+
    |          | _id        |          |        |         |
    +----------+------------+----------+--------+---------+
    |          | id         | integer  |        | ID      |
    +----------+------------+----------+--------+---------+
    |          | code       | string   |        | CODE    |
    +----------+------------+----------+--------+---------+
    |          | name       | string   |        | NAME    |
    +----------+------------+----------+--------+---------+


.. admonition:: Pavyzdys

    `_id` reikšmė imama tiesiogiai iš šaltinio `ID` lauko, tipas — `integer`.

    +----------+------------+----------+-----+---------+
    | model    | property   | type     | ref | source  |
    +==========+============+==========+=====+=========+
    | Country  |            |          |     | COUNTRY |
    +----------+------------+----------+-----+---------+
    |          | _id        | integer  |     | ID      |
    +----------+------------+----------+-----+---------+
    |          | name       | string   |     | NAME    |
    +----------+------------+----------+-----+---------+

.. admonition:: Pavyzdys

    `_id` tipas — `uuid`. Šaltinyje reikšmė saugoma kaip tekstinė UUID
    reikšmė ir tokia pat forma yra grąžinama duomenis teikiančioje paslaugoje.

    +----------+------------+----------+-----+---------+
    | model    | property   | type     | ref | source  |
    +==========+============+==========+=====+=========+
    | Country  |            |          |     | COUNTRY |
    +----------+------------+----------+-----+---------+
    |          | _id        | uuid     |     | UUID    |
    +----------+------------+----------+-----+---------+
    |          | name       | string   |     | NAME    |
    +----------+------------+----------+-----+---------+

.. admonition:: Pavyzdys

    `_id` tipas — `base32`. Šaltinyje reikšmė saugoma bet kokia forma,
    o duomenų agentas teikiant duomenis
    konvertuoja ją į Base32 formatą.

    +----------+------------+----------+-----+---------+
    | model    | property   | type     | ref | source  |
    +==========+============+==========+=====+=========+
    | Country  |            |          |     | COUNTRY |
    +----------+------------+----------+-----+---------+
    |          | _id        | base32   |     | RAW_ID  |
    +----------+------------+----------+-----+---------+
    |          | name       | string   |     | NAME    |
    +----------+------------+----------+-----+---------+

.. _revision:

_revision
*********

.. module:: _revision

`_revision` — objekto versijos identifikatorius. Reikšmė keičiasi kiekvieną
kartą, kai objekto duomenys atnaujinami. Naudojama konkurentinio duomenų
keitimo kontrolei ir versijavimui.

Kai duomenys teikiami iš išorinio duomenų šaltinio, `_revision` savybę
galima įtraukti į struktūros aprašo lentelę kaip atskirą modelio savybės
eilutę ir užpildyti :data:`_revision.source` stulpelį su šaltinio lauko
pavadinimu.

.. data:: type

    Loginis `_revision` tipas. Galimi tipai sutampa su :data:`_id.type`
    galimais tipais — `integer`, `string`, `uuid`, `base32`.

.. data:: source

    Duomenų šaltinio lauko pavadinimas, iš kurio paimama `_revision`
    reikšmė. Prasmė priklauso nuo :data:`resource.type`.

.. admonition:: Pavyzdys

    `Country._revision` reikšmė imama iš šaltinio `VERSION` lauko.

    +----------+------------+----------+-----+---------+
    | model    | property   | type     | ref | source  |
    +==========+============+==========+=====+=========+
    | Country  |            |          | id  | COUNTRY |
    +----------+------------+----------+-----+---------+
    |          | id         | integer  |     | ID      |
    +----------+------------+----------+-----+---------+
    |          | _revision  | string   |     | VERSION |
    +----------+------------+----------+-----+---------+
    |          | name       | string   |     | NAME    |
    +----------+------------+----------+-----+---------+


.. seealso::

    | :ref:`property`
    | :ref:`duomenų-tipai`
