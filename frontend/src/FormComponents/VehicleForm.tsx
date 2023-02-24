/**
 *  This file defines a react component for Vehicle form entries
 *  Author: John Fahnestock
 */

import React from 'react';
import { Form } from 'react-bootstrap';
import { ApplicationFormData } from '../ApplicationForm/ApplicationForm';

interface IVehicleFormProps {
  vehicleIndex: number;
  vehicleNum: string;
  formData: ApplicationFormData;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const VehicleForm = (props: IVehicleFormProps) => {

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleFormChange(event);
  };

  return (
    <Form.Group controlId={(props.vehicleIndex+1).toString()}>
      <Form.Label>{props.vehicleNum}</Form.Label>
      <Form.Control
        type="text"
        placeholder={props.vehicleNum + " vin"}
        value={props.formData.vehicles[props.vehicleIndex].vin}
        onChange={handleFormChange}
      />
      <Form.Control
        type="text"
        placeholder={props.vehicleNum + " year"}
        value={props.formData.vehicles[props.vehicleIndex].year}
        onChange={handleFormChange}
      />
      <Form.Control
        type="text"
        placeholder={props.vehicleNum + " make"}
        value={props.formData.vehicles[props.vehicleIndex].make}
        onChange={handleFormChange}
      />
      <Form.Control
        type="text"
        placeholder={props.vehicleNum + " model"}
        value={props.formData.vehicles[props.vehicleIndex].model}
        onChange={handleFormChange}
      />
    </Form.Group>
  );
}

export default VehicleForm;