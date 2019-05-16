import React from 'react';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';

const NoMatchImage = styled.img`
  width: 100%;
`;

const NoMatch = ({ t }) => (
  <div>
    <Message
      style={{ textAlign: 'center' }}
      attached
      header={t('system.invalid-url')}
      content={t('system.use-menu-on-top')}
    />
    <NoMatchImage
      src={'/images/noMatch/' + Math.floor(Math.random() * (11 + 1)) + '.jpg'}
    />
  </div>
);

export default withNamespaces('translation')(NoMatch);
