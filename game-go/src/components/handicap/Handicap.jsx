import React from "react";
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const Handicap = () => {
    let [handicap, setHandicap] = useState('1');
  return (
    <RadioGroup value={handicap} onChange={setHandicap}>
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <RadioGroup.Option value='1'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 1</span>}</RadioGroup.Option>
      <RadioGroup.Option value='2'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 2</span>}</RadioGroup.Option>
      <RadioGroup.Option value='3'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 3</span>}</RadioGroup.Option>
      <RadioGroup.Option value='4'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 4</span>}</RadioGroup.Option>
      <RadioGroup.Option value='5'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 5</span>}</RadioGroup.Option>
      <RadioGroup.Option value='6'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 6</span>}</RadioGroup.Option>
      <RadioGroup.Option value='7'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 7</span>}</RadioGroup.Option>
      <RadioGroup.Option value='8'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 8</span>}</RadioGroup.Option>
      <RadioGroup.Option value='9'>{({ checked }) => <span className={checked ? "bg-blue-200" : ""}>Handicap: 9</span>}</RadioGroup.Option>
    </RadioGroup>
  );
};

export default Handicap;
