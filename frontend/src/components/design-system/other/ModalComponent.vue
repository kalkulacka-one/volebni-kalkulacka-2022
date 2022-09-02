<script setup lang="ts">
import IconButton from '../input/IconButton.vue';
import ThemeProvider from '@/components/ThemeProvider.vue';

import { mdiClose } from '@mdi/js';

export interface Props {
  isModalOpen: boolean;
  closeModalCallback(): void;
}

const props = withDefaults(defineProps<Props>(), {
  isModalOpen: false,
});
</script>

<template>
  <Teleport to="body">
    <ThemeProvider>
      <div
        v-if="props.isModalOpen"
        class="modal-bg"
        @click="closeModalCallback"
      >
        <div class="modal" @click.stop="">
          <div class="title">
            <IconButton
              :icon="mdiClose"
              title="close modal"
              size="small"
              color="rgb(var(--palette-neutral-30)"
              @click="closeModalCallback"
            />
            <slot name="title" />
          </div>
          <slot name="content" />
        </div>
      </div>
    </ThemeProvider>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-bg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;

  display: flex;
  align-items: flex-end;

  background-color: rgba(var(--palette-neutral-40), var(--transparency-50));
  backdrop-filter: blur(8px);
}

.modal {
  width: 100%;
  padding: var(--spacing-small);
  border-radius: var(--radius-small) var(--radius-small) 0 0;
  background-color: rgb(var(--palette-neutral-100));
}

.title {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: var(--spacing-small);

  margin-bottom: var(--spacing-extra-small);
}
</style>
