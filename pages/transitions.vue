<script setup lang="ts">
import { gsap } from "gsap";

const target = ref(null);

function onBeforeEnter(el: any) {
  gsap.set(el, {
    y: "+100",
    autoAlpha: 0,
  });
}

const onEnter = (el: any, done: any) => {
  gsap.to(el, {
    delay: 0.2,
    duration: 0.8,
    ease: "back.out(1)",
    autoAlpha: 1,

    y: 0,
    onComplete: done,
  });
};

// onMounted(() => {
//   gsap.from(target.value, {
//     duration: 0.8,
//     ease: "back.out(1)",
//     autoAlpha: 0,
//     y: "+100",
//   });
// });
</script>
<template>
  <div>
    <ClientOnly>
      <Transition
        appear
        name="trans"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
        <div class="overflow-hidden" key="1">
          <h1>Hello World</h1>
        </div>
      </Transition>
    </ClientOnly>
    <div key="2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, dignissimos autem
      praesentium optio nulla error pariatur nesciunt. Est vero rem nulla quidem illo
      culpa ipsa similique expedita! Aut, veritatis tenetur!
    </div>
  </div>
</template>
