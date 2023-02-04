const checkSnackForm = (req, res, next)=>{
  let ret = [];
  let {name, fiber, protein, added_sugar, image } = req.body;
  try {
    name = name?.trim();
    if(name===undefined || name==="") ret.push("name is required.");
    if(isNaN(Number(fiber))) ret.push("fiber is required as number");
    if(isNaN(Number(protein))) ret.push("protein is required as number");
    if(isNaN(Number(added_sugar))) ret.push("added_sugar is required as number");
    
    if(image!==""){
      let url_reg = new RegExp (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
      if (!url_reg.test(image)) ret.push("image must be an URL or empty");
    }
  } catch (error) {
    console.log(error);
  }
  if(ret.length>0) throw ret;
  next();
}
module.exports = { checkSnackForm };