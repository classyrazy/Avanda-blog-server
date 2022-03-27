"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@avanda/cli");
class TestCommand {
    constructor() {
        this.command = "test";
        this.description = "this is a sample command";
    }
    exe(action = '', options) {
        cli_1.Out.success('this success message from a test command');
    }
}
exports.default = TestCommand;
