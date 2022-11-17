/*import posts from "./tuits.js";*/

import * as tuitsDao from './tuits-dao.js'

/*let tuits = posts;*/

const createTuit = async (req, res) => {
    const newTuit = req.body;
    /*newTuit._id = (new Date()).getTime();*/
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;
    newTuit.dislikes = 0
    const insertedTuit = await tuitsDao.createTuit(newTuit)
    /*tuits.push(newTuit);*/
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    /*const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};*/
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.sendStatus(200);
}

const deleteTuit = async (req, res) => {
    const tuitIdToDelete = req.params.tid;
    /*tuits = tuits.filter(t =>
                             t._id !== tuitIdToDelete);*/
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
