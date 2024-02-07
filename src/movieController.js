const express = require ("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res)=> {
   //fs.appendFileSync("test.txt", "hello");
   let text = fs.readFileSync("test.text", "utf8")
   console.log(text)
   res.send(text.toString)
} )

module.exports = router;