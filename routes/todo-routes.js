const express = require('express');
const todoRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const todoController = require('../controllers/todo-controller');

todoRouter.get('/', authHelpers.loginRequired, todoController.index);
todoRouter.post('/', authHelpers.loginRequired, todoController.create);

todoRouter.get('/add', authHelpers.loginRequired, (req, res) => {
 res.render('todo/todo-add', {auth: (req.user) ? true : false});
});

todoRouter.get('/:id',todoController.show);
todoRouter.get('/:id/edit', authHelpers.loginRequired, todoController.edit);
todoRouter.put('/:id', authHelpers.loginRequired, todoController.update);

todoRouter.delete('/:id', authHelpers.loginRequired, todoController.delete);

module.exports = todoRouter;