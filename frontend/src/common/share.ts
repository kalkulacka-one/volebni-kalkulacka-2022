import type { SocialMediaProps } from '@/components/design-system/icons/SocialMediaIcon.vue';
import { useElectionStore } from '@/stores/electionStore';

const BASE_URL = 'https://www.volebnikalkulacka.cz/';

export const generateShareUrl = (uuid: string) => {
  return `${BASE_URL}/share/${uuid}`;
};

export const generateSocialLink = (type: 'link' | 'facebook' | 'twitter') => {
  const electionStore = useElectionStore();
  if (!electionStore.resultsUuid) {
    throw new Error('Results are not saved. Unable to generate share link');
  }
  let navUrl = null;
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
