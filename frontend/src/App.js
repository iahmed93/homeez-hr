import React from 'react';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <NameForm/>
        </div>
      </div> 
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    axios.post('http://ec2-15-237-43-220.eu-west-3.compute.amazonaws.com:3000/add-quotation',
     {"quotation_info": this.state.value}).then(result => {
       console.log(result);
     }).catch(error => {
       console.error(error);
     })
    event.preventDefault();
  }

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Quotation Info</label>
          <input type="text" className="form-control"  value={this.state.value} onChange={this.handleChange}/>
        </div>
        <input type="submit" value="Submit" />
      </form>
      
    );
  }
}

export default App;
