import * as htmlparser2 from "htmlparser2";
import fetch from "node-fetch";
import * as domutils from "domutils";

import { APIGatewayEvent, Handler, Context, APIGatewayProxyResult } from "aws-lambda";

const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const uuid = event.pathParameters.uuid;

  const data = await fetch("https://www.volebnikalkulacka.cz");
  const dom = htmlparser2.parseDocument(await data.text());

  const metaInDocument = domutils.getElementsByTagName("meta", dom);

  metaInDocument.forEach((child) => {
    if (domutils.hasAttrib(child, "property") && domutils.getAttributeValue(child, "property") === "og:image") {
      domutils.replaceElement(
        child,
        htmlparser2.parseDocument(
          `<meta property="og:image" content="https://www.volebnikalkulacka.cz/image/${uuid}" />`
        )
      );
    }
    if (
      domutils.hasAttrib(child, "property") &&
      domutils.getAttributeValue(child, "property") === "og:image:secure_url"
    ) {
      domutils.replaceElement(
        child,
        htmlparser2.parseDocument(
          `<meta property="og:image" content="https://www.volebnikalkulacka.cz/image/${uuid}" />`
        )
      );
    }
  });

  const result = domutils.getOuterHTML(dom);

  return {
    statusCode: 200,
    headers: {
      "content-type": "text/html",
    },
    body: result,
  };
};

export { handler };
