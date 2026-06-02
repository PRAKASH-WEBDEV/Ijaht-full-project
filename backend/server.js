const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { validateEnv } = require("./src/config/env");
const app = require("./app");
const connectDB = require("./src/config/db");

validateEnv();
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (error) {
    console.error("Server startup failed:", {
      message: error.message,
      name: error.name,
    });
    process.exit(1);
  }
};

startServer();
