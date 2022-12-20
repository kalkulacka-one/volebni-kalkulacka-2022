import PillGroupComponent from './PillGroupComponent.vue';
import PillGroupItemComponent from './PillGroupItemComponent.vue';
import { mdiPhone } from '@mdi/js';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
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
  argTypes: {
    active: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = (args, { argTypes }) => {
  return {
    components: {
      PillGroupComponent,
      PillGroupItemComponent,
    },
    setup() {
      return { args };
    },
    template: `
      <pill-group-component v-bind="args" />
    `,
  };
};

export const Default = Template.bind({});
Default.args = {};
