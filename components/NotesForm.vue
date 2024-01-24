<!-- components/NotesForm.vue -->
<script setup>
const notes = useNotes();
const user = useUserSession();
const location = useLocationStore();

const handleLocation = async () => {
	await location.getLocation();
};

const handleAddNote = async (event) => {
  const form = event.target;
  const formData = new FormData(form);

  // Extract the values from the FormData object and add userId
  const postNoteData = {
    userId: user.current.value.userId,
    subject: formData.get('subject'),
    content: formData.get('content'),
		latitude: location.position.latitude,
		longitude: location.position.longitude
  };

  await notes.add(postNoteData);

  form.reset(); // Clear the form
};

handleLocation();

</script>

<template>
  <div>
    <article class="container padding-0">
      <h4 class="heading-level-4">Submit Note</h4>
      <form @submit.prevent="handleAddNote" class="u-margin-block-start-16">
        <ul class="form-list">
          <li class="form-item">
            <label class="label">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
            />
          </li>
          <li class="form-item">
            <label class="label">Content</label>
            <textarea
              placeholder="Content"
              name="content"
            />
          </li>
					<li class="form-item">
            <label class="label"></label>
            <span>{{ location.getMessage() }}</span>
          </li>
          <button class="button" aria-label="Submit note" type="submit">
            Submit
          </button>
        </ul>
      </form>
    </article>
  </div>
</template>
