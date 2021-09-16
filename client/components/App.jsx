import React from 'react';
import LeadList from './LeadList.jsx';
import AllLeads from './allLeads.jsx';
import IntakeForm from './IntakeForm.jsx';
import axios from 'axios';
import '../styles/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leads: [],
      toggle: true,
    }
    this.viewToggle = this.viewToggle.bind(this);
    this.updateLeadList = this.updateLeadList.bind(this);
  }

componentDidMount() {
  axios.get('/getLeads')
  .then((data) => {
    this.setState({
      leads: data.data
    })
  })
  .catch((error) => {
    console.log('we couldnt get all the leads for did mount!')
  })
}

viewToggle(e, value) {
  e.preventDefault();
  this.setState({
    toggle: value,
  });
}

updateLeadList(){
   axios.get('/getLeads')
  .then((data) => {
    this.setState({
      leads: data.data
    })
  })
  .catch((error) => {
    console.log('we couldnt get all the leads!')
  })
}

  render() {
    return (
      <div>
        <img src='../FolloUP.png' className='logo'></img>
        
        <IntakeForm updateLeadList={this.updateLeadList}/>

        {this.state.toggle ? <LeadList leads={this.state.leads} updateLeadList={this.updateLeadList} viewToggle={this.viewToggle} /> : <AllLeads leads={this.state.leads} updateLeadList={this.updateLeadList} viewToggle={this.viewToggle}/>}
    </div>
    )}}

export default App;