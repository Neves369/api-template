import "reflect-metadata"
import { DataSource } from "typeorm"

import User  from "../../models/usuario.model";
import Token  from "../../models/token.model";
import Modulo  from "../../models/modulo.model";
import Empresa  from "../../models/empresa.model";
import Permissao  from "../../models/permissao.model";
import PerfilAcesso  from "../../models/perfilAcesso.model";
import PermissoesPerfilAcesso  from "../../models/Association/permissoesPerfilAcesso.model";

import Modulos_Empresa  from "../../models/Association/modulos_empresa.model";
import { CreateUsers1590521920166 } from "../migrations/1590521920166-CreateUsers";
import { CreateTokens1713465641598 } from "../migrations/1713465641598-CreateTokens";
import { CreateModules1713969136272} from "../migrations/1713969136272-CreateModules";
import { CreateCompanies1713982846674} from "../migrations/1713982846674-CreateCompanies";
import { CreateModulesCompanie1713984157764} from "../migrations/1713984157764-CreateModulesCompanie";
import { CreatePermissions1713987604626} from "../migrations/1713987604626-CreatePermissions";
import { CreateProfileAccess1713988023179} from "../migrations/1713988023179-CreateProfileAccess";
import { CreatePermissionsProfileAccess1713988821239} from "../migrations/1713988821239-CreatePermissionsProfileAccess";
import { AlterTables1714050816310 } from "../migrations/1714050816310-AlterTables";




const AppDataSourceSeed = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) | 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    migrations: [
        CreateModules1713969136272,
        CreateCompanies1713982846674,
        CreateModulesCompanie1713984157764,
        CreatePermissions1713987604626,
        CreateProfileAccess1713988023179,
        CreatePermissionsProfileAccess1713988821239,
        CreateUsers1590521920166, 
        CreateTokens1713465641598,
        AlterTables1714050816310
    ],
    entities: [
        Empresa, 
        Modulo, 
        Modulos_Empresa, 
        Permissao, 
        PerfilAcesso, 
        PermissoesPerfilAcesso,
        User, 
        Token, 
    ],
    migrationsRun: true,
    synchronize: false,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSourceSeed.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

export default AppDataSourceSeed;

