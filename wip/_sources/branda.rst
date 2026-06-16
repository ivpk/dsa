.. default-role:: literal
.. _level:

Brandos lygiai
##############

Duomenų brandos lygis nurodomas :data:`level` stulpelyje.

Duomenų brandos lygis atitinka `5 ★ Open Data`_ skalę, tačiau ji yra adaptuota duomenų
struktūros aprašo kontekstui, brandos lygius pritaikant ir uždariems duomenims.

Pirmasis brandos lygis, kuris nurodo, kad duomenys turi būti publikuojami pagal
atvirą licenciją, DSA kontekste, šis reikalavimas išplėstas ir apima ne tik
atviras licencijas, bet ir bet kokias duomenų teikimo sąlygas.

Todėl reikia atkreipti dėmesį, kad duomenų brandos lygis ar formatas nėra
susijęs su duomenų atvirumu. Duomenys gali būti pateikti aukščiausiu 5 brandos
lygiu, tačiau pats duomenų prieinamumas gali būti visiškai uždaras, siauram
naudotojų ratui, kurie turi ribotą ir saugų prieigos kanalą prie duomenų.

Papildomai įtrauktas nulinis lygis, kai duomenys nekaupiami, tačiau yra
reikalingi ir yra parengtas jų :term:`duomenų struktūros aprašas <DSA>`.

Tim Berners Lee brandos lygius aprašo, kaip pavyzdį pasitelkiant duomenų
distribucijų formatus. Tačiau duomenų distribucijų formatai yra labai
netikslus pavyzdys. Rengiant duomenų struktūros aprašą, brandos lygis
vertinamas kiekvienam duomenų laukui atskirai, todėl tarkime CSV failas, gali
būti didesnio arba mažesnio nei trečias brandos lygio, priklausomai nuo CSV
faile esančių duomenų turinio. Tačiau grubiai vertinant, vidutiniškai CSV
failai turi daugiau ar mažiau 3 brandos lygį, koks ir yra nurodytas Tim
Berners Lee pavyzdžiuose.

Rengiant duomenų struktūros aprašą, reikėtų nurodyti ne šaltinio duomenų
brandos lygį, o galutinį brandos lygį, kuris yra gaunamas atlikus visas
duomenų struktūros apraše nurodytas transformacijas.


.. _L000:

L000: Duomenų nėra
******************

**Nekaupiama**

Duomenys nekaupiami. Duomenų rinkinys užregistruotas duomenų portale. Užpildyta
:data:`dataset` eilutė.

Plačiau apie brandos lygio kėlimą skaitykite skyriuje :ref:`to-level-0`.

**Pavyzdžiai**

========== =================== ======
Imone                                
-------------------------------------
imones_id  imones_pavadinimas  rusis 
========== =================== ======
42         UAB "Įmonė"         1     
========== =================== ======

============= ========= ========== ======================= =======
Filialas                                                  
------------------------------------------------------------------
ikurimo_data  atstumas  imones_id  imones_pavadinimas._id  tel_nr
============= ========= ========== ======================= =======
============= ========= ========== ======================= =======

== == == == ====================== ======== =========== ======
Struktūros aprašas                                            
--------------------------------------------------------------
d  r  b  m  property               type     ref         level 
== == == == ====================== ======== =========== ======
example                                                       
---------------------------------- -------- ----------- ------
\        Imone                              imones_id   4     
-- -- -- ------------------------- -------- ----------- ------
\           imones_id              integer              4     
\           imones_pavadinimas     string               2     
\           rusis                  integer              2     
\        Filialas                                       0     
-- -- -- ------------------------- -------- ----------- ------
\           ikurimo_data           string               0     
\           atstumas               string               0     
\           imone                  ref      Imone       0     
\           tel_nr                 string               0     
== == == == ====================== ======== =========== ======


.. _L001:

L001: Duomenys nepublikuojami
=============================

Nuliniu brandos lygiu žymimi duomenys, kurie fiziškai egzistuoja, tačiau nėra
publikuojami jokia forma.


.. _L002:

L002: Ribojamas duomenų naudojimas
==================================

Nuliniu brandos lygiu yra žymimi duomenys, kurie yra saugomi duomenų bazėse, ir
yra poreikis juos naudoti, tačiau duomenys nėra teikiami už informacinės
sistemos ribų.


.. _L003:

L003: Nėra identifikatoriaus
============================

