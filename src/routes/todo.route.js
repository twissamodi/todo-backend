const express = require('express');

const todoRouter = express.Router();

const {
  getAllLists, createList, getAllTasks, addTask, deleteTask, updateTask,
} = require('../handlers/tasks.handler');

todoRouter.get('/', getAllLists);
todoRouter.post('/:list_name', createList);
todoRouter.get('/:list_id', getAllTasks);
todoRouter.post('/', addTask);
todoRouter.delete('/:taskId', deleteTask);
todoRouter.put('/', updateTask);
module.exports = {
  todoRouter,
};
