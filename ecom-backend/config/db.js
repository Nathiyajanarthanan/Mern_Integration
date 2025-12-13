const mongoose=require("mongoose")

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.DB_url);
        console.log("connected to database")
    }
    catch(error){
        console.error("error in connecting to database",error);
        process.exit(1);
    }
}
module.exports=connectdb;