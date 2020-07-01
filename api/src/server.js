import express from "express";
import { fileUploadController } from "./controllers/file-upload-controller.js";

const app = express();
app.get('/', fileUploadController);

app.listen(3000, () => {
    console.log("Server online");
});
