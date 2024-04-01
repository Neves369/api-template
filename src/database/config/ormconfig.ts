// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// const config: any = {
//   type: 'postgres',
//   name: 'default',
//   host: process.env.PG_HOST,
//   port: Number(process.env.PG_PORT) || 5432, // define um valor padrão para port
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   synchronize: false,
//   logging: false,
//   entities: ['dist/orm/entities/**/*.js'], // use a pasta de build em vez da pasta de origem
//   migrations: ['dist/orm/migrations/**/*.js'], // use a pasta de build em vez da pasta de origem
//   subscribers: ['dist/orm/subscribers/**/*.js'], // use a pasta de build em vez da pasta de origem
//   namingStrategy: new SnakeNamingStrategy(),
// };

// export = config;

import "reflect-metadata"
import { DataSource } from "typeorm"
import User  from "../../models/user.model";
import Token  from "../../models/token.model";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "teste",
    entities: [User, Token],
    synchronize: true,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

export default AppDataSource;