const Todo = require('../models/Todo');

const todoController = {};

todoController.index = (req, res) => {
 Todo.findAll()
 .then(todos => {
  res.status(200).render('todo/todo-index', {
   todos: todos,
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

todoController.show = (req, res) => {
 Todo.findById(req.params.id)
 .then(todo => {
  res.status(200).render('todo/todo-single', {
   todo: todo
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

todoController.create = (req, res) => {
 Todo.create({
  todo: req.body.todo,
  description: req.body.description,
  category: req.body.category,
  stat: req.body.stat,
 })
 .then(todo => {
  res.redirect(`/todo/${todo.id}`)
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

todoController.edit = (req, res) => {
 Todo.findById(req.params.id)
 .then(todo => {
  res.status(200).render('todo/todo-edit', {
   todo: todo,
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

todoController.update = (req, res) => {
 Todo.update({
  todo: req.body.todo,
  description: req.body.description,
  category: req.body.category,
  stat: req.body.stat,
 }, req.params.id)
 .then(todo => {
  res.redirect(`/todo/${todo.id}`)
  }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

todoController.delete = (req, res) => {
 Todo.destroy(req.params.id)
 .then(() => {
  res.redirect('/todo');
}).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};


module.exports = todoController;