import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { fileStorageService } from "../services/file-storage-service.js";

export const isPortableExecutable = (buffer) => {
  const signature = buffer.toString('hex').slice(0, 9);
  const peSignature = "4d5a90000";

  return signature === peSignature;
}

export const validateFile = (file) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    const fileName = uuid();
    let size = 0;
    let firstChunkAnalyzed = false;

    fileStorageService.uploadFile({ fileBuffer: file, fileName });
    hash.setEncoding('hex');
    file.pipe(hash);
    file.on("data", (data) => {
      if (!firstChunkAnalyzed) {
        if (!isPortableExecutable(data)) {
          file.resume();
          reject("Invalid file");
        }
        firstChunkAnalyzed = true;
      }
      size = size + Buffer.byteLength(data);
    });

    file.on("end", () => {
      hash.end();
      resolve({
        fileName,
        fileSize: size,
        fileHash: hash.read(),
      });
    });
  })
}

export const getFileStream = (busboyInstance) => {
  return new Promise((resolve, reject) => {
    busboyInstance.on('file', (fieldname, file) => {
      resolve(file);
    })
  })
}
