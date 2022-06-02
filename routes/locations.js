var express = require("express"); 
const { getAllLocation } = require("../controller/locationController");

const locationModel = require("../db/models/locationModel");
var router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   // res.status(200).json({
//   //   message:'suggess'
//   // })
//   res.send({ message: "success location", status: 200 });
//   // res.send("respond with a resource");
// });
router.route("/").get(getAllLocation);


router.post("/create", async function (req, res, next) {
  console.log("req123456", req.body);
  const product = await locationModel.create(req.body);
  console.log("product", product);
  res.send({ message: "success", status: 200 });
  // createProduct();
  // res.send(getProducts()); 
});

module.exports = router;
