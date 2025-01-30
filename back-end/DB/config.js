const mongoose = require("mongoose");

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();
