import express from "express";

const app = express();
app.post('/', fileUploadController);

app.listen(3000, () => {
    console.log("Server online");
});