Duomenų šaltinis neturi jokio unikalaus objekto identifikatoriaus.

.. _L004:

L004: Duomenų nėra
==================

Apibrėžtas duomenų modelis, tačiau pačių duomenų kol kas nėra.


.. _L100:

L100: Nenuskaitoma mašininiu būdu
*********************************

Duomenys publikuojami bet kokia forma. Užpildyta :data:`resource`
eilutė.

Plačiau apie brandos lygio kėlimą skaitykite skyriuje :ref:`to-level-1`.

Pirmu brandos lygiu žymimi duomenų laukai, kurių reikšmės neturi
vientisumo, tarkime ta pati reikšmė gali būti pateikta keliais
skirtingais variantais.

**Pavyzdžiai**

========== =================== ======
Imone                                
-------------------------------------
imones_id  imones_pavadinimas  rusis 
========== =================== ======
42         UAB "Įmonė"         1     
========== =================== ======

==================== ========= ============== =================== ===============
Filialas                                                                         
---------------------------------------------------------------------------------
ikurimo_data         atstumas  imones_id._id  imones_pavadinimas  tel_nr         
==================== ========= ============== =================== ===============
vakar                1 m.      1              Įmonė 1             +370 345 36522 
2021 rugpjūčio 1 d.  1 m       1              UAB Įmonė 1         8 345 36 522   
1/9/21               1 metras  1              Įmonė 1, UAB        (83) 45 34522  
21/9/1               0.001 km  1              „ĮMONĖ 1“, UAB      037034536522   
==================== ========= ============== =================== ===============

== == == == ===================== ========= =========== =====
Struktūros aprašas
-------------------------------------------------------------
d  r  b  m  property              type      ref         level
== == == == ===================== ========= =========== =====
example                                                  
--------------------------------- --------- ----------- -----
\        Imone                              id          4
-- -- -- ------------------------ --------- ----------- -----
\           imones_id             integer               2
\           imones_pavadinimas    string                2
\           rusis                 integer               2     
\        Filialas                                       3
-- -- -- ------------------------ --------- ----------- -----
\           ikurimo_data          string                1
\           atstumas              string                1
\           imones_id             ref       Imone       1
\           imones_pavadinimas    string                1
\           tel_nr                string                1
== == == == ===================== ========= =========== =====


.. _L101:

L101: Neaiški struktūra
=======================

Pirmu brandos lygiu žymimi duomenys, kuriuose nėra aiškios struktūros,
pavyzdžiui `ikurta` datos formatas nėra vienodas, kiekviena data užrašyta vis
kitokiu formatu.


.. _L102:

L102: Nėra vientisumo
=====================

Pirmu brandos lygiu žymimi duomenys, kuruose nėra vientisumo, pavyzdžiui
`atstumas` užrašytas laikantis tam tikros struktūros, tačiau skirtingais
vienetais.


.. _L103:

L103: Neįmanomas jungimas
=========================

Pirmu brandos lygiu žymimi duomenys, kurių neįmanoma arba sudėtinga sujungti.
Pavyzdžiui `Filialas` duomnų laukas `imone` naudoja tam tikrą identifikatorių,
kuris nesutampa nei su vienu iš `Imone` atributų, pagal kuriuose būtų galima
identifikuoti filialo įmonę.

.. _L104:

L104: Identifikatorius nėra unikalus
====================================

Objekto identifikatorius nėra unikalus, turi pasikartojančių reikšmių.


.. _L105:

L105: Vienetų konvertavimo paklaida
===================================

Tam tikrais atvejais, kai kiekybiniai duomenys pateikiami išskaidant į atskirus
duomenų laukus, gali būti prarandamas duomenų tikslumas.

.. admonition:: Pavyzdys

    ===== ======== ======= ===== =====
    model property type    ref   level
    ===== ======== ======= ===== =====
    Assmuo                 id    4
    -------------- ------- ----- -----
    \     id       integer       4
    \     metai    integer yr    4
    \     menesiai integer mo    1
    \     dienos   integer d     1
    ===== ======== ======= ===== =====

    Šiame pavyzdyje nurodytas asmens amžius pateikiant atskirai metus, mėnesius
    ir dienas, tarkim *25 metai, 5 mėnesiai, 29 dienos*.

    Jei norėtume gauti amžių dienomis, rezultatas :math:`25*365 + 5*30 + 29 =
    9304` būtų netikslus, kadangi metai ir mėnesiai turi skirtingus dienų
    skaičius, todėl konvertuojant rezultatą į dienas, gausime netikslų
    rezultatą.

    Kadangi nustatyti nėra galimybės nustatyti galutinio tikslaus mėnesio ir
    dienų skaičiaus, nurodomas 1 brandos lygis.

