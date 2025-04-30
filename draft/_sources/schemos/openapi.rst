.. default-role:: literal


OpenAPI
=======

`OpenAPI Specifikacija (OAS) <https://spec.openapis.org/oas/latest.html>`_ yra standartizuotas,
su konkrečia programavimo kalba nesusietas būdas aprašyti
`Aplikacijų Programavimo Sąsajas <https://lt.wikipedia.org/wiki/Aplikacij%C5%B3_programavimo_s%C4%85saja>`_ (toliau — API).
Specifikacija apibrėžia maršrutus, parametrus, atsakymus, duomenų tipus ir kt.,
suteikdama galimybę suprasti paslaugos galimybes be prieigos prie kodo ar papildomos dokumentacijos.


Struktūra
---------

Tipinė `OpenAPI Schema` dokumento aprašymo struktūra:

.. mermaid::

    graph TD
        A[OpenAPI Dokumentas]
        A --> B[openapi]
        A --> C[info]
        B --> C1[title]
        B --> C2[version]
        A --> D[paths]
        D --> E1["/{path}"]
        D --> E2["/{pathN}"]
        E1 --> G[GET]
        G --> I[tags]
        G --> J[operationId]
        G --> K[parameters]
        G --> L[responses]
        L --> M1[200]
        L --> M2[400]
        M1 --> N[content]
        M2 --> N[content]
        N --> O[schema]

.. _openapi_element:

Šakninis objektas
~~~~~~~~~~~~~~~~~

OpenAPI Šakninis objektas (angl. root object) yra viso OpenAPI dokumento pradinis JSON objektas,
kuriame aprašomi pagrindiniai API metaduomenys, maršrutai ir kitos bendros dalys.

.. admonition:: Pavyzdys

    **Duomenų schema**

    .. code-block:: json

        {
            "openapi": "3.0.0",
            "info": {
                "title": "Countries API",
                "version": "1.0.0"
            },
            "paths": {
                "/api/countries": {
                    "get": {
                        "tags": [
                            "List of countries"
                        ]
                    }
                }
            }
        }

    **Duomenų struktūros aprašas**

    +------------------------------------------+--------+
    | dataset                                  | type   |
    +==========================================+========+
    | services/countries_api                   | ns     |
    +------------------------------------------+--------+
    |                                          |        |
    +------------------------------------------+--------+
    | services/countries_api/list_of_countries |        |
    +------------------------------------------+--------+


- `openapi` - Nurodo specifikacijos `versiją <https://spec.openapis.org/oas/latest.html#versions>`_, kuria aprašytas dokumentas.
- `info` - Pateikia metaduomenis apie API. Tokius kaip: pavadinimą, dokumento versiją (ne tas pats, kas specifikacijos versija).
- `paths` – Aprašo API kelius ir operacijas. Plačiau — skyriuje :ref:`Keliai (angl. paths) <openapi_paths>`.


.. _openapi_paths:

Keliai (angl. paths)
~~~~~~~~~~~~~~~~~~~~

Ši dalis nurodo, kokie API adresai (keliai) yra pasiekiami ir ką galima su jais daryti.

Kiekvienas kelias gali turėti vieną ar kelias užklausų rūšis. Tos pačios rūšies užklausa viename kelyje **negali kartotis** –
jos atitinka `HyperText Transfer Protocol (HTTP) <https://lt.wikipedia.org/wiki/HTTP>`_ standartus:

- `GET` — gauti duomenis.
- `POST` — pridėti (sukurti) naujus duomenis.
- `PUT` — atnaujinti visą objektą.
- `PATCH` — dalinai atnaujinti objektą.
- `DELETE` — ištrinti duomenis.
- `OPTIONS` — gauti informaciją apie tai, kokios užklausos yra leidžiamos šiame kelyje.

Kiekviena konkreti užklausos ir kelio kombinacija (pvz. `GET /api/cities`) turi papildomų laukų, aprašančių šią operaciją:

- `tags` — naudojama užklausų grupavimui pagal temas ar kategorijas.
- `operationId` — unikalus operacijos identifikatorius.
- `parameters` — papildomi kintamieji, naudojami šios operacijos metu. Plačiau — skyriuje :ref:`Parametrai <openapi_parameters>`.
- `responses` — galimi operacijos atsakymai, grąžinami pateikus užklausą. Plačiau — skyriuje :ref:`Atsakymai (angl. responses) <openapi_responses>`.


