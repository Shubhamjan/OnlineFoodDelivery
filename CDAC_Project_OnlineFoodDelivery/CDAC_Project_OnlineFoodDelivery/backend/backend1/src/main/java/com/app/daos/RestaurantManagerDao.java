package com.app.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dtos.RestaurantManagerDto;
import com.app.entities.RestaurantManager;

public interface RestaurantManagerDao extends JpaRepository<RestaurantManager, Integer> {
        
	RestaurantManager findByEmail(String email);


	
}
