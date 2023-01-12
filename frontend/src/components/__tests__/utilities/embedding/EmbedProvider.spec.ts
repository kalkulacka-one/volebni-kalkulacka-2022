import { defineComponent } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';

import EmbedProvider from '@/components/utilities/embedding/EmbedProvider.vue';

const SuspenseWrapper = defineComponent({
  components: { EmbedProvider },
  template: `
    <Suspense>
      <EmbedProvider />
    </Suspense>
  `,
});

describe('EmbedProvider', () => {
  test.skip('renders content', async () => {
    const wrapper = mount(SuspenseWrapper, {
      global: {
        stubs: { 'router-view': { template: 'content' } },
      },
    });

    await flushPromises();
    await vi.dynamicImportSettled();
    await vi.dynamicImportSettled();

    expect(wrapper.text()).toContain('content');
  });
});
