<script setup lang="ts">
import { useRouter } from 'vue-router';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
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

const handlePreviousClick = () => router.go(-1);

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
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Zpátky" />
              </IconButton>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
        <ResponsiveWrapper medium large extra-large huge>
          <SecondaryNavigationBar transparent>
            <template #before>
              <IconButton @click="handlePreviousClick">
                <IconComponent :icon="mdiArrowLeft" title="Zpátky" />
              </IconButton>
            </template>
          </SecondaryNavigationBar>
        </ResponsiveWrapper>
      </template>

      <form id="register-form" ref="form" @submit.prevent="(e) => onSubmit(e)">
        <StackComponent spacing="large" class="section" centered>
          <TitleText tag="p" size="medium"> Profil slouží jenom Vám </TitleText>

          <CardComponent
            corner="top-left"
            padding="medium"
            border
            border-radius="medium"
            shadow
            class="form-wrapper"
          >
            <StackComponent spacing="large" centered>
              <img
                src="/images/register-safety.png"
                width="72"
                height="72"
                alt=""
              />
              <BodyText tag="p" size="small" centered>
                Vaše osobní ůdaje nebudeme nikde šířit. Vytvořením profilu
                souhlasíte se zpracováním osobních ůdajů.
              </BodyText>

              <ButtonComponent kind="filled" color="primary" class="w-full">
                Vytvořit profil
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </StackComponent>
          </CardComponent>
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
</style>
