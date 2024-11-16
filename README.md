# Hero backend

## setup

1. Install Postgres and setup server
2. run `npm i`
3. `.env` is included with default Postgres parameters
4. run `node setup.js` to create table from model
5. run `npm start` to run server

! Hero operations are performed with `delay` for demonstration purposes.

For frontend application follow [link](https://github.com/io-med/hero-front)

## Description

This application was build using `Express`, Pg with `Sequelize` and `Multer`. It stores Hero data in PostgreSQL DB as model `{nickname: string, real_name: string, origin_description: string, superpowers: string, cath_phrase: string, images: string[]}`. Images are stored in application file system, while DB stores references to them as filenames. `CRUD` operations can be performed both with Heroes and their images (no `update` for images). `Multer` is used to read multiform data and save images in filesystem with normalized names. Basic validation is performed in each operation. Error middleware is added and custom exceptions implemented.

## API routes

| name    | route              | method | body                                                                      |
| ------- | ------------------ | ------ | ------------------------------------------------------------------------- |
| get all | /heroes            | GET    | -                                                                         |
| get one | /heroes/{id}       | GET    | -                                                                         |
| create  | /heroes            | POST   | {nickname, real_name, origin_description, superpowers, catch_phrase}      |
| update  | /heroes/{id}       | PATCH  | {nickname, real_name, origin_description, superpowers, catch_phrase}      |
| replace | /heroes/{id}       | PUT    | {nickname?, real_name?, origin_description?, superpowers?, catch_phrase?} |
| delete  | /heroes/{id}       | DELETE | -                                                                         |
| get one | /images/{filename} | GET    | -                                                                         |
| create  | /images/{id}       | POST   | multiform: {image}                                                        |
| delete  | /images/{id}       | DELETE | -                                                                         |
