import React, { PureComponent } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select, ItemRenderer, ItemPredicate } from '@blueprintjs/select';
import './FilterInput.css';

interface IProps {
  values: string[];
  name: string;
  label: string;
  onFilterChange: any;
}

interface IState {
  values: any;
  selection?: string;
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

class FilterInput extends PureComponent<IProps, IState> {
  public state: IState = {
    values: this.props.values
  };

  public constructor(props: IProps) {
    super(props);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({ values: nextProps.values });
  }

  private onOptionChange = (selectedOption: ISelect) => {
    this.setState({ selection: selectedOption.value });
    this.props.onFilterChange(this.props.name, selectedOption.value);
  };

  render() {
    const { values, selection } = this.state;
    const items = values.map((v: string) => ({ value: v }));
    return (
      <div className="FilterInput">
        <ValueSelect
          items={items}
          onItemSelect={this.onOptionChange}
          itemRenderer={renderSelect}
          itemPredicate={filterSelect}
          noResults={<MenuItem disabled={true} text="Aucun résultat." />}
        >
          <Button
            text={selection ? selection : this.props.label}
            rightIcon="double-caret-vertical"
          />
        </ValueSelect>
      </div>
    );
  }
}

export default FilterInput;
