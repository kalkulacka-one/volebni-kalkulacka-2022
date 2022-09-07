FROM node:16-alpine AS build
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY ./src ./src
COPY tsconfig.json ./

RUN yarn build

# Install production node_modules
WORKDIR /usr/src/app/dist
COPY package.json yarn.lock ./
RUN yarn install --production --pure-lockfile


FROM public.ecr.aws/lambda/nodejs:16

COPY --from=build /usr/src/app/dist ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "injectMetadata.handler" ]