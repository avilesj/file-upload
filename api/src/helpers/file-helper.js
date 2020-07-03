import { v4 as uuid } from "uuid";
import md5 from "md5-hex";
import aws from "aws-sdk";
import crypto from "crypto";

export const isPortableExecutable = (buffer) => {
  const signature = buffer.toString('hex').slice(0, 9);
  const peSignature = "4d5a90000";

  return signature === peSignature;
}

export const parseFormData = (busboyInstance) => {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    const hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    const bufferChunks = [];
    let size = 0;
    let firstChunkAnalyzed = false;

    busboyInstance.on('file', (fieldname, file) => {
      file.pipe(hash);
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: uuid(),
        Body: file,
      };

    s3.upload(params).send();
      file.on("data", (data) => {
        if(!firstChunkAnalyzed) {
         if(!isPortableExecutable(data)) {
           file.resume();
           reject("Invalid file");
         }
          firstChunkAnalyzed = true;
        }
        size = size + Buffer.byteLength(data);
        bufferChunks.push(data);
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
