import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./router/userRouter";
import { consultationRouter } from "./router/consultationRouter";
import { patientRouter } from "./router/patientRecordRouter";
import { locationRouter } from "./router/locationRouter";


// dotenv
dotenv.config();

// express
const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRouter);
app.use("/consultation", consultationRouter);
app.use("/patient-record", patientRouter);
app.use("/location", locationRouter);


app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  })