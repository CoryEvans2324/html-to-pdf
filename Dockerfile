FROM node:16.13-alpine3.14

ENV CHROME_BIN /usr/bin/chromium-browser
RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache \
	udev \
	ttf-freefont \
	chromium

ADD package.json /package.json
ADD yarn.lock /yarn.lock

RUN yarn

ADD . .

ENTRYPOINT [ "yarn", "start" ]