import express from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/index.js"
import routes from "./routes/index.js";

// Create express app :-
const app = express();

// Global middlewares :-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routers registration :-
app.use("/api", routes);


// Error middleware 
app.use(errorMiddleware);

export default app;