.. admonition:: Pavyzdys

    **Duomenų schema**

    .. code-block:: json

        {
            "paths": {
                "/api/countries": {
                    "get": {
                        "tags": [
                            "Countries"
                        ],
                        "operationId": "6e4b8c7d-2db6-42dc-9263-071b4cba76d4",
                        "parameters": [],
                        "responses": {
                            "200": {},
                            "400": {}
                        }
                    }
                }
            }
        }

    **Duomenų struktūros aprašas**

    +-------+--------------------+-------------------+-----------+----------------+---------------------------------+
    | id    | dataset            | resource          | property  | source         | prepare                         |
    +=======+====================+===================+===========+================+=================================+
    |       | services           |                   | ns        |                |                                 |
    +-------+--------------------+-------------------+-----------+----------------+---------------------------------+
    |       |                    |                   |           |                |                                 |
    +-------+--------------------+-------------------+-----------+----------------+---------------------------------+
    |       | services/countries |                   |           |                |                                 |
    +-------+--------------------+-------------------+-----------+----------------+---------------------------------+
    | 6e... |                    | api_countries_get | dask/json | /api/countries | http(method:"GET", body="form") |
    +-------+--------------------+-------------------+-----------+----------------+---------------------------------+


.. _openapi_parameters:

Parametrai
~~~~~~~~~~

Parametrų sąrašas, taikomas konkrečiai operacijai (pvz., `GET /countries`).

- Parametrai **negali kartotis** – t. y. negali būti du ar daugiau vienodų (pagal `name` ir `in` reikšmes).
- Unikalus parametras apibrėžiamas pagal **jo pavadinimą (`name`)** ir **vietą (`in`)**: pvz., `in: query`, `in: path`, `in: header`, `in: cookie`.
- Parametrai gali būti **nurodomi tiesiogiai** arba naudojant nuorodą į `components.parameters`, jei jie jau apibrėžti bendroje dokumento dalyje.

.. admonition:: Pavyzdys

    **Duomenų schema**

    .. code-block:: json

        {
            "parameters": [
                {
                    "name": "Id",
                    "in": "path",
                    "description": "Konkretus objekto identifikatorius"
                },
                {
                    "name": "region",
                    "in": "query",
                    "description": "Regiono pavadinimas, pvz., Europa, Azija",
                    "schema": {
                        "type": "string",
                        "example": "Europa"
                    }
                },
                {
                    "name": "limit",
                    "in": "query",
                    "description": "Grąžinamų rezultatų kiekis",
                    "schema": {
                        "type": "integer",
                        "enum": [
                            10,
                            20,
                            50
                        ]
                    }
                }
            ]
        }



    **Duomenų struktūros aprašas**

    +-------+--------+-------------+----------+
    | type  | ref    | source      | prepare  |
    +=======+========+=============+==========+
    | param | id     | Id          | path()   |
    +-------+--------+-------------+----------+
    | param | region | region      | query()  |
    +-------+--------+-------------+----------+
    | param | limit  | limit       | query()  |
    +-------+--------+-------------+----------+


.. _openapi_responses:

Atsakymai (angl. responses)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Aprašo, kokių atsakymų galima tikėtis iš šios operacijos.

Kiekvienas atsakymas susiejamas su `HTTP atsakymo kodu <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status>`_
(pvz., `200`, `404`, `500`) ir aprašo, koks turinys bus grąžintas.

- Nebūtina dokumentuoti visų galimų HTTP kodų, nes kai kurie gali būti nežinomi iš anksto.
- Visada rekomenduojama aprašyti **sėkmingos užklausos atsakymą** (pvz., `200`) ir bet kokias žinomas klaidas (pvz., `400`, `404`).
- Galima naudoti `default` raktą, kuris nurodo **bendrą atsakymą visiems nepaminėtiems HTTP kodams**.
- `responses` objektas **privalo turėti bent vieną atsakymo kodą**. Jei nurodomas tik vienas – jis turėtų būti susijęs su sėkminga operacija.


.. admonition:: Pavyzdys

    **Duomenų schema**

    .. code-block:: json

        {
            "responses": {
                "200": {
                    "description": "Sėkmingai gauta šalių informacija",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "integer",
                                            "description": "Unikalus šalies ID",
                                            "example": 1
                                        },
                                        "name": {
                                            "type": "string",
                                            "description": "Šalies pavadinimas",
                                            "example": "Lietuva"
                                        },
                                        "iso_code": {
                                            "type": "string",
                                            "description": "ISO 3166-1 šalies kodas",
                                            "example": "LT"
                                        },
                                        "region": {
                                            "type": "string",
                                            "description": "Šalies regionas",
                                            "example": "Europa"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Blogai suformuota užklausa",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Neteisingi užklausos parametrai"
                                    },
                                    "errors": {
                                        "type": "object",
                                        "additionalProperties": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

