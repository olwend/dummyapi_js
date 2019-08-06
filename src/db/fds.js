const {ObjectID} = require('mongodb');
const {getDatabase} = require('./mongo');

const collectionName = 'fds';

async function insertFd(fd) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(fd);
    return insertedId;
}

async function getFds() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteFd(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function getOne(id) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({
        _id: new ObjectID(id),
    });
}

async function updateFd(id, fd) {
    const database = await getDatabase();
    delete fd._id;
    await database.collection(collectionName).update(
        {_id: new ObjectID(id), },
        {
            $set: {
                ...ad,
            },
        },
    );
}

module.exports = {
    insertFd,
    getFds,
    getOne,
    deleteFd,
    updateFd
};