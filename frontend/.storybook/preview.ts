import type { StoryContext, StoryFn } from '@storybook/types';

import ThemeProvider from '@/components/utilities/theming/ThemeProvider.vue';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'seznam-zpravy', title: 'Seznam Zprávy' },
        { value: 'e15', title: 'E15' },
        { value: 'blesk', title: 'Blesk' },
        { value: 'idnes', title: 'iDNES.cz' },
        { value: 'infovolby', title: 'Infovoľby.sk' },
      ],
    },
  },
};

const withThemeProvider = (story: StoryFn, context: StoryContext) => ({
  components: { ThemeProvider, story },
  setup() {
    return { theme: context.globals.theme };
  },
  template: `
    <ThemeProvider :theme="theme">
      <story />
    </ThemeProvider>
  `,
});

export const decorators = [withThemeProvider];
