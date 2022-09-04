<script setup lang="ts">
import type { Contact } from '@/types/contact';
import SocialMediaIcon from '../../components/design-system/icons/SocialMediaIcon.vue';
import BodyText from '../../components/design-system/typography/BodyText.vue';
import ButtonComponent from '../../components/design-system/input/ButtonComponent.vue';
import { mdiOpenInNew } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import IconComponent from '../../components/design-system/icons/IconComponent.vue';
export interface ResultCandidateContactsProps {
  contact: Contact;
}
defineProps<ResultCandidateContactsProps>();
</script>
<template>
  <div class="wrapper">
    <BodyText size="small"><strong>Kontakty</strong></BodyText>
    <div class="social-wrapper">
      <SocialMediaIcon
        v-if="contact.instagram"
        type="instagram"
        size="large"
      ></SocialMediaIcon>
      <SocialMediaIcon
        v-if="contact.facebook"
        type="facebook"
        size="large"
      ></SocialMediaIcon>
      <SocialMediaIcon
        v-if="contact.twitter"
        type="twitter"
        size="large"
      ></SocialMediaIcon>
      <SocialMediaIcon
        v-if="contact.tiktok"
        type="tiktok"
        size="large"
      ></SocialMediaIcon>
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
  gap: var(--spacing-small);
  align-items: flex-start;
}
.email-web-wrapper {
  margin-top: var(--spacing-small);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
