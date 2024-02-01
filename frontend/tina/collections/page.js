import { stackComponent } from '../templates/StackComponent';

/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: 'Page Content',
  name: 'page',
  path: 'content/page',
  format: 'mdx',
  fields: [
    {
      name: 'body',
      label: 'Main Content',
      type: 'rich-text',
      isBody: true,
      templates: [stackComponent([stackComponent()])],
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return `/`;
      }
      return undefined;
    },
  },
};
