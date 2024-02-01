export const stackComponent = (nestedTemplates) => {
  return {
    name: 'StackComponent',
    label: 'Stack Component',
    fields: [
      {
        name: 'children',
        label: 'Children',
        type: 'rich-text',
        templates: nestedTemplates ?? [],
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
  };
};
