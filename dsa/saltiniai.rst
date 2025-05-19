.. default-role:: literal

.. .. _resource:
.. _duomenu-saltiniai:

Duomenų šaltiniai
=================

.. _resource-type-sql:

SQL
---

.. _sql-resource-source:

.. describe:: resource.source

    Duomenų bazės URI. Duomenų bazės URI formuojamas naudojant tokį ABNF_
    šabloną:

    .. _ABNF: https://en.wikipedia.org/wiki/Augmented_Backus–Naur_form

    .. code-block:: abnf

        uri = type ["+" driver] "://"
              [user [":" password] "@"]
              host [":" port]
              "/" database ["?" params]

    Šablone naudojamų kintamųjų aprašymas:

    .. describe:: type

        Duomenų bazių serverio pavadinimas:

        .. describe:: sqlite

        .. describe:: postgresql

        .. describe:: mysql

        .. describe:: oracle

        .. describe:: mssql

    .. describe:: driver

        Konkretaus duomenų bazių serverio tvarkyklė naudojama komunikacijai su
        duomenų baze.

    .. describe:: user

        Naudotojo vardas jungimuisi prie duomenų bazės.

    .. describe:: password

        Duomenų bazės naudotojo slaptažodis.

    .. describe:: host

        Duomenų bazių serverio adresas.

    .. describe:: port

        Duomenų bazių serverio prievadas.

    .. describe:: database

        Konkrečios duomenų bazės pavadinimas.

    .. describe:: params

        Papildomi parametrai `Query string` formatu.

.. describe:: resource.prepare

    Formulė skirta papildomiems veiksmams reikalingiems ryšiui su duomenų baze
    užmegzti ir duomenų bazės paruošimui, kad būtų galima skaityt duomenis.

.. describe:: resource.type

    Galimos reikšmės: `sql`.

.. describe:: resource.prepare

    .. function:: connect(dsn, schema: str = None, encoding: str = 'utf-8')

        :arg dsn: Duomenų bazės URI, kaip nurodyta :ref:`resource.source
            <sql-resource-source>`.
        :arg schema: Duomenų bazės schema.
        :arg encoding: Duomenų bazės koduotė.

        Naudojama tais atvejais, kai jungiantis prie duomenų bazės reikia
        perduoti papildomus parametrus.

.. describe:: model.source

    Duomenų bazėje esančios lentelės pavadinimas.

.. describe:: property.source

    Lentelės stulpelio pavadinimas.


CSV
---

.. describe:: resource.type

    Galimos reikšmės: `csv`, `tsv`.

.. describe:: resource.source

    Žiūrėti :ref:`failai`.

.. describe:: resource.prepare

    .. function:: tabular(sep: ",")

        Nurodoma kaip CSV faile atskirti stulpeliai. Pagal nutylėjimą
        `separator` reikšmė yra `,`.

.. describe:: model.source

    Nenaudojama, kadangi CSV resursas gali turėti tik vieną lentelę.

.. describe:: model.prepare

    Žiūrėti :ref:`stulpeliai-lentelėje`.

.. describe:: property.source

    Žiūrėti :ref:`stulpeliai-lentelėje`.


JSON
----

.. describe:: resource.type

    Galimos reikšmės: `json`, `jsonl`.

.. describe:: resource.source

    Žiūrėti :ref:`failai`.

.. describe:: model.source

    JSON objekto savybės pavadinimas, kuri rodo į masyvą reikšmių, kurios bus
    naudojamos kaip modelio duomenų eilutės. Kiekvienas masyvo elementas
    atskirai aprašomas :data:`property` dimensijoje. Jei JSON objektas yra
    kompleksinis žiūrėti :ref:`kompleksinės-struktūros`.

.. describe:: property.source

    JSON objekto savybė, kurioje pateikiami aprašomo stulpelio duomenys.

.. describe:: property.prepare

    Žiūrėti :ref:`kompleksinės-struktūros`.


.. _XPath: https://en.wikipedia.org/wiki/XPath

XML
---

.. describe:: resource.type

    Galimos reikšmės: `xml`, `html`.

