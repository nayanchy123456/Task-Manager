package com.taskmanager.tm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.tm.Entity.Task;


public interface TaskRepository extends JpaRepository<Task,Long>{

}
