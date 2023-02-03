<script setup lang="ts">
const visibleElement = ref(null);
const observer = useElementVisibility(visibleElement);
const refresh = () => {
  console.log("refresh");
};
</script>
<template>
  <div ref="visibleElement"></div>
</template>

<style scoped></style>
