# Game base E-Learning Platform (codename: Edge)
Repo for the UCSC MIT 3201 Thesis Project

## Project Structure

```txt
angular - Angular Frontend NPM project
node - Node Backend (with Express and Socket I/O) NPM Project
node/dist - Angular Frontend built using ng build
scripts - Project Scaffolding projects
resources - Misc. Project Resources (images, text files, etc.)
```

## Scripts & Commands

### Node
Scripts in `/node` folder

- `start.sh` - Start Nodemon on server

### Angular
Scripts & commands in `/angular` folder

- `ng serve` - Start Angular server
- `build_to_node.sh` - Build Angular project into /node/dist folder

### DB
Scripts in `/db` folder

- `start.sh` - Start docker instance with MongoDB and MySQL (+admin panels)

## Software Requirements

1. Node
[Download Link](https://nodejs.org/en/download/)

2. Angular CLI
```shell
npm install -g @angular/cli
```

3. Docker Compose, Docker CLI
[Download Link](https://docs.docker.com/get-docker/)
