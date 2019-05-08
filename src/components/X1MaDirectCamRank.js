import React, { Component } from 'react';
import axios from 'axios';
import { Icon, Menu, Message, Sticky } from 'semantic-ui-react';
import { sortBy, maxBy } from 'lodash';
import FlipMove from 'react-flip-move';
import LoadingContent from './LoadingContent';
import Trainee from './Trainee';
import ProgressBar from './ProgressBar';

const PATH_FETCH =
  'https://7orvtlfpoh.execute-api.ap-northeast-2.amazonaws.com/default/scan-produce-x-101';

const SORTS = {
  LIKE: list => sortBy(list, 'x1maLike').reverse(),
  VIEW: list => sortBy(list, 'x1maView').reverse(),
  COMMENT: list => sortBy(list, 'x1maComment').reverse(),
};

const positionFilter = item => {
  return item.x1maDirectCamUrl;
};

class x1maDirectCamRanking extends Component {
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
      maxLike: maxBy(data, 'x1maLike').x1maLike,
      maxView: maxBy(data, 'x1maView').x1maView,
      maxComment: maxBy(data, 'x1maComment').x1maComment,
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
    const { i18n, t } = this.props;

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
          header="_지마 직캠 순위"
          content="5분마다 최신 정보로 업데이트됩니다."
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
                  value = trainee.x1maView;
                  max = maxView;
                  break;
                case 'COMMENT':
                  value = trainee.x1maComment;
                  max = maxComment;
                  break;
                default:
                  value = trainee.x1maLike;
                  max = maxLike;
              }
              return (
                <div key={trainee.id}>
                  <Trainee
                    i18n={i18n}
                    t={t}
                    trainee={trainee}
                    videoLink={trainee.x1maDirectCamUrl}
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
  <Menu icon="labeled" attached fluid widths={3}>
    <Menu.Item
      name="like"
      active={activeItem === 'like'}
      onClick={onClickLike}
      color="blue"
    >
      <Icon name="like" />
      하트
    </Menu.Item>
    <Menu.Item
      name="play"
      active={activeItem === 'view'}
      onClick={onClickView}
      color="blue"
    >
      <Icon name="play" />
      조회수
    </Menu.Item>
    <Menu.Item
      name="comment"
      active={activeItem === 'comment'}
      onClick={onClickComment}
      color="blue"
    >
      <Icon name="comment" />
      댓글
    </Menu.Item>
  </Menu>
);

export default x1maDirectCamRanking;
