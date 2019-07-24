import React from 'react';
import { Header, Segment, List } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';

const ChangeLog = ({ i18n, t }) => (
  <div>
    <Header as="h3" attached>
      2019-07-19
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>{t('changelog.20190719.1')}</List.Item>
      </List>
    </Segment>
    <Header as="h3" attached>
      2019-07-10
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>{t('changelog.20190710.1')}</List.Item>
      </List>
    </Segment>
    <Header as="h3" attached>
      2019-06-11
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>{t('changelog.20190611.1')}</List.Item>
      </List>
    </Segment>
    <Header as="h3" attached>
      2019-05-21
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>{t('changelog.20190521.1')}</List.Item>
      </List>
    </Segment>
    <Header as="h3" attached>
      2019-05-10
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>{t('changelog.20190510.1')}</List.Item>
      </List>
    </Segment>
    <Header as="h3" attached>
      2019-05-07
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>{t('changelog.20190507.1')}</List.Item>
        <List.Item>{t('changelog.20190507.2')}</List.Item>
      </List>
    </Segment>
  </div>
);

export default withNamespaces('translation')(ChangeLog);
