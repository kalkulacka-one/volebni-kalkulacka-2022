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
      id: 'a',
      name: 'Miluše Politická',
      description: 'Koalice pro práva občanů',
      score: 95,
      image: 'https://thispersondoesnotexist.com/image',
    },
    {
      id: 'b',
      name: 'Petr Apolitický',
      description: 'Koalice pro práva občanů',
      score: 93,
      image: 'https://thispersondoesnotexist.com/image',
    },
  ],
  updated: '12. 3. 2022',
};
