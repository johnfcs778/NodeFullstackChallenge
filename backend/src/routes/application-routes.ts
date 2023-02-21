import express from 'express';
import { ApplicationDao } from '../dao/application-dao.js';
import ApplicationModel from '../models/Application.js'

const router = express.Router();
const dao = new ApplicationDao('application_db.db');


router.get('/applications', (req, res) => {
  res.json({"users": ["User1", "User2", "User3"]})
});


// GET /api/applications/:id - get an application by id
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await dao.getApplication(req.params.id);
    res.json(application);
  } catch (err) {
    console.error(`Error retrieving application: ${err}`);
    res.status(500).send(`Error retrieving application: ${err}`);
  }
});

// PUT /api/applications/:id - update an application by id
router.put('/applications/:id', async (req, res) => {
  try {
    const application = new ApplicationModel(
      req.body.firstName,
      req.body.lastName,
      req.body.dateOfBirth,
      req.body.address,
      req.body.vehicles
    );
    await dao.updateApplication(req.params.id, application);
    res.status(204).send();
  } catch (err) {
    console.error(`Error updating application: ${err}`);
    res.status(500).send(`Error updating application: ${err}`);
  }
});

export default router;
