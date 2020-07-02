FROM nginx:latest
COPY index.html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY upload.conf /etc/nginx/sites-available/upload.conf
RUN mkdir -p /etc/nginx/sites-enabled && ln -s /etc/nginx/sites-available/upload.conf /etc/nginx/sites-enabled/upload.conf
