// composables/useNotes.ts

import { ID, Query, Models} from "appwrite";
import { database } from "~/appwrite";
import { ref } from "vue";

const notesDatabaseId: string = "65b062aba9e8dfb1ca02"; //({}).VITE_DATABASE_ID;
const notesCollectionId: string = "65b062c5b1ff2326841c"; //({}).VITE_COLLECTION_ID;
const queryLimit: number = 10;

interface Note extends Models.Document{
    subject: string;
    content: string;
    userId: string;
    longtitude: number;
    latitude: number;
}

const current = ref<Note[] | null>(null); // Reference for the fetched data

export const useNotes = () => {

    // Fetch the 10 most recent notes from the database
    // Add the list to the current reference object
    const fetch = async (): Promise<void> => {
        const response = await database.listDocuments(
            notesDatabaseId,
            notesCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(queryLimit)]
        );
        current.value = response.documents as Note[];
    };

    // Add new note to the database,
    // Change the value of the current object
    const add = async (note: Note): Promise<void> => {
        const response = await database.createDocument(
            notesDatabaseId,
            notesCollectionId,
            ID.unique(),
            note
        );
        current.value = [response, ...current.value as Note[]].slice(0, 10) as Note[];
    };

    const remove = async (id: string): Promise<void> => {
        await database.deleteDocument(notesDatabaseId, notesCollectionId, id);
        await fetch(); // Refetch notes to ensure we have 10 items
    };

    fetch();

    return {
        add,
        current,
        fetch,
        remove,
    };
};
