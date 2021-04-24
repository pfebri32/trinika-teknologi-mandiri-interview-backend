# Trinika Teknologi Mandiri Inteview Backend

Hi! This project is only for technical inteview for a job that i seek. You can take a look to learn something or just looking around.

This backend has been created with Express.js and Multer for upload file. Database with SQL Environment and sequelize as ORM Tools.

# Installation

First you need to create new file named '.env' and write some configuration. Example :

    PORT=5000
    UPLOADS_URL=localhost:5000/uploads/

You can change with any configuration that you like but dont forget to change something inside too.

Secondly you need Node.js then go to project folder woth cmd or something similiar the write :

    npm install

Third, you need setup configuration for database.

> [project]/config/config.json

Fourth, it's time migrate all table that we need with sequelize.

    npx sequelize db:migrate

For last you just need to run it:

    npm start
