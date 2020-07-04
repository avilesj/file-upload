import aws from "aws-sdk";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { isPortableExecutable } from "../helpers/file-helper.js";

const S3_BUCKET = process.env.AWS_S3_BUCKET;
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const storeFileInS3 = ({ fileBuffer, fileName }) => {
  const params = {
    Key: fileName,
    Body: fileBuffer,
    Bucket: S3_BUCKET,
  };

  return s3.upload(params).promise();
}

export const uploadFile = async (file) => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha1');
  const fileName = uuid();
  let size = 0;
  let firstChunkAnalyzed = false;

  const s3UploadPromise = storeFileInS3({ fileBuffer: file, fileName });
  hash.setEncoding('hex');
  file.pipe(hash);
  file.on("data", (data) => {
    if (!firstChunkAnalyzed) {
      if (!isPortableExecutable(data)) {
        file.resume();
        s3UploadPromise.then(() => reject({ message: "Invalid file", fileName }));
      }
      firstChunkAnalyzed = true;
    }
    size = size + Buffer.byteLength(data);
  });

  file.on("end", () => {
    hash.end();
    s3UploadPromise.then(() => resolve({
      fileName,
      fileSize: size,
      fileHash: hash.read(),
      fileLocation: process.env.AWS_S3_BUCKET,
    }));

  });
});

export const deleteFile = async ({ fileName }) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };
  return s3.deleteObject(params).promise();
}
