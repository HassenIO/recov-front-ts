import React, { Component } from 'react';
import FilterInput from './FilterInput';
import './Filters.css';

interface IProps {
  onFilterChange: any;
}

interface IState {
  inputs: any;
}

class Filters extends Component<IProps, IState> {
  public state: IState = {
    inputs: {}
  };

  getFilterInputValues(inputLabel: string): string[] {
    return this.state.inputs.inputsFilter
      ? this.state.inputs.inputsFilter[inputLabel]
      : [];
  }

  componentDidMount() {
    fetch('https://v86y9ouqxb.execute-api.eu-west-1.amazonaws.com/dev/inputs')
      .then(res => res.json())
      .then(
        result => {
          this.setState({ inputs: result });
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className="Filters">
        <FilterInput
          values={this.getFilterInputValues('compTerit')}
          name="compTerit"
          label="Compétance Territoriale"
          onFilterChange={this.props.onFilterChange}
        />
        <FilterInput
          values={this.getFilterInputValues('specialite')}
          name="specialite"
          label="Spécialité"
          onFilterChange={this.props.onFilterChange}
        />
        <FilterInput
          values={this.getFilterInputValues('domaine')}
          name="domaine"
          label="Domaine"
          onFilterChange={this.props.onFilterChange}
        />
      </div>
    );
  }
}

export default Filters;
