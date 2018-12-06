import React, { useState, useEffect } from 'react';
import FilterInput from './FilterInput';
import './Filters.css';

interface IProps {
  onFilterChange: any;
}

interface IInputs {
  inputsFilter: any;
}

const Filters: React.SFC<IProps> = (props: IProps) => {
  const [inputs, setInputs] = useState<IInputs>({ inputsFilter: undefined });
  const { onFilterChange } = props;

  useEffect(() => {
    fetch('https://v86y9ouqxb.execute-api.eu-west-1.amazonaws.com/dev/inputs')
      .then(res => res.json())
      .then(
        result => {
          setInputs(result);
        },
        error => {
          console.log(error);
        }
      );
  });

  const getFilterInputValues = (inputLabel: string): string[] =>
    inputs.inputsFilter ? inputs.inputsFilter[inputLabel] : [];

  const genFilterInput = (name: string, label: string) => (
    <FilterInput
      values={getFilterInputValues(name)}
      name={name}
      label={label}
      onFilterChange={onFilterChange}
    />
  );

  return (
    <div className="Filters">
      {genFilterInput('compTerit', 'Compétance Territoriale')}
      {genFilterInput('specialite', 'Spécialité')}
      {genFilterInput('domaine', 'Domaine')}
    </div>
  );
};

export default Filters;
