const server     = require('../../server').server;
const mongoose   = require ('mongoose');
const multer     = require('multer');
const upload     = multer({ dest: 'uploads/' });

module.exports = function() {

    server.post('/upload', upload.single('file'), function (req, res) {

        console.log(req.file);
        res.sendStatus(200);

    });

    server.get('/projects', (req, res) => {

        const Project = mongoose.model('Project');

        Project.find(function (err, docs) {

            if (err) {
                res.status(400).send(err);
            } else {
                res.send(docs);
            }

        });

    });

    server.post('/project', (req, res)=> {

        const data = req.body;

        const Project = mongoose.model('Project');

        const newProject = new Project(data);

        newProject.save(function (err) {

            if (err) {
                console.log(err);
                res.status(400).send(err);

            } else {

                res.send(newProject);

            }


        });

    });

    server.delete('/project/:id', (req, res)=> {

        const projectId = req.params.id;

        const Project = mongoose.model('Project');

        Project.findByIdAndRemove(projectId, function (err, doc) {

            if (!err) {
                res.send(doc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    server.get('/project/:id', (req, res)=> {

        const projectId = req.params.id;

        const Project = mongoose.model('Project');

        Project.findById(projectId, (err, doc)=> {

            if (!err) {
                res.send(doc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    server.put('/project/:id', (req, res)=> {

        const projectId = req.params.id;

        const projectData = req.body;

        const Project = mongoose.model('Project');

        Project.findByIdAndUpdate(projectId, projectData, {new: true}, function (err, doc) {

            if (!err) {
                res.send(doc);
            } else {
                res.status(400).send(err);
            }

        });

    });

};
