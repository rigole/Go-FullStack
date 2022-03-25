const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Successfull Request");
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Server Started" });
    next();
});

app.use((req, res, next) => {
    console.log(" response send successfully")
})
module.exports = app;