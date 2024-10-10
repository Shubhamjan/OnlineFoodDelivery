package com.app.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.AdminDto;
import com.app.dtos.Credentials;
import com.app.dtos.CustomerDto;
import com.app.dtos.CustomerSignUpDto;
import com.app.dtos.DaoToEntityConverter;
import com.app.dtos.DeliveryPersonDto;
import com.app.dtos.RestaurantDto;
import com.app.dtos.RestaurantManagerDto;
import com.app.dtos.RestaurantWithManagerDto;
import com.app.dtos.TastyTreatResponse;
import com.app.entities.Admin;
import com.app.entities.Customer;
import com.app.entities.Restaurant;
import com.app.services.AdminService;
import com.app.services.CustomerService;


import PasswordEncrypt_Decrypt.PasswordHashing;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class AdminController {

	@Autowired
	AdminService adminService;

	@Autowired
	CustomerService customerService;

	@PostMapping("/admin/signin")
	public ResponseEntity<TastyTreatResponse> signIn(@RequestBody Credentials cred) {
		String password = cred.getPassword();
		AdminDto adminDto = adminService.findAdminByEmail(cred);
		System.out.println("in signIn");
		if (adminDto == null)
			return TastyTreatResponse.error("Couldn't find admin with that credentials");

		Admin ad = DaoToEntityConverter.adminSignIn(adminDto);
		System.out.println(ad.getPassword());
		String hashedPassword = ad.getPassword();
//		if (PasswordHashing.checkPassword(password, hashedPassword)) {
//			return TastyTreatResponse.success(adminDto);
//		} else {
//			return TastyTreatResponse.error("Invalid email or password");
//		}
		if (hashedPassword.equals(password)) {
			return TastyTreatResponse.success(adminDto);
		} else {
			return TastyTreatResponse.error("Invalid email or password");
		}
	}

	@GetMapping("/admin/viewCust")
	public ResponseEntity<List<CustomerDto>> viewAllCustomer() {
		List<Customer> lst = customerService.findAllCustomers();
		List<CustomerDto> cu = lst.stream().map(i -> DaoToEntityConverter.customerEntityToDto(i))
				.collect(Collectors.toList());
		return new ResponseEntity<List<CustomerDto>>(cu, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/admin/delete/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable int id) {
		boolean isRemoved = customerService.deleteCust(id);

		if (!isRemoved) {
			return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>("Customer deleted successfully", HttpStatus.OK);
	}

	@GetMapping("/admin/viewManager")
	public ResponseEntity<List<RestaurantManagerDto>> getAllManager() {
		List<RestaurantManagerDto> lst = adminService.getAllManager();
		return new ResponseEntity<List<RestaurantManagerDto>>(lst, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/admin/deleteManager/{id}")
	public ResponseEntity<?> deleteManager(@PathVariable int id) {
		boolean isRemoved = adminService.deleteManager(id);

		if (!isRemoved) {
			return new ResponseEntity<>("Manager not found", HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>("Manager deleted successfully", HttpStatus.OK);
	}
//	
//	@GetMapping("/admin/Restos")
//	public ResponseEntity<List<RestaurantDto>> getRestos(){
//		List<RestaurantDto>ls=adminService.findResto();
//		return new ResponseEntity<List<RestaurantDto>>(ls,HttpStatus.ACCEPTED);
//	}

	@GetMapping("/admin/Restos")
	public ResponseEntity<List<RestaurantWithManagerDto>> getRestos() {
		List<RestaurantWithManagerDto> ls = adminService.findResto();
		return new ResponseEntity<List<RestaurantWithManagerDto>>(ls, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("admin/deleteResto/{id}")
	public ResponseEntity<?> deleteResto(@PathVariable int id) {
		boolean isRemoved = adminService.deleteResto(id);

		if (!isRemoved) {
			return new ResponseEntity<>("Restaurant Not found", HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>("Restaurant deleted successfully", HttpStatus.OK);
		}
	}
	
	@GetMapping("admin/viewDp")
	public ResponseEntity<List<DeliveryPersonDto>> viewDPerson(){
		List<DeliveryPersonDto>lst=adminService.findDeliveryperson();
		return new ResponseEntity<List<DeliveryPersonDto>>(lst,HttpStatus.ACCEPTED);
	}
}
