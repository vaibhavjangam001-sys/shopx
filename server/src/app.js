import express from "express";

const app = express();


app.get("/" , (req,res) => {
   res.send("Welcome to e-commerce web")
})

export default app;