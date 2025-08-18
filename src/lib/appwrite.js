import { Client, Avatars } from "appwrite";

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('688230070011fbf10e1a'); // Your project ID

const avatars = new Avatars(client);

export function generateQR(text, size = 400, margin = 1, download = false) {
    return avatars.getQR(
        text,
        size,
        margin,
        download
    );
}