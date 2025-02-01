import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import hpp from "hpp";
import routes from "./routes/api.js";
import {MONGODB_CONNECTION,JWT_SECRET,JWT_EXPIRATION_TIME,MAX_JSON_SIZE,URL_ENCODED,REQUEST_TIME_LIMIT,REQUEST_LIMIT_NUMBER,WEB_CACHE,PORT} from "./app/config/config.js"
import fileUpload from "express-fileupload";



const app = express();
app.use(cors());
app.use(express.json(MAX_JSON_SIZE));
app.use(express.urlencoded({extended:URL_ENCODED}))
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
}))

//Rate Limit

const limiter = rateLimit({REQUEST_TIME_LIMIT,REQUEST_LIMIT_NUMBER});
app.use(limiter);


//Web Caching
app.set('etag', WEB_CACHE)

//MongoDB Connection


const connectDB = async () =>{
    try{
        await mongoose.connect(MONGODB_CONNECTION,{autoIndex: true});
        console.log("MongoDB Connected");
    }catch(e){
        console.error("❌ MongoDB Connection Error:", e.message);
        process.exit(1);
    }
};
connectDB();

//Set API routes

app.use("/api",routes);

//Run my project

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})




