import * as dotenv from "dotenv";
import "reflect-metadata"
import app from "./app";
import { AppDataSource } from "./database/data-source";

dotenv.config();
const PORT = process.env.APP_PORT || 3000;

AppDataSource.initialize().then(() => {
    console.log("database connection successsfull")
}).catch((err) => {
    console.error(err)
})
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
