import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ContainerComponent from '@/components/design-system/containers/ContainerComponent.vue';

describe('ContainerComponent', () => {
  it('renders slot content', () => {
    const wrapper = mount(ContainerComponent, {
      slots: { default: 'content' },
    });
    expect(wrapper.text()).toContain('content');
  });
});
