const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');


router.get('/', (req, res) => {
  Assignment.getAll()
    .then(assignments => {
      res.send(assignments);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  Assignment.getOne(req.params.id)
    .then(assignment => {
      res.send(assignment);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});


router.post('/', (req, res) => {
  Assignment.create(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.delete('/:id', (req, res) => {
  Assignment.delete(req.params.id)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.put('/:id', (req, res) => {
  Assignment.update(req.params.id, req.body)
    .then(() => {
      return Assignment.getOne(req.params.id);
    })
    .then(assignment => {
      res.send(assignment);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;