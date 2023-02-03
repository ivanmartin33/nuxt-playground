
// @ts-ignore
import VirtualScroll from "vue3-virtual-scroll-list";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("virtual-scroll", VirtualScroll);
});