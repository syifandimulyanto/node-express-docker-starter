FROM node:11

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN npm install pm2 -g
RUN npm install babel-cli -g
RUN apt-get update && apt-get install -y \
  vim \
  nano

# Use Cache Please
ADD package.json /var/www
RUN npm install

# Add application files
ADD . /var/www

# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the port

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]