import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { Client, Avatars } from "appwrite";

const client = new Client()
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT_ID);

const avatars = new Avatars(client);

export function generateQR(text, size = 400, margin = 1, download = false) {
    return avatars.getQR(
        text,
        size,
        margin,
        download
    );
}