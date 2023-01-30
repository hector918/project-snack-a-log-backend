const express = require("express");
const snacks = express.Router();
const queries = require("../queries/snacks");
const vd = require('../vaildations/snack-vaildation');
///////////////////////////////////////////////////
//get all
snacks.get("/", async (req, res)=>{
  try {
    res.json(queries.getAllSnacks());
  } catch (error) {
    console.log(error);    
  }
});
//get one
snacks.get("/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    res.json(await queries.getAllSnacks( id ));
  } catch ( error ) {
    console.log(error);    
  }
});
//create
snacks.post("/", vd.checkSnackForm, async (req, res)=>{
  try {
    res.send("recv")
  } catch (error) {
    console.log(error,"in post error")
    res.status(500).json({error});
  }
});
//update
snacks.put("/", async (req, res)=>{

});
//delete
snacks.delete("/", async (req, res)=>{

});

module.exports = snacks;