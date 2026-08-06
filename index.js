const express = require("express")
const app = express();
require("dotenv").config();
app.use(express.json());

const movies = [

  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },

  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },

  { id: 3, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 }

];
const items = [

  { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8},

 { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 },

 { id: 3, itemName: 'Plate', color: 'Off-White', quantity: 6 }

];

app.get('/',(req, res)=>{
    res.send(
        "Hello, Express server."
    )
})

app.get('/movies',(req, res)=>{
    res.send(
        movies
    )
})
app.get('/items',(req, res)=>{
    res.send(
        items
    )
})
app.post('/movies',(req,res)=>{
    const newMovie = req.body;
    if(!newMovie.title || !newMovie.director || !newMovie.year){
         res.status(400).json({error:"Title, director and year are required field.."})
    }else{
        movies.push(newMovie);
        res.status(201).json({message:"Movie added succesfully....", movies:newMovie})
    }
})

app.delete('/movies/:id', (req,res)=>{
    const movieId = req.params.id;
    const index = movies.findIndex(m=>m.id==movieId);

    if(index==-1){
        res.status(404).json({error: 'Movies not found!!'})
    }else{
        const movieTitle = movies[index].title;
        movies.splice(index,1);
        res.status(200).json({message: `Movie '${movieTitle}' deleted succesfully..`})
    }
})

app.delete('/items/:id', (req,res)=>{
    const itemId = req.params.id;
    const index = items.findIndex(m=>m.id==itemId);

    if(index==-1){
        res.status(404).json({error: 'Items not found!!'})
    }else{
        const itemTitle = items[index].itemName;
        items.splice(index,1);
        res.status(200).json({message: `Item '${itemTitle}' deleted succesfully..`})
    }
})

app.post('/items',(req,res)=>{
    const newItem = req.body;
    if(!newItem.itemName || !newItem.color || !newItem.quantity){
         res.status(400).json({error:"Item name, color and quantity are required field.."})
    }else{
        items.push(newItem);
        res.status(201).json({message:"Item added succesfully....", items:newItem})
    }
})

app.post('/movies/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const updatedMovies = req.body;

    const movieToUpdate = movies.find(a=>a.id==id);

    if(!movieToUpdate){
        res.status(404).json({error:"Movie not found!!"})
    }else{
        if(!updatedMovies.title || !updatedMovies.director || !updatedMovies.year){
            res.status(400).json({error:"Title, director and year are required field.."})
        }else{
            Object.assign(movieToUpdate,updatedMovies);
            res.status(200).json({message:"Succesfull updation!!",movies:updatedMovies})
        }
    }
})

app.post('/items/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const updatedItem = req.body;

    const itemToUpdate = items.find(a=>a.id==id);

    if(!itemToUpdate){
        res.status(404).json({error:"Items not found!!"})
    }else{
        if(!updatedItem.itemName || !updatedItem.color || !updatedItem.quantity){
            res.status(400).json({error:"Fill all required field.."})
        }else{
            Object.assign(itemToUpdate,updatedItem);
            res.status(200).json({message:"Succesfull updation!!",items:updatedItem})
        }
    }
})
const PORT = process.env.PORT || 5000;  

app.listen(PORT, ()=>{
    console.log("Server running succesfully for this....");
}) 