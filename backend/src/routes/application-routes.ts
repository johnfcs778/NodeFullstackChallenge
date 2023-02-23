import express from 'express';
import { ApplicationDao } from '../dao/application-dao.js';
import ApplicationModel, {Address} from '../models/Application.js'
import { generateQueryString } from '../Utilities/QueryHelper.js';

const router = express.Router();
const dao = new ApplicationDao('application_db.db');


router.get('/applications', (req, res) => {
  res.json({"users": ["User1", "User2", "User3"]})
});


// GET /api/applications/:id - get an application by id
router.get('/applications/:lastName', async (req, res) => {
  try {
    const application = await dao.getApplicationByName(req.params.lastName);
    res.json(application);
  } catch (err) {
    console.error(`Error retrieving application: ${err}`);
    res.status(500).send(`Error retrieving application: ${err}`);
  }
});

// POST /applications
router.post('/applications', async (req, res) => {
  const data = req.body;
  console.log(data)
  const address: Address = { street: data.street, city: data.city, zipCode: data.zip, state: data.state}
  const application = new ApplicationModel(data.firstName, data.lastName, data.dob, address);
  console.log(application);
  const id = await dao.addApplication(application);
  if (id) {
    res.type('text/plain')
    res.send("localhost:3000/application"+generateQueryString(application))
    //res.json(generateQueryString(application));
  } else {
    res.sendStatus(500);
  }
});

// PUT /api/applications/:id - update an application by id
router.put('/applications/:id', async (req, res) => {
  try {
    const data = req.body;
    const address: Address = { street: data.street, city: data.city, zipCode: data.zipCode, state: data.state}
    const application = new ApplicationModel(
      data.firstName,
      data.lastName,
      data.dob,
      address
    );
    await dao.updateApplication(req.params.id, application);
    res.status(204).send();
  } catch (err) {
    console.error(`Error updating application: ${err}`);
    res.status(500).send(`Error updating application: ${err}`);
  }
});

export default router;
