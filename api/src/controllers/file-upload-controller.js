import Busboy from "busboy";
import { getFileStream, validateFile } from "../helpers/file-helper.js";
import { fileMetadataService } from "../services/file-metadata-service.js";
import { fileStorageService } from "../services/file-storage-service.js";

export const fileUploadController = async (req, res, next) => {
  try {
    const busboy = new Busboy({ headers: req.headers });
    req.pipe(busboy);
    const fileStream = await getFileStream(busboy);
    const fileObject = await fileStorageService.uploadFile(fileStream);

    const fileMetadata = await fileMetadataService.getFileMetadataByHash(fileObject.fileHash);
    if (fileMetadata) {
      await fileStorageService.deleteFile(fileObject);
      await fileMetadataService.saveFileDuplicateEvent(fileMetadata.id);
      return res.sendStatus(200);
    } else {
      await fileMetadataService.saveFileMetadata(fileObject);
      return res.sendStatus(200);
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}
