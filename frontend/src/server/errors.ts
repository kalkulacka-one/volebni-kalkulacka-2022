import type { VercelResponse } from '@vercel/node';

export const errorRespond = (
  res: VercelResponse,
  status: number,
  type: string,
  title: string,
  detail?: string
) => {
  res.setHeader('Content-Type', 'application/problem+json');
  return res.status(status).json({
    type: type,
    status: status,
    title: title,
    detail: detail,
  });
};

export const respond404 = (
  res: VercelResponse,
  subject: string,
  id: string
) => {
  return errorRespond(
    res,
    404,
    'https://volebnikalkulacka.cz/api/errors/result-not-found',
    `${subject} not found`,
    `${subject} ${id} not found.`
  );
};

export const respond405 = (res: VercelResponse, method = 'none') => {
  return errorRespond(
    res,
    405,
    'https://volebnikalkulacka.cz/api/errors/method-not-allowed',
    `Method not allowed`,
    `The HTTP ${method} method is not supported at this route.`
  );
};
