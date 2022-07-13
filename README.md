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
> **email**: demo.user@gmail.com<br>
> **password**: 12345<br>

### Screenshots
![Todo App Login](https://user-images.githubusercontent.com/5581397/178775913-a1fbb6e4-aad3-491a-b24d-4fba9a9913cd.png)
![Registration](https://user-images.githubusercontent.com/5581397/178776026-aeb93895-4227-4cd4-85a3-29f7c56cd3d8.png)
![Task Dashboard](https://user-images.githubusercontent.com/5581397/178776078-654202fd-7401-4879-a8c3-8d93e4864028.png)
![Create Task](https://user-images.githubusercontent.com/5581397/178776161-33822d7c-3bd6-4ac5-8623-fe0c8a964dc0.png)
![View Task](https://user-images.githubusercontent.com/5581397/178776200-a2b2bd71-52c9-460d-b228-37757f6fa666.png)
![Update](https://user-images.githubusercontent.com/5581397/178776223-60348bca-34d0-46ed-baf4-3c06dd746964.png)
![Delete](https://user-images.githubusercontent.com/5581397/178776244-b05b7057-8992-4658-a01c-539da7ae14d7.png)


## Technologies
**Task Time Tracker** was created with:
* Frontend: React (v18.01)
* Backend: Node.js (v17.8.0), Express (4.18.1), jsonwebtoken (v8.5.1), pg (v8.7.3)
* Database: PostgreSQL 14, Heroku Postgres (v14.4)
* Deployment: Heroku

## Setup
To run this project locally using npm:<br>
>$ cd todo-for-time-track<br>
>$ npm run start-local

Access the app on http://localhost:3001

## Future Work
* Instrument project with unit, integration, end-to-end tests
* Configure CI/CD on heroku platform
* Polish UI visual transitions
* Further develop UI with additional feature such as adding Admin page to edit user details, tabulate tasks by 'completed' and 'expired', adding user profile images. 


