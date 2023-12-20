# Voornaam Familienaam (Studentennummer)

- Student: Jasper Haegeman
- Studentennummer: 202292134
- E-mailadres: <mailto:jasper.haegeman@student.hogent.be>

- [x] Front-end Web Development
  - <https://github.com/Web-IV/2324-frontendweb-JasperHmn.git>
  - <LINK_ONLINE_VERSIE_HIER>
- [x] Web Services: GITHUB URL
  - <https://github.com/Web-IV/2324-webservices-JasperHmn.git>
  - <https://webservices-motor.onrender.com>

**Logingegevens**

- Gebruikersnaam/e-mailadres: jasper.haegeman@student.hogent.be
- Wachtwoord: 12345678

## Projectbeschrijving

Het Motorverhuurbeheersysteem heeft tot doel een efficiënte en geautomatiseerde manier te bieden om het verhuurproces van motoren te beheren. Het systeem zal de verhuur van motoren aan klanten vergemakkelijken, betalingen registreren en een overzicht bieden van beschikbare motoren en huurlocaties.

![ERD, motorverhuur](/public/ERD/ERDmotor.png)

## Screenshots

> Voeg enkele (nuttige!) screenshots toe die tonen wat de app doet.
> Dit is weinig zinvol indien je enkel Web Services volgt, verwijder dan deze sectie.

## API calls

### Klanten

- `GET /api/klanten`: alle gebruikers ophalen
- `GET /api/klanten/:id`: gebruiker met een bepaald id ophalen
- `POST /api/klanten/register`: gebruiker registeren
- `POST /api/klanten/login`: gebruiker inloggen
- `PUT /api/klanten/:id`: gebruiker met een bepaald id wijzigen
- `DELETE /api/klanten/:id`: gebruiker met een bepaald id verwijderen

### Huurlocaties

- `GET /api/huurlocaties`: alle huurlocaties ophalen
- `GET /api/huurlocaties/:id`: huurlocatie met een bepaald id ophalen
- `POST /api/huurlocaties`: huurlocatie toevoegen
- `PUT /api/huurlocaties/:id`: huurlocatie met een bepaald id wijzigen
- `DELETE /api/huurlocaties/:id`: huurlocatie met een bepaald id verwijderen

### Betalingen

- `GET /api/betalingen`: alle betalingen ophalen
- `GET /api/betalingen/:id`: betaling met een bepaald id ophalen
- `POST /api/betalingen`: betaling toevoegen
- `PUT /api/betalingen/:id`: betaling met een bepaald id wijzigen
- `DELETE /api/betalingen/:id`: betaling met een bepaald id verwijderen

### Motoren

- `GET /api/motoren`: alle motoren ophalen
- `GET /api/motoren/:id`: motor met een bepaald id ophalen
- `POST /api/motoren`: motor toevoegen
- `PUT /api/motoren/:id`: motor met een bepaald id wijzigen
- `DELETE /api/motoren/:id`: motor met een bepaald id verwijderen

## Behaalde minimumvereisten

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] applicatie is voldoende complex
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met meerdere velden met validatie (naast login/register)
  - [x] login systeem
        <br />

- **routing**

  - [x] heeft minstens 2 pagina's (naast login/register)
  - [ ] routes worden afgeschermd met authenticatie en autorisatie
        <br />

- **state-management**

  - [ ] meerdere API calls (naast login/register)
  - [ ] degelijke foutmeldingen indien API-call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [x] gebruikt gepast state management voor globale state - indien van toepassing
        <br />

- **hooks**

  - [x] gebruikt de hooks op de juiste manier
        <br />

- **varia**

  - [ ] een aantal niet-triviale e2e testen
  - [x] minstens één extra technologie
  - [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [x] duidelijke en volledige README.md
  - [ ] volledig en tijdig ingediend dossier en voldoende commits

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel, 2 een-op-veel of veel-op-veel relaties)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties - indien van toepassing
  - [x] heeft seeds
        <br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
        <br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
        <br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bvb tussentabellen)
  - [x] degelijke authorisatie/authenticatie op alle routes
        <br />

