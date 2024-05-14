const userRouter = require('./routes/user.routes');
const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose')
const cors = require("cors");
const ProductRouter = require('./routes/product.routes')
const ImageRouter = require('./routes/image.routes')
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017/react-starter-test";
mongoose.connect(uri).then(
  () => {
  console.log("Connection is Successful");
  },
  (err) => {
  console.error("Connection to mongodb is error", err?.message);
  }
);
app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
app.use("/api/image", ImageRouter);
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
})


