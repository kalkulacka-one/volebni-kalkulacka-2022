<script setup lang="ts">
import { MDXProvider } from '@mdx-js/vue';
import Post from '../../../content/page/index.mdx';
import StackComponent from '@/components/design-system/layout/StackComponent.vue';
import StickyHeaderLayout from '@/components/layouts/StickyHeaderLayout.vue';
import NavigationBar from '@/components/design-system/navigation/NavigationBar.vue';

import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);

const components = {
  StackComponent: StackComponent,
};
</script>

<template>
  <StickyHeaderLayout>
    <template #header>
      <NavigationBar transparent with-account :user="user" />
    </template>
    <MDXProvider :components="components"><Post /></MDXProvider>
  </StickyHeaderLayout>
</template>
