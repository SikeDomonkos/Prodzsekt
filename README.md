# E-Panel Projekt

## Projekt leírása

Az E-Panel egy átfogó szoftverfejlesztési projekt, amely több különálló, egymással együttműködő modulból áll. A projekt célja egy jól strukturált, könnyen karbantartható és bővíthető rendszer létrehozása. A fejlesztés hatékonyságának növelése érdekében a különböző komponenseket külön branch-ekben kezeljük, lehetővé téve a párhuzamos fejlesztést és a gyors integrációt. A projekt célközönsége mind a fejlesztői csapatok, mind a végfelhasználók, akik egy stabil és megbízható rendszert igényelnek.

## Használt technológiák

A projektben a következő technológiákat alkalmazzuk:

- **Frontend:** React, JavaScript/TypeScript, HTML, CSS, Bootstrap
- **Backend:** .NET Core, C#, Entity Framework
- **Adatbázis:** Microsoft SQL Server
- **Asztali alkalmazás:** WPF (Windows Presentation Foundation)
- **Verziókezelés:** Git, GitHub
- **CI/CD:** GitHub Actions
- **Dokumentáció:** Markdown, Swagger (API dokumentációhoz)

## Projektstruktúra

A projekt az alábbi főbb komponensekből épül fel, amelyek együttesen biztosítják az alkalmazás teljes funkcionalitását és skálázhatóságát:

- **WPF** - A Windows Presentation Foundation (WPF) technológiát használó kliensalkalmazás, amely a felhasználói interfész megjelenítéséért és a helyi eseménykezelésért felelős. Ez a modul biztosítja az asztali alkalmazás natív élményét és interakcióját.
- **dokumentacio** - A projekt teljes körű dokumentációját tartalmazó részleg, amely magában foglalja a rendszertervezést, specifikációkat, használati útmutatókat és fejlesztői dokumentációt. A cél a fejlesztői munka támogatása, valamint a hosszú távú fenntarthatóság biztosítása.
- **adatbazis** - Az adatbázis-kezelésért felelős szegmens, amely tartalmazza a séma definíciókat, migrációs fájlokat, optimalizált SQL szkripteket és indexelési stratégiákat. Ez a modul biztosítja az adatok tárolását, elérhetőségét és biztonságát, valamint skálázható megoldásokat kínál nagy mennyiségű adatok kezelésére.
- **backend** - A szerveroldali alkalmazásrész, amely az üzleti logikát és API végpontokat biztosítja. A backend felelős az adatok kezeléséért, az alkalmazás üzleti szabályainak végrehajtásáért, valamint a frontend és az adatbázis közötti kommunikációért. Modern architektúrával rendelkezik, amely skálázható és biztonságos működést tesz lehetővé.
- **frontend** - A React alapú webes felhasználói felület, amely az ügyféloldali interakciókért és a vizuális megjelenítésért felel. A komponensalapú fejlesztési megközelítés biztosítja a moduláris és újrafelhasználható elemekből épülő felhasználói élményt. A rendszer reszponzív kialakítása révén mobil- és asztali eszközökön egyaránt optimális élményt nyújt.

## React telepítése

A frontend fejlesztéséhez szükség van a React környezet beállítására. Az alábbi lépésekkel tudod telepíteni:

1. **Node.js telepítése**

   - Töltsd le és telepítsd a [Node.js](https://nodejs.org/) aktuális verzióját.
   - Ellenőrizd a telepítést:
     ```sh
     node -v
     npm -v
     ```

2. **React projekt létrehozása**

   - Nyiss egy terminált és futtasd az alábbi parancsot:
     ```sh
     npx create-react-app my-app
     ```
   - Navigálj az új projekt mappájába:
     ```sh
     cd my-app
     ```
   - Indítsd el a fejlesztői szervert:
     ```sh
     npm start
     ```

## Fejlesztési irányelvek

A projekt fenntarthatóságának és skálázhatóságának biztosítása érdekében az alábbi fejlesztési irányelveket követjük:

- Minden commit esetében egyértelmű és rövid leírást kell adni, amely segíti a verziókövetést és a későbbi visszakereshetőséget.
- Kövesd a kódolási standardokat és az architekturális irányelveket, hogy a kód tiszta, könnyen olvasható és jól karbantartható legyen.
- Az új funkciók és módosítások esetében részletes dokumentációt kell készíteni, amely tartalmazza a funkció célját, működését és implementációs részleteit.
- A folyamatos integráció és telepítés (CI/CD) elvei szerint rendszeresen frissítsd a branch-edet a legújabb változatokkal, hogy elkerüld az ütközéseket és a verziókezelési problémákat.
-
