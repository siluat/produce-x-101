import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Label, Segment } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import { withNamespaces } from 'react-i18next';

const MAIN_PICTURE_PATH = '/images/mainPictures/144px/';

const TraineeContainer = styled.div`
  background-color: '#f6f6f6';
  position: relative;
  padding: 10px;
  min-height: 100px;
`;

const TraineePictureContainer = styled.div`
  position: absolute;
`;

const TraineePictureMask = styled.span`
  position: absolute;
  width: 72px;
  height: 72px;
  background: url('/images/mask_line72.png') 0 0 no-repeat;
`;

const TraineePictureImage = styled.img`
  width: 72px;
  height: 72px;
  z-index: -10;
`;

const TraineeDescriptionContainer = styled.div`
  display: inline-block;
  padding-top: 5px;
  padding-left: 80px;
  vertical-align: top;
  height: 72px;
  width: 100%;
`;

const TraineeLabelContainer = styled.div`
  vertical-align: top;
  padding-bottom: 5px;
`;

const TraineeRank = styled.span`
  font-weight: bold;
  color: #013dfd;
  :last-child {
    margin-left: -5px;
  }
`;

const TraineeName = styled.span`
  font-weight: bold;
  padding: 0 5px;
`;

const RankUp = styled.span`
  color: #f03e3e;
  font-size: 13px;
  i {
    font-size: 11px;
    margin-left: 2px;
    margin-right: 0;
  }
`;

const RankDown = styled.span`
  color: #1864ab;
  font-size: 13px;
  i {
    font-size: 11px;
    margin-left: 2px;
    margin-right: 0;
  }
`;

const PartialRank = styled.span`
  position: absolute;
  z-index: 10;
  top: 58px;
  left: -1px;
  .ui.label {
    background-color: rgba(1, 61, 253, 0.63);
    color: #ffffff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0.8em;
    padding-right: 0.8em;
  }
`;

const RankChartContainer = styled.div`
  margin-top: 10px;
`;

class Trainee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRankChart: false,
    };

    this.onClick = this.onClick.bind(this);
    this.preventEventPropagation = this.preventEventPropagation.bind(this);
  }

  onClick() {
    this.setState({
      showRankChart: !this.state.showRankChart,
    });
  }

  preventEventPropagation(event) {
    event.stopPropagation();
  }

  render() {
    const {
      i18n,
      t,
      trainee,
      dear101idx,
      dearHugStepLastDate,
      videoLink,
      videoTwitterLink,
      videoInstaLink,
      videoFacebookLink,
      disableRankChart,
      children,
      partialRank,
    } = this.props;

    const { showRankChart } = this.state;

    const rankData = [
      { name: '1' + t('week'), rank: trainee.week1Rank },
      { name: '2' + t('week'), rank: trainee.week2Rank },
      { name: '3' + t('week'), rank: trainee.week3Rank },
      { name: '5' + t('week'), rank: trainee.week4Rank },
      { name: '6' + t('week'), rank: trainee.week6Rank },
      { name: '8' + t('week'), rank: trainee.week8Rank },
      { name: '11' + t('week'), rank: trainee.week11Rank },
      { name: '12' + t('week'), rank: trainee.week12Rank },
    ];

    return (
      <TraineeContainer
        onClick={!disableRankChart ? this.onClick : null}
        showRankChart={showRankChart}
      >
        {partialRank && <PartialRankContainer rank={partialRank} />}
        <TraineePicture id={trainee.id} name={trainee.name} />
        <TraineeDescription
          i18n={i18n}
          t={t}
          traineeId={trainee.id}
          name={trainee.name}
          nameInJapanese={trainee.nameInJapanese}
          nameInEnglish={trainee.nameInEnglish}
          lastRank={trainee.lastRank || 0}
          week4Rank={trainee.week4Rank}
          videoLink={videoLink}
          videoTwitterLink={videoTwitterLink}
          videoInstaLink={videoInstaLink}
          videoFacebookLink={videoFacebookLink}
          dear101Link={dear101idx}
          stepUpToday={
            dearHugStepLastDate ===
            moment()
              .utcOffset(9)
              .format('YYYY-MM-DD')
              ? true
              : false
          }
          preventEventPropagation={this.preventEventPropagation}
          children={children}
        />
        {showRankChart ? (
          <RankChartContainer>
            <Segment padded style={{ padding: '20px 5px 5px 10px' }}>
              <Label attached="top left">
                {trainee.name}&nbsp;
                {t('weekly-rank-chart')}
              </Label>
              <ResponsiveContainer height={100}>
                <LineChart
                  data={rankData}
                  margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
                  padding={{ left: 0, right: 0 }}
                >
                  <Line
                    type="linear"
                    dataKey="rank"
                    stroke="#013dfd"
                    animationDuration={500}
                    fill="#013dfd"
                    label={<CustomizedRankLabel t={t} />}
                  />
                  <XAxis
                    dataKey="name"
                    padding={{ left: 15, right: 15 }}
                    fontSize="12px"
                    interval={0}
                  />
                  <YAxis reversed={true} hide={true} />
                </LineChart>
              </ResponsiveContainer>
            </Segment>
          </RankChartContainer>
        ) : null}
      </TraineeContainer>
    );
  }
}

