# Game base E-Learning Platform (codename: Edge)
Repo for the UCSC MIT 3201 Thesis Project

## Project Structure

```txt
angular - Angular Frontend NPM project
node - Node Backend (with Express and Socket I/O) NPM Project
node/dist - Angular Frontend built using ng build
scripts - Project Scaffolding projects
resources - Misc. Project Resources (images, text files, etc.)
db - Database Backups, Seed Scripts, Schemas, Docker Compose Files
```

## Scripts & Commands

### 1. DB
Scripts in `/db` folder

- `start.sh` - Start docker instance with MongoDB and MySQL (+admin panels)

### 2. Node
Scripts in `/node` folder

- `start.sh` - Start Nodemon on server

Postman Collection is available from [this link](https://www.getpostman.com/collections/8eeac3e774c23078aab1).

### 3. Angular
Scripts & commands in `/angular` folder

- `ng serve` - Start Angular server
- `build_to_node.sh` - Build Angular project into /node/dist folder

## Software Requirements

1. Node
[Download Link](https://nodejs.org/en/download/)

2. Angular CLI
```shell
npm install -g @angular/cli
```

3. Docker Compose, Docker CLI
[Download Link](https://docs.docker.com/get-docker/)
