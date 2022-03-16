const dbOps = require('../utils/dbOps.utils');
const services = require('./tasks.service');

describe('get all list function', () => {
  it('should call dbOps.getAllList and give all lists if successful', async () => {
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
    const spy = jest.spyOn(dbOps, 'getAllLists').mockResolvedValue(allLists);
    const output = await services.getAllLists();
    expect(output).toStrictEqual(allLists);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should give an error if dbOps.getAllLists rejects a promise', async () => {
    const spy = jest.spyOn(dbOps, 'getAllLists').mockRejectedValue(new Error('Some error'));
    try {
      await services.getAllLists();
    } catch (err) {
      expect(err.message).toBe('Some error');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    }
  });
});
describe('createList function', () => {
  it('should invoke dbOps.createList and return success message if list can be created', async () => {
    const spy = jest.spyOn(dbOps, 'createList').mockResolvedValue('List created successfully');// some object containing details will be resolved
    const message = await services.createList('grocery');
    expect(message).toBe('List created successfully');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should give an error if dbOps.createList rejects promise', async () => {
    const spy = jest.spyOn(dbOps, 'createList').mockRejectedValue(new Error('Some error'));
    try {
      await services.createList('a@1');
    } catch (err) {
      expect(err.message).toBe('Some error');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    }
  });
});
