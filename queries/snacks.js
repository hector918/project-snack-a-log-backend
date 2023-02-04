const db = require("../db/dbConfig.js");

const getAllSnacks = async (id) => {
  let where = id ? `WHERE id = $[id]` : "";
  try {
    return await db.any(`SELECT * FROM snacks ${where} ORDER BY id ASC`, { id });
  } catch (error) {
    throw error;
  }
};

const deleteSnack = async ( id ) => {
  try {
    return await db.one(`DELETE FROM snacks WHERE id = $[id] RETURNING *`, { id });
  } catch (error) {
    throw error;
  }
}

const createSnack = async ( body ) =>{
  try {
    let table = Object.keys(body).join(",");
    let values = Object.keys(body).map(el=>`$[${el}]`).join(",");
    
    return await db.one(`INSERT INTO snacks (${table}) VALUES(${values}) RETURNING *`, body);
  } catch (error) {
    throw error;
  }
}

const updateSnack = async ( id, body ) =>{
  try {
    let table = [];
    
    for([key, val] of Object.entries(body)) table.push(`${key}=$[${key}]`);
    console.log(table)
    return await db.one(`UPDATE snacks SET ${table.join(',')} WHERE id = $[id] RETURNING *`, {...body, id});
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllSnacks, createSnack, updateSnack, deleteSnack };
