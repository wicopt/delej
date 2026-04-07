package com.mariia.user_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mariia.user_service.entities.User; 

public interface UserRepository extends JpaRepository<User,Long> {
}