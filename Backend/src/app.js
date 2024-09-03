import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js"
import jobRouter from "./routes/job.routes.js"
import applicationRouter from "./routes/application.routes.js"

const app = express();
const corsOptions = {
    origin:process.env.CORS_ORIGIN,
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter)
export {app};