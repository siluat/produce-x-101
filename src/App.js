import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Sticky, Dropdown } from 'semantic-ui-react';

import Footer from './components/Footer';
import Dear101 from './components/Dear101';
import X1MaDirectCamRank from './components/X1MaDirectCamRank';
import ChangeLog from './components/ChangeLog';

import './styles/important.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-139579624-1');
      ReactGA.pageview(window.location.pathname);
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const {
      contextRef
    } = this.state;

    return (
      <Router>
        <div ref={this.handleContextRef}>
          <Sticky context={contextRef} className='top-menu'>
            <Menu
              attached
              inverted
            >
              <Dropdown
                style={{ width: '100%' }}
                item
                text='메뉴'
              >
                <Dropdown.Menu >
                  <Dropdown.Item href='/dear101'>
                    Dear 101 후원 순위
                  </Dropdown.Item>
                  <Dropdown.Item href='/x1ma'>
                    _지마 직캠 항목별 순위
                  </Dropdown.Item>
                  <Dropdown.Item href='/changelog'>
                    업데이트 기록
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Sticky>
          <Switch>
            <Route 
              exact path="/"
              render={(props) => <Dear101 {...props} />}
            />
            <Route 
              exact path="/dear101"
              render={(props) => <Dear101 {...props} />}
            />
            <Route 
              exact path="/x1ma"
              render={(props) => <X1MaDirectCamRank {...props} />}
            />
            <Route
              exaxt path="/changelog"
              component={ChangeLog}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;