import { database } from "../database.js";

const getFileMetadataByHash = () => {
    const connection = database.getConnection();
    console.log(connection);
};
const saveFileMetadata = () => null;
const saveFileDuplicateEvent = () => null;

export const fileMetadataService = {
    getFileMetadataByHash,
    saveFileMetadata,
    saveFileDuplicateEvent
}
