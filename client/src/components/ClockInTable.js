import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import moment from 'moment';
import helpers from '../helpers';
const apiUrl = 'http://localhost:4000/api';
// await axios.get(`${apiUrl}`)

class ClockInTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [{
        Header: 'Time In'
      }, {
        Header: 'User'
      }]
    }
  }
  async componentDidMount() {
    const clockIns = await helpers.getClockIns();
    console.log(clockIns);

    const columns = [{
      Header: 'Time In',
      id: 'timeIn',
      accessor: (data) => helpers.fmtDate(data.timeIn)
    }, {
    }, {
      Header: 'User',
      id: 'user',
      accessor: (data) => data.user.username
    }];

    this.setState({
      data: clockIns,
      columns
    });
  }

  render() {
    return(
      <ReactTable
        filterable
        defaultFilterMethod={(filter, row) => {
          return String(row[filter.id]).includes(filter.value);
        }}
        data={this.state.data} 
        columns={this.state.columns} 
      />
    );
  }
}

export default ClockInTable;