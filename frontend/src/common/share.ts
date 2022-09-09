import type { SocialMediaProps } from '@/components/design-system/icons/SocialMediaIcon.vue';

const BASE_URL = 'https://kalkulacka.ceskodigital.net';

export const generateShareUrl = (uuid: string) => {
  return `${BASE_URL}/share/${uuid}`;
};

export const generateSocialLink = (
  uuid: string,
  type: SocialMediaProps['type']
) => {
  let navUrl = '';
  if (type === 'facebook') {
    navUrl =
      'https://www.facebook.com/sharer/sharer.php?u=' + generateShareUrl(uuid);
  } else if (type === 'twitter') {
    navUrl = 'https://twitter.com/intent/tweet?text=' + generateShareUrl(uuid);
  }
  return navUrl;
};
