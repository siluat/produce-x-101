import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-139579624-1');
      ReactGA.pageview(window.location.pathname);
    }
  }

  render() {
    return <p>PRODUCE-X-101</p>
  }
}

export default App;