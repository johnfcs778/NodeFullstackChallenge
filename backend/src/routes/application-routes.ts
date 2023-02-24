/**
 *  This file defines endpoints for applications to perform CRU(D) operations
 *  Author: John Fahnestock
 */
import express from 'express';
import { ApplicationDao } from '../dao/application-dao.js';
import ApplicationModel, { Address, Vehicle } from '../models/Application.js'
import { generateQueryString, areAllFieldsNonNull } from '../Utilities/QueryHelper.js';

const router = express.Router();
const dao = new ApplicationDao('application_db.db');


/**
 * GET API endpoint to get an application given a last name
 */
router.get('/applications/:lastName', async (req, res) => {
  try {
    const application = await dao.getApplicationByName(req.params.lastName);
    res.json(application);
  } catch (err) {
    console.error(`Error retrieving application: ${err}`);
    res.status(500).send(`Error retrieving application: ${err}`);
  }
});

/**
 * GET API endpoint to get a vehicle given an ID
 */
router.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await dao.getVehicleByID(req.params.id);
    res.json(vehicle);
  } catch (err) {
    console.error(`Error retrieving vehicle: ${err}`);
    res.status(500).send(`Error retrieving vehicle: ${err}`);
  }
});

/**
 * POST API endpoint to add a new application into the database
 */
router.post('/applications', async (req, res) => {
  const data = req.body;
  const address: Address = { street: data.street, city: data.city, zipCode: data.zip, state: data.state }
  const vehicles: Vehicle[] = data.vehicles.map((item: Vehicle) => {
    return { vin: item.vin, year: item.year.toString(), make: item.make, model: item.model }
  })
  const vehicleIds: string[] = await dao.addVehicles(vehicles);
  const application = new ApplicationModel(data.firstName, data.lastName, data.dob, address, vehicleIds);
  const id = await dao.addApplication(application);
  if (id) {
    res.type('text/plain')
    res.send("localhost:3000/application" + generateQueryString(application))
  } else {
    res.sendStatus(500);
  }
});

/**
 * POST API endpoint to valdiate a started application and return a quote price
 */
router.post('/applications/validate', async (req, res) => {
  const data = req.body;
  const address: Address = { street: data.street, city: data.city, zipCode: data.zip, state: data.state }
  const vehicles: Vehicle[] = data.vehicles.map((item: Vehicle) => {
    return { vin: item.vin, year: item.year.toString(), make: item.make, model: item.model }
  })

  const minAgeDate = new Date();
  minAgeDate.setFullYear(minAgeDate.getFullYear() - 16);


  let validated = false;
  if (vehicles.length > 1 &&
    vehicles.length <= 3 &&
    areAllFieldsNonNull(data) &&
    new Date(data.dob) <= minAgeDate &&
    !isNaN(parseFloat(data.zip))) {
    validated = true
  }

  const minYear = 1985;
  const maxYear = new Date().getFullYear() + 1;
  for (let vehicle of vehicles) {
    if (vehicle.year < minYear || vehicle.year > maxYear) {
      validated = false;
    }
  }

  res.type('text/json')
  res.send({ "QuotePrice": Math.floor(Math.random() * 1000) + 1, "Validated": validated });

});

/**
 * PUT API endpoint to update an existing application
 */
router.put('/applications', async (req, res) => {
  try {
    const data = req.body;
    const address: Address = { street: data.street, city: data.city, zipCode: data.zipCode, state: data.state }
    const vehicles: Vehicle[] = data.vehicles.map((item: Vehicle) => {
      return { vin: item.vin, year: item.year.toString(), make: item.make, model: item.model }
    })
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
