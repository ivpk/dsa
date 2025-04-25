.. default-role:: literal
.. _scopes:

Duomenų `scope` prieiga
===============

Duomenų `scope` prieigos taisyklės yra nurodomos :data:`scope` :ref: `dimensijoje <scope>`. Šios taisyklės formuojamos pagal :ref: `formules <formulės>`
Užklausos metu jei yra nurodomas apibrėžtas `scope`, tuomet įgalinama `prepare` apibėžta taisyklė. Vienas naudotojas gali turėti kelis, jam priskirtus `scope`.

Pavyzdžiui:

+---------+------------------+---------+-----------+-----------------------------+
| model   | property         | type    | ref       | prepare                     |
+=========+==================+=========+===========+=============================+
| City    |                  |         | id        |                             |
+---------+------------------+---------+-----------+-----------------------------+
|         |                  | scope   | ids       | select(id)                  |
+---------+------------------+---------+-----------+-----------------------------+
|         |                  | scope   | names     | select(name, country.name)  |
+---------+------------------+---------+-----------+-----------------------------+
|         |                  | scope   | ltu       | country.code='lt'           |
+---------+------------------+---------+-----------+-----------------------------+
|         | id               | integer |           |                             |
+---------+------------------+---------+-----------+-----------------------------+
|         | name@lt          | string  |           |                             |
+---------+------------------+---------+-----------+-----------------------------+
|         | country          | ref     | Country   |                             |
+---------+------------------+---------+-----------+-----------------------------+
|         | country.code     | string  |           |                             |
+---------+------------------+---------+-----------+-----------------------------+
|         | country.name@lt  | string  |           |                             |
+---------+------------------+---------+-----------+-----------------------------+

Šiame pavyzdyje, duomenų gavėjas gali gauti tik `name@lt` ir `country.name@lt` kai jis pateikia `@names` scope.

Priklausomai nuo pateikto `scope` bus gaunami skirtingi atsakymai:

Su `City/@ids` scope bus grąžinama:

+-----+
| id  |
+=====+
| --- |
+-----+
| 1   |
+-----+
| 2   |
+-----+
| 3   |
+-----+
| 4   |
+-----+


Su `City/@names` scope bus grąžinama:

+-----------|------------------+
| name@lt   | country.name@lt  |
+===========|==================+
| Vilnius   | Lithuania        |
+-----------|------------------+
| Kaunas    | Lithuania        |
+-----------|------------------+
| Riga      | Latvia           |
+-----------|------------------+
| Tallinn   | Estonia          |
+-----------|------------------+


Su `City/@ltu` scope bus grąžinama:

+-----+-----------+--------------+---------------+------------------+
| id  | name@lt   | country._id  | country.code  | country.name@lt  |
+=====+===========+==============+===============+==================+
| 1   | Vilnius   | 64cd7251     | lt            | Lithuania        |
+-----+-----------+--------------+---------------+------------------+
| 2   | Kaunas    | e2e87c31     | lt            | Lithuania        |
+-----+-----------+--------------+---------------+------------------+


**Naudotojo autorizacija**

Kad veiktu naudotojo autorizacija, įvedamas naujas registro objektas `User`, kuris registruojamas Tapatybės nustatymo ir prieigų valdymo informacinėje sistemoje (TNPVIS).

Kiekvieną kartą nustatant tapatybę, TNPVIS saugo `User` informaciją ir suteikia jam unikalų identifikatorių.

Kitos informacinės sistemos, kurios naudojąsi TNPVIS, gauna `User` identifikatorių ir jį susieja su IS vidinėje duomenų bazėje esančiu naudotoju, per el pašto adresą, asmens kodą ar kitus asmenį identifikuojančius duomenis.

Agentas, naudodamas standartinį vidinių/išoriunių raktų susiejimo funkcionalumą, naudoja išorinį `User` raktą, kurį suteikia TNPVIS.

Galiausiai struktūros apraše tai atsispindėtu taip:

+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
| base                                     | model   | property         | type    | ref       | prepare                   |
+==========================================+=========+==================+=========+===========+===========================+
|                                          | City    |                  |         | id        |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         |                  | scope   | ids       | select(id)                |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         |                  | scope   | names     | select(name, country.name)|
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         |                  | scope   | ltu       | country.code='lt'         |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         |                  | scope   | admin     | user().is_admin=true      |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | id               | integer |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | name@lt          | string  |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | country          | ref     | Country   |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | country.code     | string  |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | country.name@lt  | string  |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
| /datasets/gov/vssa/tnpvis/gw/users/User  |         |                  |         | email     |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          | User    |                  |         | id        |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | id               | integer |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | email            | integer |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+
|                                          |         | is_admin         | boolean |           |                           |
+------------------------------------------+---------+------------------+---------+-----------+---------------------------+


Pavyzdyje pateiktas `admin` scope su `user().is_admin=true` formule, kurioje `user()` bus pakeistas į galutinį naudotoją, kuriam išduotas raktas, o raktą išdavė TNPVIS, su išoriniu `User` raktu,
kuris yra susietas per el. pašto adresą su vidiniu IS naudotoju, suteikiant galimybę Agentui patikrinti ar naudotojas gali matyti duomenis ar ne.
