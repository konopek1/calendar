FROM ubuntu:18.04
COPY package.json /app/
COPY build.sh /app/
COPY build.sql /app/
COPY ormconfig.ts /app/
COPY tsconfig.json /app/
COPY src /app/
WORKDIR /app
RUN  apt-get update -y
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_11.x |  bash -
RUN apt install -y nodejs
RUN apt-get install -y mysql-server 
RUN chmod +x build.sh
RUN service mysql start && mysql -u root < build.sql
RUN npm cache clean --force
RUN npm install --quiet --no-bin-links  && npm cache clean --force
RUN npm rebuild bcrypt --update-binary 
RUN service mysql stop
RUN service mysql start