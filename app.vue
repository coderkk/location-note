<script setup>
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLayout>
      <Navbar />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>