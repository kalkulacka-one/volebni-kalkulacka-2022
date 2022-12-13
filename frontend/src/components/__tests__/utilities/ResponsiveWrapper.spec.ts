import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import ResponsiveWrapper from '@/components/utilities/ResponsiveWrapper.vue';

describe('ResponsiveWrapper', () => {
  test('renders slot content when breakpoint is set', () => {
    const wrapper = mount(ResponsiveWrapper, {
      slots: { default: 'content' },
      props: { extraSmall: true },
    });
    expect(wrapper.text()).toEqual('content');
  });
});
