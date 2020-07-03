import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { fileStorageService } from "../services/file-storage-service.js";

export const isPortableExecutable = (buffer) => {
  const signature = buffer.toString('hex').slice(0, 9);
  const peSignature = "4d5a90000";

  return signature === peSignature;
}

export const parseFormData = (busboyInstance) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    let size = 0;
    let firstChunkAnalyzed = false;

    busboyInstance.on('file', (fieldname, file) => {
      file.pipe(hash);
      fileStorageService.uploadFile({ fileBuffer: file, fileName: uuid() })
      file.on("data", (data) => {
        if(!firstChunkAnalyzed) {
         if(!isPortableExecutable(data)) {
           file.resume();
           reject("Invalid file");
         }
          firstChunkAnalyzed = true;
        }
        size = size + Buffer.byteLength(data);
      })
    });

    busboyInstance.on("finish", () => {
      hash.end();
        resolve({
          fileSize: size,
          fileHash: hash.read(),
        });
    });
  })
}
