"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(...messages) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log(...messages);
        }
    }
    error(...messages) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.error(...messages);
        }
    }
}
exports.default = Logger;
