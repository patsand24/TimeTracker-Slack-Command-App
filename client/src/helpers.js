import axios from 'axios';
import moment from 'moment';

const apiUrl = 'http://21c76475.ngrok.io/api';

export default {
  async getUsers() {
    const userQuery = await axios.get(`${apiUrl}/users`);
    const users = userQuery.data.users;
    return users;
  },
  async getClockIns() {
    const clockInsQuery = await axios.get(`${apiUrl}/get-clock-ins`);
    const clockIns = clockInsQuery.data.clockIns;
    return clockIns;
  },
  async getClockOuts() {
    const clockOutsQuery = await axios.get(`${apiUrl}/get-clock-outs`);
    const clockOuts = clockOutsQuery.data.clockOuts;
    return clockOuts;
  },
  fmtDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  },

  get api() {
    return apiUrl;
  }

}