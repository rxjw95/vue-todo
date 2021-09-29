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
    /**
     * 아래의 방식은 모든 배열 요소의 실행의 기다릴 필요없이 순서만 보장하면 되는 경우일 때,
     * taskIdList.forEach(
            async (taskId) => await axios.delete(`/api/tasks/${taskId}`),
        );
     */

    //순서 보장도 필요없이 모든 요소를 병렬적으로 처리하기 위한 방법
    const promises = taskIdList.map((taskId) =>
        axios.delete(`/api/tasks/${taskId}`),
    );
    await Promise.all(promises);
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
