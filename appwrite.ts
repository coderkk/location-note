import { Client, Databases, Account } from "appwrite";

const url: string = "https://cloud.appwrite.io/v1"; //config.public.VITE_APPWRITE_ENDPOINT;
const project: string = "65b05a52f0f9116e5178"; //config.public.VITE_APPWRITE_PROJECT;


const client: Client = new Client();

client.setEndpoint(url).setProject(project);
// await client.setOfflinePersistency(status: true);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);