.. _L200:

L200: Nestandartinis pateikimas
*******************************

Duomenys kaupiami struktūruota, mašininiu būdu nuskaitoma forma, bet kokiu
formatu. Užpildytas :data:`property.source` stulpelis.

Plačiau apie brandos lygio kėlimą skaitykite skyriuje :ref:`to-level-2`.

Antru brandos lygiu žymimi duomenų laukai, kurie pateikti vieninga forma arba
pagal aiškų ir vienodą šabloną. Tačiau pateikimo būdas nėra standartinis.
Nestandartinis duomenų formatas yra toks, kuris neturi viešai skelbiamos ir
atviros formato specifikacijos arba, kuris nėra priimtas kaip standartas, kurį
prižiūri tam tikra standartizacijos organizacija.

**Pavyzdžiai**

========== =================== ======
Imone                                
-------------------------------------
imones_id  imones_pavadinimas  rusis 
========== =================== ======
42         UAB "Įmonė"         1     
========== =================== ======

============= ========= ========== ======================= ================
Filialas                                                                   
---------------------------------------------------------------------------
ikurimo_data  atstumas  imones_id  imones_pavadinimas._id  tel_nr          
============= ========= ========== ======================= ================
1/9/21        1 m.      1          UAB "Įmonė"             (83\) 111 11111 
2/9/21        2 m.      1          UAB "Įmonė"             (83\) 222 22222 
3/9/21        3 m.      1          UAB "Įmonė"             (83\) 333 33333 
4/9/21        4 m.      1          UAB "Įmonė"             (83\) 444 44444 
============= ========= ========== ======================= ================

== == == == ===================== ========= ========== =====
Struktūros aprašas                                     
------------------------------------------------------------
d  r  b  m  property              type      ref        level
== == == == ===================== ========= ========== =====
example                                                 
--------------------------------- --------- ---------- -----
\        JuridinisAsmuo                     kodas      4
-- -- -- ------------------------ --------- ---------- -----
\           kodas                 integer              4
\           pavadinimas\@lt       text                 4
\        Imone                              imones_id  2
-- -- -- ------------------------ --------- ---------- -----
\           imones_id             integer              2
\           imones_pavadinimas    string               2
\           rusis                 integer              2     
\        Filialas                                      3
-- -- -- ------------------------ --------- ---------- -----
\           ikurimo_data          string               2
\           atstumas              string               2
\           imones_id             integer              2
\           imones_pavadinimas    string               2
\           tel_nr                string               2
== == == == ===================== ========= ========== =====


.. _L201:

L201: Nestandartiniai duomenų tipai
===================================

Antru brandos lygiu žymimi duomenys, kurių nurodytas tipas neatitinka realaus
duomenų tipo. Pavyzdžiui:

- `ikurimo_data` - nurodytas `string`, turėtu būti `date`.
- `imones_pavadinimas` - nurodytas `string`, turėtu būti `text`.
- `atstumas` - nurodytas `string`, turėtu būti `integer`.

.. _L202:

L202: Nestandartinis formatas
=============================

Antru brandos lygiu žymimi duomenys, kurie pateikti nestandartiniu formatu.
Standartinis duomenų pateikimas nurodytas prie kiekvieno duomenų tipo skyriuje
:ref:`duomenų-tipai`. Payvzdžiui:

- `ikurimo_data` - nurodytas `DD/MM/YY`, turėtu būti `YYYY-MM-DD`.
- `atstumas` - nurodyta `X m.`, turėtu būti `X`.
- `tel_nr` - nurodytas `(XX) XXX XXXXX`, turėtu būti `+XXX-XXX-XXXXX`.


.. _L203:

L203: Nestandartiniai kodiniai pavadinimai
==========================================

Antru brandos lygiu žymimi duomenys, kurių kodiniai pavadinimai, neatitinka
:ref:`standartinių reikalavimų keliamų kodiniams pavadinimams
<kodiniai-pavadinimai>`. Pavyzdžiui:

