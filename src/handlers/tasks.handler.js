const { InputError, NotFoundError } = require('../customErrors/errors');
const services = require('../services/tasks.service');
const validations = require('../validations/tasks.validation');

const getAllLists = async (req, res) => {
  try {
    const allLists = await services.getAllLists();
    console.log(allLists);
    res.status(200).json(allLists);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
const createList = async (req, res) => {
  try {
    const listName = req.params.list_name;
    validations.createList(listName);
    const message = await services.createList(listName);
    res.status(201).json({
      status: message,
    });
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ error: err.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
const getAllTasks = async (req, res) => {
  try {
    const listId = req.params.list_id;
    validations.getAllTasks(listId);
    const allTasks = await services.getAllTasks(listId);
    res.status(200).json(allTasks);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ error: err.errors });
    } else if (err instanceof NotFoundError) {
      res.status(err.httpCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
const addTask = async (req, res) => {
  const taskDetails = req.body;
  try {
    validations.addTask(req.body);
    const message = await services.addTask(taskDetails);
    res.status(201).json(message);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ error: err.errors });
    } else if (err instanceof NotFoundError) {
      res.status(err.httpCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
const updateTask = async (req, res) => {
  const taskDetails = req.body;
  try {
    validations.updateTask(taskDetails);
    const message = await services.updateTask(taskDetails);
    res.status(200).json(message);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ error: err.errors });
    } else if (err instanceof NotFoundError) {
      res.status(err.httpCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    validations.deleteTask(taskId);
    const message = await services.deleteTask(taskId);
    res.status(200).json(message);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ error: err.errors });
    } else if (err instanceof NotFoundError) {
      res.status(err.httpCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = {
  getAllLists,
  createList,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
