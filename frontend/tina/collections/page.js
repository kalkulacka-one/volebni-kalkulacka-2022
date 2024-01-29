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
      templates: [
        {
          name: 'StackComponent',
          label: 'Stack Component',
          fields: [
            {
              name: 'children',
              label: 'Children',
              type: 'rich-text',
            },
            {
              name: 'spacing',
              label: 'Spacing',
              type: 'string',
              component: 'select',
              options: ['extra-small', 'small', 'medium', 'large'],
            },
            {
              name: 'horizontal',
              label: 'Horizontal',
              type: 'boolean',
            },
            {
              name: 'centered',
              label: 'Centered',
              type: 'boolean',
            },
            {
              name: 'stretched',
              label: 'Stretched',
              type: 'boolean',
            },
            {
              name: 'spaceBetween',
              label: 'Space Between',
              type: 'boolean',
            },
            {
              name: 'wrap',
              label: 'Wrap',
              type: 'boolean',
            },
          ],
        },
      ],
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
