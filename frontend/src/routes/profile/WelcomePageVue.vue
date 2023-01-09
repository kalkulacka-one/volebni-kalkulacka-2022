<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiCloseCircleOutline, mdiArrowRight } from '@mdi/js';
import { appRoutes } from '@/main';

import BackgroundComponent from '@/components/design-system/style/BackgroundComponent.vue';
import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';
import CardComponent from '@/components/design-system/containers/CardComponent.vue';
import IconButton from '@/components/design-system/input/IconButton.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';
import SecondaryNavigationBar from '@/components/design-system/navigation/SecondaryNavigationBar.vue';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

const router = useRouter();

const handleCloseClick = () => router.push(appRoutes.index);

const onSubmit = (e: Event) => {
  console.log('Form submitted: ', e);
};
</script>

<template>
  <BackgroundComponent>
    <StickyHeaderLayout>
      <template #header>
        <ResponsiveWrapper extra-small small>
          <SecondaryNavigationBar centered-title transparent>
            <template #after>
              <IconButton @click="handleCloseClick">
                <IconComponent :icon="mdiCloseCircleOutline" title="Zpátky" />
              </IconButton>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar transparent>
            <template #after>
              <IconButton @click="handleCloseClick">
                <IconComponent :icon="mdiCloseCircleOutline" title="Zpátky" />
              </IconButton>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>

      <form id="register-form" ref="form" @submit.prevent="(e) => onSubmit(e)">
        <StackComponent spacing="large" class="section" centered>
          <img src="/images/logo-symboly.png" width="76" height="16" alt="" />

          <TitleText tag="p" size="medium">
            Vítejte ve svém profilu!
          </TitleText>

          <CardComponent
            corner="top-left"
            padding="medium"
            border
            border-radius="medium"
            shadow
            class="form-wrapper"
          >
            <StackComponent spacing="extra-small">
              <BodyText
                tag="p"
                size="extra-small"
                color="rgb(var(--palette-neutral-10))"
                strong
                class="title"
              >
                Co v něm najdete
              </BodyText>

              <BodyText
                tag="p"
                size="small"
                color="rgb(var(--palette-neutral-10))"
              >
                <ul class="list">
                  <li>Historie vašich volebních kalkulaček</li>
                </ul>
              </BodyText>

              <BodyText
                tag="p"
                size="extra-small"
                color="rgb(var(--palette-neutral-10))"
                strong
                class="title"
              >
                Co chystáme pro příště
              </BodyText>

              <BodyText
                tag="p"
                size="small"
                color="rgb(var(--palette-neutral-10))"
              >
                <ul class="list">
                  <!-- <li>Upozornění na nadcházející volby</li> -->
                  <li class="bw">Možnost ukládat vlastní volební preference</li>
                </ul>
              </BodyText>
            </StackComponent>
          </CardComponent>
          <div class="form-wrapper">
            <ButtonComponent kind="filled" color="primary" class="w-full">
              Přejít do profilu
              <template #iconAfter>
                <IconComponent :icon="mdiArrowRight" />
              </template>
            </ButtonComponent>
          </div>
        </StackComponent>
      </form>
    </StickyHeaderLayout>
  </BackgroundComponent>
</template>

<style lang="scss" scoped>
.form-wrapper {
  width: 340px;
}

.w-full {
  width: 100%;
}

.title {
  margin-top: 0.4rem;
  text-transform: uppercase;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding-left: 1.8rem;
    line-height: 1.8rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACSSURBVHgB7ZLNDYJAEEYfxrOxBEuxBEqgA8cKpAQ6UDuxIxN+T7BAIBw2BBIYAod9ye5hDt+bzAw4HMdB0gD5X+3yCQ0kezX/G86COm24pAaJP6hzzHApbjzzh1b4yJJLH1NF/eLGwzEhVF+iS8AiJAm7Di2J6sxtycJwjzkJXiv4Ne++bixTks1OcZDEPg7HbtTzP1VP7kNJjgAAAABJRU5ErkJggg==');
    background-repeat: no-repeat;
    background-position: left center;

    &.bw {
      filter: grayscale(1);
    }
  }
}
</style>