const PartialRankContainer = ({ rank }) => (
  <PartialRank>
    <Label size="small">{rank}</Label>
  </PartialRank>
);

const TraineePicture = ({ id, name }) => (
  <TraineePictureContainer>
    <TraineePictureMask />
    <TraineePictureImage alt={name} src={MAIN_PICTURE_PATH + id + '.jpg'} />
  </TraineePictureContainer>
);

const TraineeDescription = ({
  i18n,
  t,
  traineeId,
  name,
  nameInJapanese,
  nameInEnglish,
  lastRank,
  week4Rank,
  videoLink,
  videoTwitterLink,
  videoInstaLink,
  videoFacebookLink,
  dear101Link,
  stepUpToday,
  preventEventPropagation,
  children,
}) => (
  <TraineeDescriptionContainer>
    <TraineeLabel
      i18n={i18n}
      t={t}
      traineeId={traineeId}
      name={name}
      nameInJapanese={nameInJapanese}
      nameInEnglish={nameInEnglish}
      lastRank={lastRank}
      week4Rank={week4Rank}
      videoLink={videoLink}
      videoTwitterLink={videoTwitterLink}
      videoInstaLink={videoInstaLink}
      videoFacebookLink={videoFacebookLink}
      dear101Link={dear101Link}
      stepUpToday={stepUpToday}
      preventEventPropagation={preventEventPropagation}
    />
    {children}
  </TraineeDescriptionContainer>
);

const TraineeLabel = ({
  i18n,
  t,
  name,
  nameInEnglish,
  lastRank,
  week4Rank,
  videoLink,
  videoTwitterLink,
  videoInstaLink,
  videoFacebookLink,
  dear101Link,
  stepUpToday,
  preventEventPropagation,
}) => (
  <TraineeLabelContainer>
    <TraineeRank>{lastRank}</TraineeRank>
    {/* {lastRank === week4Rank && <span> - </span>}
    {lastRank > week4Rank && (
      <RankDown>
        <Icon name="arrow down" />
        {lastRank - week4Rank}
      </RankDown>
    )}
    {lastRank < week4Rank && (
      <RankUp>
        <Icon name="arrow up" />
        {week4Rank - lastRank}
      </RankUp>
    )} */}
    {i18n.language !== 'en' && <TraineeName>{name}</TraineeName>}
    {i18n.language === 'en' && <TraineeName>{nameInEnglish}</TraineeName>}
    {videoLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="video play" />
      </a>
    ) : null}
    {videoTwitterLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoTwitterLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="twitter" />
      </a>
    ) : null}
    {videoInstaLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoInstaLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="instagram" />
      </a>
    ) : null}
    {videoFacebookLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoFacebookLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="facebook" />
      </a>
    ) : null}
    {dear101Link ? (
      <a
        onClick={preventEventPropagation}
        href={
          'https://www.dear101.com/x101_detail.php?idx=' +
          dear101Link +
          '&cate=hug'
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="external" />
      </a>
    ) : null}
    {stepUpToday ? (
      <Label basic pointing="left" size="mini">
        {t('dear101.upToday')}
      </Label>
    ) : null}
  </TraineeLabelContainer>
);

const CustomizedRankLabel = ({ x, y, stroke, value, t }) => (
  <text x={x} y={y} dy={-10} fill={stroke} fontSize={12} textAnchor="middle">
    {value}
    {t('rank')}
  </text>
);

export default withNamespaces('translation')(Trainee);
