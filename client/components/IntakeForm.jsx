import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import '../styles/styles.css';

class IntakeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      address: '',
      email: '',
      phoneNumber: '',
      notes: '',
      leadType: '',
      date: '',
      caldate: '',
      status: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleLeadTypeChange = this.handleLeadTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({ fullName: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePhoneNumberChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  handleTimeFrameChange(event) {
    this.setState({ timeFrame: event.target.value });
  }

  handleLeadTypeChange(event) {
    this.setState({ leadType: event.target.value });
  }
  handleStatusChange(event) {
    this.setState({ status: event.target.value });
  }
  handleDateChange(event) {

    let formatted = event.toString()

    this.setState({
      caldate: event,
      date: formatted
    });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleSubmit(event) {
    alert('Nice work on the new lead, let\'s close ' + this.state.fullName + '!');
    event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    let dataSet = {
      fullName: this.state.fullName,
      address: this.state.address,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      notes: today + '%%%' + this.state.notes,
      leadType: this.state.leadType,
      tracker: this.state.caldate,
      status: this.state.status,
      date: this.state.date
    }

    axios.post('/createLead', dataSet)
      .then((data) => {
        this.props.updateLeadList()
      })
      .catch((error) => {
        console.log('there was an error posting the data')
      })

    this.setState({
      fullName: '',
      address: '',
      email: '',
      phoneNumber: '',
      notes: '',
      leadType: '',
      date: '',
      caldate: '',
      status: '',

    })
  }

  render() {
    return (
      <div className="main">
        <h3>Lead Intake Form:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row row1">
            <div className="col">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" value={this.state.fullName} onChange={this.handleFirstNameChange} />
            </div>

            <div className="col">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" value={this.state.address} onChange={this.handleAddressChange} />
            </div>

            <div className="col">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
          </div>
          <div className="row row2">
            <div className="col">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input type="text" className="form-control" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} />
            </div>
            <div className="col">
              <label htmlFor="notes" className="form-label">Notes</label>
              <input type="text" className="form-control" value={this.state.notes} onChange={this.handleNotesChange} />
            </div>
            <div className="col">
              <label htmlFor="leadType" className="form-label">Lead Type</label>
              <select value={this.state.leadType} className="form-select" onChange={this.handleLeadTypeChange}>
                <option value="">Select</option>
                <option value="Self-Gen">Self-Gen</option>
                <option value="Online Lead">Online Lead</option>
                <option value="Referall">Referall</option>
                <option value="Setter">Setter</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="status" className="form-label">Status</label>
              <select value={this.state.status} className="form-select" onChange={this.handleStatusChange}>
                <option value="">Select</option>
                <option value="Return Appointment">Return Appointment</option>
                <option value="Audit Complete">Audit Complete </option>
                <option value="Closing Appointment">Closing Appointment</option>
                <option value="Closed">Closed</option>
                <option value="Dead">Dead</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>
                <p>Next Appointment:</p>
                <DatePicker selected={this.state.caldate} onChange={this.handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </label>
            </div>
          </div>
          <div className='submitLeadButton'>
            <input className="btn btn-primary" type="submit" value="Submit Lead" />
          </div>
        </form>
      </div>
    );
  }
}

export default IntakeForm;