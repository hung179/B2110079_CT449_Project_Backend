const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    dbUsers: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/User"
    },
    dbBooks: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/Book"
    },
    dbBorrowList: {
        uri: process.env.MONGODB_URI|| "mongodb://localhost:27017/BorrowList"
    }
};

module.exports = config;