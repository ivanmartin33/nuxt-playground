<script setup lang="ts">
import { v4 as uuidV4 } from "uuid";
import itemComp from "@/components/Item.vue";

const { data: items } = await useFetch<any>("https://picsum.photos/v2/list?limit=58");

// const setVirtualItems = () => {
//   if (process.browser) {
//     let width = document.body.clientWidth;
//     let newChunkSize = getChunkSize(width);
//     if (newChunkSize === chunkSize.value) {
//       return;
//     } else {
//       chunkSize.value = newChunkSize;
//       // resetCounter();
//       // this.items = getData(40, newChunkSize);
//     }
//   }
// };

// onMounted(() => {
//   window.addEventListener("resize", setVirtualItems);
// }),
//   onBeforeUnmount(() => {
//     window.removeEventListener("resize", setVirtualItems);
//   });
</script>
<template>
  <div>
    <VirtualScrollMain :data-sources="items" :limit="3" />
  </div>
</template>

<style>
.grid2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  height: 200px;
  overflow: hidden;
}

.list-dynamic {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
}

.list-item-dynamic {
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid;
  border-color: lightgray;
}
</style>
