import type { VercelResponse } from '@vercel/node';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

type VResponse = VercelResponse | Response;

export const errorRespondBody = (
  status: number,
  type: string,
  title: string,
  detail?: string
) => {
  return {
    type: type,
    status: status,
    title: title,
    detail: detail,
  };
};

export const errorRespond = (
  res: VResponse,
  status: number,
  type: string,
  title: string,
  detail?: string
) => {
  res.setHeader('Content-Type', 'application/problem+json');
  const body = errorRespondBody(status, type, title, detail);
  return res.status(status).json(body);
};

export const respond404 = (res: VResponse, subject: string, id = '') => {
  return errorRespond(
    res,
    404,
    'https://volebnikalkulacka.cz/api/errors/result-not-found',
    `${subject} not found`,
    `${subject} - ${id} not found.`
  );
};

export const respond405 = (res: VResponse, method = 'none') => {
  return errorRespond(
    res,
    405,
    'https://volebnikalkulacka.cz/api/errors/method-not-allowed',
    `Method not allowed`,
    `The HTTP ${method} method is not supported at this route.`
  );
};

export const respond400 = (res: VResponse, message: string) => {
  return errorRespond(
    res,
    400,
    'https://volebnikalkulacka.cz/api/errors/bad-request',
    'Bad request',
    message
  );
};

export const respond401 = (res: VResponse, message = '') => {
  return errorRespond(
    res,
    401,
    'https://volebnikalkulacka.cz/api/errors/unauthorized',
    'Unauthorized',
    message
  );
};

export const respond500 = (res: VResponse, message = '') => {
  return errorRespond(
    res,
    500,
    'https://volebnikalkulacka.cz/api/errors/internal-server-error',
    'Internal server error',
    message
  );
};

export const prismaErrorHandler = (res: VResponse) => {
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
