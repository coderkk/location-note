<!-- componenents/NotesList.vue -->
<script setup>
import { onMounted } from 'vue';

const notes = useNotes();
const user = useUserSession();
</script>

<template>
    <section class="u-margin-2">
      <article class="card">
        <h4 class="heading-level-4">Latest Notes</h4>
        <ul class="u-margin-block-start-8">
          <template v-if="notes.current.value && notes.current.value.length">
            <li v-for="note in notes.current.value">
              <div class="box">
                <h5 class="heading-level-6">{{ note.subject }}</h5>
                <p class="body-text-2">{{ note.content }}</p>
                <p class="body-text-5">Location : {{ note.latitude }}, {{ note.longitude }}</p>
                <div class="u-position-absolute u-inset-inline-end-8 u-inset-block-start-8">
                  <button class="button is-small is-text is-only-icon" aria-label="Remove item" v-if="user.current.value &&
                    note.userId === user.current.value.userId
                    " type="button" @click="notes.remove(note.$id)">
                    <span class="icon-document-remove" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          </template>
          <template v-else>
            <p>No notes yet.</p>
          </template>
        </ul>
      </article>
    </section>
  </template>
