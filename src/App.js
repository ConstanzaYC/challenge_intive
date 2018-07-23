import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor (props) {
      super(props);
      
      this.state = {
        name: '',
        surname: '',
        countries: [],
        birthday: '',
        greetingBoxHandle: false,
        tableHandle: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
      
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            countries: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    handleChange (evt) {
      this.setState({ [evt.target.name]: evt.target.value }); 
    }
    
    handleSubmit(evt) {
      this.setState({
        greetingBoxHandle: true,
        tableHandle: true
      });
      evt.preventDefault();
    }
    render () {
      <App />
      return (
        <div className="Container">
          <div className="Left-container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" placeholder="name here" value={this.state.value} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Surname:</label>
                <input type="text" name="surname" placeholder="surname here" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Countries:</label>
                <select className="Dropdown-countries" name="countrySelected" onChange={this.handleChange}>
                  <option>Countries</option>
                {
                    this.state.countries.map((item) => (
                        <option value={item.name}>{item.name}</option>
                    ))
                }
                </select>
              </div>
              <div className="form-group">
                <label>Birthday:</label>
                <input type="text" name="birthday" placeholder="mm/dd/yyyy" onChange={this.handleChange} />
              </div>
              <input className="save-button" type="submit" value="Save" />
            </form>
            {
              this.state.greetingBoxHandle &&
              <div className="greeting-box">      
                <p>Hello {this.state.name} {this.state.surname} from {this.state.countrySelected} . On of  you will have </p> 
              </div>
            }
          </div>
          <div className="Right-container">
            <div className="ListofName">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Birthday</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tableHandle &&
                    <tr>
                      <td>{this.state.name} {this.state.surname}</td>
                      <td>{this.state.countrySelected}</td>
                      <td>{this.state.birthday}</td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
            <p className="Name-footer">{this.state.name} {this.state.surname}</p>
          </div>
        </div>
      );
    } 
  }
export default App;
