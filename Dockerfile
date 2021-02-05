# as 以降はAWSに移行するとエラーになるので、消す
FROM node:alpine
WORKDIR '/app'
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY  ./ ./
RUN npm run build

FROM nginx
EXPOSE 80
# AWSに移行後は--from=0とする
COPY --from=0  /app/build /usr/share/nginx/html
