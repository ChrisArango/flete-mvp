const { listOfTrips } = require("../db/tripData");
const Trip = require("../models/Trip");

listOfTrips.push(
  new Trip("Carga Express", "MN-1001", "2025-07-01", "2025-07-03", "ABC123", "Carlos Pérez", "Medellín", "Bogotá", "Alimentos", "Lácteos refrigerados", 2500000, 1000000, 500000, 200000, 100000),

  new Trip("TransAndina", "MN-1002", "2025-07-05", "2025-07-07", "XYZ789", "Laura Gómez", "Cali", "Barranquilla", "Materiales", "Cerámica", 3000000, 1500000, 700000, 300000, 200000),

  new Trip("Fletexpress", "MN-1003", "2025-07-10", "2025-07-12", "JKL456", "Mario Ruiz", "Bogotá", "Cúcuta", "Electrodomésticos", "Neveras", 3500000, 1200000, 800000, 400000, 150000),

  new Trip("Logística Total", "MN-1004", "2025-07-15", "2025-07-17", "DEF321", "Ana Torres", "Cartagena", "Medellín", "Bebidas", "Gaseosas", 2800000, 1300000, 600000, 250000, 180000),

  new Trip("Carga Rápida", "MN-1005", "2025-07-18", "2025-07-20", "MNO654", "Juan Ramírez", "Bucaramanga", "Ibagué", "Papelería", "Resmas y tintas", 2200000, 900000, 400000, 150000, 120000)
);

