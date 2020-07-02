import express from "express";
import { fileUploadController } from "./controllers/file-upload-controller.js";

const app = express();
app.post('/', fileUploadController);

app.listen(process.env.API_PORT || 3000, () => {
    console.log("Server online");
});
