const mysql = require("mysql"); 
const inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "watkins0428",
  database: "employee_DB"
});

connection.connect(function (err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
});

function init() {
    prompt([
        {
            type: "list",
            choices: [
                "Band",
                "exit",
            ],
            name: "action",
            message: "What Band do you want to search for?"
        }
    ]).then(({action}) =>{
        if(action === "Band") {
            searchByBand();
        } else {
            exit();
        }
    })
}

function searchByBand() {
    inquirer.prompt([
        {
        type: "input",
        message: "What band would you like ot search for?",
        name: "band"
    },
]).then(({band}) => {
    const queryString = "SELECT top5000.position, top5000.artist, top5000.song, top5000.year, top_albums.album FROM top5000 INNER JOIN top_albums ON (top5000.artist = top_albums.artist AND top5000.year = top_albums.year);";
    connection.query(queryString,["band"], function(err, data) {
        if (err) throw err;
        console.table(data);
        init()
    })   
})
};
