import React from 'react';
import '../styles/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios';

class LeadDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateNotes: '',
      updateDate: '',
      updatecalDate: '',
      updateStatus: '',
      currNote: this.props.currLead.notes.split('%%%')

    };
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    this.handleNotesUpdate = this.handleNotesUpdate.bind(this);
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleNotesUpdate(event) {
    this.setState({ updateNotes: event.target.value });
  }

  handleStatusUpdate(event) {
    this.setState({ updateStatus: event.target.value });
  }
  handleDateUpdate(event) {
    let formatted = event.toString();
    this.setState({
      updatecalDate: event,
      updateDate: formatted,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let notes = this.props.currLead.notes +'%%%'+ today +'%%%'+ this.state.updateNotes + '%%%'

    let dataSet = {
      newNotes: notes,
      newStatus: this.state.updateStatus,
      newDate: this.state.updateDate,
      tracker: this.state.updatecalDate,
      oldAddress: this.props.currLead.address,
  }
  axios.put('/updateLead', dataSet)
  .then((data) => {
    this.props.updateLeadList()
  })
  .catch((error) => {
    console.log('there was an error posting the data')
  })
  this.setState({
    updateDate: '',
    updateNotes: '',
  })
  this.props.setToggle(event, false)
  }


  render() {
    return (
      <div className='wrapper'>
      <div className='details'>
        <button className="btn btn-primary xbutton" onClick={() => this.props.setToggle(event, false)}>X</button>
        <div className='arronContainer'>
          <div>
        <h3>{this.props.currLead.fullName} </h3>
        <div className='addressDetails'>
          <p>Address:</p>
        <h5>{this.props.currLead.address}</h5>
        </div>
        <div className='phoneNumberDetails'>
          <p>Phone Number:</p>
        <h5>{this.props.currLead.phoneNumber}</h5>
        </div>
        <div className='emailDetails'>
          <p>Email:</p>
        <h5>{this.props.currLead.email}</h5>
        </div>
        </div>

        <div className="col-auto">
              <select value={this.state.updateStatus} className="form-select" onChange={this.handleStatusUpdate}>
                <option value="">Status</option>
                <option value="Return Appointment">Return Appointment</option>
                <option value="Audit Complete">Audit Complete </option>
                <option value="Closing Appointment">Closing Appointment</option>
                <option value="Closed">Closed</option>
                <option value="Dead">Dead</option>
              </select>
            </div>
        </div>

      <h5>Notes</h5>
        <div className='noteDetails'>
          <div className='insideNotes'>
      {this.props.currNote.map((note, i) => {
        return <p key={i}>{note}</p>
      })
      }
      </div>
      </div>

<div className='detailsUpdate'>
        <form onSubmit={this.handleSubmit}>

        <div className="col-auto">
            <label htmlFor="notes" className="form-label">Update Notes:</label>
              <input type="text" className="form-control" value={this.state.updateNotes} onChange={this.handleNotesUpdate} />
            </div>

<div className='dateDetails'>
        <label>
         <p>Next Appointment:</p>
          <DatePicker selected={this.state.updatecalDate} onChange={this.handleDateUpdate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            />
        </label>
        </div>
        <div className='updateButton'>
        <input className="btn btn-primary" type="submit" value="Update" />
        </div>
        </form>
        </div>
      </div>
      </div>
    );
  }
};

export default LeadDetails;