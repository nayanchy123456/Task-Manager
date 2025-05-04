package com.taskmanager.tm.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.tm.Entity.Task;
import com.taskmanager.tm.Payload.TaskDTO;
import com.taskmanager.tm.Repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = modelMapper.map(taskDTO, Task.class);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        Task savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    @Override
    public TaskDTO getTaskById(long id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    
        applyAutoStatus(task);
        taskRepository.save(task); // save updated status
    
        return modelMapper.map(task, TaskDTO.class);
    }
    

    @Override
    public List<TaskDTO> getAllTask() {
        List<Task> tasks = taskRepository.findAll();

        for (Task task : tasks) {
            applyAutoStatus(task); // apply status if overdue
        }

        taskRepository.saveAll(tasks); // persist the changes

        return tasks.stream()
                .map(task -> modelMapper.map(task, TaskDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO updateTask(long id, TaskDTO taskDTO) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setDueDate(taskDTO.getDueDate());
        existingTask.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(existingTask);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }

    @Override
    public void deleteTask(long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id" + id));
        taskRepository.delete(task);

    }


    // this method for the autoStatus update 
    private void applyAutoStatus(Task task) {
        if (task.getDueDate() != null &&
                !"COMPLETED".equalsIgnoreCase(task.getStatus()) &&
                task.getDueDate().isBefore(java.time.LocalDate.now())) {

            task.setStatus("OVERDUE");
        }
    }

}
