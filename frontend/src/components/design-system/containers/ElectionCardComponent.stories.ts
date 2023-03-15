import ElectionCardComponent from './ElectionCardComponent.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Containers/ElectionCardComponent',
  component: ElectionCardComponent,
} as Meta<typeof ElectionCardComponent>;

const imageUrl = 'https://loremflickr.com/320/320/face,human,person,profile';

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
  electionDateFrom: '2023-01-13T14:00:00',
  electionDateTo: '2023-01-17T14:00:00',
};

export const FilledIn = Template.bind({});
FilledIn.args = {
  electionName: 'Senátní volby',
  electionDateFrom: '2023-03-13T14:00:00',
  electionDateTo: '2023-04-17T14:00:00',
  candidates: [
    {
      id: 'a',
      name: 'Miluše Politická',
      description: 'Koalice pro práva občanů',
      score: 95,
      image: imageUrl,
    },
    {
      id: 'b',
      name: 'Petr Apolitický',
      description: 'Koalice pro práva občanů',
      score: 93,
      image: imageUrl,
    },
  ],
  updated: '12. 3. 2022',
};
