import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./Route/userRoute.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import adminRouter from "./Route/adminRoute.js";


const app = express();
const Port = process.env.PORT;
const db = process.env.DB_URL;

try {
  await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  
  origin: ['https://e-frontend-three.vercel.app/login'] ,// frontend's URL
  methods:["GET","POST","PUT",'DELETE'],
  credentials: true,
}));
app.get('/', (req, res) => {
  res.send("GET Request Called")
})
// Route for user signup
app.use('/signup', router);
app.use('/login',router);
app.use('/logout',router)
// admin Route middleware
app.use('/user',adminRouter)
//Delete user
app.use('/delte',adminRouter)
// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
