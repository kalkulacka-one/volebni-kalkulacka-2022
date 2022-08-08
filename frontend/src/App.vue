<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
</script>

<template>
  <IndexPage/>
</template>

<script>
import IndexPage from './components/IndexPage.vue';

export default {
  name: "App",
  components: {
    IndexPage,
},
};
</script>

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