- **algemeen**

  - [x] er is een minimum aan logging voorzien
  - [x] een aantal niet-triviale integratietesten (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier en voldoende commits

## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?

### Web Services

- `2324-webservices-JasperHmn`
  - `__tests__`
    - `global.setup.js`
    - `global.teardown.js`
    - `supertest.setup.js`
    - `common`
      - `auth.js`
    - `coverage`
    - `rest`
      - `health.spec.js`
      - `huurlocaties.spec.js`
      - `motoren.spec.js`
  - `.vscode`
  - `config`
  - `coverage`
  - `node_modules`
  - `public`
    - `ERD` (foto)
    - `images`
    - `testen` (fotos)
  - `src`
    - `core`
      - `auth.js`
      - `installMiddleware.js`
      - `jwt.js`
      - `logging.js`
      - `password.js`
      - `roles.js`
      - `serviceError.js`
      - `validation.js`
    - `data`
      - `migrations`
      - `seeds`
      - `index.js`
    - `repository`
      - `betaling.js`
      - `huurlocatie.js`
      - `klant.js`
      - `motor.js`
    - `rest`
      - `betaling.js`
      - `health.js`
      - `huurlocatie.js`
      - `index.js`
      - `klant.js`
      - `motor.js`
    - `service`
      - `_handleDBError.js`
      - `betaling.js`
      - `health.js`
      - `huurlocatie.js`
      - `klant.js`
      - `motor.js`
    - `createServer.js`
    - `index.js`
    - `testjwt.js`
    - `testpw.js`
  - `.env`
  - `.env.test`
  - `.gitignore`
  - `jest.config.js`
  - `package.json`
  - `README.md`

## Extra technologie

### Front-end Web Development

Gebruik van Chakra UI. Het is een technologie die gebruikt maakt van een standaardlibrary om zo
op een gemakelijke manier een mooie UI te maken. Het is een open-source design systeem dat bestaat uit een componentenbibliotheek en een aantal tools die helpen bij het bouwen van toegankelijke React-applicaties.

https://www.npmjs.com/package/@chakra-ui/react

https://chakra-ui.com/

### Web Services

Gebruik van zxcvbn.
Het is een wachtwoordsterkte-inschattingstool die beordeelt wachtwoorden op basis van hun sterkte en geeft feedback over hoe ze kunnen worden verbeterd.

zxcvbn evalueert de sterkte van een wachtwoord op basis van verschillende criteria, waaronder lengte, complexiteit en het al dan niet gberuik van woordenboekwoorden.

`yarn add zxcvbn`

https://www.npmjs.com/package/zxcvbn

## Testresultaten

### Front-end Web Development

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen

### Web Services

#### huurlocaties

Deze test kijkt of de software de lijst van beschikbare huurlocaties correct weergeeft.
We controleren ook of de software goed omgaat met situaties waarin gebruikers verkeerde informatie invoeren.
We passen dit ook toe voor het toevoegen, bijwerken en verwijderen van een huurlocatie.

#### health

Deze test evalueert de gezondheids- en versie-eindpunten van de server om ervoor te zorgen dat ze correct reageren en de verwachte informatie verstrekken. Daarnaast wordt gecontroleerd of de server zich goed gedraagt bij het benaderen van een onbekende URL.

#### motoren

Deze test waarborgt de correcte werking van de API voor motorbeheer in verschillende scenario's, inclusief toevoegen, bijwerken en verwijderen van motoren. Ze dienen als waarborg voor een goede functionaliteit en beveiliging van de applicatie.

### Screenshots

![screenshot, testen](/public/testen/testscreenshot.png)

![screenshot, testcoverage](/public/testen/testcoverage.png)

## Gekende bugs

### Front-end Web Development

> Zijn er gekende bugs?

### Web Services

Ik heb geen bugs opgemerkt binnen het project.
