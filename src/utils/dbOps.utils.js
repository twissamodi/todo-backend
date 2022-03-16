const {
  Lists, Tasks, UserLists,
} = require('../../models');
const { NotFoundError } = require('../customErrors/errors');

const getAllLists = async () => Lists.findAll();

const createList = async (listName) => {
  await Lists.create({
    list_name: listName,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return 'List created successfully';
};
const getAllTasks = async (listId) => {
  const checkPresenceOfListId = await Lists.findAll({
    where: {
      id: listId,
    },
  });
  if (checkPresenceOfListId.length === 0) {
    throw new NotFoundError('Resource not found', `No list with list id: ${listId} present`, 404);
  }
  const allTasks = await Tasks.findAll({
    where: {
      list_id: listId,
    },
  });
  if (allTasks.length === 0) {
    return `No task found at list id: ${listId}`;
  }
  return allTasks;
};
const addTask = async (taskDetails) => {
  const checkPresenceOfListId = await Lists.findAll({
    where: {
      id: taskDetails.listId,
    },
  });
  if (checkPresenceOfListId.length === 0) {
    throw new NotFoundError('Resource not found', `No list with list id: ${taskDetails.listId} present`, 404);
  }
  await Tasks.create({
    title: taskDetails.title,
    description: taskDetails.description,
    list_id: taskDetails.listId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return 'Task created successfully';
};
const updateTask = async (taskDetails) => {
  const checkPresenceOfListId = await Lists.findAll({
    where: {
      id: taskDetails.listId,
    },
  });
  if (checkPresenceOfListId.length === 0) {
    throw new NotFoundError('Resource not found', `No list with list id: ${taskDetails.listId} present`, 404);
  }
  const numberOfRowsUpdated = await Tasks.update({
    title: taskDetails.title,
    description: taskDetails.description,
    list_id: taskDetails.listId,
    updatedAt: Date.now(),
  }, {
    where: {
      id: taskDetails.id,
    },
  });
  if (numberOfRowsUpdated[0] === 0) {
    throw new NotFoundError('Resource not found', `No task with task id: ${taskDetails.id} present`, 404);
  }
  return 'Task updated successfully';
};
const deleteTask = async (taskId) => {
  const numberOfRowsDeleted = await Tasks.destroy({
    where: {
      id: taskId,
    },
  });
  if (numberOfRowsDeleted === 0) {
    throw new NotFoundError('Resource not found', `No task with task id: ${taskId} present`, 404);
  }
  return 'Task deleted successfully';
};

const getTasksOfUser = async (userId) => {
  const allListsOfUser = await UserLists.findAll({
    where: {
      user_id: userId,
    },
  });
  const listIds = allListsOfUser.map((currentListDetails) => currentListDetails.get('list_id'));
  const allTasks = Tasks.findAll({
    where: {
      list_id: listIds,
    },
  });
  return allTasks;
};
const giveAccessToUser = async (details) => {
  const checkPresenceOfListId = await Lists.findAll({
    where: {
      id: details.listId,
    },
  });
  if (checkPresenceOfListId.length === 0) {
    throw new NotFoundError('Resource not found', `No list with list id: ${details.listId} present`, 404);
  }
  const checkPresenceOfUserId = await Lists.findAll({
    where: {
      id: details.userId,
    },
  });
  if (checkPresenceOfUserId.length === 0) {
    throw new NotFoundError('Resource not found', `No list with list id: ${details.userId} present`, 404);
  }
  const newAccess = await UserLists.create({
    list_id: details.listId,
    user_id: details.userId,
  });
  return newAccess;
};

module.exports = {
  getAllLists,
  createList,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getTasksOfUser,
  giveAccessToUser,
};
