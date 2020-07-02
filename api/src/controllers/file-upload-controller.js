import Busboy from "busboy";
import { isPortableExecutable, parseFormData } from "../helpers/file-helper.js";
import { fileMetadataService } from "../services/file-metadata-service.js";
import { fileStorageService } from "../services/file-storage-service.js";

export const fileUploadController = async (req, res, next) => {
  try {
    const busboy = new Busboy({ headers: req.headers });
    req.pipe(busboy);
    const fileObject = await parseFormData(busboy);

    if (!fileObject.isPortableExecutable) {
      return res.sendStatus(200);
    }

    const fileMetadata = await fileMetadataService.getFileMetadataByHash(fileObject.fileHash);
    if (fileMetadata) {
      await fileMetadataService.saveFileDuplicateEvent(fileMetadata.id);
      return res.sendStatus(200);
    } else {
      const fileMetadata = await fileMetadataService.saveFileMetadata({ ...fileObject, fileLocation: process.env.AWS_S3_BUCKET });
      await fileStorageService.uploadFile({ ...fileObject, fileName: fileMetadata.file_name });
      return res.sendStatus(200);
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}
