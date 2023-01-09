<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mdiArrowLeft, mdiArrowRight, mdiEmailOutline } from '@mdi/js';
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
import TextInputComponent from '@/components/design-system/input/TextInputComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';

const router = useRouter();
const consent = ref(false);
const emailAddress = ref('');

const handlePreviousClick = () => router.go(-1);

const handleGoToLoginClick = () => router.push(appRoutes.login.name);

const handleEmailSubmitClick = () => (consent.value = true);

const onSubmit = (e: Event) => {
  console.log(emailAddress);
  router.push(appRoutes.emailSent);
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

      <StackComponent spacing="large" class="section" centered>
        <TitleText tag="p" size="medium">
          <template v-if="!consent">Vytvořit profil</template>
          <template v-if="consent">Profil slouží jenom Vám</template>
        </TitleText>

        <BodyText strong size="medium">
          Zadajte svoji emailovou adresu
        </BodyText>

        <BodyText tag="p" size="medium" class="form-wrapper" centered>
          Do e-mailové schránky Vám zašleme e-mail s ověřovacím odkazem.
          Registraci úspěšně dokončíte po kliknutí na něj.
        </BodyText>

        <form
          id="register-form"
          ref="form"
          @submit.prevent="(e) => onSubmit(e)"
        >
          <CardComponent
            v-show="!consent"
            corner="top-left"
            padding="medium"
            border
            border-radius="medium"
            shadow
            class="form-wrapper"
          >
            <StackComponent spacing="medium" centered>
              <TextInputComponent
                required
                label="E-mail"
                type="email"
                placeholder="E-mail"
                class="w-full"
                :value="emailAddress"
                v-model="emailAddress"
                :icon="mdiEmailOutline"
              />

              <ButtonComponent
                kind="filled"
                color="primary"
                class="w-full"
                @click.prevent="handleEmailSubmitClick"
              >
                Zaslat potvrdzovací email
                <template #iconAfter>
                  <IconComponent :icon="mdiArrowRight" />
                </template>
              </ButtonComponent>
            </StackComponent>
          </CardComponent>

          <CardComponent
            v-show="consent"
            corner="top-left"
            padding="medium"
            backgroundColor="transparent"
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
        </form>

        <StackComponent horizontal centered spacing="extra-small">
          <BodyText size="medium" strong>Už máte profil?</BodyText>
          <ButtonComponent
            kind="link"
            color="primary"
            @click="handleGoToLoginClick"
          >
            Přihlašte se
          </ButtonComponent>
        </StackComponent>
      </StackComponent>
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
