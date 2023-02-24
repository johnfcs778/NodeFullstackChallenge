import express from 'express';
import { ApplicationDao } from '../dao/application-dao.js';
import ApplicationModel, {Address, Vehicle} from '../models/Application.js'
import { generateQueryString, areAllFieldsNonNull } from '../Utilities/QueryHelper.js';

const router = express.Router();
const dao = new ApplicationDao('application_db.db');


router.get('/applications', (req, res) => {
  res.json({"users": ["User1", "User2", "User3"]})
});


// GET /api/v1/applications/:id - get an application by id
router.get('/applications/:lastName', async (req, res) => {
  try {
    const application = await dao.getApplicationByName(req.params.lastName);
    res.json(application);
  } catch (err) {
    console.error(`Error retrieving application: ${err}`);
    res.status(500).send(`Error retrieving application: ${err}`);
  }
});

// GET /api/v1/vehicles/id
router.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await dao.getVehicleByID(req.params.id);
    res.json(vehicle);
  } catch (err) {
    console.error(`Error retrieving vehicle: ${err}`);
    res.status(500).send(`Error retrieving vehicle: ${err}`);
  }
});

// POST /applications
router.post('/applications', async (req, res) => {
  const data = req.body;
  const address: Address = { street: data.street, city: data.city, zipCode: data.zip, state: data.state}
  const vehicles: Vehicle[] = data.vehicles.map((item: Vehicle) => {
    return {vin: item.vin, year: item.year.toString(), make: item.make, model: item.model }
  })
  const vehicleIds: string[] = await dao.addVehicles(vehicles);
  const application = new ApplicationModel(data.firstName, data.lastName, data.dob, address, vehicleIds);
  const id = await dao.addApplication(application);
  if (id) {
    res.type('text/plain')
    res.send("localhost:3000/application"+generateQueryString(application))
  } else {
    res.sendStatus(500);
  }
});

// POST /applications/price
router.post('/applications/price', async (req, res) => {
  const data = req.body;
  const address: Address = { street: data.street, city: data.city, zipCode: data.zip, state: data.state}
  const vehicles: Vehicle[] = data.vehicles.map((item: Vehicle) => {
    return {vin: item.vin, year: item.year.toString(), make: item.make, model: item.model }
  })

  let validated = false;
  if(vehicles.length > 1 && vehicles.length <= 3 && areAllFieldsNonNull(data)) {
    validated = true
  }

  res.type('text/json')
  res.send({"Quote Price": Math.floor(Math.random() * 1000) + 1, "Validated": validated});

});

//PUT /api/applications/:id - update an application by id
router.put('/applications', async (req, res) => {
  try {
    const data = req.body;
    const address: Address = { street: data.street, city: data.city, zipCode: data.zipCode, state: data.state}
    const vehicles: Vehicle[] = data.vehicles.map((item: Vehicle) => {
      return {vin: item.vin, year: item.year.toString(), make: item.make, model: item.model }
    })
    console.log(vehicles)
    const application = new ApplicationModel(
      data.firstName,
      data.lastName,
      data.dob,
      address,
      []
    );
    const resp = await dao.updateApplicationByFirstLastName(data.firstName, data.lastName, application, vehicles);
    res.status(204).send(resp);
  } catch (err) {
    console.error(`Error updating application: ${err}`);
    res.status(500).send(`Error updating application: ${err}`);
  }
});

export default router;
