const services = require('../services/todo.service');

const getAllLists = async (req, res) => {
  const allLists = await services.getAllLists();
  res.json(allLists);// .status(201);
};
const createList = async (req, res) => {
  const { listName } = req.params;
  try {
    await services.createList(listName);
    res.json({
      message: 'List created',
    }).status(200);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
const getTask = async (req, res) => {
  const { listName } = req.params;
  try {
    const tasks = await services.getTask(listName);
    res.json(tasks).status(201);
  } catch (err) {
    res.json({
      message: err.message,
    }).status(400);
  }
};
const addTask = async (req, res) => {
  const detailsOfTask = req.body;
  try {
    await services.addTask(detailsOfTask);
    res.json('Task added successfully').status(201);
  } catch (err) {
    res.json('could not add').status(400);
  }
};
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await services.deleteTask(taskId);
  res.json('Task deleted successfully').status(201);
};
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const changes = req.body;
  await services.updateTask(taskId, changes);
  res.json('Task updated successfully').status(201);
};
module.exports = {
  getAllLists,
  createList,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
