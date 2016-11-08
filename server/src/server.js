import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
// import multer from 'multer';

var moment = require('moment');

class Server {
    constructor(){
        this.app = express();
        this.fs = fs;
        this.dataFile  = path.join(__dirname, '../data.json');
    }

    configureApp() {
        this.app.set('port', (process.env.PORT || 3000));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    configureCORS(){
        // Additional middleware which will set headers that we need on each request.
        this.app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // Disable caching so we'll always get the latest comments.
            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes(){
        this.app.get('/api/todos', (req, res) => {
            this.fs.readFile(this.dataFile, (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                res.json(JSON.parse(data));

            });
        });
        this.app.post('/api/todos', (req, res) => {
            this.fs.readFile(this.dataFile, (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                var todos = JSON.parse(data);
                var newTodo = {
                    id: req.body.id,
                    activity: req.body.activity,
                    cost: req.body.cost,
                    weather: req.body.weather,
                    timestamp: moment().unix()
                };
                todos.push(newTodo);
                this.fs.writeFile(this.dataFile, JSON.stringify(todos, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(todos);
                });
            });
        });
        this.app.put('/api/todos/:id', (req, res) => {
            this.fs.readFile(this.dataFile, (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                let todos = JSON.parse(data);
                let idIndex = 0;
                let findTodoById = todos.filter(todo => {
                        if(todo.id == req.params.id) {
                            idIndex = todos.indexOf(todo);
                            return todo;
                        }
                });
                findTodoById[0].text = req.body.text;
                findTodoById[0].author = req.body.author;

                todos.splice(idIndex, 1, findTodoById[0]);
                this.fs.writeFile(this.dataFile, JSON.stringify(todos, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(todos);
                });
            });
        });
        this.app.delete('/api/todos/:id', (req, res) => {
            this.fs.readFile(this.dataFile, (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                let todos = JSON.parse(data);
                let idIndex = null;
                let findTodoById = todos.filter(todo => {
                    if(todo.id == req.params.id) {
                        idIndex = todos.indexOf(todo);
                        return todo;
                    }
                });
                if(idIndex >= 0){
                    todos.splice(idIndex, 1);
                }
                this.fs.writeFile(this.dataFile, JSON.stringify(todos, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(todos);
                });
            });
        });
    }

    listen(port){
        this.app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}/`);
        });
    }

    run(){
        this.configureApp();
        this.configureCORS()
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Server;
