require("dotenv").config({ path: ".env" });

const dns = require("dns");
const dnsPromises = dns.promises;

const dnsServers = (process.env.MONGO_DNS_SERVERS || "")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
  console.log("Using DNS resolvers:", dnsServers);
}

dnsPromises.resolveSrv("_mongodb._tcp.ijhat.k1n51kq.mongodb.net")
  .then((records) => {
    console.log("SUCCESS");
    console.log(records);
  })
  .catch((err) => {
    console.error("FAILED");
    console.error(err);
  });
