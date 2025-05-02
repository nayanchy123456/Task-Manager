package com.taskmanager.tm.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.tm.Payload.TaskDTO;
import com.taskmanager.tm.Services.TaskService;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;


    // creating a new task
    
    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO)
    {
        return taskService.createTask(taskDTO);
    }

    // getting task by id
    
    @GetMapping("/{id}")
    public TaskDTO getTaskByid( @PathVariable Long id){
        return taskService.getTaskById(id);

    }

    // get all tasks

    @GetMapping
    public List<TaskDTO> getAllTask()
    {
        return taskService.getAllTask();
    }

    //update task

    @PutMapping("/{id}")
    public TaskDTO updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO)
    {
        return taskService.updateTask(id, taskDTO);
    }   

    // detele task

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id)
    {
        taskService.deleteTask(id);
    }

}
