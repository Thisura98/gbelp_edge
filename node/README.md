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


## Debugging with Chrome DevTools

Because this project uses Typescript for server code, you cannot run the server with the `node` command. Instead, `ts-node` is used. If your system does not have this installed globally, use `npx ts-node` instead.

A side-effect is that you also cannot debug the server application using the `node --inspect` command. A different command is used instead. It is as follows.

```shell
node -r ts-node/register --inspect index.ts
```

__Explanation:__
- `node` Instructs the CLI to start the node program.
    - `-r` is a shorthand for `--require`
    - `ts-node/register` is a Node module that opens `ts-node` in REPL mode
    - `--inspect` tells node to activate debugging capabilities
    - `index.ts` is the main entry point of our Typescript server application

Once the above command is executed, it is possible to debug this application through Chrome DevTools. The steps for debugging are mentioned below.

1. Open the Chrome Browser.
2. Type `chrome:inspect` in the address bar.
3. Find this application instance under the "Remote Target" list.
4. Click "inspect".

Now it is possible to debug the application just as you would debug a Javascript based Web Application on the Browser. Some features such as the DOM are missing since they are not applicable to server applications.

Happy Debugging!
-Dodangoda 5/9/2021.