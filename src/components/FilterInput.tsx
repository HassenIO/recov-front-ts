import React, { useState, useEffect } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select, ItemRenderer, ItemPredicate } from '@blueprintjs/select';
import './FilterInput.css';

interface IProps {
  values: string[];
  name: string;
  label: string;
  onFilterChange(name: string, value: string): void;
}

interface ISelect {
  value: string;
}

const renderSelect: ItemRenderer<ISelect> = (
  selectValue,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={selectValue.value}
      onClick={handleClick}
      text={selectValue.value}
    />
  );
};

const filterSelect: ItemPredicate<ISelect> = (
  query: string,
  selectValue: ISelect
) => {
  return selectValue.value
    ? selectValue.value.toLowerCase().indexOf(query.toLowerCase()) >= 0
    : false;
};

const ValueSelect = Select.ofType<ISelect>();

const FilterInput: React.SFC<IProps> = (props: IProps) => {
  const [values, setValues] = useState<string[]>(props.values);
  const [selection, setSelection] = useState<string>('');

  const onOptionChange = (selectedOption: ISelect) => {
    setSelection(selectedOption.value);
    props.onFilterChange(props.name, selectedOption.value);
  };

  useEffect(
    () => {
      setValues(props.values);
    },
    [props.values]
  );

  return (
    <div className="FilterInput">
      <ValueSelect
        items={values.map((v: string) => ({ value: v }))}
        onItemSelect={onOptionChange}
        itemRenderer={renderSelect}
        itemPredicate={filterSelect}
        noResults={<MenuItem disabled={true} text="Aucun résultat." />}
      >
        <Button
          text={selection ? selection : props.label}
          rightIcon="double-caret-vertical"
          style={{ width: '300px' }}
        />
      </ValueSelect>
    </div>
  );
};

export default FilterInput;
