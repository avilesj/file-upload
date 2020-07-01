import Busboy from "busboy";
import { isPortableExecutable, parseFormData } from "../helpers/file-helper.js";
import { fileMetadataService } from "../services/file-metadata-service.js";

export const fileUploadController = async (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  req.pipe(busboy);
  const fileObject = await parseFormData(busboy);
  console.log(fileObject);
    res.sendStatus(200);
}
