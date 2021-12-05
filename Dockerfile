FROM node:16.13-alpine3.14

ENV CHROME_BIN /usr/bin/chromium-browser
RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache \
	udev \
	ttf-freefont \
	chromium

WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock
ADD tsconfig.json tsconfig.json

RUN yarn

ADD src src/

RUN yarn build

ENTRYPOINT [ "yarn", "start" ]