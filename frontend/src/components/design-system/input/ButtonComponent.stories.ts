import type { Meta, StoryFn } from '@storybook/vue3';

import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import SocialMediaIcon from '@/components/design-system/icons/SocialMediaIcon.vue';

export default {
  title: 'Input/ButtonComponent',
  component: ButtonComponent,
  subcomponents: { IconComponent, SocialMediaIcon },
  args: {
    default: 'Button',
  },
  argTypes: {
    color: {
      options: ['neutral', 'primary', 'secondary', 'white', 'facebook'],
      control: {
        type: 'select',
      },
    },
    kind: {
      options: ['link', 'outlined', 'filled', 'answer'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['medium', 'small'],
      control: {
        type: 'select',
      },
    },
    tag: {
      options: ['a', 'button'],
      control: {
        type: 'select',
      },
    },
    default: {
      description: 'The default Vue slot',
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      },
    },
    icon: {
      description: 'Icon slot',
      control: {
        type: 'object',
      },
    },
    iconAfter: {
      description: 'Icon after text label slot',
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof ButtonComponent>;

const Template: StoryFn<typeof ButtonComponent> = (args) => ({
  components: { ButtonComponent },
  setup() {
    return { args };
  },
  template:
    '<ButtonComponent v-bind="args">{{ args.default }}</ButtonComponent>',
});

export const PrimaryFilled = Template.bind({});
PrimaryFilled.args = {
  color: 'primary',
  kind: 'filled',
};

export const SecondaryFilled = Template.bind({});
SecondaryFilled.args = {
  color: 'secondary',
  kind: 'filled',
};

export const NeutralFilled = Template.bind({});
NeutralFilled.args = {
  color: 'neutral',
  kind: 'filled',
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = {
  color: 'primary',
  kind: 'outlined',
};

export const SecondaryOutlined = Template.bind({});
SecondaryOutlined.args = {
  color: 'secondary',
  kind: 'outlined',
};

export const NeutralOutlined = Template.bind({});
NeutralOutlined.args = {
  color: 'neutral',
  kind: 'outlined',
};

export const PrimaryLink = Template.bind({});
PrimaryLink.args = {
  color: 'primary',
  kind: 'link',
};

export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
  color: 'secondary',
  kind: 'link',
};

export const NeutralLink = Template.bind({});
NeutralLink.args = {
  color: 'neutral',
  kind: 'link',
};

export const Facebook: StoryFn<typeof ButtonComponent> = (args) => ({
  components: { ButtonComponent, SocialMediaIcon },
  setup() {
    return { args };
  },
  template: `
    <ButtonComponent v-bind="args">
      <template #icon>
        <SocialMediaIcon type="facebook" color="white" />
      </template>
      <template #default>
        Facebook
      </template>
    </ButtonComponent>
  `,
});
Facebook.args = {
  color: 'facebook',
  kind: 'filled',
};

export const Google: StoryFn<typeof ButtonComponent> = (args) => ({
  components: { ButtonComponent, SocialMediaIcon },
  setup() {
    return { args };
  },
  template: `
    <ButtonComponent v-bind="args">
      <template #icon>
        <SocialMediaIcon type="google" />
      </template>
      <template #default>
        Google
      </template>
    </ButtonComponent>
  `,
});
Google.args = {
  color: 'white',
  kind: 'filled',
};

export const Twitter: StoryFn<typeof ButtonComponent> = (args) => ({
  components: { ButtonComponent, SocialMediaIcon },
  setup() {
    return { args };
  },
  template: `
    <ButtonComponent v-bind="args">
      <template #icon>
        <SocialMediaIcon type="twitter" color="white" />
      </template>
      <template #default>
      Twitter
      </template>
    </ButtonComponent>
  `,
});
Twitter.args = {
  color: 'primary',
  kind: 'filled',
};

export const Apple: StoryFn<typeof ButtonComponent> = (args) => ({
  components: { ButtonComponent, SocialMediaIcon },
  setup() {
    return { args };
  },
  template: `
    <ButtonComponent v-bind="args">
      <template #icon>
        <SocialMediaIcon type="apple" color="white" />
      </template>
      <template #default>
        Apple
      </template>
    </ButtonComponent>
  `,
});
Apple.args = {
  color: 'neutral',
  kind: 'filled',
};
