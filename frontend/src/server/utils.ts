export function getPublicUrl(): string {
  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`;
  }
  const { PUBLIC_URL } = process.env;
  if (!PUBLIC_URL) {
    throw new Error('PUBLIC_URL is not defined');
  }
  return PUBLIC_URL;
}
