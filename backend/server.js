const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./app");
const connectDB = require("./src/config/db");

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () =>
      console.log(`Server running on port ${port}`),
    );
  } catch (error) {
    console.error("Server startup failed:", {
      message: error.message,
      code: error.code,
      hostname: error.hostname,
    });

    if (error.code === "ECONNREFUSED" && String(error.hostname || "").includes("_mongodb._tcp")) {
      console.error(
        "MongoDB SRV DNS lookup failed. Try setting MONGO_DNS_SERVERS=8.8.8.8,1.1.1.1 or use a non-SRV mongodb:// connection string from MongoDB Atlas.",
      );
    }

    process.exit(1);
  }
};

startServer();
 
