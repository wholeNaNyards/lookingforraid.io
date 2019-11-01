import React from 'react';
import { Row, Col } from 'react-bootstrap';

import FormInputButton from './FormInputButton';

import './FormInputGroup.css';

const compare = (val1, val2, type) => {
  if (type === 'checkbox') {
    return val2 instanceof Array && val2.indexOf(val1) !== -1;
  }
  if (type === 'radio') {
    return val1 === val2;
  }
  return false;
};

const FormInputGroup = ({ action, compareValue, dataList, label, name, onChange, type }) => {
  return (
    <Row className="form-input-group">
      <Col sm={3}>{label && <label>{label}</label>}</Col>
      <Col sm={9}>
        {dataList.map((data, i) => (
          <FormInputButton
            action={action}
            checked={compare(data.value, compareValue, type)}
            icon={data.icon}
            key={i}
            name={name}
            onChange={onChange}
            text={data.text}
            type={type}
            value={data.value}
          />
        ))}
      </Col>
    </Row>
  );
};

export default FormInputGroup;
