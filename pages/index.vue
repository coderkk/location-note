<!-- pages/index.vue -->
<script setup>
const user = useUserSession();
</script>

<template>
  <div class="u-max-width-650" style="margin-inline: auto;">
    <!-- Idea form component for logged in users -->
    <NotesList />
    
    <section v-if="user.current.value" class="card u-margin-32">
      <NotesForm />
    </section>

    <section v-else class="card u-margin-32">
      <div class="container">
        <p class="body-text-1" style="width: 100%;">
          Please login to submit a note.
        </p>
      </div>
      
    </section>
  </div>
</template>
  
<style>
article.box {
  background-color: hsl(var(--color-neutral-0));
}
</style>
