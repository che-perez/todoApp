const db = require('../db/config');

const Todo = {};

Todo.findAll = () =>
  db.query('SELECT * FROM todo ORDER BY id DESC')

Todo.findById = id =>
  db.one('SELECT * FROM todo WHERE id = $1',[id])

Todo.create = (todo, userid) => {
 return db.one(`
     INSERT INTO todo (
     todo,
     description,
     category,
    user_id
)    
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
       [todo.todo, todo.description, todo.category, userid]);
};

Todo.update = (todo, id) => {
 return db.one(`
   UPDATE todo SET 
    todo = $1,
    description = $2,
     category = $3,
     stat = $4
    WHERE id = $5
    RETURNING *`, [todo.todo, todo.description, todo.category, todo.stat, id]);
}

Todo.destroy = id => {
 return db.none(`
    DELETE FROM todo
    WHERE id = $1`, [id]);
};

module.exports = Todo