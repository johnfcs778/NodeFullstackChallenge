import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

interface ApplicationFormData {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const ApplicationForm = () => {
  //const { id } = props.match.params;
  //const { id } = useParams();
  const [searchParams] = useSearchParams();
  //const firstName =searchParams.get('firstName');

  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: searchParams.get('firstName') || '',
    lastName: searchParams.get('lastName') || '',
    dob: searchParams.get('dob') || '',
    street: searchParams.get('street') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    zip: searchParams.get('zipCode') || '',
  });
  const [formValid, setFormValid] = useState(false);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    console.log(value)
    setFormData({ ...formData, [id]: value });
    setFormValid(validateForm());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
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
