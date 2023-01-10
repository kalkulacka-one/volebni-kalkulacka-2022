import ElectionCardComponent from './ElectionCardComponent.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Containers/ElectionCardComponent',
  component: ElectionCardComponent,
} as Meta<typeof ElectionCardComponent>;

const Template: StoryFn<typeof ElectionCardComponent> = (args) => ({
  components: { ElectionCardComponent },
  setup() {
    return { args };
  },
  template:
    '<ElectionCardComponent v-bind="args">{{ args.default }}</ElectionCardComponent>',
});

export const NotFilledIn = Template.bind({});
NotFilledIn.args = {
  electionName: 'Prezidentská volba',
  electionDateFrom: '3.',
  electionDateTo: '4. ledna 2023',
};

export const FilledIn = Template.bind({});
FilledIn.args = {
  electionName: 'Senátní volby',
  electionDateFrom: '23.',
  electionDateTo: '24. září 2022',
  candidates: [
    {
      name: 'Miluše Politická',
      party: 'Koalice pro práva občanů',
      percentage: 95,
      image: 'https://thispersondoesnotexist.com/image',
    },
    {
      name: 'Petr Apolitický',
      party: 'Koalice pro práva občanů',
      percentage: 93,
      image: 'https://thispersondoesnotexist.com/image',
    },
  ],
  updated: '12. 3. 2022',
};
