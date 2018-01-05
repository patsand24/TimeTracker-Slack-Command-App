import React from 'react';

class Nav extends React.Component {

  render() {
    return (
      <div>
        <a href="/users">Users </a>| 
        <a href="/clock-ins">Clock Ins</a>| 
        <a href="/clock-outs">Clock Outs</a>| 
      </div>
    )
  }
}

export default Nav;