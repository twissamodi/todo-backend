const { Lists, Tasks ,Users,UserLists} = require('../../models');

const getAllLists = async () => {
  try{
    return Lists.findAll();
  }catch(err){
    throw err;
  }
}
const getTask=async(listName)=> {
  const list = await Lists.findOne({
    where:{
      list_name:listName
    }
  });
  if (!list) {
    throw new Error('List not found')
  }
  const allTasks= await Tasks.findAll({
    where:{
      list_id: list.dataValues.id
    } 
  })
  return allTasks;
};

const createList=async(listName)=> {
  const listDetails=await Lists.create({
  list_name:listName,
  createdAt: Date.now(),
  updatedAt:Date.now()
});
return listDetails;

};

const addTask=async(detailsOfTask)=>{
  try{
    const newTask=await Tasks.create({
      title:detailsOfTask.title,
      description:detailsOfTask.description,
      list_id:(await Lists.findOne({
        where:{
          list_name:detailsOfTask.list_name
        }
      })).dataValues.id,
      createdAt:Date.now(),
      updatedAt:Date.now()
    });
    return newTask;
  }catch(err){
    throw err;
  }
  
}

const deleteTask=async(taskId)=>{
  try{
    const rowsDeleted=await Tasks.destroy({
      where:{
        id:taskId
      }
    })
    if(rowsDeleted>0){
      return 'Deleted successfully';
    }
    throw new Error('No such task exists');
  }catch(err){
    throw err;
  }
  
}

const updateTask=async(taskId,changes)=>{
  try{
    const updatedRows=Tasks.update({
      title:changes.title,
      description:changes.description,
      list_id:(await Lists.findOne({
        where:{
          list_name:changes.list_name
        }
      })).dataValues.id
      },{
    where:{
      id:taskId
    }
  });
  if(updatedRows[0]!==0){
    return 'Updated successfully';
  }
  throw new Error('No such task exists');
  }catch(err){
    throw err;
  }
}
const getTaskByListId=async()=>{
  
}
const allListForUser=async(userId)=>{//user and lists //lists and tasks
  const allEntries=await UserLists.findAll({
    where:{
      user_id:userId
    }
  });
  const allListIds=allEntries.map(instance=>instance.get('list_id'));//array of object
  const allTasks=
}



module.exports = {
  getAllLists,
  createList,
  getTask,
  addTask,
  deleteTask,
  updateTask
};
