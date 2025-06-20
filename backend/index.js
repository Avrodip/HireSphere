import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes.js/user.route.js";
import companyRoute from "./routes.js/company.routes.js";
import jobRoute from "./routes.js/job.routes.js";
import applicationRoute from "./routes.js/application.routes.js"
dotenv.config({});
const app = express();

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"From Backend",
//         success:true
//     })
// }); 

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute)
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})