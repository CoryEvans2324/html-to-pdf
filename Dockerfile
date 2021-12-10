FROM node:16.13-alpine3.14 as deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16.13-alpine3.14 as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build && yarn install --production --ingore-scripts --prefer-offline

FROM node:16.13-alpine3.14 as runner

ENV CHROME_BIN /usr/bin/chromium-browser
RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache \
	udev \
	ttf-freefont \
	chromium

WORKDIR /app

RUN addgroup -g 1001 -S abc
RUN adduser -S abc -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/build ./build
EXPOSE 80

ENTRYPOINT [ "yarn", "start" ]