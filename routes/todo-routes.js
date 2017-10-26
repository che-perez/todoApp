const express = require('express');
const todoRouter = express.Router();

const todoController = require('../controllers/todo-controller');

todoRouter.get('/', todoController.index);

todoRouter.get('/add', (req, res) => {
 res.render('todo/todo-add');
});

todoRouter.post('/', todoController.create);

todoRouter.get('/:id',todoController.show);
todoRouter.get('/:id/edit', todoController.edit);
todoRouter.put('/:id', todoController.update);

todoRouter.delete('/:id', todoController.delete);

module.exports = todoRouter;