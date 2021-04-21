const db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


module.exports = (app) => {
    
    app.get('/api/notes', (req, res) => res.json(db));

    app.post('/api/notes', (req, res) => {
        const note = req.body;
        note.id = uuidv4();
        db.push(note);

        fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(db), (err) => {
            err ? console.log(err) : console.log("note added")
        })
        res.json('/../db/db.json')
    });

    app.delete('/api/notes/:noteid', (req, res) => {
        const id = req.params.noteid
        for (let i =0; i< db.length; i++) {
            if (db[i].id === id) {
                db.splice(i,1)
                return res.status(201).send({
                    success: 'true',
                    message:'Note was successfully deleted.'
                })
            }
        }

    });
};