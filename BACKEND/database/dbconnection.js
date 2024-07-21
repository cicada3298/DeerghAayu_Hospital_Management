import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "DEERGHAAYU_HOSPITAL_MANAGEMENT_SYSTEM",
    }).then(()=>{
        console.log("Connected to database!");
    }).catch(err=>{
        console.log(`Some error occurred: ${err}`);
    })
}