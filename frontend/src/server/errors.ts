import type { VercelResponse } from '@vercel/node';
import { Prisma } from '@prisma/client';

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

export const respond400 = (res: VercelResponse, message: string) => {
  return errorRespond(
    res,
    400,
    'https://volebnikalkulacka.cz/api/errors/bad-request',
    'Bad request',
    message
  );
};

export const respond401 = (res: VercelResponse, message = '') => {
  return errorRespond(
    res,
    401,
    'https://volebnikalkulacka.cz/api/errors/unauthorized',
    'Unauthorized',
    message
  );
};

export const prismaErrorHandler = (res: VercelResponse) => {
  return (
    err:
      | Prisma.PrismaClientValidationError
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientRustPanicError
  ) => {
    if (err instanceof Prisma.PrismaClientValidationError) {
      errorRespond(
        res,
        400,
        'https://volebnikalkulacka.cz/api/errors/prisma-validation-error',
        'Prisma validation error',
        err.message
      );
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      errorRespond(
        res,
        400,
        'https://volebnikalkulacka.cz/api/errors/prisma-known-request-error',
        `Prisma request error ${err.code}`,
        `${err.message} ${JSON.stringify(err.meta)}`
      );
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      errorRespond(
        res,
        400,
        'https://volebnikalkulacka.cz/api/errors/prisma-unknown-request-error',
        'Prisma unknown request error',
        err.message
      );
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
      errorRespond(
        res,
        500,
        'https://volebnikalkulacka.cz/api/errors/prisma-initialization-error',
        `Prisma initialization error ${err.errorCode}}`,
        err.message
      );
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
      errorRespond(
        res,
        500,
        'https://volebnikalkulacka.cz/api/errors/prisma-rust-panic-error',
        'Prisma Rust panic error'
      );
    } else {
      errorRespond(
        res,
        500,
        'https://volebnikalkulacka.cz/api/errors/prisma-unknown-error',
        'Prisma unknown error'
      );
    }
  };
};
