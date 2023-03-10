/**
 *  This file defines the main react Component which defines the Application Form
 *  Author: John Fahnestock
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import VehicleForm from '../FormComponents/VehicleForm';
import axios from 'axios';

export interface Vehicle {
  vin: string;
  year: string;
  make: string;
  model: string;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  vehicles: Vehicle[];
}

const ApplicationForm = () => {

  // Application Component State initialization
  const [searchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState('');
  const [quotePrice, setQuotePrice] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: searchParams.get('firstName') || '',
    lastName: searchParams.get('lastName') || '',
    dob: searchParams.get('dob') || '',
    street: searchParams.get('street') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    zip: searchParams.get('zipCode') || '',
    vehicles: [
      { vin: "", year: "", make: "", model: "" },
      { vin: "", year: "", make: "", model: "" },
      { vin: "", year: "", make: "", model: "" }
    ]
  });
  const [formValid, setFormValid] = useState(false);

  // On application load, instead of passing all vehicle data in through the URL, 
  // using the vehicle ids in the URL, load the vehicle data into the form on component load
  const vehicleIds = searchParams.get('vehicles')?.split(',');
  useEffect(() => {
    if (vehicleIds) {
      let index = 0;
      for (const vid of vehicleIds) {
        axios.get("api/v1/vehicles/" + vid).then(reponse => {
          const newVehicles: Vehicle[] = formData.vehicles;
          newVehicles[index] = { ...reponse.data }
          setFormData(prevFormData => ({
            ...prevFormData,
            vehicles: newVehicles
          }));
          index++;
        })
      }
    }
  }, [])

  // Event Handlers
  const handleHideSuccess = () => {
    setShowSuccess('');
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setFormValid(validateForm());
  };

  const handleVehicleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const prevVehicles: Vehicle[] = formData.vehicles;
    const vehicleProperty = event.target.placeholder.split(' ')[2];
    switch (vehicleProperty) {
      case 'vin':
        prevVehicles[parseInt(id)-1].vin = value;
        break;
      case 'year':
        prevVehicles[parseInt(id)-1].year = value;
        break;
      case 'make':
        prevVehicles[parseInt(id)-1].make = value;
        break;
      case 'model':
        prevVehicles[parseInt(id)-1].model = value;
        break;
    }
    setFormData({...formData, vehicles: prevVehicles})

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission, validate the application and return the price
    axios.post('api/v1/applications/validate', formData)
      .then(response => {
        if(response.data.Validated) {
          setShowSuccess('true');
          setQuotePrice(response.data.QuotePrice)
        } else {
          setShowSuccess('false')
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  const validateForm = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.dob.trim() !== '' &&
      formData.street.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.zip.trim() !== ''
    );
  };


  return (
    <Container className="my-4 p-4 border rounded">
        {showSuccess !== '' && showSuccess === 'true' && 
        <Alert variant="success" onClose={handleHideSuccess} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
          <p>
            Your application has been validated! Quote Price: {quotePrice}
          </p>
        </Alert>
       }{showSuccess !== '' && showSuccess === 'false' && 
        <Alert variant="danger" onClose={handleHideSuccess} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>
            There was a problem with your application
          </p>
        </Alert>
      }
      <h2 className="text-center mb-4">Application Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date of birth"
            value={formData.dob}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter street"
            value={formData.street}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="zip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zip code"
            value={formData.zip}
            onChange={handleFormChange}
          />
        </Form.Group>
        <VehicleForm vehicleNum='Vehicle 1' vehicleIndex={0} formData={formData} handleFormChange={handleVehicleFormChange} />
        <VehicleForm vehicleNum='Vehicle 2' vehicleIndex={1} formData={formData} handleFormChange={handleVehicleFormChange} />
        <VehicleForm vehicleNum='Vehicle 3' vehicleIndex={2} formData={formData} handleFormChange={handleVehicleFormChange} />
        <div className="d-flex justify-content-center">
          <Button type="submit" disabled={!formValid}>
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ApplicationForm;
