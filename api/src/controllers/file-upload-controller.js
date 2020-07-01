import Busboy from "busboy";
import { isPortableExecutable, parseFormData } from "../helpers/file-helper.js";
import { fileMetadataService } from "../services/file-metadata-service.js";
import { fileStorageService } from "../services/file-storage-service.js";

export const fileUploadController = async (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  req.pipe(busboy);
  const fileObject = await parseFormData(busboy);

  if (!fileObject.isPortableExecutable) {
    return res.sendStatus(200);
  }

  const fileMetadata = await fileMetadataService.getFileByHash(fileObject.fileHash);
  if (fileMetadata) {
    await fileMetadataService.saveFileDuplicateEvent(fileObject);
    return res.sendStatus(200);
  } else {
    await fileMetadataService.saveFileMetadata(fileObject);
    await fileStorageService.uploadFile(fileObject);
    return res.sendStatus(200);
  }
}
