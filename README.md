# Concurrent Ticket Booking System using Redis

## Description
This project implements a concurrent ticket booking system with seat locking using Redis.  
It prevents multiple users from booking the same seat at the same time.

## Technologies Used
- Node.js
- Express.js
- Redis

## Features
- Initialize seats
- View seat status
- Book seats
- Redis locking to prevent double booking

## API Endpoints

Initialize seats
GET /init

View seats
GET /seats

Book seat
POST /book/:seatId

Example:
POST /book/1

## How to Run

1. Install dependencies
npm install

2. Start server
node server.js

3. Test in browser
http://localhost:3000/init
http://localhost:3000/seats

## Author
Muskan Singhal
B.Tech CSE (AI & ML)