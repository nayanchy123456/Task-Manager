package com.taskmanager.tm.Services;

import java.util.List;

import com.taskmanager.tm.Payload.TaskDTO;

public interface TaskService {

    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO getTaskById(long id);
    List<TaskDTO> getAllTask();
    TaskDTO updateTask(long id, TaskDTO taskDTO);
    void deleteTask(long id);
    
}
