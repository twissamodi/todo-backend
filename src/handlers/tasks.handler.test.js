const handler = require('./tasks.handler');
const services = require('../services/tasks.service');
const validation = require('../validations/tasks.validation');
const { InputError, NotFoundError } = require('../customErrors/errors');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
describe('getAllLists handler function', () => {
  it('should return all lists if it is a success case', async () => {
    const res = mockResponse();
    const req = {};
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
    const spy = jest.spyOn(services, 'getAllLists').mockResolvedValue(allLists);
    await handler.getAllLists(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allLists);
    expect(spy).toHaveBeenCalled();
  });
  it('should give an error if there is server side error', async () => {
    const res = mockResponse();
    const req = {};
    const spy = jest.spyOn(services, 'getAllLists').mockRejectedValue('Internal server error');
    await handler.getAllLists(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(spy).toHaveBeenCalled();
  });
});
describe('create list handler function', () => {
  it('should return a success message if list is created', async () => {
    const res = mockResponse();
    const req = {
      params: {
        list_name: 'new list',
      },
    };
    const spyServices = jest.spyOn(services, 'createList').mockResolvedValue('List created successfully');
    await handler.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ status: 'List created successfully' });
    expect(spyServices).toHaveBeenCalled();
  });
  it('should display an error message if list name is an integer', async () => {
    const res = mockResponse();
    const req = {
      params: {
        list_name: '123',
      },
    };
    await handler.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: ['Enter a string for list name'] });
  });
  it('should display an error if there is any server side issue', async () => {
    const res = mockResponse();
    const req = {
      params: {
        list_name: 'new list',
      },
    };
    const spyServices = jest.spyOn(services, 'createList').mockRejectedValue(new Error());
    await handler.createList(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(spyServices).toHaveBeenCalled();
  });
});
describe('getAllTasks handler function', () => {
  it('should send all tasks to user if no error occurs', async () => {
    const tasks = [
      {
        id: 8,
        title: 'another todo',
        description: 'mno',
        list_id: 2,
        createdAt: '2022-03-04T01:34:49.730Z',
        updatedAt: '2022-03-04T01:34:49.730Z',
      },
      {
        id: 9,
        title: 'another todo',
        description: 'mno',
        list_id: 2,
        createdAt: '2022-03-04T01:37:14.218Z',
        updatedAt: '2022-03-04T01:37:14.219Z',
      }];
    const res = mockResponse();
    const req = {
      params: {
        list_id: 2,
      },
    };
    jest.spyOn(validation, 'getAllTasks').mockReturnValue('No input error');
    jest.spyOn(services, 'getAllTasks').mockResolvedValue(tasks);
    await handler.getAllTasks(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });
  it('should give an error if input error occurs', async () => {
    const res = mockResponse();
    const req = {
      params: {
        list_id: 'abc',
      },
    };
    const validator = jest.spyOn(validation, 'getAllTasks').mockImplementation(() => {
      throw new InputError('Input Errors', 400, ['Enter a number for list id']);
    });
    await handler.getAllTasks(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: ['Enter a number for list id'] });
    expect(validator).toHaveBeenCalled();
  });
  it('should give an error if no list id found', async () => {
    const res = mockResponse();
    const req = {
      params: {
        list_id: 'abc',
      },
    };
    jest.spyOn(validation, 'getAllTasks').mockReturnValue('No input error');
    const serviceSpy = jest.spyOn(services, 'getAllTasks').mockRejectedValue(new NotFoundError('Resource not found', 'No list with list id: 123 present', 404));
    await handler.getAllTasks(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No list with list id: 123 present' });
    expect(serviceSpy).toHaveBeenCalled();
  });
  it('should give an error if no list id found', async () => {
    const res = mockResponse();
    const req = {
      params: {
        list_id: 'abc',
      },
    };
    jest.spyOn(validation, 'getAllTasks').mockReturnValue('No input error');
    const serviceSpy = jest.spyOn(services, 'getAllTasks').mockRejectedValue(new Error('some internal error'));
    await handler.getAllTasks(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(serviceSpy).toHaveBeenCalled();
  });
});

describe('addTask handler function', () => {
  it('should send success message if task is added', async () => {
    const res = mockResponse();
    const req = {
      body: {
        title: 'another todo',
        description: 'mno',
        listId: 1,
      },
    };
    jest.spyOn(validation, 'addTask').mockReturnValue('No input error');
    jest.spyOn(services, 'addTask').mockResolvedValue('Task created successfully');
    await handler.addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith('Task created successfully');
  });
  it('should give an error if there is some input error', async () => {
    const res = mockResponse();
    const req = {
      body: {
        title: 'another todo',
        description: 1,
      },
    };
    jest.spyOn(validation, 'addTask').mockImplementation(() => {
      throw new InputError('Input Errors', 400, ['Description should be a string', 'List id missing']);
    });
    await handler.addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: ['Description should be a string', 'List id missing'] });
  });
  it('should give an error if list id is invalid', async () => {
    const res = mockResponse();
    const req = {
      body: {
        title: 'another todo',
        description: 'mno',
        listId: 123,
      },
    };
    jest.spyOn(validation, 'addTask').mockReturnValue('No input error');
    jest.spyOn(services, 'addTask').mockRejectedValue(new NotFoundError('Data not found', 'No list with list id: 123 present', 404));
    await handler.addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No list with list id: 123 present' });
  });
  it('should give an error if there is some server error', async () => {
    const res = mockResponse();
    const req = {
      body: {
        title: 'another todo',
        description: 'mno',
        listId: 123,
      },
    };
    jest.spyOn(validation, 'addTask').mockReturnValue('No input error');
    jest.spyOn(services, 'addTask').mockRejectedValue(new Error());
    await handler.addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
