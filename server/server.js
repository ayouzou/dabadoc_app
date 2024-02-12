const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./lib/Database')

require("dotenv").config();
const app = express();


const corsOptions = {
    origin: [
        "http://localhost:5174",
    ],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

const questionRouter = require("./routes/questionRoutes");
app.use("/api/question", questionRouter);





db.connectToDatabase()
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`the server running localhost:${PORT}`);
});