package com.taskmanager.tm.Payload;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private Boolean isCompleted;

    private LocalDate dueDate;
}

