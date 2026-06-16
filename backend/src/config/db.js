const mongoose = require("mongoose");
const dns = require("dns");
const seedAdmin = require("../../seeds/admin.seed");

const getMongoUri = () => {
  const mongoUri = (process.env.MONGO_URI || "")
    .trim()
    .replace(/^MONGO_URI=/, "")
    .replace(/^["']|["']$/g, "");

  if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
    throw new Error('Invalid MONGO_URI. It must start with "mongodb://" or "mongodb+srv://".');
  }

  return mongoUri;
};

const connectDB = async () => {
  const dnsServers = (process.env.MONGO_DNS_SERVERS || "")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers.length > 0) {
    dns.setServers(dnsServers);
    console.log("MongoDB DNS resolvers configured:", dnsServers);
  }

  await mongoose.connect(getMongoUri(), {
    serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 15000),
  });
  await seedAdmin();
  console.log("MongoDB Connected");
};

module.exports = connectDB;