- `imones_id` - dubliuojamas modelio pavadinimas, turėtu būti `id`.
- `imones_pavadinimas` - dubliuojamas modelio pavadinimas, turėtu būti
  `pavadinimas`.
- `ikurimo_data` - dubliuojamas tipo pavadinimas, turėtu būti `ikurta`.

.. seealso::

    | :ref:`kodiniai-pavadinimai`

.. _L204:

L204: Nepatikimi identifikatoriai
=================================

Antru brandos lygiu žymimi duomenys, kurių `ref` tipui naudojami nepatikimi
identifikatoriai, pavyzdžiui tokie, kaip pavadinimai, kurie gali keistis arba
kartotis. Pavyzdžiui:

- `imones_pavadinimas` - jungimas daromas per įmonės pavadinimą,
  tačiau šiuo atveju kito varianto nėra, nes `Filialas.imones_id`
  nesutampa su `Imone.imones_id`.

.. _L205:

L205: Denormalizuoti duomenys
=============================

Antru brandos lygiu žymimi duomenys, kurie dubliuoja kito modelio duomenis ir
yra užrašyti nenurodant, kad tai yra duomenys dubliuojantys kito modelio
duomenis. Pavyzdžiui:

- `Filialas.imones_id` turėtu būti `Filialas.imone.imones_id`.
- `Filialas.imones_pavadinimas` turėtu būti
  `Filialas.imone.imones_pavadinimas`.

Plačiau apie denormalizuotus duomenis skaitykite skyriuje :ref:`ref-denorm`.

.. _L206:

L206: Nenurodytas susiejimas
============================

Antru brandos lygiu žymimi duomenys, kurie siejasi su kitu modeliu, tačiau
tokia informacija nėra pateikta metaduomenyse. Pavyzdžiui:

- `Filialas.imone` - `Filialas` siejasi su `Imone`, per
  `Filialas.imones_pavadiniams`, todėl turėtu būti nurodytas `imone ref Imone`
  ryšys su `Imone`.

.. _L207:

L207: Neatitinka modelio bazės
==============================

Antru brandos lygiu žymimi duomenys, kurie priklauso vienai semantinei klasei,
tačiau duomenų schema nesutampa su bazinio modelio schema. Pavyzdžiui:

- `Imone` - priklauso semantinei klasei `JuridinisAsmuo`, tačiau tai nėra
  pažymėta metaduomenyse.
- `Imone.imones_id` turėtu būti `Imone.kodas`, kad sutaptu su baze
  (`JuridinisAsmuo.kodas`).
- `Imone.imones_pavadinimas` turėtu būti `Imone.pavadinimas@lt`, kad sutaptu su
  baze (`JuridinisAsmuo.pavadinimas@lt`).

.. _L208:

L208: Nenurodytas enum kodinėms reikšmėms
=========================================

Antru brandos lygiu žymimi kategoriniai duomenys, kurių reikšmės pateiktos
sutartiniais kodais, kurių prasmė nėra aiški. Pavyzdžiui:

- `Imone.rusis` - įmonės rūšis žymima skaičiais, tačiau nėra aišku,
  koks skaičius, ką reiškia, todėl reikia pateikti `enum` sąrašą,
  kuriame būtų nurodyta, ką koks skaičius reiškia. Plačiau skaityti
  :ref:`enum`.

.. _L209:

L209: Nenurodyta modelio bazė
=============================

Modelis atitinka registre apibrėžtą esybę, tačiau nėra su ja susietas.

.. _L210:

L210: Išskaidyta atskirais komponentais
=======================================

:term:`DSA` turi sudėtinius tipus, tokius kaip `date`, `datetime` ir
`geometry`, kuri apima kelis atskirus duomenų komponentus, kurie pateikiami
kaip viena reikšmė, nustatytu formatu.

Jei komponentai yra išskaidyti į atskirus duomenų laukus, tuomet tai yra
nestandartinis duomenų pateikimas žymimas 2 brandos lygiu.

.. _L300:

L300: Nėra identifikatoriaus
****************************

Duomenys saugomi atviru, standartiniu formatu. Užpildytas
:data:`property.type` stulpelis ir duomenys atitinka nurodytą tipą.

Plačiau apie brandos lygio kėlimą skaitykite skyriuje :ref:`to-level-3`.

