-- Demo seed data. Images are REAL car photos (linked live from Unsplash's free image feed).
-- IMPORTANT: "WHERE NOT EXISTS" guard means this only inserts once, the very first time the
-- cars table is empty. Without this guard, this file would re-run and duplicate all 8 cars
-- every single time the backend restarts (spring.sql.init.mode=always runs it on every boot).

INSERT INTO cars (brand, model, type, seats, fuel_type, transmission, price_per_day, image_url, available, rating, review_count, description)
SELECT * FROM (VALUES
  ('Hyundai', 'Creta', 'SUV', 5, 'Petrol', 'Automatic', 2200.0,
   'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format&fit=crop',
   true, 4.6, 128, 'Comfortable compact SUV, perfect for city and highway drives.'),

  ('Maruti Suzuki', 'Swift', 'Hatchback', 5, 'Petrol', 'Manual', 1200.0,
   'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&auto=format&fit=crop',
   true, 4.3, 96, 'Fuel-efficient hatchback, easy to drive in city traffic.'),

  ('Honda', 'City', 'Sedan', 5, 'Petrol', 'Automatic', 1800.0,
   'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=900&auto=format&fit=crop',
   true, 4.7, 154, 'Premium sedan with spacious interiors and smooth ride.'),

  ('Toyota', 'Fortuner', 'SUV', 7, 'Diesel', 'Automatic', 3500.0,
   'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&auto=format&fit=crop',
   true, 4.8, 211, 'Powerful full-size SUV, great for long family trips.'),

  ('Tesla', 'Model 3', 'Electric', 5, 'Electric', 'Automatic', 4500.0,
   'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&auto=format&fit=crop',
   true, 4.9, 89, 'All-electric sedan with autopilot and zero emissions.'),

  ('Mahindra', 'Thar', 'SUV', 4, 'Diesel', 'Manual', 2800.0,
   'https://images.unsplash.com/photo-1622551832277-1d5b41b8e4e9?w=900&auto=format&fit=crop',
   true, 4.5, 173, 'Rugged off-roader, perfect for adventure trips.'),

  ('Kia', 'Seltos', 'SUV', 5, 'Petrol', 'Automatic', 2400.0,
   'https://images.unsplash.com/photo-1622650807954-6f00a53d31c9?w=900&auto=format&fit=crop',
   true, 4.4, 102, 'Feature-loaded compact SUV with bold styling.'),

  ('BMW', '3 Series', 'Luxury Sedan', 5, 'Petrol', 'Automatic', 6000.0,
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&auto=format&fit=crop',
   true, 4.9, 67, 'Luxury performance sedan for a premium experience.')
) AS v(brand, model, type, seats, fuel_type, transmission, price_per_day, image_url, available, rating, review_count, description)
WHERE NOT EXISTS (SELECT 1 FROM cars);
