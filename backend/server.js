import app from '../backend/src/app.js';
import connectDB from '../backend/src/config/db.js';

connectDB()
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is strat on Port ${PORT}`)
})