Trečias brandos lygis suteikiamas tada, kai duomenys pateikti vieninga
forma, vieningu masteliu, naudojamas formatas yra standartinis, tai
reiškia, kad yra viešai skelbiama ir atvira formato specifikacija arba
pats formatas yra patvirtintas ir prižiūrimas kokios nors
standartizacijos organizacijos.

**Pavyzdžiai**

===== ================ ==========
Imone                                                                  
---------------------------------
id    pavadinimas\@lt  rusis     
===== ================ ==========
42    UAB "Įmonė"      juridinis 
===== ================ ==========

=========== ========= ========== ====================== =============
Filialas                                         
---------------------------------------------------------------------
ikurta      atstumas  imone._id  imone.pavadinimas\@lt  tel_nr  
=========== ========= ========== ====================== =============
2021-09-01  1         42         UAB "Įmonė"            +37011111111
2021-09-02  2         42         UAB "Įmonė"            +37022222222
2021-09-03  3         42         UAB "Įmonė"            +37033333333
2021-09-04  4         42         UAB "Įmonė"            +37044444444
=========== ========= ========== ====================== =============

== == == == ===================== ========= =========== ===== ======== ==========
Struktūros aprašas                                                               
---------------------------------------------------------------------------------
d  r  b  m  property              type      ref         level prepare  title     
== == == == ===================== ========= =========== ===== ======== ==========
example                                                                          
--------------------------------- --------- ----------- ----- -------- ----------
\        JuridinisAsmuo                     kodas       4                        
-- -- -- ------------------------ --------- ----------- ----- -------- ----------
\           kodas                 integer               4                        
\           pavadinimas\@lt       text                  4                        
\     JuridinisAsmuo                                    4                        
-- -- --------------------------- --------- ----------- ----- -------- ----------
\        Imone                              kodas       4                        
-- -- -- ------------------------ --------- ----------- ----- -------- ----------
\           kodas                                       4                        
\           pavadinimas\@lt                             4                        
\           rusis                 string                3                         
\     /                                                                                                    
-- -- --------------------------- --------- ----------- ----- -------- ----------
\        Filialas                                       3                        
-- -- -- ------------------------ --------- ----------- ----- -------- ----------
\           ikurta                date                  3                        
\           atstumas              integer               3                        
\           imone                 ref       Imone       3                        
\           imone.kodas                                 4                        
\           imone.pavadinimas\@lt                       4                        
\           tel_nr                string                4                        
== == == == ===================== ========= =========== ===== ======== ==========

.. _L301:

L301: Nėra globalaus objekto identifikatoriaus
==============================================

Nėra naudojamas globalus objekto identifikatorius, objektas identifikuojamas
naudojant tik lokalų identifikatorių. Tokiu atveju, objektas negali būti
nuskaitomas tiesiogiai, gali būti vykdoma tik atranka, nurodant filtrą, pagal
lokalų identifikatorių.

- `Filialas.imone` - siejimas atliekamas per `Imone.kodas`, o ne per
  `Imone._id`.

.. _L302:

L302: Nenurodyti matavimo vienetai
==================================

Trečiu brandos lygiu žymimi kiekybiniai duomenys, kuriems nėra nurodyti
matavimo vienetai :data:`property.ref` stulpelyje. Pavyzdžiui:

- `atstumas` - nenurodyta, kokiais vienetais matuojamas atstumas.

.. _L303:

L303: Nenurodytas duomenų tikslumas
===================================

Trečiu brandos lygiu žymimi laiko ir erdviniai duomenys, kuriems nėra nurodytas
matavimo tikslumas. Matavimo tikslumas nurodomas `property.ref` stulpelyje.
Pavyzdžiui:

- `ikurta` - nenurodytas datos tikslumas, turėtu būti `D` - vienos dienos
  tiksumas.

.. _L304:

L304: Neaprašyti kategoriniai duomenys
======================================

Trečiu brandos lygiu žymimi kategoriniai duomenys, kurių reikšmės pačios
savaime yra aiškios, tačiau neišvardintos struktūros apraše. Pavyzdžiui:

- `Imone.rusis` - įmonės rūšies kategorijos duomenys yra pateikta
  tekstine forma, tačiau, struktūros apraše nėra išvardintos visos
  galimos kategorijos ir pats duomenų laukas nėra pažymėtas, kaip
  kategorinis.


.. _L400:

L400: Nesusieata su žodynais
****************************

