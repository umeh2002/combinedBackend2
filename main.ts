import cors from "cors"
import express, { Application } from "express"
import task from "./Router/taskRouter"
import auth from "./Router/authRouter"

const main =(app:Application)=>{
    app.use(express.json())
    app.use(cors())

    app.use("/api/v1/task", task)
    app.use("/api/v1/auth", auth)
}

export default main