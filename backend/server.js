// with es 2015 to bring in files you need to include extension.
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import colors from "colors";
// morgan is logger so when someone hits a route  in backend we can actually see http verb, status code etc.
// run in dev mode.
import morgan from "morgan";
import { config, getBackendPort } from "../config.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirnameBackend = path.dirname(__filename);

// Use configuration from config.js which already loads the .env file
const mongoURI = config.database.uri;
console.log('MONGO_URI loaded:', mongoURI ? 'Yes ✅' : 'No ❌');
console.log('Using MongoDB:', mongoURI.substring(0, 50) + '...');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
    return true;
  } catch (e) {
    console.error(`MongoDB Connection Error: ${e.message}`.red.underline.bold);
    console.log('Please make sure MongoDB is running on localhost:27017'.yellow);
    console.log('You can install MongoDB locally or use MongoDB Atlas'.yellow);
    console.log('For local MongoDB: https://docs.mongodb.com/manual/installation/'.yellow);
    console.log('For MongoDB Atlas: https://www.mongodb.com/cloud/atlas'.yellow);
    console.log('Server will start without database connection...'.yellow);
    return false;
  }
};

// Try to connect to database but don't exit if it fails
connectDB().then((connected) => {
  if (!connected) {
    console.log('⚠️  Running in offline mode - database features will not work'.yellow);
  }
});

const app = express();

if (config.env === "development") {
  app.use(morgan("dev"));
}

// this will allow to accept json data in the body.
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(config.paypal.clientId)
);

// uploads folder not accessible. so have to go to uploads  folder  and make it static in express
// __dirname only available in common js not es modules. to solve.
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Serve images from frontend public directory
app.use("/images", express.static(path.join(__dirname, "/frontend/public/images")));

const PORT = getBackendPort();

// Root route for both development and production
app.get("/", (req, res) => {
  res.send("API is running....");
});

// for production. set frontend build folder as static folder.
if (config.env === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any other route will point to index.html.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${config.env} mode on port ${PORT}`.yellow.bold
  )
);
