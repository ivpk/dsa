.. default-role:: literal
.. _access:

Matomumas
===============

Metaduomenų matomumas nurodomas :data:`visibility` stulpelyje.

Metaduomenų elemento matomumas ir prieinamumas. Skirstomas į:

========= ============================
public    naudojamas EU lygmeniu
package   naudojamas LT lygmeniu (įteisintas IS nuostatuose ir kituose LT teisės aktuose)
protected naudojamas informacinės sistemos (IS) lygmeniu 
private   metaduomenys nepublikuojami
========= ============================

Integracijoms tarp skirtingų sistemų už Lietuvos ribų, rekomenduojama naudoti tik `public` matomumo elementus.

Integracijoms tarp skirtingų sistemų Lietuvoje, rekomenduojama naudoti `public` arba `package` matomumo elementus.

Jei `visibility = protected` (IS lygmens) elementas yra naudojamas už IS ribų, tada reikia atkreipti dėmesį, kad IS tvarkytojas gali elementą keisti neatsižvelgdamas į už konkrečios IS ribų esančius naudojimo atvejus.

`visibility = private` metaduomenys saugomi tik IS tvarkytojo infrastruktūroje ir viešai nėra skelbiami. Jie aprašomi DSA metaduomenų pilnumo ir šaltinio pokyčių sekimo tikslais. Pirmą kartą nuskaičius ŠDSA, visi elementai žymimi `visibility = private`.

`visibility` reikšmių žodynas yra iš dalies paremtas UML 2.5 VisibilityKind klasifikatoriumi, žiūrėti `7.8.24 <https://www.omg.org/spec/UML/2.5.1/PDF>`_ skyrių
