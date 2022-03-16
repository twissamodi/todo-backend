const dbOps = require('../utils/dbOps.utils');

const getAllLists = async () => {
  const allLists = await dbOps.getAllLists();
  return allLists;
};
const createList = async (listName) => {
  const message = await dbOps.createList(listName);
  return message;
};
const getAllTasks = async (listId) => {
  const allTasksDetails = await dbOps.getAllTasks(listId);
  return allTasksDetails;
};
const addTask = async (taskDetails) => {
  const message = await dbOps.addTask(taskDetails);
  return message;
};
const updateTask = async (taskId) => {
  const message = await dbOps.updateTask(taskId);
  return message;
};
const deleteTask = async (taskId) => {
  const message = await dbOps.deleteTask(taskId);
  return message;
};
const getTasksOfUser = async (userId) => {
  const allTasks = await dbOps.getTasksOfUser(userId);
  return allTasks;
};
module.exports = {
  getAllLists,
  createList,
  getAllTasks,
  updateTask,
  addTask,
  deleteTask,
  getTasksOfUser,
};
