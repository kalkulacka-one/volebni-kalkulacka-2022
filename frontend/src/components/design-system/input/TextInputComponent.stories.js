import TextInputComponent from './TextInputComponent.vue';
import { mdiPhone } from '@mdi/js';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
export default {
  title: 'Input/TextInputComponent',
  component: TextInputComponent,
};

const Template = (args, { argTypes }) => {
  return {
    components: { TextInputComponent },
    setup() {
      return { args };
    },
    template: `
    <text-input-component v-bind="args">
      ${args.defaultSlot}
    </text-input-component>
  `,
  };
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Please, fill in some text',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Text input with icon',
  placeholder: 'Please, fill in some text',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Text input with icon',
  placeholder: 'Please, fill in some text',
  icon: mdiPhone,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Text input with error',
  placeholder: 'Please, fill in some text',
  error: 'There is an error, please fix it.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled text input',
  placeholder: 'Please, fill in some text',
  disabled: true,
};
