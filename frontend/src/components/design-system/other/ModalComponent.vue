<script setup lang="ts">
import IconButton from '../input/IconButton.vue';
import ThemeProvider from '@/components/ThemeProvider.vue';

import { mdiClose, mdiCloseThick } from '@mdi/js';
import IconComponent from '../icons/IconComponent.vue';

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
          <div class="title-wrapper">
            <IconButton @click="closeModalCallback">
              <div class="visible-mobile">
                <IconComponent
                  :icon="mdiClose"
                  title="close modal"
                  size="small"
                  color="rgb(var(--palette-neutral-30)"
                />
              </div>
              <div class="visible-desktop">
                <IconComponent
                  :icon="mdiCloseThick"
                  title="close modal"
                  size="medium"
                  color="rgb(var(--palette-neutral-60)"
                />
              </div>
            </IconButton>
            <div class="title">
              <slot name="title" />
            </div>
          </div>
          <slot name="content" />
        </div>
      </div>
    </ThemeProvider>
  </Teleport>
</template>

<style scoped lang="scss">
.visible-mobile {
  display: block;

  @media (min-width: 700px) {
    display: none;
  }
}

.visible-desktop {
  display: none;

  @media (min-width: 700px) {
    display: block;
  }
}

.modal-bg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: flex-end;

  @media (min-width: 700px) {
    align-items: center;
    justify-content: center;
  }

  background-color: rgba(var(--palette-neutral-40), var(--transparency-50));
  backdrop-filter: blur(8px);
}

.modal {
  width: 100%;
  padding: var(--spacing-small);
  border-radius: var(--radius-small) var(--radius-small) 0 0;
  background-color: rgb(var(--palette-neutral-100));

  @media (min-width: 700px) {
    // TODO: the position of the modal on the screen seems to be broken in the design, needs double check before implementation
    width: 50rem;
    max-width: 80vw;
    height: auto;
    min-height: 80vh;

    // TODO: the padding in the design seems to be broken, needs double check before implementation
    padding: 2.5rem 2rem 1.5rem 2.625rem;
  }
}

.title-wrapper {
  display: flex;
  flex-direction: row-reverse;
  gap: var(--spacing-small);

  margin-bottom: var(--spacing-extra-small);
}

.title {
  flex-grow: 1;
}
</style>
