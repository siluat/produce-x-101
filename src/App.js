import React, { Component } from 'react';
import ReactGA from 'react-ga';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { Menu, Sticky, Dropdown } from 'semantic-ui-react';
import i18n from './components/i18n';
import { withNamespaces } from 'react-i18next';

import Footer from './components/Footer';
import Dear101 from './components/Dear101';
import X1MaDirectCamRank from './components/X1MaDirectCamRank';
import GroupDirectCamRank from './components/GroupDirectCamRank';
import PositionDirectCamRank from './components/PositionDirectCamRank';
import ChangeLog from './components/ChangeLog';
import NoMatch from './components/NoMatch';
import CrawlerStatus from './components/CrawlerStatus';

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

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { contextRef } = this.state;
    const { t, i18n } = this.props;

    return (
      <Router>
        <div ref={this.handleContextRef}>
          <Sticky context={contextRef} className="top-menu">
            <Menu attached inverted>
              <Dropdown style={{ width: '70%' }} item text={t('menuLabel')}>
                <Dropdown.Menu>
                  <Dropdown.Item href="/dear101">
                    {t('menu.dear101')}
                  </Dropdown.Item>
                  <Dropdown.Item href="/position">
                    {t('menu.position')}
                  </Dropdown.Item>
                  <Dropdown.Item href="/groupx">
                    {t('menu.group')}
                  </Dropdown.Item>
                  <Dropdown.Item href="/x1ma">{t('menu.x1ma')}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/changelog">
                    {t('menu.changelog')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href="https://produce48.surge.sh"
                    target="_blank"
                  >
                    IZ*ONE Forever
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                as="a"
                style={{
                  width: '15%',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
                onClick={() => {
                  i18n.changeLanguage('kr');
                }}
                active={i18n.language === 'kr'}
              >
                KR
              </Menu.Item>
              <Menu.Item
                as="a"
                style={{
                  width: '15%',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
                onClick={() => {
                  i18n.changeLanguage('en');
                }}
                active={i18n.language === 'en'}
              >
                EN
              </Menu.Item>
            </Menu>
          </Sticky>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Redirect to={{ pathname: '/position' }} {...props} />
              )}
            />
            <Route
              exact
              path="/dear101"
              render={props => <Dear101 {...props} />}
            />
            <Route
              exact
              path="/x1ma"
              render={props => <X1MaDirectCamRank {...props} />}
            />
            <Route
              exact
              path="/groupx"
              render={props => <GroupDirectCamRank {...props} />}
            />
            <Route
              exact
              path="/position"
              render={props => <PositionDirectCamRank {...props} />}
            />
            <Route exaxt path="/changelog" component={ChangeLog} />
            <Route exaxt path="/status" component={CrawlerStatus} />
            <Route render={props => <NoMatch {...props} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default withNamespaces('translation')(App);
