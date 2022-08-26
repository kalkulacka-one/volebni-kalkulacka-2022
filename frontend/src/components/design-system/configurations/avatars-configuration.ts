type TTopics = 'general' | 'ecology' | 'medicine';
export type TSingleAvatarOrder = {
  color: string;
  backgroundColorWinner: string;
  backgroundColorOther: string;
};

export type TAvatarOrder = Record<TTopics, TSingleAvatarOrder>;

export const avatarsConfiguration: TAvatarOrder = {
  general: {
    color: 'rgb(var(--palette-neutral-100))',
    backgroundColorWinner: 'rgb(var(--palette-primary-50))',
    backgroundColorOther: 'rgb(var(--palette-primary-90))',
  },
  ecology: {
    color: 'rgb(var(--palette-neutral-100))',
    // TODO: replace with correct colors
    backgroundColorWinner: 'rgb(var(--palette-neutral-10))',
    backgroundColorOther: 'rgb(var(--palette-neutral-50))',
  },
  medicine: {
    color: 'rgb(var(--palette-neutral-100))',
    // TODO: replace with correct colors
    backgroundColorWinner: 'rgb(var(--palette-secondary-10))',
    backgroundColorOther: 'rgb(var(--palette-secondary-50))',
  },
};
