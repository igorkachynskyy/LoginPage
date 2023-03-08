/* Replace with your SQL commands */
create table userstable (
    "id" serial primary key ,
    "email" varchar(255) not null unique,
    "username" varchar(255) not null unique,
    "firstname" varchar(255) not null,
    "lastname" varchar(255) not null,
    "password" varchar(255) not null
);