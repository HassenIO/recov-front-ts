import React, { Component } from 'react';
import Filters from './Filters';
import Reco from './Reco';
import './App.css';

interface IProps {};
interface IState {
  compTerit: string;
  specialite: string;
  domaine: string;
};

class App extends Component<IProps, IState> {
  public state: IState = {
    compTerit: '',
    specialite: '',
    domaine: ''
  };

  constructor(props: IProps) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  public handleFilterChange(name: keyof IState, value: string) {
    this.setState({ [name]: value } as Pick<IState, keyof IState>);
  }

  render() {
    return (
      <div className="App">
        <Filters onFilterChange={this.handleFilterChange} />
        <Reco filters={this.state} />
      </div>
    );
  }
}

export default App;
