//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./db/mongo');
const {insertFd, getFds, getOne, deleteFd, updateFd}  = require('./db/fds');

//define express app
const app = express();

// helmet to enhance API security
app.use(helmet());

//bodyParser to parse JSON bodies -> objects
app.use(bodyParser.json());

//enabling CORS for requests
app.use(cors());

//adding morgan to log http requests
app.use(morgan('combined'));


// start the in-memory MongoDB instance
startDatabase().then(async () =>{
    await insertFd({email:"a@aa.com", title:"Garmin ForeRunner 235", api:"Aikido Monkey"});
    // await insertFd({email:"b@bb.com", title:"Garmin ForeRunner 935", api:"Biker Monkey"});
    // await insertFd({email:"c@cc.com", title:"FitBit", api:"FitBit Web API"});
    // await insertFd({email:"d@dd.com", title:"Apple watch", api:"Health Records"});
});

//ROUTES
//GET 
app.get("/", async (req, res) => {
    res.send(await getFds());
});

//byID 
app.get("/tracker", async (req, res) => {
    const result = await getOne(req.query._id);
    console.log(result);
    res.send(result);
})
//byEmail?

//POST 
app.post('/', async (req, res) => {
    console.log(req.body);
    await insertFd(req.body);
    res.send({ message: 'Fitness device added'});
});

//DELETE 
app.delete('/:id', async (req, res) => {
    console.log(req.route);       
    await deleteFd(req.params.id);
    res.send({ message: 'Fitness device removed'});
});

//PUT 
app.put('/:id', async (req, res) => {
    const update = req.body;
    await updateFd(req.params.id, update);
    console.log(update);
    console.log(req.route);  
    res.send({ message: 'Fitness device updated'});

});

//start the server
app.listen(3001, async () => {
    console.log("listening on port 3001");
});
