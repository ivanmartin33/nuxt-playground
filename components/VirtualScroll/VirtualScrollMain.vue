<script setup lang="ts">
import { UseElementVisibility } from "@vueuse/components";

const props = defineProps<{
  dataSources: any[];
  limit: number;
}>();
const rows = ref<[]>([]);
const chunkIndex = ref(0);
const datas = [...props.dataSources];
const chunkSize = datas.length / props.limit;

const chunk = (arr: any[], size: number) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
};

const chunkedData = chunk(datas, 4);

const { list, containerProps, wrapperProps } = useVirtualList(chunkedData, {
  itemHeight: 400,
});

const formatRows = (): void => {
  console.log(chunkedData);
  let row: any[] = [];
  let newRows: any[] = [];
  const colNumber = 4;

  if (chunkedData.length <= chunkIndex.value) return;

  for (let index = 0; chunkedData[chunkIndex.value].length > index; index++) {
    if (index % colNumber === 0) {
      newRows.push(row);
      row = [];
    }
    row.push(chunkedData[chunkIndex.value][index]);
  }
  chunkIndex.value++;
  rows.value.push(...(newRows as []));
};

const handleRefresh = async () => {
  await delay(1000);
  formatRows();
  console.log("refresh");
};

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

onMounted(() => {
  formatRows();
});

const target = ref(null);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) formatRows();
  }
);
</script>
<template>
  <div>
    <div v-bind="containerProps" class="h-screen flex flex-col gap-5">
      <div v-bind="wrapperProps" class="flex flex-col gap-5">
        <div v-for="(rows, index) in list" :key="index" class="h-100">
          <VirtualScrollRow
            v-for="(row, index) in rows"
            :rows="row"
            :key="index"
            class="h-100"
          />
        </div>
      </div>
    </div>

    <!-- <div ref="target" /> -->
  </div>
</template>

<style scoped></style>