Duomenų objektai turi aiškius, unikalius identifikatorius. Užpildyti
:data:`model.ref` ir :data:`property.ref` stulpeliai.

.. note::

    :data:`property.ref` stulpelis pildomas šiais atvejais:

    - Jei duomenų laukas yra išorinis raktas (žiūrėti :ref:`ref-types`).

    - Jei duomenų laukas yra kiekybinis ir turi matavimo vienetus
      (žiūrėti :ref:`matavimo-vienetai`).

    - Jei duomenų laukas žymi laiką ar vietą (žiūrėti
      :ref:`temporal-types` ir :ref:`spatial-types`).

Plačiau apie brandos lygio kėlimą skaitykite skyriuje :ref:`to-level-4`.

Ketvirtas duomenų brandos lygis labiau susijęs ne su pačių duomenų
formatu, bet su metaduomenimis, kurie lydi duomenis.

Duomenų struktūros apraše :data:`model.ref` stulpelyje, pateikiamas
objektą unikaliai identifikuojančių laukų sąrašas, o
:data:`property.type` stulpelyje įrašomas `ref` tipas, kuris nurodo
ryšį tarp dviejų objektų.

**Pavyzdžiai**

===================================== ===== ================ ======
Imone                                                              
-------------------------------------------------------------------
_id                                   id    pavadinimas\@lt  rusis 
===================================== ===== ================ ======
26510da5-f6a6-45b0-a9b9-27b3d0090a58  42    UAB "Įmonė"      1     
===================================== ===== ================ ======

===================================== === =========== ========= ===================================== ========= ====================== =============
Filialas                                                                                                      
------------------------------------- --- ----------------------------------------------------------------------------------------------------------
_id                                   id  ikurta      atstumas  imone._id                             imone.id  imone.pavadinimas\@lt  tel_nr       
===================================== === =========== ========= ===================================== ========= ====================== =============
63161bd2-158f-4d62-9804-636573abb9c7  1   2021-09-01  1         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            +37011111111
65ec7208-fb97-41a8-9cfc-dfedd197ced6  2   2021-09-02  2         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            +37022222222
2b8cdfa6-1396-431a-851c-c7c6eb7aa433  3   2021-09-03  3         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            +37033333333
1882bb9e-73ee-4057-b04d-d4af47f0aae8  4   2021-09-04  4         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            +37044444444
===================================== === =========== ========= ===================================== ========= ====================== =============

== == == == ===================== ========= ====== ===== ======== ==========
Struktūros aprašas                                                          
----------------------------------------------------------------------------
d  r  b  m  property              type      ref    level prepare  title     
== == == == ===================== ========= ====== ===== ======== ==========
example                                                                     
--------------------------------- --------- ------ ----- -------- ----------
\        JuridinisAsmuo                     kodas  4                        
-- -- -- ------------------------ --------- ------ ----- -------- ----------
\           kodas                 integer          4                        
\           pavadinimas\@lt       text             4                        
\     JuridinisAsmuo                               4                        
-- -- --------------------------- --------- ------ ----- -------- ----------
\        Imone                              kodas  4                        
-- -- -- ------------------------ --------- ------ ----- -------- ----------
\           id                    integer          4                        
\           pavadinimas\@lt       text             4                        
\           rusis                 integer          4                                             
\                                 enum                   1        Juridinis
\                                                        2        Fizinis
\     /                                                                                               
-- -- --------------------------- --------- ------ ----- -------- ----------
\        Filialas                           id     4                        
-- -- -- ------------------------ --------- ------ ----- -------- ----------
\           id                    integer          4                        
\           ikurta                date      D      4                        
\           atstumas              integer   km     4                        
\           imone                 ref       Imone  4                        
\           imone.id                               4                        
\           imone.pavadinimas\@lt                  4                        
\           tel_nr                string           4
== == == == ===================== ========= ====== ===== ======== ==========

.. _L401:

L401: Nesusieta su standartiniu žodynu
======================================

Ketvirtu brandos lygiu žimimi duomenys, kurie nėra susieti su standartiniais
žodynais ar ontologijomis. Siejimas su žodynais atliekamas `model.uri` ir
`property.uri` stulpeluose.


.. _L500:

L500: Trūkumų nėra
******************

Modeliai iš įstaigų duomenų rinkinių vardų erdvės susieti su modeliais
iš standartų vardų erdvės, užpildyta :data:`base` eilutė. Standartų
vardų erdvėje esantiems :term:`modeliams <modelis>` ir jų
:term:`savybėms <savybė>` užpildytas :data:`uri` stulpelis.

