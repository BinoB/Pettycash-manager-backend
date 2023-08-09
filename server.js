const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require('path');

mongoose.set("strictQuery", true);

const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({}))
/* app.use(
  cors({
    origin: ["http://localhost:3000", "https://main--adorable-tanuki-92cddb.netlify.app"],
    credentials: true,
  })
);
 */
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

//Routes middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

//Error Middleware
app.use(errorHandler);

//Database connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
