const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://blueTwoAdmin:iwUOR5LEALzygaQi@nvd-proto-shard-00-00-vvnb4.mongodb.net:27017,nvd-proto-shard-00-01-vvnb4.mongodb.net:27017,nvd-proto-shard-00-02-vvnb4.mongodb.net:27017/test?ssl=true&replicaSet=NVD-proto-shard-0&authSource=admin&retryWrites=true',
  port: process.env.PORT || 8000,
};

export default config;
