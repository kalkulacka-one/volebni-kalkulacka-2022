<script setup lang="ts"></script>

<template>
  <div class="footer-wrapper">
    <div class="content">
      <div class="data-1" style="background-color: red"></div>
      <div class="data-2" style="background-color: gold"></div>
      <div class="data-3" style="background-color: greenyellow"></div>
      <div class="data-4" style="background-color: teal"></div>
      <div class="data-5" style="background-color: royalblue"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-wrapper {
  background-color: var(--color-neutral-bg);
  width: 100%;
  min-height: 500px;
}

.content {
  width: 100%;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: 1.2fr repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 8px;

  @media (max-width: 991px) {
    grid-template-columns: 1.2fr repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}

.data-1 {
  grid-area: 1 / 1 / 2 / 2;

  @media (max-width: 991px) {
    grid-area: 1 / 1 / 3 / 2;
  }

  @media (max-width: 767px) {
    grid-area: 1 / 1 / 2 / 3;
  }
}
.data-2 {
  grid-area: 1 / 2 / 2 / 3;

  @media (max-width: 991px) {
    grid-area: 1 / 2 / 2 / 3;
  }

  @media (max-width: 767px) {
    grid-area: 2 / 1 / 3 / 2;
  }
}
.data-3 {
  grid-area: 1 / 3 / 2 / 4;

  @media (max-width: 991px) {
    grid-area: 1 / 3 / 2 / 4;
  }

  @media (max-width: 767px) {
    grid-area: 2 / 2 / 3 / 3;
  }
}
.data-4 {
  grid-area: 1 / 4 / 2 / 5;

  @media (max-width: 991px) {
    grid-area: 2 / 2 / 3 / 3;
  }

  @media (max-width: 767px) {
    grid-area: 3 / 1 / 4 / 2;
  }
}
.data-5 {
  grid-area: 1 / 5 / 2 / 6;

  @media (max-width: 991px) {
    grid-area: 2 / 3 / 3 / 4;
  }

  @media (max-width: 767px) {
    grid-area: 3 / 2 / 4 / 3;
  }
}
</style>
