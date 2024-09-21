import { registerAs } from "@nestjs/config";
import{config as dotenvConfig} from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm";
dotenvConfig({path:".env.development"})

const dataSource={
type:"postgres",
database:"proyecto_M4",
host:"localhost",
port:5432,
username:"postgres",
password:"Lala12345.",
synchronize:true,
autoLoadEntities:true,
entities:["dist/**/*.entity{.ts,.js}"],
migrations:["dist/migrations/*{.js,.ts}"],
dropSchema:true,
logging:true
}

export default registerAs("dataSource",()=>dataSource); 

export const connectionSource = new DataSource (dataSource as DataSourceOptions)