.. describe:: resource.source

    Žiūrėti :ref:`failai`.

.. describe:: model.source

    XPath_ iki elementų sąrašo kuriame yra modelio duomenys.

.. describe:: model.prepare

    Jei neužpildyta, vykdoma :func:`xpath(self) <xml.xpath>` funkcija.

    .. function:: xpath(expr)

        Vykdo nurodyta `expr`, viso XML dokumento kontekste.

.. describe:: property.source

    XPath_ iki elemento kuriame yra duomenys.

    XPath nurodomas reliatyvus modeliui, arba kitai daugiareikšmei savybei,
    kurios sudėtyje savybė yra. Daugiareikšmės savybės žymimos `[]` simboliais
    savybės kodiniame pavadinime, įprastai tai yra `array` tipo savybės.

.. describe:: model.prepare

    Jei neužpildyta, vykdoma :func:`xpath(self) <xml.xpath>` funkcija, iš
    :data:`model` gauto elemento kontekste.


.. admonition:: Pavyzdys

    .. code-block:: xml

        <countries>
            <country id="1" name="Lithuania">
                <cities>
                    <city id="10" name="Vilnius">
                        <streets>
                            <street id="100">Gedimino st.</street>
                            <street id="101">Konstitucijos st.</street>
                        </streets>
                    </city>
                    <city id="11" name="Kaunas">
                        <streets>
                            <street id="102">Laisves st.</street>
                            <street id="103">Daukanto st.</street>
                        </streets>
                    </city>
                </cities>
            </country>
        </countries>


    .. mermaid::

        classDiagram
            direction LR

            class Country {
              + id: integer [1..1]
              + name@en: string [1..1]
            }

            class City {
              + id: integer [1..1]
              + name@en: string [1..1]
            }

            class Street {
              + id: integer [1..1]
              + name@en: string [1..1]
            }

            City --> "[1..1]" Country : country
            City "[1..*]" <-- Country : cities

            Street --> "[1..1]" City : city
            Street "[1..*]" <-- City : streets

    |

    Pagal aukščiau duotus duomenis ir koncepcinį modelį, struktūros aprašas
    atrodys taip:

    ======  ============================  ========  ============  ============
    model   property                      type      ref           source
    ======  ============================  ========  ============  ============
    **Country**                                     id            **countries/country**
    ------------------------------------  --------  ------------  ------------
    \       id                            integer                 @id
    \       name\@en                      string                  @name
    \       cities[]                      backref   **City**      cities/city
    \       cities[].id                   integer                 @id
    \       cities[].name\@en             string                  @name
    \       cities[].country              ref       **Country**   ../../@id
    \       cities[].streets[]            backref   **Street**    streets/street
    \       cities[].streets[].id         integer                 @id
    \       cities[].streets[].name\@en   string                  @name
    \       cities[].streets[].city       ref       **City**      ../../@id
    **City**                                        id            **countries/country/cities/city**
    ------------------------------------  --------  ------------  ------------
    \       id                            integer                 @id
    \       name\@en                      string                  @name
    \       country                       ref       **Country**   ../../@id
    **Street**                                      id            **countries/country/cities/city/streets/street**
    ------------------------------------  --------  ------------  ------------
    \       id                            integer                 @id
    \       name\@en                      string                  @name
    \       country                       ref       **City**      ../../@id
    ======  ============================  ========  ============  ============

    Struktūros apraše matome du variantus, kaip gali būti aprašomi duomenys.
    Pirmu atveju `Country` modelyje naudojama objektų kompozicija, kur vieno
    `Country` objekto apimtyje, pateikiami ir kiti objektai.

    Reikia atkreipti dėmesį, kad savybės esančios kitos daugiareikšmės savybės
    sudėtyje, :data:`property.source` stulpelyje nurodo XPath išraišką
    reliatyvią daugereikšmei savybei. Daugiareikšmės savybės žymymos `[]` žyme.

    Pavyzdyje `cities[].id` :data:`property.source` stulpelyje nurodo `@id`,
    kuris yra reliatyvus `cities[]` savybės `streets/street` atžvilgiu.

    Pagal struktūros aprašą pateiktą aukščiau, kreipiantis į `/Country`,
    gausime tokius UDTS_ specifikaciją atitinkančius duomenis:

    .. code-block:: json

        {
            "_type": "Country",
            "_id": "29df0534-389d-4eac-a048-799ac64d5103",
            "id": 1,
            "name": {"en": "Lithuana"},
            "cities": [
                {
                    "_type": "City",
                    "_id": "4a7a3214-e6c3-4a5b-99a8-04be88eac3d4",
                    "id": 10,
                    "name": {"en": "Vilnius"},
                    "country": {
                        "_type": "Country",
                        "_id": "29df0534-389d-4eac-a048-799ac64d5103"
                    },
                    "streets": [
                        {
                            "_type": "Street",
                            "_id": "c1380514-549f-4cdd-b258-6fecc3a5bbda",
                            "id": 100,
                            "name": {"en": "Gedimino st."},
                            "city": {
                                "_type": "City",
                                "_id": "4a7a3214-e6c3-4a5b-99a8-04be88eac3d4"
                            },
                        },
                        {
                            "_type": "Street",
                            "_id": "5c02f700-6478-43a0-a147-959927cb3c1c",
                            "id": 101,
                            "name": {"en": "Konstitucijos st."},
                            "city": {
                                "_type": "City",
                                "_id": "4a7a3214-e6c3-4a5b-99a8-04be88eac3d4"
                            },
                        }
                    ]
                },
                {
                    "_type": "City",
                    "_id": "0fee7d9a-6827-4931-bbea-d44d197faef2",
                    "id": 11,
                    "name": {"en": "Kaunas"},
                    "country": {
                        "_type": "Country",
                        "_id": "29df0534-389d-4eac-a048-799ac64d5103"
                    },
                    "streets": [
                        {
                            "_type": "Street",
                            "_id": "399a37d6-63a7-43a4-82de-d3d5c75f5d02",
                            "id": 102,
                            "name": {"en": "Laisves st."},
                            "city": {
                                "_type": "City",
                                "_id": "0fee7d9a-6827-4931-bbea-d44d197faef2"
                            },
                        },
                        {
                            "_type": "Street",
                            "_id": "5b04fecd-5fff-48f6-8674-7cc6da840281",
                            "id": 103,
                            "name": {"en": "Daukanto st."},
                            "city": {
                                "_type": "City",
                                "_id": "0fee7d9a-6827-4931-bbea-d44d197faef2"
                            },
                        }
                    ]
                }
            ]
        }

    Analogiškai, jei kreiptumėmės į `/Street`, gautume visas gatves iš visų miestų:

    .. code-block:: json

        {
            "_data": [
                {
                    "_type": "Street",
                    "_id": "c1380514-549f-4cdd-b258-6fecc3a5bbda",
                    "id": 100,
                    "name": {"en": "Gedimino st."},
                    "city": {
                        "_type": "City",
                        "_id": "4a7a3214-e6c3-4a5b-99a8-04be88eac3d4"
                    },
                },
                {
                    "_type": "Street",
                    "_id": "5c02f700-6478-43a0-a147-959927cb3c1c",
                    "id": 101,
                    "name": {"en": "Konstitucijos st."},
                    "city": {
                        "_type": "City",
                        "_id": "4a7a3214-e6c3-4a5b-99a8-04be88eac3d4"
                    },
                },
                {
                    "_type": "Street",
                    "_id": "399a37d6-63a7-43a4-82de-d3d5c75f5d02",
                    "id": 102,
                    "name": {"en": "Laisves st."},
                    "city": {
                        "_type": "City",
                        "_id": "0fee7d9a-6827-4931-bbea-d44d197faef2"
                    },
                },
                {
                    "_type": "Street",
                    "_id": "5b04fecd-5fff-48f6-8674-7cc6da840281",
                    "id": 103,
                    "name": {"en": "Daukanto st."},
                    "city": {
                        "_type": "City",
                        "_id": "0fee7d9a-6827-4931-bbea-d44d197faef2"
                    },
                }
            ]
        }



