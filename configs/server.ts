import {serverConfig} from "@avanda/app";
import {Connection} from "@avanda/app"
import Config from "./database";
import {Env} from "@avanda/app";

const config: serverConfig =  {
    connection: Connection(Config),
    port: Env.get('PORT',8000),
    rootPath: '/',
    CORSWhitelist: Env.get<string>('CORS_WHITELIST',"http://localhost:3000,http://localhost:4000,http://localhost:9000,http://localhost:3001").split(',')
}

export default config
