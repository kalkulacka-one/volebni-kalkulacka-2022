import type { SocialMediaProps } from '@/components/design-system/icons/SocialMediaIcon.vue';
import { useElectionStore } from '@/stores/electionStore';

const PUBLIC_URL =
  import.meta.env.VITE_PUBLIC_URL ||
  `https://${import.meta.env.VITE_VERCEL_URL}`;
export const generateShareUrl = (uuid: string) => {
  return `${PUBLIC_URL}/share/${uuid}?utm_campaign=social-share`;
};

export const generateSocialLink = (type: 'link' | 'facebook' | 'twitter') => {
  const electionStore = useElectionStore();
  let navUrl = null;
  if (!electionStore.resultsUuid) {
    console.error('Results are not saved. Unable to generate share link');
    return navUrl;
  }
  switch (type) {
    case 'link':
      navUrl = generateShareUrl(electionStore.resultsUuid);
      break;
    case 'facebook':
      navUrl =
        'https://www.facebook.com/sharer/sharer.php?u=' +
        generateShareUrl(electionStore.resultsUuid);
      break;
    case 'twitter':
      navUrl =
        'https://twitter.com/intent/tweet?text=' +
        generateShareUrl(electionStore.resultsUuid);
      break;
    default:
      break;
  }
  return navUrl;
};

export const triggerOgImageGeneration = async () => {
  const electionStore = useElectionStore();
  if (!electionStore.resultsUuid) {
    console.error('Results are not saved. Unable to generate OG image');
    return;
  }
  const endpointUrl = `/image/${electionStore.resultsUuid}`;
  const res = await fetch(endpointUrl, {
    method: 'GET',
  });
  if (!res.ok) {
    console.error(res);
  } else {
    console.debug('GET og image success!');
  }
};
