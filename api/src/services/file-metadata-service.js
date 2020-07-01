import { database } from "../database.js";
import { v4 as uuid } from "uuid";

const getFileMetadataByHash = async (hash) => {
  const connection = database.getConnection();
  const queryText = `SELECT * FROM "file_metadata" WHERE hash = $1`;

  const queryObject = {
    text: queryText,
    values: [hash]
  }
  const result = await connection.query(queryObject);
  return result.rows[0];
};

const saveFileMetadata = async ({ fileHash, fileSize, fileLocation }) => {
  const fileName = uuid();
  const connection = database.getConnection();
  const queryText = `INSERT INTO "file_metadata"(hash, file_name, file_size, file_location) VALUES($1, $2, $3, $4) RETURNING *`;

  const queryObject = {
    text: queryText,
    values: [fileHash, fileName, fileSize, fileLocation]
  }

  const result = await connection.query(queryObject);
  return result.rows[0];
}

const saveFileDuplicateEvent = (fileMetadataId) => {
  const connection = database.getConnection();
  const queryText = `INSERT INTO "file_duplicate_event"(file_metadata_id) VALUES($1)`;

  const queryObject = {
    text: queryText,
    values: [fileMetadataId]
  }
  return connection.query(queryObject);

}

export const fileMetadataService = {
  getFileMetadataByHash,
  saveFileMetadata,
  saveFileDuplicateEvent
}
