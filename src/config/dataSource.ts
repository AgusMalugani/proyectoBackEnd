import { registerAs } from "@nestjs/config";
import{config as dotenvConfig} from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm";
dotenvConfig({path:'.env.development'})

const dataSource={
    type:"postgres",
    database:process.env.NAME_DB,
    host:process.env.HOST_DB,
    port:Number(process.env.PORT_DB) ,
    username:process.env.USERNAME_DB,
    password: String(process.env.PASSWORD_DB).trim(),
    synchronize:true,
    autoLoadEntities:true,
    entities:["dist/**/*.entity{.ts,.js}"],
    migrations:["dist/migrations/*{.js,.ts}"],
    dropSchema:true,
    logging:true
    }

    
export default registerAs("dataSource",()=>dataSource); 

export const connectionSource = new DataSource (dataSource as DataSourceOptions)