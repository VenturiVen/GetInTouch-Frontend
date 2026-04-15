# CS4135 Software Architecture Project: Get In Touch - Frontend

Visit the [wiki page](https://github.com/VenturiVen/GetInTouch-Frontend/wiki) to see documentation.

Visit the [backend repository](https://github.com/AronCalvert/CS4135-Software-Architecture).

## About
Get In Touch is a project created for CS4135 Software Architecture in the University of Limerick. We created it with the aim to make it easier for students to contact people in the university, such as lecturers, staff, and student officers. This repository includes the frontend app and backend server, visit the [frontend wiki]([https://github.com/AronCalvert/CS4135-Software-Architecture/wiki/Frontend-Documentation](https://github.com/VenturiVen/GetInTouch-Frontend/wiki/Frontend-Documentation)) and [backend wiki](https://github.com/AronCalvert/CS4135-Software-Architecture/wiki/Backend-Documentation) pages to find out more!

## Contributors
| Name | Roles |
|----|----|
[Aron Calvert](https://github.com/AronCalvert) | Backend
[Leo O'Shea](https://github.com/VenturiVen) | Frontend
[Eric Lonergan](https://github.com/Eric1642) | Backend
[Luke Minogue](https://github.com/LM-22347526) | Backend
[Raid Mouras](https://github.com/RaidMouras) | Frontend

## Deploy Container for both Frontend and Backend
### Pre-Requisites
- Clone both Frontend and Backend Repositories into one folder (e.g., 'Dev/Frontend', 'Dev/Backend')

### Setup
1. Open Docker if not already open
2. In /GetInTouch-Backend, view the Docker-compose.yml file for a list of Docker commands
3. Change terminal directory to /GetInTouch-Backend (e.g., run: cd GetInTouch-Backend)
4. In this directory, run 'docker compose up --build'
5. After completion, project will have been built, the project container and images should be running inside Docker

## Frontend Dev Environment Setup
### Pre-Requisites
- Clone Frontend repository

### Run Frontend Development Environment
1. Change terminal directory to /GetInTouch-Frontend (e.g., run: cd GetInTouch-Frontend)
2. Create a .env file with a constant called 'VITE_BACKEND_URL' and set it to the backend's url (e.g., 'VITE_BACKEND_URL=http://localhost:8080')
3. Run 'npm install'
5. Run 'npm run dev'

##

© 2026 Aron Calvert, Leo O'Shea, Eric Lonergan, Luke Minogue, & Raid Mouras. All rights reserved.
