CREATE DATABASE logistics_management
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE logistics_management;

CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    capacity DECIMAL(10,2) NOT NULL CHECK (capacity > 0),
    status ENUM('ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE') 
        NOT NULL DEFAULT 'ACTIVE',
    odometer INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    license_expiry DATE NOT NULL,
    status ENUM('AVAILABLE', 'ON_TRIP', 'INACTIVE') 
        NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    driver_id INT NOT NULL,
    cargo_weight DECIMAL(10,2) NOT NULL CHECK (cargo_weight >= 0),
    status ENUM('PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED') 
        NOT NULL DEFAULT 'PLANNED',
    start_odometer INT UNSIGNED NOT NULL,
    end_odometer INT UNSIGNED,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME,
    
    CONSTRAINT fk_trip_vehicle
        FOREIGN KEY (vehicle_id) 
        REFERENCES vehicles(vehicle_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
        
    CONSTRAINT fk_trip_driver
        FOREIGN KEY (driver_id) 
        REFERENCES drivers(driver_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
        
    CHECK (end_odometer IS NULL OR end_odometer >= start_odometer)
);

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    trip_id INT,
    fuel_cost DECIMAL(10,2) DEFAULT 0 CHECK (fuel_cost >= 0),
    maintenance_cost DECIMAL(10,2) DEFAULT 0 CHECK (maintenance_cost >= 0),
    expense_date DATE DEFAULT (CURRENT_DATE),
    
    CONSTRAINT fk_expense_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(vehicle_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    CONSTRAINT fk_expense_trip
        FOREIGN KEY (trip_id)
        REFERENCES trips(trip_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE service_logs (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    description TEXT NOT NULL,
    service_date DATE NOT NULL,
    
    CONSTRAINT fk_service_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(vehicle_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);