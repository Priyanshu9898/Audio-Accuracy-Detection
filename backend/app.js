import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import transcribeRoute from "./router/transcribeRouter.js";

//config configuration
dotenv.config({ path: "./config/config.env" });


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://audioaccuracy.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));

// Routers
app.use("/api/v1", transcribeRoute);

const port = process.env.PORT || 8000;

app.get("/", function (req, res) {
    res.send("<h1>Hello</h1>")
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});