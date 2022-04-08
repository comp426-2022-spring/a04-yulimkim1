"use strict";

const database = require("better-sqlite3")
const db = new database("log.db")

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);

let row = stmt.get();

if (row === undefined) {
    const sqlInit = `CREATE TABLE accesslog ( time INTEGER PRIMARY KEY, remoteaddr TEXT, remoteuser TEXT, method TEXT, url TEXT, protocol TEXT, httpversion TEXT, status TEXT, referer TEXT, useragent TEXT);`;
    db.exec(sqlInit);
} 

module.exports = db