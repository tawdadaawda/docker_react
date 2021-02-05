# as 以降はAWSに移行するとエラーになるので、消す
FROM node:alpine as builder
WORKDIR '/app'
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY  . .
RUN npm run build

FROM nginx
# AWSに移行後は--from=0とする
COPY --from=builder  /app/build /usr/share/nginx/html
