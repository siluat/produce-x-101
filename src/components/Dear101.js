import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Icon, Message, Menu, Sticky } from 'semantic-ui-react';
import { chain, find } from 'lodash';
import FlipMove from 'react-flip-move';
import { withNamespaces } from 'react-i18next';

import LoadingContent from './LoadingContent';
import Trainee from './Trainee';
import Dear101Data from './Dear101Data';

const PATH_FETCH =
  'https://7orvtlfpoh.execute-api.ap-northeast-2.amazonaws.com/default/scan-produce-x-101';

const SORTS = {
  RATE: (list, selected) => {
    let filtered = null;

    if (selected && Array.isArray(selected) && selected.length > 0) {
      filtered = list.filter(item => {
        return find(selected, { value: item.id });
      });
    } else {
      filtered = list;
    }

    return chain(filtered)
      .sortBy('lastRank')
      .sortBy('dearHugStepLastDate')
      .reverse()
      .sortBy('dearHugRate')
      .reverse()
      .value();
  },
};

class Dear101 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      traineeData: [],
      traineeSelection: [],
      traineeSelected: null,
      selectedMenu: 'step',
      sortKey: 'RATE',
      error: null,
      isLoading: false,
    };

    this.fetchTraineeData = this.fetchTraineeData.bind(this);
    this.setTraineeData = this.setTraineeData.bind(this);
    this.setPropertyForSelection = this.setPropertyForSelection.bind(this);
    this.onClickStep = this.onClickStep.bind(this);
    this.onClickVideo = this.onClickVideo.bind(this);
    this.onClickTimeStamp = this.onClickTimeStamp.bind(this);
    this.onClickDays = this.onClickDays.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
  }

  componentDidMount() {
    this.fetchTraineeData();
  }

  fetchTraineeData() {
    this.setState({ isLoading: true });

    axios(`${PATH_FETCH}`)
      .then(result => this.setTraineeData(result.data))
      .catch(error => this.setState({ error }));
  }

  setTraineeData(data) {
    this.setPropertyForSelection(data);

    this.setState({
      traineeData: data,
      isLoading: false,
    });
  }

  setPropertyForSelection(data) {
    const selection = [];

    data.forEach(item => {
      let name;

      switch (this.props.i18n.language) {
        case 'en':
          name = item.nameInEnglish;
          break;
        default:
          name = item.name;
      }

      selection.push({
        value: item.id,
        label: name,
      });
    });

    this.setState({
      traineeSelected: null,
      traineeSelection: selection,
    });
  }

  componentWillReceiveProps() {
    this.setPropertyForSelection(this.state.traineeData);
  }

  onClickStep() {
    this.setState({ selectedMenu: 'step' });
  }

  onClickVideo() {
    this.setState({ selectedMenu: 'video' });
  }

  onClickTimeStamp() {
    this.setState({ selectedMenu: 'timestamp' });
  }

  onClickDays() {
    this.setState({ selectedMenu: 'days' });
  }

  onChangeSelection(selectedOption) {
    this.setState({ traineeSelected: selectedOption });
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { t } = this.props;
    let partialRank = 1;

    const {
      traineeData,
      traineeSelection,
      traineeSelected,
      selectedMenu,
      sortKey,
      isLoading,
      contextRef,
    } = this.state;

    return (
      <div ref={this.handleContextRef}>
        <Message
          style={{ textAlign: 'center' }}
          attached
          header={t('menu.dear101')}
          content={t('update.everyMidnight')}
        />
        <Sticky context={contextRef} offset={40}>
          <MenuBar
            t={t}
            activeItem={selectedMenu}
            onClickStep={this.onClickStep}
            onClickVideo={this.onClickVideo}
            onClickTimeStamp={this.onClickTimeStamp}
            onClickDays={this.onClickDays}
          />
        </Sticky>
        {isLoading ? (
          <LoadingContent />
        ) : (
          <div>
            <Select
              style={{ zIndex: 900 }}
              isMulti
              placeholder={t('namePlaceHolder')}
              closeMenuOnSelect={false}
              value={traineeSelected}
              options={traineeSelection}
              onChange={this.onChangeSelection}
            />
            <FlipMove>
              {SORTS[sortKey](traineeData, traineeSelected).map(trainee => {
                return (
                  <div key={trainee.id}>
                    <Trainee
                      trainee={trainee}
                      dear101idx={trainee.dear101idx}
                      dearHugStepLastDate={trainee.dearHugStepLastDate}
                      partialRank={partialRank++}
                    >
                      <Dear101Data
                        selectedMenu={selectedMenu}
                        retired={trainee.retired}
                        dearHugRate={trainee.dearHugRate}
                        dear101FirstVideo={trainee.dear101FirstVideo}
                        dear101SecondVideo={trainee.dear101SecondVideo}
                        dear101ThirdVideo={trainee.dear101ThirdVideo}
                        dear101FourthVideo={trainee.dear101FourthVideo}
                        dear101FifthVideo={trainee.dear101FifthVideo}
                        dearHugStep13Date={trainee.dearHugStep13Date}
                        dearHugStep23Date={trainee.dearHugStep23Date}
                        dearHugStep33Date={trainee.dearHugStep33Date}
                        dearHugStep43Date={trainee.dearHugStep43Date}
                        dearHugStep53Date={trainee.dearHugStep53Date}
                      />
                    </Trainee>
                  </div>
                );
              })}
            </FlipMove>
          </div>
        )}
      </div>
    );
  }
}

const MenuBar = ({
  t,
  activeItem,
  onClickStep,
  onClickVideo,
  onClickTimeStamp,
  onClickDays,
}) => (
  <Menu icon="labeled" attached widths={4}>
    <Menu.Item
      name="step"
      active={activeItem === 'step'}
      onClick={onClickStep}
      color="blue"
    >
      <Icon name="chart line" />
      {t('dear101.stepView')}
    </Menu.Item>
    <Menu.Item
      name="timestamp"
      active={activeItem === 'timestamp'}
      onClick={onClickTimeStamp}
      color="blue"
    >
      <Icon name="calendar check" />
      {t('dear101.timestampView')}
    </Menu.Item>
    <Menu.Item
      name="days"
      active={activeItem === 'days'}
      onClick={onClickDays}
      color="blue"
    >
      <Icon name="hourglass end" />
      {t('dear101.daysView')}
    </Menu.Item>
    <Menu.Item
      name="video"
      active={activeItem === 'video'}
      onClick={onClickVideo}
      color="blue"
    >
      <Icon name="video" />
      {t('dear101.videoView')}
    </Menu.Item>
  </Menu>
);

export default withNamespaces('translation')(Dear101);
