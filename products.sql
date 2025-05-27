-- Script para crear la tabla de productos en PostgreSQL
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    price VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL
);
