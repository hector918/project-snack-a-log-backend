const express = require("express");
const snacks = express.Router();
const queries = require("../queries/snacks");
const vd = require('../vaildations/snack-vaildation');
///////////////////////////////////////////////////
//get all
snacks.get("/", async (req, res)=>{
  try {
    res.json(await queries.getAllSnacks());
  } catch (error) {
    console.log(error);    
  }
});
//get one
snacks.get("/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    let ret = await queries.getAllSnacks( id );
    if(ret.length===0) res.status(404).json({error:"id not found"});
    else res.json(ret[0]);
    
  } catch ( error ) {
    console.log(error);    
  }
});
//create
snacks.post("/", vd.checkSnackForm, async (req, res)=>{
  try {
    res.send(await queries.createSnack(process_snack_(req.body)));
  } catch (error) {
    console.log(error,"in post error");
    res.status(500).json({error});
  }
});
//update
snacks.put("/:id", vd.checkSnackForm, async (req, res)=>{
  try {
    const { id } = req.params;
    res.send(await queries.updateSnack(id, process_snack_(req.body)));
  } catch (error) {
    console.log(error,"in update error");
    res.status(500).json({error:"update failed"});
  }
});
//delete
snacks.delete("/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    res.json(await queries.deleteSnack( id ));
  } catch (error) {
    console.log(error,"in delete error");
    res.status(500).json({error:"delete failed"});
  }
});
///////////////////////////////////////////////
function process_snack_(body){
  let {name, fiber, protein, added_sugar, is_organic, image } = body;
  name = cap_work( name );
  let is_healthy = check_healthy_criteria(fiber, protein, added_sugar);
  let ret = { name, fiber, protein, added_sugar, is_organic, is_healthy };
  is_organic = Boolean(is_organic)? true : false;
  if(image !== "") ret.image = image;
  return ret;
  function cap_work(words){
    return words.split(" ").map(word=>word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase()).join(" ");
  }
  function check_healthy_criteria(fiber, protein, added_sugar){
    let ret = [];
    if(Number(added_sugar) > 5) ret.push(false);
    if(protein < 5 && fiber < 5) ret.push(false);
  
    return ret.length === 0;
  }
}

module.exports = snacks;