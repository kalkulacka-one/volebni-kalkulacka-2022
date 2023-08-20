<script setup lang="ts">
import type { DeprecatedContact } from '@/types/contact';
import SocialMediaIcon, {
  type SocialMediaProps,
} from '../../components/design-system/icons/SocialMediaIcon.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import { mdiOpenInNew } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
import IconButton from '../../components/design-system/input/IconButton.vue';
export interface ResultCandidateContactsProps {
  contact: DeprecatedContact;
}
defineProps<ResultCandidateContactsProps>();

const handleSocialBtnClick = (
  type: SocialMediaProps['type'],
  url: string | undefined,
) => {
  console.debug(`opening ${url}`);
  window.open(url, '_blank');
};
</script>
<template>
  <div class="wrapper">
    <BodyText size="small"><strong>Kontakty</strong></BodyText>
    <div class="social-wrapper">
      <IconButton
        v-if="contact.instagram"
        @click="() => handleSocialBtnClick('instagram', contact.instagram)"
      >
        <SocialMediaIcon type="instagram" size="large" />
      </IconButton>
      <IconButton
        v-if="contact.facebook"
        @click="() => handleSocialBtnClick('facebook', contact.facebook)"
      >
        <SocialMediaIcon type="facebook" size="large"
      /></IconButton>
      <IconButton
        v-if="contact.twitter"
        @click="() => handleSocialBtnClick('twitter', contact.twitter)"
      >
        <SocialMediaIcon type="twitter" size="large"
      /></IconButton>
      <IconButton
        v-if="contact.tiktok"
        @click="() => handleSocialBtnClick('tiktok', contact.tiktok)"
      >
        <SocialMediaIcon type="tiktok" size="large"
      /></IconButton>
    </div>
    <div class="email-web-wrapper">
      <ButtonComponent
        v-for="web in contact.webs"
        :key="web.url"
        tag="a"
        kind="link"
        :href="web.url"
        size="small"
        rel="noreferrer noopener"
        target="_blank"
      >
        {{ web.label ? web.label : web.url }}
        <template #icon>
          <IconComponent
            :icon="mdiOpenInNew"
            color="rgb(var(--color-neutral-fg))"
          />
        </template>
      </ButtonComponent>
      <ButtonComponent
        v-for="email in contact.emails"
        :key="email.email"
        tag="a"
        kind="link"
        :href="`mailto: ${email.email}`"
        size="small"
      >
        {{ email.label ? email.label : email.email }}
        <template #icon>
          <IconComponent
            :icon="mdiEmail"
            color="rgb(var(--color-neutral-fg))"
          />
        </template>
      </ButtonComponent>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.social-wrapper {
  margin-top: var(--spacing-small);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.email-web-wrapper {
  margin-top: var(--spacing-small);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