XLSX
----

.. describe:: resource.type

    Galimos reikšmės: `xlsx`, `xls` arba `odt`.

.. describe:: resource.source

    Žiūrėti :ref:`failai`.

.. describe:: model.source

    Skaičiuoklės faile esančio lapo pavadinimas.

.. describe:: model.prepare

    Žiūrėti :ref:`stulpeliai-lentelėje`.

.. describe:: property.source

    Žiūrėti :ref:`stulpeliai-lentelėje`.



.. _UDTS: https://ivpk.github.io/uapi


WSDL
----

Šiuo metu palaikoma tik `WSDL 1.1 versija`_.

.. _`WSDL 1.1 versija`: https://www.w3.org/TR/2001/NOTE-wsdl-20010315

Šaltinis inicializuoja WSDL klientą pagal `resource.source` nurodytą URI.


.. note::
    `wsdl` šaltinis skaito WSDL failą, aprašantį kitus duomenų šaltinius, todėl
    pagrinde yra naudojamas kartu su kitais resursais, nurodant :ref:`ref-resource-nesting`.

    Šiuo metu WSDL resursas naudojamas tik kartu su :ref:`ref-soap` resursu.


.. describe:: resource.source

    Pilnas WSDL adresas :term:`URI` formatu.

.. describe:: resource.type

    Galimos reikšmės: `wsdl`.


