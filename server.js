const minimist = require('minimist')
const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')

const db = require("./database.js")
const args = minimist(process.argv.slice(2))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

args["help", "port", "debug", "log"]

if (args.help) {
    console.log(
        `server.js [options]

        --port	Set the port number for the server to listen on. Must be an integer
                    between 1 and 65535.
      
        --debug	If set to \`true\`, creates endlpoints /app/log/access/ which returns
                    a JSON access log from the database and /app/error which throws 
                    an error with the message "Error test successful." Defaults to 
                    \`false\`.
      
        --log		If set to false, no log files are written. Defaults to true.
                    Logs are always written to database.
      
        --help	Return this message and exit.`
    )
    process.exit(0)
}

var HTTP_PORT = args.port || process.env.PORT || 5555
const debug = args.debug || false
const log = args.log || true 

const server = app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

if (log != "false") {
    const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
    app.use(morgan('FORMAT', { stream: accessLog }))
}


/*
const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

args["help", "port", "debug", "log"]

var express = require("express")
var app = express()
var morgan = require("morgan")
var fs = require("fs")
const db = require("./database.js")


if (args.help) {
    console.log(
        `server.js [options]

        --port	Set the port number for the server to listen on. Must be an integer
                    between 1 and 65535.
      
        --debug	If set to \`true\`, creates endlpoints /app/log/access/ which returns
                    a JSON access log from the database and /app/error which throws 
                    an error with the message "Error test successful." Defaults to 
                    \`false\`.
      
        --log		If set to false, no log files are written. Defaults to true.
                    Logs are always written to database.
      
        --help	Return this message and exit.`
    )
    process.exit(0)
}




app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var HTTP_PORT = args.port || process.env.PORT || 5555
const debug = args.debug || false
const log = args.log || false 

app.use( (req, res, next) => {
    // Your middleware goes here.
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }

    


if(log) {
    // Use morgan for logging to files
    // Create a write stream to append (flags: 'a') to a file
    const accesslog = fs.createWriteStream('access.log', { flags: 'a' })
    // Set up the access logging middleware
    app.use(morgan('FORMAT', { stream: accesslog }))
    }

    // Start server
    const server = app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
    });




    for (const [key, value] of Object.entries(logdata)) {
        sqlWrite - sqlWrite.replace(key, value)
    }

    next()

})

if (debug) {
    app.get("/app/user/access", (req, res) => {
        try {
            const stmt = db.prepare('SELECT * FROM accesslog').all();
            res.status(200).json(stmt)
        } catch (e) {
            console.error(e)
        }
    })
    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.')
      })
}
*/



