import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectDb from "./Config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//config env
dotenv.config();

//database config
ConnectDb();

const app = express();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(
{ origin:process.env.CORS_ORIGIN ,
  credentials:true
}
));
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 3001;

app.get("/", (req, resp) => {
  resp.send("Welcome to TalenIq");
});

app.listen(port, () => {
  console.log(`Server running on ${process.env.Dev} mode on port ${port}`);
});
