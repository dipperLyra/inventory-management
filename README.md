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

1. Super admin can create site-admin(admin)
2. Admin can create outlets
3. Admin can create stocks
4. Admin can assign stocks to distributors.
5. Distributors can assign stocks to outlets.
6. Users can input daily opening stocks for an outlet.
7. Users can input daily closing stocks for an outlet.
8. Admin can view daily stock report for any outlet.
9. Users can sell stocks.

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

### 1 Schema design

A visual ERD would have been ideal, but, ain't got any for now.

Tables:

1. Super admin
2. Admin
3. Users
4. Distributors
5. Roles
6. Outlets
7. Stocks
8. Admin_assign_stocks_to_distributor
9. Distributor_assign_stocks_to_outlets
10. Outlet_opening_stock
11. Outlet_closing_stock
12. Sales
13. transactions

* Admin_assign_stocks_to_distributor: when a stock is assigned to a distributor by the admin it is saved in this tables. stock - distributor: many-to-many relationship.

* Distributor_assign_stocks_to_outlets: when a stock is assigned to an outlet by a distributor it is saved in this table. distributor - outlet many-to-many relationship.

* Outlet_opening_stock: at the beginning of sales, outlets can record number of available stocks in this table. 

* Outlet_closing_stock: at the closing of sales, outlets can record number of available stocks in this table. 

* Sales: when stocks are sold it is subracted from the available number of stocks an outlet has.

* Transactions: keeps record of all stocks sold and the outlet that sold them.

Structure

1. Super_admin - username:string, password:text
2. Admins - name:string, password:text
3. Users - firstname:string, lastname:string, email:string, password:text, phone_number:string, dob:string
4. Distributors - name:string, password:text
5. Outlets -  name:string, assigned_id, address:text
6. Stocks - name:string, sku:string, description:text
7. Admin_assign_stocks_to_distributor - admin_id:int, stock_id:int, stock_name:string, distributor_id:int, quantity:int
8. Distributor_assign_stocks_to_outlets - outlet_id:int, stock_id:int, stock_name:string, distributor_id:int, quantity:int
9. Outlet_opening_stock - outlet_id:int, stock_id:int, quantity:int
10. Outlet_closing_stock - outlet_id:int, stock_id:int, quantity:int
11. Sales - stock_id:int, outlet_id:int, quantity:int
12. transactions - sales_id

### Migrations

I used Sequelize.Js to generate all the migrations. Though, models alone suffice to generate the tables, but, migrations offer a better way of tracking table definition changes in a project.

By default Sequelize will add the following columns below to migrations:

1. id - primary key
2. created_at
3. updated_at

Generate migration files, examples:

```bash
npx sequelize-cli migration:generate ## this will generate only the migration file without a model
npx sequelize-cli model:generate --name Admin --attributes name:string,password:text ## this will generate the migration file and a model.
```

Run migration files

`npx sequelize-cli db:migrate`
