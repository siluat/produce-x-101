import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Sticky, Dropdown } from 'semantic-ui-react';
import i18n from './components/i18n';
import { withNamespaces } from 'react-i18next';

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
                  <Dropdown.Item href="/x1ma">{t('menu.x1ma')}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/changelog">
                    {t('menu.changelog')}
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
            <Route exact path="/" render={props => <Dear101 {...props} />} />
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
            <Route exaxt path="/changelog" component={ChangeLog} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default withNamespaces('translation')(App);
