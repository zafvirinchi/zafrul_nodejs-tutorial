const mongoose = require('mongoose');

const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

    }catch(error){
        console.log("Error while connecting mongo db",error);
        process.exit(1);
    }
}

module.exports = connectToDB;