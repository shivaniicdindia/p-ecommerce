const app = require("./app")
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');


// handling uncaught exception(for varables)

process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception rejection`);
})

dotenv.config({ path: "backend/config/config.env" });
// connection database
connectDatabase();
const server = app.listen(process.env.PORT, (res) => {
    console.log(`Server is working on http://locahost:${process.env.PORT}`)
})

app.get('/', function (req, res) {
    res.send("Server is working asdfads fine");
});
// unhandled promise rejection
// for shutdown your server your own self

process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})