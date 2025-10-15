const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.AWS_BUCKET_NAME;

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

async function uploadToS3(file) {
  const fileName = generateFileName();
  const contentType = file.mimetype || "application/octet-stream";

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: contentType,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
  const baseUrl = process.env.AWS_BUCKET_URL || `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  return `${baseUrl}/${fileName}`;
}

module.exports = { uploadToS3 };


