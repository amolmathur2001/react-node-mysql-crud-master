const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "database-1.cotrfk5zuhjc.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "amolmathur2503",
    database: "GameShop_DB",
    port: "3306"
});

server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let sql = "INSERT INTO game (name, cost, category) VALUES (?,?,?)"
    db.query(sql, [name, cost, category], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            console.log(result);
        }
    })
});

server.get("/games", (req, res) => {

    let sql = "SELECT * FROM game";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let sql = "UPDATE game SET name = ?, cost = ?, category = ? WHERE idgame = ?";
    db.query(sql, [name, cost, category, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{

            res.send(result);
        }
    })
});

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM game WHERE idgame = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001, () =>
    console.log("Running in the port 3001")
);