# Project

An inventory management system for a company with a chain of stores and distributors.

## Aims

This web application was set up for me to practice the following in Node.Js:

1. ORM, using Sequelize package.
2. Implementing model relationships: one-to-one, one-to-many and many-to-many, in Sequelize.
3. Authenticating and validating users with token.
4. Token generation using jsonwebtoken.
5. Password hashing using bcryptjs.

## Features List / Story

A features list is important to limit the scope of this project.
It is also ensures that effort and time are spent on achieving the aims of this project.

1. Super admin create admin
2. Admin create distributors
3. Admin create stock
4. Admin assign distributor stocks
5. Admin create outlets
6. Distributor assign stocks to outlets
7. User sign up under an outlet
8. User sell stocks (stock transaction)
9. User can view daily: opening and closing stocks the outlet
10. Admin can view daily: opening and closing stocks for any outlet

## Tools

Fundamental tools used for development:

1. Node.Js, Express Framework and npm
2. MYSQL
3. Postman
4. VS Code
5. Google ;)

High level tools/Javascript packages:

See package.json

## Steps

### 1. Schema design

A visual ERD would have been ideal, but, ain't got any for now.

Tables Structure

1. Super_admin - id:int primary key, username:string, password:text, created_at, updated_at
2. Admins - id:int primary key, name:string, password:text
3. Users - id:int primary key, firstname:string, lastname:string, email:string, password:text, phone_number:string, dob:string, created_at, updated_at
4. Distributors - id:int primary key, name:string, password:text, created_at, updated_at
5. Outlets - id:int primary key, name:string, assigned_id, address:text, created_at, updated_at
6. Stocks - id:int primary key, name:string, sku:string, description:text, created_at, updated_at
7. stock_production_quantity - id:int primary key, stock_id:integer, quantity:integer, created_at, updated_at
8. admin_stocks_to_distributor - id:int primary key, admin_id:int, distributor_id:int, stock_id:int,  quantity:int, created_at, updated_at
9. distributor_stocks_to_outlets - id:int primary key, distributor_id:int, outlet_id:int, stock_id:int,  quantity:int, created_at, updated_at
10. outlet_opening_stock - id:int primary key, outlet_id:int, stock_id:int, quantity:int, created_at, updated_at
11. outlet_closing_stock - id:int primary key, outlet_id:int, stock_id:int, quantity:int, created_at, updated_at
12. Sales - id:int primary key, stock_id:int, outlet_id:int, quantity:int, created_at, updated_at

### 2. Migrations and Models

I used Sequelize.Js to generate all the migrations and models.
