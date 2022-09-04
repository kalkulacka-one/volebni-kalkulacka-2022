export type TTopics = 'general' | 'environment' | 'health';
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
    backgroundColorOther: 'rgb(var(--palette-primary-70))',
  },
  environment: {
    color: 'rgb(var(--palette-neutral-100))',
    // TODO: replace with correct colors
    backgroundColorWinner: 'rgb(var(--palette-green-50))',
    backgroundColorOther: 'rgb(var(--palette-green-70))',
  },
  health: {
    color: 'rgb(var(--palette-neutral-100))',
    // TODO: replace with correct colors
    backgroundColorWinner: 'rgb(var(--palette-red-50))',
    backgroundColorOther: 'rgb(var(--palette-red-70))',
  },
};
