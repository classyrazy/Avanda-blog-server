import { Query } from "@avanda/http";
import {Env} from "@avanda/app";

import Models from "./models/.boot"
import Controllers from "./controllers/.boot"

import serverConfig from "../configs/server"

async function boot() {
 const app = await new Query(serverConfig)
     .execute(
         Models,
         Controllers
     )

    console.log({env: Env.get('NODE_ENV')})
    if (Env.get('NODE_ENV') === 'development'){
        return app.getServerInstance()
    }else{
        app.listen()
    }
}


export const appInstance = boot();

