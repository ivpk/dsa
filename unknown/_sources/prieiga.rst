.. default-role:: literal
.. _access:

Prieigos lygiai
===============

Duomenų prieigos lygis nurodomas :data:`access` stulpelyje.

.. data:: access

    .. data:: open

        **Atviri duomenys**

        Duomenys skirti viešam naudojimui, neribojant panaudojimo tikslo, pagal
        vieną iš atvirų duomenų licencijų.

    .. data:: public

        **Ribotos prieigos duomenys**

        Duomenys skirti viešam naudojimui, tiek privačiame tiek viešąjame
        sektoriuje, pagal duomenų teikimo sutartį.

    .. data:: protected

        **Valstybinio sektoriaus duomenys**

        Duomenys skirtin naudoti tik tarp valstybinio sektoriaus institucijų,
        neteikiami privačiam sektoriui.

    .. data:: private

        **Vidiniai duomenys**

        Duomenys skirti tik vidiniam konkrečios sistemos naudojimui, neteikiami
        už vienos sistemos ribų.


Viešam pakartotiniam naudojimui gali būti teikiami tik `public` ir `open`
prieigos lygio duomenys.

`public` duomenys gali būti teikiami tik autorizuotiems duomenų valdytojams,
kurie yra susipažinę ir sutinka su duomenų naudojimo taisyklėmis ir naudoja
duomenis tik `nurodytu tikslu`__ (*purpose limitation*), laikosi BDAR_
reikalavimų.
Asmens duomenys gali būti viešinami tik public ar žemesniu prieigos lygiu.

.. __: https://gdpr-info.eu/art-5-gdpr/
.. _BDAR: https://gdpr-info.eu/

`open` duomenys turėtu būti teikiami atvirai be jokios autorizacijos ir
neribojant duomenų naudojimo tikslo. Asmens duomenys negali būti teikiami `open`
prieigos lygiu.

Prieigos lygiai gali būti paveldimi iš aukštesnės dimensijos. Tačiau žemesnė
dimensija apsprendžia realų prieigos lygį. Pavyzdžiui jei :data:`dataset.access`
yra `private`, o toje :data:`dataset` dimensijoje esantis :data:`property` yra
`open`, tada visos to :data:`property` aukštesnės dimensijos taip pat tampa
`open`, nors visos kitos dimensijos yra `private`, nes paveldi
:data:`dataset.access` reikšmę.
