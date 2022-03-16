const dbOps = require('./dbOps.utils');
const { Lists, Tasks } = require('../../models');
const { NotFoundError } = require('../customErrors/errors');

describe('get all list function', () => {
  it('should give all lists', async () => {
    const allLists = [{
      dataValues: {
        id: 1,
        list_name: 'personal',
        createdAt: '2022-03-03T16:04:49.989Z',
        updatedAt: '2022-03-03T16:04:49.989Z',
      },
    },
    {
      dataValues: {
        id: 2,
        list_name: 'work',
        createdAt: '2022-03-03T16:05:04.779Z',
        updatedAt: '2022-03-03T16:05:04.779Z',
      },
    },
    {
      dataValues: {
        id: 3,
        list_name: 'grocery',
        createdAt: '2022-03-03T16:05:24.409Z',
        updatedAt: '2022-03-03T16:05:24.409Z',
      },
    }];
    const spy = jest.spyOn(Lists, 'findAll').mockResolvedValue(allLists);
    const output = await dbOps.getAllLists();
    expect(output).toStrictEqual(allLists);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should give an error if any internal error occurs', async () => {
    const spy = jest.spyOn(Lists, 'findAll').mockRejectedValue(new Error('Some error'));
    try {
      await dbOps.getAllLists();
    } catch (err) {
      expect(err.message).toBe('Some error');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    }
  });
});
describe('createList function', () => {
  it('should create a list and return success message', async () => {
    const spy = jest.spyOn(Lists, 'create').mockResolvedValue({});// some object containing details will be resolved
    const message = await dbOps.createList('grocery');
    expect(message).toBe('List created successfully');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should give an error if list can not be create', async () => {
    const spy = jest.spyOn(Lists, 'create').mockRejectedValue(new Error('Some error'));
    try {
      await dbOps.createList('a@1');
    } catch (err) {
      expect(err.message).toBe('Some error');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    }
  });
});
describe('getAllTasks function', () => {
  it('should return all task if list id exists and no server error', async () => {
    const tasks = [{
      dataValues: {
        id: 5,
        title: 'buy apples',
        description: '2 kg',
        list_id: 3,
        createdAt: '2022-03-03T16:17:15.021Z',
        updatedAt: '2022-03-03T16:36:34.872Z',
      },
    },
    {
      dataValues: {
        id: 6,
        title: 'rice',
        description: '1kg',
        list_id: 3,
        createdAt: '2022-03-03T17:20:12.858Z',
        updatedAt: '2022-03-03T17:20:12.858Z',
      },
    },
    ];
    const spy = jest.spyOn(Tasks, 'findAll').mockResolvedValue(tasks);
    const tasksReturned = await dbOps.getAllTasks(3);
    expect(tasksReturned).toStrictEqual(tasks);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should give an error if list id does not exists', async () => {
    const spy = jest.spyOn(Lists, 'findAll').mockResolvedValue([]);
    await expect(() => dbOps.getAllTasks(123)).rejects.toThrow('No list with list id: 123 present');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should fail if server error occurs', async () => {
    const spy = jest.spyOn(Lists, 'findAll').mockRejectedValue(new Error('some error'));
    await expect(() => dbOps.getAllTasks(1)).rejects.toThrow('some error');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('addTask function', () => {
  it('should return success message if task was added', async () => {
    const taskDetails = {
      title: 'another todo',
      description: 'mno',
      listId: 2,
    };
    const detailsAfterTaskAdded = {
      dataValues: {
        id: 8,
        title: 'another todo',
        description: 'mno',
        list_id: 2,
        createdAt: '2022-03-04T01:34:49.730Z',
        updatedAt: '2022-03-04T01:34:49.730Z',
      },
    };
    jest.spyOn(Lists, 'findAll').mockResolvedValue([{
      dataValues:
      { id: 1 },
    }]);
    jest.spyOn(Tasks, 'create').mockResolvedValue(detailsAfterTaskAdded);
    const message = await dbOps.addTask(taskDetails);
    expect(message).toBe('Task created successfully');
  });
  it('should give list not found error if no list exists with given list id', async () => {
    const taskDetails = {
      title: 'another todo',
      description: 'mno',
      listId: 123,
    };
    jest.spyOn(Lists, 'findAll').mockRejectedValue(new NotFoundError('Resource not found', 'No list with list id 123 present', 404));
    await expect(() => dbOps.addTask(taskDetails)).rejects.toThrow('No list with list id 123 present');
  });
  it('should give an internal server error if error occurs on server side', async () => {
    const taskDetails = {
      title: 'another todo',
      description: 'mno',
      listId: 123,
    };
    jest.spyOn(Lists, 'findAll').mockRejectedValue(new Error('some internal error'));
    await expect(() => dbOps.addTask(taskDetails)).rejects.toThrow('some internal error');
  });
});
