import * as htmlparser2 from "htmlparser2"
import fetch from "node-fetch"
import * as domutils from "domutils"

const handler = async (event: any, context: any) => {
  const headTags = `
<head>
    <meta content="text/html; charset=UTF-8" name="Content-Type" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:type" content="website">
    <meta property="og:url" content="">
    <meta property="og:site_name" content="">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="">
    <meta property="og:image:type " content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="627">
    <meta name="twitter:card" content="">
    <meta name="twitter:title" content="">
    <meta name="twitter:description" content="" />
    <meta name="twitter:image" content="">
    <meta name="twitter:image:alt" content="">
</head>
`

  const data = await fetch('https://kalkulacka.ceskodigital.net')
  const dom = htmlparser2.parseDocument(await data.text());

  const meta = domutils.getElementsByTagName("meta", htmlparser2.parseDocument(headTags));
  const head = domutils.getElementsByTagName("head", dom)[0];

  meta.forEach((child) => {
    domutils.appendChild(head, child);
  });

  const result = domutils.getOuterHTML(dom)

  return {
    statusCode: 200,
    headers: {
      "content-type": "text/html",
    },
    body: result,
  };
};

export {handler};


