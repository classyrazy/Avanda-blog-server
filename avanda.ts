#! /usr/bin/env ts-node
import Avanda from "@avanda/cli"
import Models from "./app/models/.boot"
import Seeders from "./app/seeders/.boot"
import Commands from "./app/commands/.boot"
import {Connection} from "@avanda/app"
import Config from "./configs/database"



async function boot() {
    return Avanda(
        Commands,
        Models,
        Seeders,
        await Connection(Config)
    )
}

boot();
