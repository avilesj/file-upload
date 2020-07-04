import aws from "aws-sdk";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { isPortableExecutable } from "../helpers/file-helper.js";

const S3_BUCKET = process.env.AWS_S3_BUCKET;
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const storeFileInS3 = ({ fileBuffer, fileName }) => {
  const params = {
    Key: fileName,
    Body: fileBuffer,
    Bucket: S3_BUCKET,
  };

  return s3.upload(params).promise();
}
