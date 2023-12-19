import mongoose from "mongoose";


const MONGODB_URI =
  process.env.PROD_MONGODB || "mongodb://127.0.0.1:27017/dion";
  

// This is for Model.findByIdAndUpdate method, specifically so that {new: true} is the default
mongoose.set("returnOriginal", false);

mongoose
  .connect(MONGODB_URI)
  .catch((error) =>
    console.log("Error connecting to MongoDB: ", error.message)
  );

mongoose.connection.on("disconnected", () =>
  console.log("Disconnected from MongoDB!")
);

mongoose.connection.on("error", (error) =>
  console.error(`MongoDB connection error: ${error}`)
);

export default mongoose.connection;