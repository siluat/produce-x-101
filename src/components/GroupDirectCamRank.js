import React, { Component } from 'react';
import axios from 'axios';
import { Icon, Menu, Message, Sticky } from 'semantic-ui-react';
import { sortBy, maxBy } from 'lodash';
import FlipMove from 'react-flip-move';
import { withNamespaces } from 'react-i18next';

import LoadingContent from './LoadingContent';
import Trainee from './Trainee';
import ProgressBar from './ProgressBar';

const PATH_FETCH =
  'https://7orvtlfpoh.execute-api.ap-northeast-2.amazonaws.com/default/scan-produce-x-101';

const SORTS = {
  LIKE: list => sortBy(list, 'groupLike').reverse(),
  VIEW: list => sortBy(list, 'groupView').reverse(),
  COMMENT: list => sortBy(list, 'groupComment').reverse(),
};

const positionFilter = item => {
  return item.groupDirectCamUrl;
};

class GroupDirectCamRanking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      traineeData: [],
      maxLike: 0,
      maxView: 0,
      maxComment: 0,
      selectedMenu: 'like',
      sortKey: 'LIKE',
      error: null,
      isLoading: false,
      indicating: true,
    };

    this.fetchTraineeData = this.fetchTraineeData.bind(this);
    this.setTraineeData = this.setTraineeData.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickView = this.onClickView.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
  }

  componentDidMount() {
    this.fetchTraineeData();
  }

  componentDidUpdate() {
    const progresses = document.querySelectorAll(
      '.bar .progress, .outer-value',
    );

    for (let i = 0; i < progresses.length; i++) {
      let t = progresses[i].textContent;
      progresses[i].textContent = t
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  fetchTraineeData() {
    this.setState({ isLoading: true });

    axios(`${PATH_FETCH}`)
      .then(result => this.setTraineeData(result.data))
      .catch(error => this.setState({ error }));
  }

  setTraineeData(data) {
    this.setState({
      traineeData: data,
      isLoading: false,
      maxLike: maxBy(data, 'groupLike').groupLike,
      maxView: maxBy(data, 'groupView').groupView,
      maxComment: maxBy(data, 'groupComment').groupComment,
    });
  }

  onClickLike() {
    this.setState({ selectedMenu: 'like' });
    this.setState({ sortKey: 'LIKE' });
    this.setState({ indicating: true });
  }

  onClickView() {
    this.setState({ selectedMenu: 'view' });
    this.setState({ sortKey: 'VIEW' });
    this.setState({ indicating: true });
  }

  onClickComment() {
    this.setState({ selectedMenu: 'comment' });
    this.setState({ sortKey: 'COMMENT' });
    this.setState({ indicating: true });
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { t } = this.props;

    const {
      traineeData,
      selectedMenu,
      sortKey,
      maxLike,
      maxView,
      maxComment,
      isLoading,
      indicating,
      contextRef,
    } = this.state;

    return (
      <div ref={this.handleContextRef}>
        <Message
          style={{ textAlign: 'center' }}
          attached
          header={t('menu.group')}
          content={t('update.every20Minutes')}
        />
        <Sticky context={contextRef} offset={40}>
          <MenuBar
            t={t}
            activeItem={selectedMenu}
            onClickLike={this.onClickLike}
            onClickView={this.onClickView}
            onClickComment={this.onClickComment}
          />
        </Sticky>
        {isLoading ? (
          <LoadingContent />
        ) : (
          <FlipMove>
            {SORTS[sortKey](traineeData.filter(positionFilter)).map(trainee => {
              let value, max;
              switch (sortKey) {
                case 'VIEW':
                  value = trainee.groupView;
                  max = maxView;
                  break;
                case 'COMMENT':
                  value = trainee.groupComment;
                  max = maxComment;
                  break;
                default:
                  value = trainee.groupLike;
                  max = maxLike;
              }
              return (
                <div key={trainee.id}>
                  <Trainee
                    trainee={trainee}
                    videoLink={trainee.groupDirectCamUrl}
                  >
                    <ProgressBar
                      value={value}
                      max={max}
                      indicating={indicating}
                    />
                  </Trainee>
                </div>
              );
            })}
          </FlipMove>
        )}
      </div>
    );
  }
}

const MenuBar = ({
  t,
  activeItem,
  onClickLike,
  onClickView,
  onClickComment,
}) => (
  <Menu icon="labeled" attached widths={3}>
    <Menu.Item
      name="like"
      active={activeItem === 'like'}
      onClick={onClickLike}
      color="blue"
    >
      <Icon name="like" />
      {t('heart')}
    </Menu.Item>
    <Menu.Item
      name="play"
      active={activeItem === 'view'}
      onClick={onClickView}
      color="blue"
    >
      <Icon name="play" />
      {t('playCount')}
    </Menu.Item>
    <Menu.Item
      name="comment"
      active={activeItem === 'comment'}
      onClick={onClickComment}
      color="blue"
    >
      <Icon name="comment" />
      {t('comments')}
    </Menu.Item>
  </Menu>
);

export default withNamespaces('translation')(GroupDirectCamRanking);
