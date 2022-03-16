const validations = require('./tasks.validation');

describe('getAllTasks error check', () => {
  it('should throw an inputerror if listId is not passed', async () => {
    try {
      validations.getAllTasks();
    } catch (err) {
      expect(err.errors).toEqual(['No list id provided']);
    }
  });
  it('should throw an inputerror if listId is not a number', async () => {
    try {
      validations.getAllTasks('abc');
    } catch (err) {
      expect(err.errors).toEqual(['Enter a number for list id']);
    }
  });
});
describe.only('addTask error check', () => {
  it('should throw an inputerror if title or listId or description are not passed', async () => {
    const taskDetails = {
      title: 'another todo',
    };
    try {
      validations.addTask(taskDetails);
    } catch (err) {
      expect(err.errors).toEqual(['Description missing', 'List id missing']);
    }
  });
  it('should throw an inputerror if title or description is not a string or listId is not a number', async () => {
    const taskDetails = {
      title: 123,
      description: 'mno',
      listId: 'abc',
    };
    try {
      validations.addTask(taskDetails);
    } catch (err) {
      expect(err.errors).toEqual(['Title should be a string', 'List id should be a number']);
    }
  });
});
