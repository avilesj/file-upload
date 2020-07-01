import express from "express";

const app = express();

app.get('/', function(req, res, next) {
    res.sendStatus(200);
})

app.listen(3000, () => {
    console.log("Server online");
});
