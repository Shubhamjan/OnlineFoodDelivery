package com.app.dtos;

public class RestaurantWithManagerDto {
	
	private String restaurant_name;
	
	private String Manager_name;
	
	private String location;

	public RestaurantWithManagerDto() {
		super();
	}

	public RestaurantWithManagerDto(String restaurant_name, String manager_name, String location) {
		super();
		this.restaurant_name = restaurant_name;
		Manager_name = manager_name;
		this.location = location;
	}

	public String getRestaurant_name() {
		return restaurant_name;
	}

	public void setRestaurant_name(String restaurant_name) {
		this.restaurant_name = restaurant_name;
	}

	public String getManager_name() {
		return Manager_name;
	}

	public void setManager_name(String manager_name) {
		Manager_name = manager_name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
}
