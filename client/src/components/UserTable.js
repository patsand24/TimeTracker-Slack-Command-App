import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import moment from 'moment';
import helpers from '../helpers';
const apiUrl = helpers.api;

// await axios.get(`${apiUrl}`)
class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [{
        Header: 'User'
      }, {
        Header: 'Latest Clock-In'
      }, {
        Header: 'Latest Clock-Out'
      }],
      loading: true
    }
    this.addUser = this.addUser.bind(this);
  }

  async getAllPunches() {

  }

  async latestInAndOut() {
    let users = await helpers.getUsers();
    users.forEach(async(u) => {
      const getIn = await axios.get(`${apiUrl}/user/${u.username}/latest-clock-in`);
      const getOut = await axios.get(`${apiUrl}/user/${u.username}/latest-clock-out`);
      const latestClockIn = getIn.data.latestClockIn;
      const latestClockOut = getOut.data.latestClockOut;

      u.latestClockIn = (latestClockIn ? latestClockIn.timeIn.toString() : null);
      u.latestClockOut = (latestClockOut ? latestClockOut.timeOut.toString() : null);
    });

    const columns = [{
      Header: 'User',
      accessor: 'username'
    }, {
      Header: 'Latest Clock-In',
      id: 'latestClockIn',
      accessor: (data) => {
        if (!data.latestClockIn) return null;
        return helpers.fmtDate(data.latestClockIn)
      }
    }, {
      Header: 'Latest Clock-Out',
      id: 'latestClockOut',
      accessor: (data) => {
        if (!data.latestClockOut) return null;
        return helpers.fmtDate(data.latestClockOut)
      }
    }, {
      Header: 'Actions',
      id: 'click-me-button',
      Cell: 
        ({ row }) => {return (
          <div>
            <button onClick={() => this.handleClockIn(row.username)}>Clock In</button>
            <button onClick={() => this.handleClockOut(row.username)}>Clock Out</button>
          </div>
        )}
      }];
    
    window.setTimeout(() => {
      this.setState({
        data: users,
        columns,
        loading: false
      });
    }, 500);

    console.log(users);
  }

  async handleClockIn(username) {
    axios.get(`${apiUrl}/user/${username}/clock-in`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === 'error') {
          alert(`${username} is already clocked in!`);
        } else {
          alert(`${username} was clocked in successfully!`)
        }
      })
      await this.latestInAndOut();
  }

  async handleClockOut(username) {
    axios.get(`${apiUrl}/user/${username}/clock-out`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === 'error') {
          alert(`${username} is clocked out already!`);
        } else {
          alert(`${username} was clocked out successfully!`)
        }
      })
      await this.latestInAndOut();
  }

  async reloadData() {
    await this.latestInAndOut();
  }

  async addUser() {
    const username = this.addUserInput.value;
    if (!username) return alert('Missing username.');
    if (this.state.data.some((user) => user.username === username)) return alert('User already exists.');
    const response = await axios.get(`${apiUrl}/users/add/${username}`);
    await this.latestInAndOut();
  }

  async componentDidMount() {
    await this.latestInAndOut();
  }

  render() {
    return (
      <div>
        <ReactTable className="-striped -highlight"
          filterable
          defaultFilterMethod={(filter, row) => {
            return String(row[filter.id]).includes(filter.value);
          }}
          loading={this.state.loading}
          data={this.state.data} 
          columns={this.state.columns} 
        />
        <div>
          <button onClick={() => this.reloadData()}>Reload Data</button>
        </div>
        <div>
        <input ref={(input) => this.addUserInput = input } /> <button onClick={this.addUser}>Add User</button>
        </div>
      </div>
    );
    
  }
}

export default UserTable;