import React from 'react';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <QuotationForm/>
        </div>
      </div> 
      <hr/>
      <div className="row">
        <div className="col-sm-6">
          <QuotationList/>
        </div>
      </div> 
    </div>
  );
}

class QuotationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quotations: []};
  }


  getAllQuotations() {
    console.log('getting all quotations');
    axios.get('http://ec2-15-237-43-220.eu-west-3.compute.amazonaws.com:3000/get-all-quotation').then(result => {
      this.setState({quotations: result.data});
      console.log(this.state.quotations);
     }).catch(error => {
       console.error(error);
     })
  }

  listQuotations(){
    return this.state.quotations.map((quotation) =>
        <tr>
          <td>{quotation.q_id}</td>
          <td>{quotation.quotation_info}</td>
          <td>{quotation.quotation_valid? 'True': 'False'}</td>
        </tr>
    );
  }

  renderQuotations(){
    if (this.state.quotations.length > 0) {
      return (<table class="table">
                <thead>
                  <tr>
                    <th scope="col">Q_ID</th>
                    <th scope="col">Quotation Info</th>
                    <th scope="col">Quotation Valid</th>
                  </tr>
                </thead>
                <tbody>
                  {this.listQuotations()}
                </tbody>
              </table>)
    }
  }

  render () {
    return (
      <div>
        <br/><br/>
        <button type="button" className="btn btn-light" onClick={() => this.getAllQuotations()}>Get All Quotations</button>
        <br/><br/>
        <div>
          {this.renderQuotations()}
        </div>
      </div>
      
    )
  }
}

class QuotationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', isSaved: false};
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
       this.setState({value: '', isSaved: true});
     }).catch(error => {
       console.error(error);
     })
    event.preventDefault();
  }

  renderSuccessAlert(){
    if (this.state.isSaved) {
      return (<div className="alert alert-success alert-dismissible fade show" role="alert">
      Saved Successfully
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>)
    }
  }

  render() {
    return (
      <div>
        {this.renderSuccessAlert()}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Quotation Info</label>
            <input type="text" className="form-control"  value={this.state.value} onChange={this.handleChange}/>
          </div>
          <input type="submit" value="Submit" />
        </form>
        
      </div>
    );
  }
}

export default App;
