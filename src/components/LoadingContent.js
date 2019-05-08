import React from 'react';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

const LoadingContent = () => (
  <Segment attached>
    <Dimmer active inverted>
      <Loader indeterminate size="huge">
        Loading
      </Loader>
    </Dimmer>
    <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
  </Segment>
);

export default LoadingContent;
