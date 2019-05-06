import React from 'react';
import styled from 'styled-components';
import { Message, Icon } from 'semantic-ui-react';

const Contact = styled.p`
  line-height: 11.5px;
  font-size: 11.5px;
  color: #666;
`

const Copyright = styled.p`
  line-height: 11.5px;
  font-size: 11.5px;
  color: #666;
`

const Footer = () =>
  <Message attached='bottom'>
    <Contact><Icon name='mail' />pick.the.nako@gmail.com</Contact>
    <Copyright>&copy; 2019, Pick the Nako. All Rights Reserved.</Copyright>
    <Copyright>&copy; CJ ENM. Corp All Rights Reserved.</Copyright>
  </Message>

export default Footer;