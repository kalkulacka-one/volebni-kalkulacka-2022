import type { Meta, StoryFn } from '@storybook/vue3';

import ButtonComponent from '@/components/design-system/input/ButtonComponent.vue';
import IconComponent from '@/components/design-system/icons/IconComponent.vue';
import SocialMediaIcon from '@/components/design-system/icons/SocialMediaIcon.vue';
import { Color, Kind, Size, Tag } from './ButtonComponent.types';
import { mdiChevronDown } from '@mdi/js';

export default {
  title: 'Input/ButtonComponent',
  component: ButtonComponent,
  subcomponents: { IconComponent, SocialMediaIcon },
  args: {
    default: 'Button',
  },
  argTypes: {
    color: {
      options: Color,
      control: {
        type: 'select',
      },
    },
    kind: {
      options: Kind,
      control: {
        type: 'select',
      },
    },
    size: {
      options: Size,
      control: {
        type: 'select',
      },
    },
    tag: {
      options: Tag,
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
  color: Color.Primary,
  kind: Kind.Filled,
};

export const SecondaryFilled = Template.bind({});
SecondaryFilled.args = {
  color: Color.Secondary,
  kind: Kind.Filled,
};

export const NeutralFilled = Template.bind({});
NeutralFilled.args = {
  color: Color.Neutral,
  kind: Kind.Filled,
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = {
  color: Color.Primary,
  kind: Kind.Outlined,
};

export const SecondaryOutlined = Template.bind({});
SecondaryOutlined.args = {
  color: Color.Secondary,
  kind: Kind.Outlined,
};

export const NeutralOutlined = Template.bind({});
NeutralOutlined.args = {
  color: Color.Neutral,
  kind: Kind.Outlined,
};

export const PrimaryLink = Template.bind({});
PrimaryLink.args = {
  color: Color.Primary,
  kind: Kind.Link,
};

export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
  color: Color.Secondary,
  kind: Kind.Link,
};

export const NeutralLink = Template.bind({});
NeutralLink.args = {
  color: Color.Neutral,
  kind: Kind.Link,
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
  color: Color.Facebook,
  kind: Kind.Filled,
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
  color: Color.White,
  kind: Kind.Filled,
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
  color: Color.Primary,
  kind: Kind.Filled,
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
  color: Color.Neutral,
  kind: Kind.Filled,
};
