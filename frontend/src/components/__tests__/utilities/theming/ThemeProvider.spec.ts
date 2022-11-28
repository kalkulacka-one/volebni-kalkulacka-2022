import { defineComponent } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';

import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';

const SuspenseWrapper = defineComponent({
  components: { ThemeProvider },
  template: `
    <Suspense>
      <ThemeProvider>
        <slot />
      </ThemeProvider>
    </Suspense>
  `,
});

describe('ThemeProvider', () => {
  test('renders slot content', async () => {
    const wrapper = mount(SuspenseWrapper, {
      slots: { default: 'slot content' },
    });

    await flushPromises();
    await vi.dynamicImportSettled();

    expect(wrapper.text()).toContain('slot content');
  });
});
