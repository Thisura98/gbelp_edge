# DB

Start Persistence layers and their preffered admin portals using one single command:
`docker compose up`.

## Key Features 

- Volumes are used to persist information
- Mongo uses Mongo-express for Admin
- MySQL uses phpmyadmin for Admin
- Hostname for MySQL is mysqlhost
- Hostname for Mongo is mongohost


## Admin Panels

- [localhost:7001](localhost:7001) - Mongo Express
- [localhost:9004](localhost:9004) - phpmyadmin

## Initial usernames and passwords

- Mongo: `root:root`
- MySQL: `root:root`

> In case these values are changed, run `docker compose up --force-recreate` to update the changes in the container.