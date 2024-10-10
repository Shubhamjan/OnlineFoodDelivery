package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin,Integer>{


	Admin findByEmail(String email);
	
}
