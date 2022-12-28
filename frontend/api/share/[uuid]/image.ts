import type { VercelRequest, VercelResponse } from '@vercel/node';
import { html } from 'satori-html';
import satori from 'satori';

export default async function (req: VercelRequest, res: VercelResponse) {
  const imageHtml = html`
    <div style="ontSize: 128; color: #000; background: #fff;">Hello world!</div>
  `;

  const svg = satori(imageHtml, {
    width: 1200,
    height: 630,
  });

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
}
