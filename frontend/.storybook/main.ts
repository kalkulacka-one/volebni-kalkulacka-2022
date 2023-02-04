import type { StorybookConfig } from '@storybook/types';

const glob = require('glob');
const path = require('path');
const appDirectory = path.resolve(__dirname, '../');
const getStories = () =>
  glob.sync(`${appDirectory}/src/components/**/*.stories.@(js|jsx|ts|tsx)`, {
    ignore: `${appDirectory}/src/routes/**/*.*)`,
  });

const config: StorybookConfig = {
  stories: async () => [...getStories()],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        docs: false,
        backgrounds: false,
      },
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
  },
};
module.exports = config;
