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
                    </xs:sequence>
                </xs:complexType>
            </xs:element>

        </xs:schema>

    **Struktūros aprašas**

    ======== =========== ========= ======== =========== ===============
    dataset  model       property  type     ref         source         
    ======== =========== ========= ======== =========== ===============
    \                              schema   xsd         country.xsd
    xsd                                                                
    ------------------------------ -------- ----------- ---------------
    \        **Country**                                /country       
    -------- --------------------- -------- ----------- ---------------
    \                    name      string               \@name
    \                    city[]    backref  City        city           
    \        **City**                                                  
    -------- --------------------- -------- ----------- ---------------
    \                    name      string               \@name
    \                    country   ref      Country                    
    ======== =========== ========= ======== =========== ===============

Pavyzdyje:

- `Country` modelis yra :ref:`xsd_aggregate_model` ir jungtinio modelio :ref:`xsd_aggregate_root`.


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

- Jei :ref:`xsd_element` yra :ref:`xsd_complexType` sudėtyje, laikoma, kad
  modelis yra kito :ref:`ref-denorm` dalis, todėl pagal nutylėjimą nenurodomas
  :data:`model.source`.

- Jei :ref:`xsd_element` nėra :ref:`xsd_complexType` sudėtyje ir deklaruotas
  atskirai, tada laikoma, kad modelis gali būti pasiekiamas tiesiogiai ir tokio
  modelio :data:`model.source` yra pildomas.



.. _xsd_attribute:

attribute
=========

.. _xsd_type:

type
====

.. _xsd_simpleType:

simpleType
==========

.. _xsd_complexType:

complexType
===========

.. _xsd_sequence:

sequence
========

.. _xsd_choice:

choice
======

.. _xsd_minOccurs:

minOccurs
=========

.. _xsd_maxOccurs:

maxOccurs
=========

.. _xsd_base:

base
====

.. _xsd_enumeration:

enumeration
===========

.. _xsd_unique:

unique
======

.. _xsd_nillable:

nillable
========

.. _xsd_annotation:

annotation
==========

.. _xsd_documentation:

documentaton
============

Atributai
*********


Duomenų tipai
*************



.. `W3C XML Schema Definition Language (XSD) 1.1 Part 1: Structures`_


.. _XML Schema Definition (XSD): https://www.w3.org/TR/xmlschema11-1/
.. _W3C XML Schema Definition Language (XSD) 1.1 Part 1\: Structures: https://www.w3.org/TR/xmlschema11-1/
.. _W3C XML Schema Definition Language (XSD) 1.1 Part 2\: Datatypes: https://www.w3.org/TR/xmlschema11-2/
