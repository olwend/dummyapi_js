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
    await insertFd({title:"Garmin ForeRunner 235", api:"Aikido Monkey"});
    await insertFd({title:"Garmin ForeRunner 935", api:"Biker Monkey"});
    await insertFd({title:"FitBit", api:"FitBit Web API"});
    await insertFd({title:"Apple watch", api:"Health Records"});
})


//ROUTES
//GET
app.get("/", async (req, res) => {
    res.send(await getFds());
});

app.get("/tracker", async (req, res) => {
    const query = req.query._id;
    const result = await getOne(query);
    console.log(result);
    res.send(result);
})

//POST
app.post('/', async (req, res) => {
    const newAd = req.body;
    await insertFd(newFd);
    res.send({ message: 'Fitness device added'});
});

//DELETE
app.delete('/:id', async (req, res) => {
    await deleteFd(req.params.id);
    console.log(res.body);
    res.send({ message: 'Fitness device removed'});
});

//PUT
app.put('/:id', async (req, res) => {
    const update = req.body;
    await updateFd(req.params.id, update);
    res.send({ message: 'Fitness device updated'});

});

//start the server
app.listen(3001, async () => {
    console.log("listening on port 3001");
});