.. _ref-soap:

SOAP
----

.. describe:: resource.source

    WSDL elementai, aprašantys konkretų duomenų rinkinį, atskirti tašku, naudojant tokį šabloną:

    .. code-block:: text

        Service.Port.PortType.Operation

    Šablone naudojamų kintamųjų aprašymas:

    .. describe:: Service

        WSDL Service_ elemento pavadinimas.

        .. _Service: https://www.w3.org/TR/2001/NOTE-wsdl-20010315#_services

    .. describe:: Port

        WSDL Port_ elemento pavadinimas.

        .. _Port: https://www.w3.org/TR/2001/NOTE-wsdl-20010315#_ports

    .. describe:: PortType

        WSDL PortType_ elemento pavadinimas.

        .. _PortType: https://www.w3.org/TR/2001/NOTE-wsdl-20010315#_porttypes

    .. describe:: Operation

        WSDL SOAP Operation_ elemento pavadinimas.

        .. _Operation: https://www.w3.org/TR/2001/NOTE-wsdl-20010315#_soap:operation


.. describe:: resource.type

    Galimos reikšmės: `soap`.

.. describe:: resource.prepare

    Žiūrėti :ref:`ref-resource-nesting`.

.. describe:: model.source

    XPath_ iki elementų sąrašo, kuriame yra modelio duomenys.

    .. note::
        Kol kas nėra įgyvendinta. Naudoti `/`.

.. describe:: property.source

    XML elemento, kuriame nurodyti duomenys, pavadinimas duomenų šaltinyje.

    .. note::
        Svarbu pabrėžti, kad yra įgyvendintas tik vienareikšmių savybių skaitymas,
        todėl duomenys, esantys duomenų šaltinio daugiareikšmėse savybėse, nebus nuskaityti.

