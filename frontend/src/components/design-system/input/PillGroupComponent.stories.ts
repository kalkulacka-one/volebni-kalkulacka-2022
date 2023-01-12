import type { Meta, StoryFn } from '@storybook/vue3';

import PillGroupComponent from './PillGroupComponent.vue';
import PillGroupItemComponent from './PillGroupItemComponent.vue';

export default {
  title: 'Input/PillGroupComponent',
  component: PillGroupComponent,
  args: {
    defaultSlot: 'Pill',
    items: [
      { name: '2018', value: '2018' },
      { name: '2019', value: '2019' },
      { name: '2020', value: '2020' },
      { name: '2021', value: '2021' },
      { name: '2022', value: '2022' },
    ],
    groupName: 'year',
  },
} as Meta<typeof PillGroupComponent>;

export const PillGroup: StoryFn<typeof PillGroupComponent> = (args) => ({
  components: { PillGroupComponent, PillGroupItemComponent },
  setup() {
    return { args };
  },
  template: `
    <pill-group-component v-bind="args">
     <pill-group-item-component
      v-for="(item, idx) in args.items"
      :value="item.value"
      type="checkbox"
      :groupName="args.groupName"
      :checked="idx === 0"
      :key="idx"
     >
      {{ item.name }}
     </pill-group-item-component>
    </pill-group-component>
  `,
});
PillGroup.args = {};
