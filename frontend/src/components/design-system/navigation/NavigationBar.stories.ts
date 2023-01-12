import type { Meta, StoryFn } from '@storybook/vue3';

import NavigationBar from './NavigationBar.vue';

export default {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  args: {},
  argTypes: {
    padding: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'select',
      },
    },
    paddingResponsive: {
      control: 'boolean',
    },
    transparent: {
      control: 'boolean',
    },
    centeredTitle: {
      control: 'boolean',
    },
    withAccount: {
      control: 'boolean',
    },
  },
} as Meta<typeof NavigationBar>;

const Template: StoryFn<typeof NavigationBar> = (args) => ({
  components: { NavigationBar },
  setup() {
    return { args };
  },
  template: `<NavigationBar v-bind="args"></NavigationBar>`,
});

export const Default = Template.bind({});
Default.args = {};

export const TransparentBackground = Template.bind({});
TransparentBackground.args = {
  transparent: true,
};

export const SignedOut = Template.bind({});
SignedOut.args = {
  withAccount: true,
  transparent: true,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  withAccount: true,
  transparent: true,
  user: {
    displayName: 'Gina Charming',
    img_url: 'https://thispersondoesnotexist.com/image',
  },
};

export const LoggedInNoAvatar = Template.bind({});
LoggedInNoAvatar.args = {
  withAccount: true,
  user: {
    displayName: 'Gina Charming',
    img_url: undefined,
  },
};
