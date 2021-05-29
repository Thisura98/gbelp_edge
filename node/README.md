# Node Server for EDGE - Game based E-Learning Platform

Code for the backend server of the project

## Directory Structure

```txt

# FILES
app.js - Server Bootstrap file
config.json - Server Configuration settings

# FOLDERS
src - Contains most of the server source code
assets - Non-frontend assets (see angular folder for frontend)
fs - Server File System folder mountpoint for symlinks

```


## `config.json`

| Property               | Description                                | Values                    |
| ---------------------- | ------------------------------------------ | --------------------------|
| environment            | Which ENV the server is in                 | development, uat, release |