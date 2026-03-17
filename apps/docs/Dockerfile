FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build -w @miterlab/docs

FROM nginx:1.27-alpine

COPY apps/docs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/docs/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
