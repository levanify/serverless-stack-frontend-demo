import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    // takes in the file object as a parameter

    // generate unique file name using current time-stamp
    const filename = `${Date.now()}-${file.name}`;

    // upload the file to user's folder in S3 (Storage.vault)
    // if you want to upload publicly, you can use Storage.put()
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    // return the stored object key
    return stored.key;
}
