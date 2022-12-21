import PillComponent from './PillComponent.vue';
import { mdiPhone } from '@mdi/js';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
export default {
  title: 'Containers/PillComponent',
  component: PillComponent,
  args: {
    defaultSlot: 'Pill',
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
    components: { PillComponent },
    setup() {
      return { args };
    },
    template: `
    <pill-component v-bind="args">
      ${args.defaultSlot}
    </pill-component>
  `,
  };
};

export const Default = Template.bind({});
Default.args = {};

export const Active = Template.bind({});
Active.args = {
  active: true,
};
