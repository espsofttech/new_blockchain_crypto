# FROM node:8.13

# WORKDIR /app
# COPY * ./

# # RUN npm i -g node-gyp
# # RUN apt-get update
# # RUN apt-get -y install git
# # RUN apt-get -y install python2.7
# # RUN ln -s /usr/bin/python2.7 /usr/bin/python
# # RUN apt-get -y install build-essential checkinstall
# # RUN npm install -g node-gyp
# # RUN apt-get -y install libtool pkg-config build-essential autoconf automake
# RUN npm install zmq

# RUN npm install --unsafe-perm  --quiet

# CMD ["npm", "start"]

FROM node:8.13

WORKDIR /app
COPY * ./
COPY ./patch/ ./patch

RUN npm i -g node-gyp
RUN apt-get update
RUN apt-get -y install git
RUN apt-get -y install python2.7

RUN apt-get -y install build-essential checkinstall
RUN npm install -g node-gyp
RUN apt-get -y install libzmq3-dev
RUN npm install zmq 
RUN apt-get -y install libtool pkg-config build-essential autoconf automake
RUN npm install --unsafe-perm  --quiet

CMD ["npm", "start"]
