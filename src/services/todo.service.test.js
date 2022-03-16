const services=require('./todo.service')
const dbOperations=require('../utils/dbOperations.utils')
describe('get all lists function',()=>{
    it('should give details of all lists present',async()=>{
        const allLists=[
            {
                "id": 1,
                "list_name": "personal",
                "createdAt": "2022-03-03T16:04:49.989Z",
                "updatedAt": "2022-03-03T16:04:49.989Z"
            },
            {
                "id": 2,
                "list_name": "work",
                "createdAt": "2022-03-03T16:05:04.779Z",
                "updatedAt": "2022-03-03T16:05:04.779Z"
            },
            {
                "id": 3,
                "list_name": "grocery",
                "createdAt": "2022-03-03T16:05:24.409Z",
                "updatedAt": "2022-03-03T16:05:24.409Z"
            }
        ];
        const spy=jest.spyOn(dbOperations,'getAllLists').mockResolvedValue(allLists);
        const lists=await services.getAllLists();
        expect(lists).toStrictEqual(allLists);
        expect(spy).toHaveBeenCalled();
    });
    it('should give error if getAllLists gives an error',async()=>{
        const spy=jest.spyOn(dbOperations,'getAllLists').mockRejectedValue(new Error('some error'));
        try{
            await services.getAllLists();
        }catch(err){
            expect(err.message).toBe('some error');
            spy.mockRestore();
        }; 
    });
});
describe('get tasks of a particular list',()=>{
    it('should give tasks in a list',async()=>{
        const expectedOutput=[{
            dataValues:{
                "id": 5,
                "title": "buy apples",
                "description": "2 kg",
                "list_id": 3,
                "createdAt": "2022-03-03T16:17:15.021Z",
                "updatedAt": "2022-03-03T16:36:34.872Z"
            }
        },
            {
                dataValues:{
                "id": 6,
                "title": "rice",
                "description": "1kg",
                "list_id": 3,
                "createdAt": "2022-03-03T17:20:12.858Z",
                "updatedAt": "2022-03-03T17:20:12.858Z"
            }
        }
        ];
        const spy=jest.spyOn(dbOperations,'getTask').mockResolvedValue(expectedOutput);
        const output=await services.getTask('grocery');
        expect(output).toStrictEqual(expectedOutput);
        expect(spy).toHaveBeenCalled();
    });
    it('should give error if getTask returns an error',async()=>{
        const spy=jest.spyOn(dbOperations,'getTask').mockRejectedValue(new Error('some error'));
        try{
            await services.getTask('personal');
        }catch(err){
            expect(err.message).toBe('some error');
            spy.mockRestore();
        }; 
    })
})
describe('create list',()=>{
    it('should create a list if no error',async()=>{
        const expectedOutput={
            dataValues: {
                id:4,
                list_name:'newList',
                createdAt:'2022-03-04T01:01:05.267Z',
                updatedAt: '2022-03-04T01:01:05.269Z'
        }
    }
        const spy=jest.spyOn(dbOperations,'createList').mockResolvedValue(expectedOutput);
        const output=await services.createList('newList');
        expect(output).toStrictEqual(expectedOutput);
        expect(spy).toHaveBeenCalled();
    });
    it('should give error if create returns an error',async()=>{
        const spy=jest.spyOn(dbOperations,'createList').mockRejectedValue(new Error('some error'));
        try{
            await services.createList('check');
        }catch(err){
            expect(err.message).toBe('some error');
            spy.mockRestore();
        }; 
    });
});
describe('add task',()=>{
    it('should add task to a particular list',async()=>{
        const expectedOutput={
            dataValues: {
                id: 8,
                title: 'another todo',
                description: 'mno',   
                list_id: 2,
                createdAt: '2022-03-04T01:34:49.730Z',
                updatedAt: '2022-03-04T01:34:49.730Z'
              }
    }
        const spy=jest.spyOn(dbOperations,'addTask').mockResolvedValue(expectedOutput);
        const output=await services.addTask({title:'another todo',description:'mno',list_name:'work'});
        expect(output).toStrictEqual(expectedOutput);
        expect(spy).toHaveBeenCalled();
    });
    it('should give an error if create returns any error',async()=>{
        const spy=jest.spyOn(dbOperations,'addTask').mockRejectedValue(new Error('some error'));
        try{
            await services.addTask();
        }catch(err){
            expect(err.message).toBe('some error');
            spy.mockRestore();
        }; 
    });
});
describe.only('deleteTask',()=>{
    it('should give number of rows deleted',async()=>{
        const spy=jest.spyOn(dbOperations,'deleteTask').mockResolvedValue('Deleted successfully');
        const output=await services.deleteTask(4);
        expect(output).toBe('Deleted successfully');
        expect(spy).toHaveBeenCalled();
    });
    it('should give an error if no such task exists',async()=>{
        const spy=jest.spyOn(dbOperations,'deleteTask').mockResolvedValue('No such task exists');
        try{
            await services.deleteTask(110);
        }catch(err){
            expect(err.message).toBe('No such task exists');
            spy.mockRestore();
        }; 
    });
    it('should give an error if destroy throws an error',async()=>{
        const spy=jest.spyOn(dbOperations,'deleteTask').mockRejectedValue(new Error('some error'));
        try{
            await services.deleteTask();
        }catch(err){
            expect(err.message).toBe('some error');
            spy.mockRestore();
        }
    });
});
describe('updateTask function',()=>{
    it('should give number of rows updated',async()=>{
        const spy=jest.spyOn(Tasks,'update').mockResolvedValue([1]);
        const output=await dbOperations.updateTask(3,{title:'changed',description:'changed',list_name:'work'});
        expect(output).toBe('Updated successfully');
        expect(spy).toHaveBeenCalled();
    });
    it('should give an error if no such task exists',async()=>{
        const spy=jest.spyOn(Tasks,'update').mockResolvedValue([0]);
        try{
            await dbOperations.updateTask(110,{title:'changed',description:'changed',list_name:'work'});
        }catch(err){
            expect(err.message).toBe('No such task exists');
            spy.mockRestore();
        }; 
    });
    xit('should give an error if update throws an error',async()=>{
        const spy=jest.spyOn(Tasks,'update').mockRejectedValue(new Error('some error'));
        try{
            await dbOperations.updateTask(110,{title:'changed',description:'changed',list_name:'work'});
        }catch(err){
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        }
    });
});






