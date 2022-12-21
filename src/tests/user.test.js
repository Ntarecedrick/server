import supertest from "supertest";

import  express  from "express";

const app= express();
app.use(express.json())
app.use("/api",router);
app.use('/user', authRoutes);