.. admonition:: Pavyzdys

    **Duomenų šaltinis:**

    .. code-block:: xml

        <ns0:Envelope xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:ns1="city_app">
            <ns0:Body>
                <ns1:CityOutputResponse>
                    <ns1:CityOutput>
                        <ns1:id>100</ns1:id>
                        <ns1:name>Name One</ns1:name>
                    </ns1:CityOutput>
                    <ns1:CityOutput>
                        <ns1:id>101</ns1:id>
                        <ns1:name>Name Two</ns1:name>
                    </ns1:CityOutput>
                </ns1:CityOutputResponse>
            </ns0:Body>
        </ns0:Envelope>

    **WSDL:**

    .. code-block:: xml

        <wsdl:definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
                 xmlns:xs="http://www.w3.org/2001/XMLSchema"
                 xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
                 xmlns:tns="city_app"
                 targetNamespace="city_app"
                 name="CityService">

            <wsdl:types>
                <xs:schema targetNamespace="city_app">
                    <xs:element name="CityInputRequest"/>

                    <xs:element name="CityOutputResponse">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="CityOutput" type="tns:CityOutput" minOccurs="0" maxOccurs="unbounded"/>
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>

                    <xs:complexType name="CityOutput">
                        <xs:sequence>
                            <xs:element name="id" type="xs:int"/>
                            <xs:element name="name" type="xs:string"/>
                        </xs:sequence>
                    </xs:complexType>
                </xs:schema>
            </wsdl:types>

            <wsdl:message name="CityInputRequest">
                <wsdl:part name="parameters" element="tns:CityInputRequest"/>
            </wsdl:message>
            <wsdl:message name="CityOutputResponse">
                <wsdl:part name="parameters" element="tns:CityOutputResponse"/>
            </wsdl:message>

            <wsdl:portType name="CityPortType">
                <wsdl:operation name="CityOperation">
                    <wsdl:input message="tns:CityInputRequest"/>
                    <wsdl:output message="tns:CityOutputResponse"/>
                </wsdl:operation>
            </wsdl:portType>

            <wsdl:binding name="CityServiceBinding" type="tns:CityPortType">
                <soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="document"/>
                <wsdl:operation name="CityOperation">
                    <soap:operation soapAction="urn:CityOperation"/>
                    <wsdl:input>
                        <soap:body use="literal"/>
                    </wsdl:input>
                    <wsdl:output>
                        <soap:body use="literal"/>
                    </wsdl:output>
                </wsdl:operation>
            </wsdl:binding>

            <wsdl:service name="CityService">
                <wsdl:port name="CityPort" binding="tns:CityServiceBinding">
                    <soap:address location="http://example.com/city"/>
                </wsdl:port>
            </wsdl:service>
        </wsdl:definitions>

    Pagal aukščiau pateiktus duomenis ir WSDL aprašymą, duomenų struktūros aprašas atrodys taip:

    ===========  ======  =========  ========  ====  ================================================  ================
    resource     model   property   type      ref   source                                            prepare
    ===========  ======  =========  ========  ====  ================================================  ================
    towns_wsdl                      wsdl            http://example.com/city?wsdl
    towns                           soap            CityService.CityPort.CityPortType.CityOperation   wsdl(towns_wsdl)
    \            City                         id    /
    -----------  ------  ---------  --------  ----  ------------------------------------------------  ----------------
    \                    id         integer         id
    \                    name       string          name
    ===========  ======  =========  ========  ====  ================================================  ================
    |
    Struktūros apraše, aprašyti du ištekliai **towns_wsdl** ir **towns**, naudojantys :ref:`ref-resource-nesting`.

    Resurso **towns_wsdl** `resource.source` stulpelyje yra nurodomas WSDL dokumento adresas. Šis resursas
    inicializuos WSDL klientą.

    Resurso **towns** `resource.source` stulpelyje nurodomi WSDL elementai,
    aprašantys konkretų duomenų rinkinį. `resource.prepare` stulpelyje yra nurodoma `wsdl(towns_wsdl)` funkcija,
    kuri grąžina SOAP operaciją, naudojant **towns_wsdl** resurse inicializuotą WSDL klientą ir WSDL elementus,
    aprašytus `resource.source`.

    Reikia atkreipti dėmesį, kad `property.source` stulpeliuose aprašomi elementai turi sutapti
    su duomenų šaltinyje esančių elementų pavadinimais.

    Pagal duomenų struktūros aprašą pateiktą aukščiau, kreipiantis į `/City`,
    gausime tokius UDTS_ specifikaciją atitinkančius duomenis:

    .. code-block:: json

        {
            "_data": [
                {
                    "_type": "City",
                    "_id": "c1380514-549f-4cdd-b258-6fecc3a5bbda",
                    "id": 100,
                    "name": "Name One",
                },
                {
                    "_type": "City",
                    "_id": "5c02f700-6478-43a0-a147-959927cb3c1c",
                    "id": 101,
                    "name": "Name Two",
                }
            ]
        }
