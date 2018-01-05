import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import moment from 'moment';
import helpers from '../helpers';
const apiUrl = 'http://localhost:4000/api';
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

  async componentDidMount() {
    await this.latestInAndOut();
  }

  render() {
    return (
      <div>
        <ReactTable
          filterable
          defaultFilterMethod={(filter, row) => {
            return String(row[filter.id]).includes(filter.value);
          }}
          loading={this.state.loading}
          data={this.state.data} 
          columns={this.state.columns} 
        />
        <input /> <button>Add User</button>
      </div>
    );
    
  }
}

export default UserTable;