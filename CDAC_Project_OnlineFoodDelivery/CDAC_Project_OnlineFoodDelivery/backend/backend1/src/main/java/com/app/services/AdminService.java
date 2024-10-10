package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.daos.AdminRepo;
import com.app.daos.DeliveryPersonDao;
import com.app.daos.RestaurantDao;
import com.app.daos.RestaurantManagerDao;
import com.app.dtos.AdminDto;
import com.app.dtos.Credentials;
import com.app.dtos.CustomerDto;
import com.app.dtos.DaoToEntityConverter;
import com.app.dtos.DeliveryPersonDto;
import com.app.dtos.RestaurantDto;
import com.app.dtos.RestaurantManagerDto;
import com.app.dtos.RestaurantWithManagerDto;
import com.app.entities.Admin;
import com.app.entities.Customer;
import com.app.entities.DeliveryPerson;
import com.app.entities.Restaurant;
import com.app.entities.RestaurantManager;

@Service
public class AdminService {

	@Autowired
	AdminRepo adminRepo;
	
	@Autowired
	RestaurantManagerDao restDao;
	
	@Autowired
	RestaurantDao restaurantDao;
	
	@Autowired
	DeliveryPersonDao dpDao;

	public AdminDto findAdminByEmail(Credentials cred) {
		Admin admin = adminRepo.findByEmail(cred.getEmail());
		if(admin == null) {
			return null;
		}
		AdminDto adminDto = new AdminDto();
		BeanUtils.copyProperties(admin,adminDto);
		return adminDto;
	}

	public List<RestaurantManagerDto> getAllManager() {
		// TODO Auto-generated method stub
		List<RestaurantManager>ls=restDao.findAll();
		List<RestaurantManagerDto>list=ls.stream().map(e->DaoToEntityConverter.RestaurantManagerToRestaurantmanagerDto(e)).collect(Collectors.toList());
		
		return list;
	}

	public boolean deleteManager(int id) {
		// TODO Auto-generated method stub
		Optional<RestaurantManager> mg = restDao.findById(id);

		if (mg.isPresent()) {
			restDao.deleteById(id);
			return true;
		}
		return false;
	}

	public List<RestaurantWithManagerDto> findResto() {
		// TODO Auto-generated method stub
		List<Restaurant>lst=restaurantDao.findAll();
		
		return lst.stream().map(e->{
			String name=e.getName();
			String loc=e.getAdressText();
			String mn_name=e.getRestaurantmanager() !=null?e.getRestaurantmanager().getName():"No Manager";
			return new RestaurantWithManagerDto(name,mn_name,loc);
		}).collect(Collectors.toList());
	}

	public boolean deleteResto(int id) {
		Optional<Restaurant> res=restaurantDao.findById(id);
		if(res.isPresent()) {
			restaurantDao.deleteById(id);
			return true;
		}
		return false;
	}

	public List<DeliveryPersonDto> findDeliveryperson() {
		// TODO Auto-generated method stub
		List<DeliveryPerson>lst=dpDao.findAll();
		List<DeliveryPersonDto>ls=lst.stream().map(e->DaoToEntityConverter.deliveryPersonEntityToDto(e)).collect(Collectors.toList());
		return ls;
	}


}
