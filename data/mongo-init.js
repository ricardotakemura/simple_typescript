db.createCollection("users");
db.users.createIndex({ "id": 1 }, { unique: true });