const dbOperations = require('../utils/dbOperations.utils');

const getAllLists = async () => dbOperations.getAllLists();
const createList = async (listName) => {
  const listDetails = await dbOperations.createList(listName);
  return listDetails;
};
const getTask = async (listName) => {
  const taskDetails = await dbOperations.getTask(listName);
  return taskDetails;
};
const addTask = async (detailsOfTask) => dbOperations.addTask(detailsOfTask);

const deleteTask = async (taskId) => dbOperations.deleteTask(taskId);

const updateTask = async (taskId, changes) => dbOperations.updateTask(taskId, changes);
module.exports = {
  getAllLists,
  createList,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
