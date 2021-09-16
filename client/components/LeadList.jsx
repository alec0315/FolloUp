import React from 'react';
import LeadDetails from './LeadDetails.jsx';
import '../styles/styles.css';


class LeadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDetails: false,
      currentLead: '',
      currentNote: '',
    };
    this.togglenotDetails = this.togglenotDetails.bind(this);
  }
  toggle(e, value, lead) {
    e.preventDefault();


    this.setState({
      toggleDetails: value,
      currentLead: lead,
      currentNote: lead.notes.split('%%%')
    });
  }

  togglenotDetails(e, value) {
    e.preventDefault();
    this.setState({
      toggleDetails: value,
    });
  }




  render() {
    return (
      <div className='leadListContainer'>
        <button className='switchButton' onClick={(event) => { this.props.viewToggle(event, false); }}>Switch View</button>

      <div className='tableContainer'>
        <h4>Return Appointments:</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Lead Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map(lead => {
              if (lead.status === 'Return Appointment') {
                return (
                  <tr key={lead.id} onClick={(event) => { this.toggle(event, true, lead); }}>

                    <td> {lead.fullName}</td>
                    <td>{lead.address}</td>
                    <td>{lead.phoneNumber}</td>
                    <td>{lead.date.slice(16, 21)} {lead.date.slice(4, 10)}</td>
                    <td>{lead.leadType}</td>
                  </tr>
                )}
            })}
          </tbody>
        </table>
        </div>
        <div className='tableContainer'>
        <h4>Audit Complete:</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Lead Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map(lead => {
              if (lead.status === 'Audit Complete') {
                return (
                  <tr key={lead.id} onClick={(event) => { this.toggle(event, true, lead); }}>

                    <td> {lead.fullName}</td>
                    <td>{lead.address}</td>
                    <td>{lead.phoneNumber}</td>
                    <td>{lead.date.slice(16, 21)} {lead.date.slice(4, 10)}</td>
                    <td>{lead.leadType}</td>
                  </tr>
                )}
            })}
          </tbody>
        </table>
        </div>

        <div className='tableContainer'>
        <h4>Closing Appointments:</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Lead Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map(lead => {
              if (lead.status === 'Closing Appointment') {
                return (
                  <tr key={lead.id} onClick={(event) => { this.toggle(event, true, lead); }}>

                    <td> {lead.fullName}</td>
                    <td>{lead.address}</td>
                    <td>{lead.phoneNumber}</td>
                    <td>{lead.date.slice(16, 21)} {lead.date.slice(4, 10)}</td>
                    <td>{lead.leadType}</td>
                  </tr>
                )}
            })}
          </tbody>
        </table>
        </div>

        <div className='tableContainer'>
        <h4>Closed:</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Lead Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map(lead => {
              if (lead.status === 'Closed') {
                return (
                  <tr key={lead.id} onClick={(event) => { this.toggle(event, true, lead); }}>

                    <td> {lead.fullName}</td>
                    <td>{lead.address}</td>
                    <td>{lead.phoneNumber}</td>
                    <td>{lead.date.slice(16, 21)} {lead.date.slice(4, 10)}</td>
                    <td>{lead.leadType}</td>
                  </tr>
                )}
            })}
          </tbody>
        </table>
</div>
<div className='tableContainer'>
        <h4>Dead Leads:</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Lead Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map(lead => {
              if (lead.status === 'Dead') {
                return (
                  <tr key={lead.id} onClick={(event) => { this.toggle(event, true, lead); }}>

                    <td> {lead.fullName}</td>
                    <td>{lead.address}</td>
                    <td>{lead.phoneNumber}</td>
                    <td>{lead.date.slice(16, 21)} {lead.date.slice(4, 10)}</td>
                    <td>{lead.leadType}</td>
                  </tr>
                )}
            })}
          </tbody>
        </table>
        </div>


        {this.state.toggleDetails ? <LeadDetails
          setToggle={this.togglenotDetails}
          currLead={this.state.currentLead}
          updateLeadList={this.props.updateLeadList}
          currNote={this.state.currentNote}
        /> : null}
      </div>


    );
  }
}
export default LeadList;