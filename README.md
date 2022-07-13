# Task Time Tracker
## Table of Content
* [General Info](#general-info)
* [Demo](#demo)
* [Technologies](#technologies)
* [Setup](#setup)
* [Future Plans](#future-work)

## General Info
This project is a simple to-do list app created for the purpose of helping me manage my tasks through the day and keep track of my allocated time per task to help improve productivity.

Planning [doc](https://docs.google.com/document/d/1th8t0-3OjnLFcPw42Mge2p-lQod8g1bmhrKZyiIcigE/edit?usp=sharing). 

## Demo
Live deploy <https://time-tracking-helper.herokuapp.com>

To access dashboard, register a new account through the link on the login form or use credentials:   
**email**: demo.user@gmail.com<br>
**password**: 12345<br>

### Screenshots
![Todo App Login](https://drive.google.com/uc?export=view&id=1DhiPw2Cw0tPSrg85ZjUbj3WZNx_hlS-E/)

## Technologies
**Task Time Tracker** was created with:
* Frontend: React (v18.01)
* Backend: Node.js (v17.8.0), Express (4.18.1), jsonwebtoken (v8.5.1), pg (v8.7.3)
* Database: PostgreSQL 14, Heroku Postgres (v14.4)
* Deployment: Heroku

## Setup
To run this project locally using npm:
    $ cd todo-for-time-track
    $ npm run start-local

Access the app on http://localhost:3001

## Future Work
* Instrument project with unit, integration, end-to-end tests
* Configure CI/CD on heroku platform
* Polish UI visual transitions
* Further develop UI with additional feature such as adding Admin page to edit user details, tabulate tasks by 'completed' and 'expired', adding user profile images. 


