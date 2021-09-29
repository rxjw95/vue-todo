import axios from 'axios';

async function getTasks() {
    const response = await axios.get('/api/tasks');
    return response.data.map((task) => {
        return { id: task.id, details: task.details, status: task.status };
    });
}

async function createTask(task) {
    const response = await axios.post('/api/tasks', task);
    return response.data.id;
}

async function patchDetailsOfTask(detailsOfTask) {
    const response = await axios.patch(`/api/tasks/${detailsOfTask.id}`, {
        details: detailsOfTask.details,
    });
    return response.data;
}

async function patchStatusOfTask(statusOfTask) {
    const response = await axios.patch(`/api/tasks/${statusOfTask.id}`, {
        status: statusOfTask.status,
    });
    return response.data;
}

async function allPatchStatusOfTask(arrOfTask) {
    const response = await axios.patch('/api/tasks', arrOfTask);
    console.log(response);
}

async function deleteTask(taskId) {
    await axios.delete(`/api/tasks/${taskId}`);
}

async function deleteCompletedTask(taskIdList) {
    await axios.put('/api/tasks/', taskIdList);
    console.log(taskIdList);
}

export {
    getTasks,
    createTask,
    patchDetailsOfTask,
    patchStatusOfTask,
    deleteTask,
    allPatchStatusOfTask,
    deleteCompletedTask,
};
