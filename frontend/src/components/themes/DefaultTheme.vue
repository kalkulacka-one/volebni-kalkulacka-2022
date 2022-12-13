<script setup lang="ts">
const body = document.querySelector('body');
if (body != null) {
  body.style.backgroundColor = 'rgb(248, 247, 247)';
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss" scoped src="@/components/themes/DefaultTheme.scss" />
