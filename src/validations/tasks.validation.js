const { InputError } = require('../customErrors/errors');

const createList = (listName) => {
  const allErrors = [];
  if (typeof (listName) === 'undefined') {
    allErrors.push('No list name provided');
  }
  if (typeof (listName) !== 'string') {
    allErrors.push('Enter a string for list name');
  }
  if (!Number.isNaN(Number(listName))) {
    allErrors.push('Enter a string for list name');
  }
  if (allErrors.length > 0) {
    throw new InputError('Input Errors', 400, allErrors);
  }
  return 'No input error';
};

const getAllTasks = (listId) => {
  const allErrors = [];
  if (typeof (listId) === 'undefined') {
    allErrors.push('No list id provided');
  } else if (Number.isNaN(Number(listId))) {
    allErrors.push('Enter a number for list id');
  }
  if (allErrors.length > 0) {
    throw new InputError('Input Errors', 400, allErrors);
  }
  return 'No input error';
};
const addTask = (taskDetails) => {
  const allErrors = [];
  if (typeof (taskDetails.title) === 'undefined') {
    allErrors.push('Title missing');
  } else if (typeof (taskDetails.title) !== 'string') {
    allErrors.push('Title should be a string');
  }
  if (typeof (taskDetails.description) === 'undefined') {
    allErrors.push('Description missing');
  } else if (typeof (taskDetails.description) !== 'string') {
    allErrors.push('Description should be a string');
  }
  if (typeof (taskDetails.listId) === 'undefined') {
    allErrors.push('List id missing');
  } else if (typeof (taskDetails.listId) !== 'number' && Number.isNaN(Number(taskDetails.listId))) {
    allErrors.push('List id should be a number');
  }
  if (allErrors.length > 0) {
    throw new InputError('Input Errors', 400, allErrors);
  }
  return 'No input error';
};
const updateTask = (taskDetails) => {
  const allErrors = [];
  if (typeof (taskDetails.title) === 'undefined') {
    allErrors.push('Title missing');
  } else if (typeof (taskDetails.title) !== 'string') {
    allErrors.push('Title should be a string');
  }
  if (typeof (taskDetails.description) === 'undefined') {
    allErrors.push('Description missing');
  } else if (typeof (taskDetails.description) !== 'string') {
    allErrors.push('Description should be a string');
  }
  if (typeof (taskDetails.listId) === 'undefined') {
    allErrors.push('List id missing');
  } else if (typeof (taskDetails.listId) !== 'number') {
    allErrors.push('List id should be a number');
  }
  if (typeof (taskDetails.id) === 'undefined') {
    allErrors.push('Task id missing');
  } else if (typeof (taskDetails.id) !== 'number') {
    allErrors.push('Task id should be a number');
  }
  if (allErrors.length > 0) {
    throw new InputError('Input Errors', 400, allErrors);
  }
  return 'No input error';
};
const deleteTask = (taskId) => {
  const allErrors = [];
  if (typeof (taskId) === 'undefined') {
    allErrors.push('No task id provided');
  }
  if (Number.isNaN(Number(taskId))) {
    allErrors.push('Enter a number for task id');
  }
  if (allErrors.length > 0) {
    throw new InputError('Input Errors', 400, allErrors);
  }
  return 'No input error';
};
module.exports = {
  createList,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
