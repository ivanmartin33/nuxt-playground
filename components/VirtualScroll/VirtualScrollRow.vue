<script setup lang="ts">
const props = defineProps<{
  rows: any[];
}>();

const srcReduce = (sourceUrl: string) => {
  var baseUrl = sourceUrl.substring(0, 25);
  var params = sourceUrl.replace(/^\/+|\/+$/g, "").split("/");
  var pop = params.slice(-3)[0];
  var finalizeUrl = baseUrl + pop + "/200/300";
  return finalizeUrl;
};
</script>
<template>
  <div class="flex flex-row bg-amber justify-center sm:justify-around items-center">
    <div
      v-for="row in rows"
      class="w-full md:w-80 2xl:w-100 h-auto p-5 hover:bg-blue cursor-pointer"
    >
      <img
        :src="srcReduce(row.download_url)"
        class="w-full h-full object-center object-fill"
      />
    </div>
  </div>
</template>

<style scoped></style>
