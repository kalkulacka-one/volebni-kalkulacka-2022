import type { VercelRequest, VercelResponse } from '@vercel/node';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export default async function (req: VercelRequest, res: VercelResponse) {
  const imageHtml = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
      children: [
        null,
        {
          type: 'div',
          props: {
            class: 'template',
            style: {
              width: '1200px',
              height: '630px',
              maxWidth: '1200px',
              maxHeight: '630px',
              background: 'url(https://i.imgur.com/eJe7y37.png)',
              backgroundSize: '100% 100%',
              display: 'flex',
            },
            children: [
              null,
              {
                type: 'h1',
                props: {
                  class: 'h1',
                  style: {
                    position: 'absolute',
                    top: '204px',
                    left: '254px',
                    fontSize: '28px',
                  },
                  children: 'Největší shodu mám s kandidátem*kandidátkou',
                },
              },
            ],
          },
        },
      ],
    },
  };
  const svg = await satori(imageHtml, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: await fetch(
          'https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff'
        ).then((res) => res.arrayBuffer()),
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render().asPng();

  res.setHeader('Content-Type', 'image/png');
  res.send(pngData);
}
