const db = require("../db/dbConfig.js");

const getAllSnacks = async (id) => {
  try {
    const allSnacks = await db.any(`SELECT * FROM snacks ORDER BY id ASC`,id);
    return allSnacks;
  } catch (error) {
    throw error;
  }
};

const deleteSnack = async ( id ) => {
  try {
    const snack = await db.one(`DELETE FROM snacks WHERE id = $[id] RETURNING *`, { id });
  } catch (error) {
    throw error;
  }
}

const createSnack = async ( body ) =>{
  try {
    const snack = await db.one(`INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES() RETURNING *`,
    body);
  } catch (error) {
    throw error;
  }
}
module.exports = {getAllSnacks};
