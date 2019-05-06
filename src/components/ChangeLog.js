import React from 'react';
import { Header, Segment, List } from 'semantic-ui-react';

const ChangeLog = () =>
  <div>
    <Header as='h2' attached='top'>
      2019-05-07
    </Header>
    <Segment attached>
      <List bulleted>
        <List.Item>사이트 오픈</List.Item>
        <List.Item>Dear 101 후원 순위 추가</List.Item>
        <List.Item>_지마 네이버 직캠 순위 추가</List.Item>
      </List>
    </Segment>
  </div>

export default ChangeLog;