Daugiau apie vardų erdves skaitykite skyrelyje: :ref:`vardu-erdves`.

Plačiau apie brandos lygio kėlimą skaitykite skyriuje :ref:`to-level-5`.

Penkto brandos lygio duomenys yra lygiai tokie patys, kaip ir ketvirto
brandos lygio, tačiau penktame brandos lygyje, duomenys yra praturtinami
metaduomenimis, pateikiant nuorodas į išorinius žodynus arba bent jau
pateikiant aiškius pavadinimus ir aprašymus, užpildant `title` ir
`description` stulpelius.

Penktame brandos lygyje visas dėmesys yra sutelkiamas į semantinę
duomenų prasmę.

**Pavyzdžiai**

===================================== ===== ================ ======
Imone                                                              
-------------------------------------------------------------------
_id                                   id    pavadinimas\@lt  rusis 
===================================== ===== ================ ======
26510da5-f6a6-45b0-a9b9-27b3d0090a58  42    UAB "Įmonė"      1     
===================================== ===== ================ ======

===================================== === =========== ========= ===================================== ========= ====================== =================
Filialas                                                                                                      
------------------------------------- ------------------------------------------------------------------------------------------------------------------
_id                                   id  ikurta      atstumas  imone._id                             imone.id  imone.pavadinimas\@lt  tel_nr           
===================================== === =========== ========= ===================================== ========= ====================== =================
63161bd2-158f-4d62-9804-636573abb9c7  1   2021-09-01  1         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            \tel:+37011111111
65ec7208-fb97-41a8-9cfc-dfedd197ced6  2   2021-09-02  2         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            \tel:+37022222222
2b8cdfa6-1396-431a-851c-c7c6eb7aa433  3   2021-09-03  3         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            \tel:+37033333333
1882bb9e-73ee-4057-b04d-d4af47f0aae8  4   2021-09-04  4         26510da5-f6a6-45b0-a9b9-27b3d0090a58  42        UAB "Įmonė"            \tel:+37044444444
===================================== === =========== ========= ===================================== ========= ====================== =================

== == == == ====================== ========= ======= ===== ============================ ======== ==========
Struktūros aprašas                                                                                         
-----------------------------------------------------------------------------------------------------------
d  r  b  m  property               type      ref     level uri                          prepare  title     
== == == == ====================== ========= ======= ===== ============================ ======== ==========
example                                                                                                    
---------------------------------- --------- ------- ----- ---------------------------- -------- ----------
\                                  prefix    foaf          \http://xmlns.com/foaf/0.1/                                                
\                                            dct           \http://purl.org/dc/terms/  
\                                            schema        \http://schema.org/                             
\        JuridinisAsmuo                       kodas  4                                                     
-- -- -- ------------------------- --------- ------- ----- ---------------------------- -------- ----------                    
\           kodas                  integer           4                                 
\           pavadinimas\@lt        text              4                                                     
\     JuridinisAsmuo                                 4                                 
-- -- ---------------------------- --------- ------- ----- ---------------------------- -------- ----------                    
\        Imone                               id      5     foaf:Organization                               
-- -- -- ------------------------- --------- ------- ----- ---------------------------- -------- ----------                    
\           id                                       5     dct:identifier               
\           pavadinimas\@lt                          5     dct:title                    
\           rusis                  integer           4                                  
\                                  enum                                                 1        Juridinis               
\                                                                                       2        Fizinis            
\     /                                                                                                                
-- -- ---------------------------- --------- ------- ----- ---------------------------- -------- ----------
\        Filialas                            id      5     schema:LocalBusiness
-- -- -- ------------------------- --------- ------- ----- ---------------------------- -------- ----------                                      
\           id                     date      1D      5     dct:identifier                                                
\           ikurta                 date      1D      5     dct:created                                                
\           atstumas               integer   km      5     schema:distance                                 
\           imone                  ref       Imone   5     foaf:Organization                                                
\           imone.id               integer           5     dct:identifier              
\           imone.pavadinimas\@lt  text              5     dct:title                            
\           tel_nr                 string            5     foaf:phone
== == == == ====================== ========= ======= ===== ============================ ======== ==========

.. _5 ★ Open Data: https://5stardata.info/
