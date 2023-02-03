<template>
  <div><img :src="sourceUrl(source.download_url)" alt="Image" /></div>
</template>

<script>
export default {
  name: "item-component",
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    sourceUrl(url) {
      var baseUrl = url.substring(0, 25);
      var params = url.replace(/^\/+|\/+$/g, "").split("/");
      var pop = params.slice(-3)[0];
      var finalizeUrl = baseUrl + pop + "/200/200";
      return finalizeUrl;
    },
  },
};
</script>
