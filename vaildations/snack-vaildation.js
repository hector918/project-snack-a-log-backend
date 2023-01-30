
function cap_work(words){
  return words.split(" ").map(word=>word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase()).join(" ");
}
const checkSnackForm = (req,res,next)=>{
  let ret = [];
  let {name, fiber, protein, added_sugar, image } = req.body;
  name = name.trim();
  if(name==="") ret.push("name is required.");
  // if(fiber) console.log(cap_work(name));
  
  if(ret.length>0) throw ret;
  next();

}

module.exports = { checkSnackForm };