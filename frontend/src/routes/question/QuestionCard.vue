<script setup lang="ts">
defineProps<{
  questionNr: number;
  questionTotal: number;
  name: string;
  text: string;
  explanation: string;
  tags: string[];
}>();
</script>

<template>
  <div>
    <p>
      {{ questionNr }}/{{ questionTotal }} <strong>{{ name }} </strong>
      <em v-for="tag in tags" :key="tag"> {{ tag }} | </em>
    </p>
    <h1>{{ text }}</h1>
    <p>{{ explanation }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
