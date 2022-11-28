import { defineComponent } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';

import WebProvider from '@/components/utilities/embedding/WebProvider.vue';

const SuspenseWrapper = defineComponent({
  components: { WebProvider },
  template: `
    <Suspense>
      <WebProvider />
    </Suspense>
  `,
});

describe('WebProvider', () => {
  test('renders content', async () => {
    const wrapper = mount(SuspenseWrapper, {
      global: {
        stubs: { 'router-view': { template: 'content' } },
      },
    });

    await flushPromises();
    await vi.dynamicImportSettled();

    expect(wrapper.text()).toContain('content');
  });
});
