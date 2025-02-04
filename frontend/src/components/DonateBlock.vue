<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import TitleText from '@/components/design-system/typography/TitleText.vue';
import BodyText from '@/components/design-system/typography/BodyText.vue';

const { t } = useI18n();
</script>

<script lang="ts">
export default {
  created() {
    eval(`+function(w, d, s, u, a, b) {
          w["DarujmeObject"] = u;
          w[u] = w[u] || function () { (w[u].q = w[u].q || []).push(arguments) };
          a = d.createElement(s); b = d.getElementsByTagName(s)[0];
          a.async = 1; a.src = "https://www.darujme.cz/assets/scripts/widget.js";
          b.parentNode.insertBefore(a, b);
        }(window, document, "script", "Darujme");
    Darujme(1, "p889ojumaax0exw9", 'render', "https://www.darujme.cz/widget?token=p889ojumaax0exw9", "100%");`);
  },
};
</script>

<template>
  <div class="section-donation">
    <StackComponent spacing="small">
      <TitleText size="large" tag="h2">{{
        t('components.DonateBlock.title')
      }}</TitleText>
      <BodyText size="medium">{{ t('components.DonateBlock.body') }}</BodyText>
    </StackComponent>
    <div class="donation" data-darujme-widget-token="p889ojumaax0exw9">
      &nbsp;
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-donation {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 40px 0;

  @media (max-width: 767px) {
    flex-direction: column;
  }
}

.donation {
  background-color: white;
  min-width: 16rem;
}
</style>