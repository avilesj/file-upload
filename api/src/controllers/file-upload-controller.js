import Busboy from "busboy";
import { getFileStream } from "../helpers/file-helper.js";
import { uploadFile, deleteFile } from "../services/file-storage-service.js";
import { getFileMetadataByHash, saveFileDuplicateEvent, saveFileMetadata } from "../services/file-metadata-service.js";

export const fileUploadController = async (req, res, next) => {
  try {
    const busboy = new Busboy({ headers: req.headers });
    req.pipe(busboy);
    const fileStream = await getFileStream(busboy);
    const fileObject = await uploadFile(fileStream);

    const fileMetadata = await getFileMetadataByHash(fileObject.fileHash);
    if (fileMetadata) {
      await deleteFile(fileObject);
      await saveFileDuplicateEvent(fileMetadata.id);
      return res.sendStatus(200);
    }
    await saveFileMetadata(fileObject);
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}
