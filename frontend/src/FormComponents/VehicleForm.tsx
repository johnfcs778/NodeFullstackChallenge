import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Vehicle } from '../ApplicationForm/ApplicationForm';

interface IVehicleFormProps {
    vehicleNum: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    vehicle: Vehicle;
}

const VehicleForm = (props: IVehicleFormProps) => {
    return (
        <Form.Group controlId="vehicle1">
            <Form.Label>{props.vehicleNum}</Form.Label>
            <Form.Control
              type="text"
              placeholder={props.vehicleNum + "vin"}
              value={props.vehicle.vin}
              onChange={props.handleChange}
            />
            <Form.Control
              type="text"
              placeholder={props.vehicleNum + "year"}
              value={props.vehicle.year}
              onChange={props.handleChange}
            />
            <Form.Control
              type="text"
              placeholder={props.vehicleNum + "make"}
              value={props.vehicle.make}
              onChange={props.handleChange}
            />
            <Form.Control
              type="text"
              placeholder={props.vehicleNum + "model"}
              value={props.vehicle.model}
              onChange={props.handleChange}
            />
          </Form.Group>
    );
 }

export default VehicleForm;