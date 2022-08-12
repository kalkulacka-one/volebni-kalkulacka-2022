<script setup lang="ts">
import { inject } from 'vue';
import { ThemeKey } from './ThemeKey';

const theme = inject(ThemeKey);

if (!theme) {
  throw new Error('Injecting theme failed');
}
</script>

<template>
  <div>
    <p>Currently selected theme: {{ theme.selected.value }}</p>
    <div>
      <button @click="theme.switch('default')">Switch to default theme</button>
      {{ ' ' }}
      <button @click="theme.switch('blue-example')">
        Switch to blue theme
      </button>
    </div>
  </div>
</template>
