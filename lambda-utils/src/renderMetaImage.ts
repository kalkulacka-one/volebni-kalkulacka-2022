export const handler = async (event: any) => {
  try {
    const chromium = await require('@sparticuz/chrome-aws-lambda');
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        .container {
          position: relative;
          width: 1200px;
          height: 627px;
        }
        .message {
          display: flex;
          align-items: center;
          justify-content: center;
  
          text-align: center;
          word-wrap: break-word;
  
          position: absolute;
          left: 120px;
          top: 245px;
          width: 300px;
          height: 220px;
          font-size: 23px;
          font-weight: 400;
        }
</style>
    </head>
    <body>
    <div class="container" id="screenshot">
      <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1243.81 -99.5361C1308.94 -81.2063 1402.27 -78.8024 1423.52 -14.4571C1445.97 53.4991 1362.07 110.464 1335.15 176.943C1317.49 220.566 1315.27 267.274 1292.72 308.591C1266.45 356.74 1245.89 418.879 1193.85 435.914C1141.77 452.965 1094.03 393.528 1039.34 391.543C963.069 388.775 873.463 473.49 816.98 422.238C762.413 372.724 833.963 279.601 834.545 205.711C834.98 150.386 813.704 98.7947 819.961 43.8037C827.98 -26.6752 814.473 -121.601 875.83 -157.146C939.133 -193.818 1012.89 -121.016 1084.99 -109.728C1138.47 -101.356 1191.71 -114.196 1243.81 -99.5361Z" fill="#EAF7FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M483.197 295.612C537.272 359.394 472.995 462.18 501.312 540.891C523.847 603.529 618.638 625.597 625.733 691.805C632.791 757.661 590.694 827.271 536.01 864.663C483.661 900.459 409.086 856.197 350.362 880.101C286.022 906.291 258.344 997.759 189.364 1005.77C118.767 1013.96 40.8884 978.008 -1.4365 920.934C-43.1864 864.637 -6.82198 783.818 -25.375 716.199C-46.3039 639.921 -133.61 579.497 -116.307 502.275C-99.313 426.432 -8.10709 396.175 56.1324 352.441C118.96 309.668 179.227 259.83 254.529 249.809C333.205 239.34 431.886 235.091 483.197 295.612Z" fill="#FFF4F5"/>
<g filter="url(#filter0_b_101_507)">
<rect x="-54.2627" y="-526.659" width="1280" height="1597" fill="white" fill-opacity="0.05"/>
</g>
<defs>
<filter id="filter0_b_101_507" x="-126.263" y="-598.659" width="1424" height="1741" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImage" stdDeviation="36"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_101_507"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_101_507" result="shape"/>
</filter>
</defs>
</svg>
<div class="message">Test message</div>
</div>
    </body>
  </html>`;

    try {
      await page.goto('about:blank');
      await page.setContent(html);

      const element = await page.$('#screenshot');
      if (!element) throw new Error('Element #screenshot not found.');

      const screenshotBase64 = await element.screenshot({ encoding: 'base64' });
      console.info(screenshotBase64)

      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'image/png',
            'Content-Length': screenshotBase64.length,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credential': true,
          },
          body: screenshotBase64,
          isBase64Encoded: true,
        });
      });
    } catch (err) {
      console.log(err);
      return new Promise((resolve) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: err.message }),
        });
      });
    } finally {
      await page.close();
      await browser.close();
    }
  } catch (err) {
    console.log(err);
    return new Promise((resolve) => {
      resolve({
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'Image not found.',
      });
    });
  }
};
