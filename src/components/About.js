import React from 'react'
// import User from './User'
import UserClass from './UseClass';


class About extends React.Component{

  constructor(props) {
    super(props)
    // console.log("parent constructor");
  }

  componentDidMount() {
    // console.log("parent component Did Mount");
  }
  render() {
    // console.log("parent render");
    return (
      <div>
        <h1>This is About Page</h1>
        {/* <User name={"Saheb Singh (fn compo)"} /> */}
        <UserClass name={"Saheb Singh (class compo)"} />
      </div>

    );
  }
}

export default About;