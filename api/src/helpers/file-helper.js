import md5 from "md5-hex";

export const isPortableExecutable = (buffer) => {
  const signature = buffer.toString('hex').slice(0, 9);
  const peSignature = "4d5a90000";

  return signature === peSignature;
}

export const parseFormData = (busboyInstance) => {
  return new Promise((resolve) => {
    const bufferChunks = [];
    busboyInstance.on('file', (fieldname, file) => {
      file.on("data", (data) => {
        bufferChunks.push(data);
      })
    });

    busboyInstance.on("finish", () => {
        const fileBuffer = Buffer.concat(bufferChunks);
        resolve({
            fileBuffer,
            fileSize: fileBuffer.length,
            fileHash: md5(fileBuffer)
        });
    });
  })
}
