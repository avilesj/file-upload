export const isPortableExecutable(buffer) {
    const signature = buffer.toString('hex').slice(0, 9);
    const peSignature = "4d5a90000";

    return signature === peSignature;
}
