d[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/snPWRHYg)

# Examenopdracht Front-end Web Development / Web Services

- Student: Jasper Haegeman
- Studentennummer: 202292134
- E-mailadres: <mailto:jasper.haegeman@student.hogent.be>

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

## Voor het starten / testen van dit project

Maak een `.env` (development) bestand met volgende inhoud:

```ini
NODE_ENV=development
DATABASE_USERNAME=root
DATABASE_PASSWORD=MySQLtest123
```

## Opstarten

## Start het project

- Installeer alles van: `yarn`
- yarn add koa
- yarn install
- yarn add nodemon --dev
- yarn add config
- yarn add env-cmd --dev
- yarn add winston
- yarn add @koa/router
- yarn add koa-bodyparser
- yarn add @koa/cors
- yarn add knex
- yarn add mysql2
- Zorg dat uw `.env` bestand aangemaakt is.
- Start de server op na alles van yarn te downloaden (start, validatie,authenticatie & autorisatie) : `yarn start`

## Validatie

- Installeer alles van: `yarn`
- yarn add joi
- yarn add node-emoji@1.11.0
- yarn add koa-helmet

## Authenticatie & autorisatie

- Installeer alles van: `yarn`
- yarn add argon2
- yarn add jsonwebtoken

## Testen

- Installeer alles van: `yarn`

- Zorg dat een `.env.test` bestaat met `NODE_ENV=test` (zie hier onder)

```ini
NODE_ENV=test
DATABASE_USERNAME=root
DATABASE_PASSWORD=MySQLtest123
```

- Start de server: `yarn test`
