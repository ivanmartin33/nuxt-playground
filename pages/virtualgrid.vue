<script setup lang="ts">
const { data: items, refresh } = useFetch("https://picsum.photos/v2/list?limit=100");
</script>

<template>
  <div>
    <VirtualGrid :items="items" :updateFunction="refresh" />
  </div>
</template>
