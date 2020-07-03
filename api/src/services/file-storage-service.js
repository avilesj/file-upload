import aws from "aws-sdk";

const uploadFile = async ({ fileBuffer, fileName }) => {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileBuffer
  };

  await s3.upload(params).promise();
}

export const fileStorageService = {
  uploadFile,
}
