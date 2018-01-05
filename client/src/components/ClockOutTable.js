import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import moment from 'moment';
import helpers from '../helpers';
const apiUrl = helpers.api;
// await axios.get(`${apiUrl}`)

class ClockOutTable extends React.Component {
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

  async getData() {
    const clockOuts = await helpers.getClockOuts();
    console.log(clockOuts);

    const columns = [{
      Header: 'Time Out',
      id: 'timeOut',
      accessor: (data) => helpers.fmtDate(data.timeOut)
    }, {
    }, {
      Header: 'User',
      id: 'user',
      accessor: (data) => data.user.username
    }];

    this.setState({
      data: clockOuts,
      columns
    });
  }
  async componentDidMount() {
    await this.getData();
  }

  render() {
    return (
      <div>
        <ReactTable className="-striped -highlight"
          filterable
          defaultFilterMethod={(filter, row) => {
            return String(row[filter.id]).includes(filter.value);
          }}
          data={this.state.data} 
          columns={this.state.columns} 
        />
      </div>
    );
  }
}

export default ClockOutTable;