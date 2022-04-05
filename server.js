const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const help = args.help;
if (help != undefined) {
    console.log(help)
    process.exit(0)
}

const database = require("better-sqlite3")
const logdb = new database("log.db")
