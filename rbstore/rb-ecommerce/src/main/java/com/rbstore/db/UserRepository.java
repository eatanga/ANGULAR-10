package com.rbstore.db;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rbstore.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
