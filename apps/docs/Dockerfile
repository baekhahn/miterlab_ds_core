FROM nginx:1.27-alpine

COPY apps/docs/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/docs/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
