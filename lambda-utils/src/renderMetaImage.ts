import { DynamoDB } from "aws-sdk";

import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import {Result} from "./utils/dynamoDB";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const uuid = event.pathParameters.uuid

    const shareData = await new DynamoDB.DocumentClient().get({
        TableName: "Results",
        Key: { result_id: uuid },
      }).promise();

    const result = shareData.Item.result as Result
    const topMatch = result.matches[0]

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
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Komunální a senátní volby 2022</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter&family=Radio+Canada:wght@700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Radio Canada", sans-serif;
        width: 1200px;
        height: 630px;       
      }
      body.senate .muni,
      body.muni .senate {
        display: none;
      }
      .template {
        width: 1200px;
        height: 630px;
        background: url(https://i.imgur.com/eJe7y37.png);
        background-size: cover;
        position: relative;
      }
      h1 {
        position: absolute;
        top: 204px;
        left: 254px;
        z-index: 1000;
      }
      /* Main Box */
      .candidate {
        position: absolute;
        top: 276px;
        left: 248px;
        width: 704px;
        height: 120px;
      }
      .candidate * {
        position: absolute;
      }
      .avatar {
        width: 82px;
        height: 82px;
        border-radius: 82px;
        top: 18px;
        left: 18px;
      }
      .position {
        box-sizing: border-box;
        top: 10px;
        left: 10px;
        width: 41px;
        height: 41px;
        border-radius: 41px;
        background-color: #0070f4;
        color: white;
        font-family: Inter;
        font-weight: bold;
        font-size: 22px;
        text-align: center;
        padding-top: 7px;
        padding-left: 3px;
      }
      .name,
      .party {
        left: 128px;
        width: 400px;
      }
      .name {
        top: 20px;
        font-size: 23px;
      }
      .party {
        top: 60px;
        font-family: Inter;
        font-size: 18px;
        color: gray;
      }
      .percentage {
        font-size: 36px;
        right: 18px;
        top: 32px;
      }
      /* Footer */
      .footer {
        position: absolute;
        top: 508px;
        left: 64px;
        font-family: Inter;
        font-size: 20px;
        line-height: 1.5em;
      }
      .footer .where {
        color: gray;
      }
    </style>
  </head>
  <body class="senate" id="screenshot">
    <h1 class="senate">Největší shodu mám s kandidátem</h1>
    <h1 class="muni">Největší shodu mám se stranou</h1>
    <div class="template">
      <div class="candidate">
        <img src="${topMatch.candidate.logo}" class="avatar" />
        <div class="position">1.</div>
        <div class="name">${topMatch.candidate.name}</div>
        <div class="party">${topMatch.candidate.short_name}</div>
        <div class="percentage">${topMatch.score}%</div>
      </div>
    </div>
    <div class="footer">
      Volby <span class="senate">Senát</span
      ><span class="muni">Komunál</span> 2022
      <span class="where">${result.calculator.election.name}</span><br />
      23.—24. 9. 2022
    </div>
  </body>
</html>`;

    try {
      await page.goto('about:blank');
      await page.setContent(html);

      const element = await page.$('#screenshot');
      if (!element) throw new Error('Element #screenshot not found.');

      const screenshotBase64 = await element.screenshot({ encoding: 'base64' });

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
