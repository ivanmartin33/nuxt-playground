<script setup lang="ts">
const page = ref(1);
const itemHeight = ref(400);
const itemsRow = ref(5);

const chunk = (arr: any[], size: number) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
};

const rows = ref<[]>([]);

const { data, refresh, pending, error } = await useFetch<any>(
  () => `https://picsum.photos/v2/list?limit=100&page=${page.value}`,
  {
    transform: (data) => {
      const chunkedData = chunk(data, itemsRow.value);
      rows.value.push(...(chunkedData as []));
      return data;
    },
  }
);

const { list, containerProps, wrapperProps } = useVirtualList(rows, {
  itemHeight: itemHeight.value,
  overscan: 5,
});

useInfiniteScroll(
  containerProps.ref,
  () => {
    page.value += 1;
  },
  { distance: 10 }
);

const breakpoints = useBreakpoints({
  sm: "640px",
  md: "1024px",
  xl: "1280px",
  xxl: "1536px",
  xxxl: "1920px",
});

const isSmallerXxxl = breakpoints.greater("xxxl");
const isSmallerXxl = breakpoints.between("xxl", "xxxl");
const isSmallerXl = breakpoints.between("md", "xl");
const isSmallerMd = breakpoints.between("sm", "md");
const isSmallerSm = breakpoints.smaller("sm");

watch(
  [isSmallerXxxl, isSmallerXxl, isSmallerXl, isSmallerMd, isSmallerSm],
  ([isXxxl, isXxl, isXl, isMd, isSm], oldValue) => {
    if (isSm) {
      itemHeight.value = 200;
      itemsRow.value = 1;
    }

    if (isMd) {
      itemHeight.value = 200;
      itemsRow.value = 2;
    }

    if (isXl) {
      itemHeight.value = 400;
      itemsRow.value = 3;
    }

    if (isXxl) {
      itemHeight.value = 800;
      itemsRow.value = 4;
    }

    if (isXxxl) {
      itemHeight.value = 800;
      itemsRow.value = 5;
    }

    const flatRows = rows.value.flat();
    const chunkedData = chunk(flatRows, itemsRow.value);
    rows.value = chunkedData as [];
  }
);
</script>
<template>
  <div>
    <div v-bind="containerProps" class="h-screen flex flex-col overflow-auto">
      <div v-bind="wrapperProps">
        <VirtualScrollRow
          v-for="(rows, index) in list"
          :rows="rows.data"
          :key="index"
          :class="`h-[${itemHeight}px}]`"
        />
      </div>

      <div v-if="pending" :class="itemHeight ? 'h-200' : 'h-100'">
        <h2>Loading...</h2>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
