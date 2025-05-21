import threeDSRouter from "./controllers/threeDS";
import properties from "./utils/properties";
import path from "path";
import express from "express";
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const time_in_ms = 24 * 60 * 60 * 1000;

const corsOptions = {
  origin: properties.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(threeDSRouter);


app.listen(properties.PORT, () => {
  console.log(`Server is running on http://localhost:${properties.PORT}`);
})

export default app