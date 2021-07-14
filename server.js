import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

//App config
const app = express();
const port = process.env.PORT || 8001
const connection_URL = "mongodb+srv://lakshan99:2699lak10@cluster0.udlme.mongodb.net/tinderdb?retryWrites=true&w=majority"

//Middle-wares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//API Endpoints
app.get("/",(req,res)=> res.status(200).send("Hello"));
app.post("/tinder/cards", (req,res)=>{
    const dbCard = req.body;

    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

app.get("/tinder/cards", (req,res)=>{
    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port,()=>console.log(`Listening on localhost: ${port}`));