import "reflect-metadata"
import { DataSource } from "typeorm"
import User  from "../../models/usuario.model";
import Token  from "../../models/token.model";


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) | 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    // entities: [User, Token],
    synchronize: false,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// AppDataSource.initialize()
// .then(() => {
//         // here you can start to work with your database
// })
// .catch((error) => console.log(error))

export default AppDataSource;