import mongoose from "mongoose";
import { MONGODB_URI } from "./env.config.js";

 const connectdb=()=>{
    try{
        
        mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Database connected successfully");
    }catch(err){
      console.log("db config",err.message);
      next(err);
    }
}
export default connectdb;