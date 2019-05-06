import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Label, Segment } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const MAIN_PICTURE_PATH = '/images/mainPictures/144px/';

const TraineeContainer = styled.div`
  background-color: '#f6f6f6';
  position: relative;
  padding: 10px;
  min-height: 100px;
`

const TraineePictureContainer = styled.div`
  position: absolute;
`

const TraineePictureMask = styled.span`
  position: absolute;
  width: 72px;
  height: 72px;
  background: url('/images/mask_line72.png') 0 0 no-repeat;
`

const TraineePictureImage = styled.img`
  width: 72px;
  height: 72px;
  z-index: -10;
`

const TraineeDescriptionContainer = styled.div`
  display: inline-block;
  padding-top: 5px;
  padding-left: 80px;
  vertical-align: top;
  height: 72px;
  width: 100%;
`

const TraineeLabelContainer = styled.div`
  vertical-align: top;
  padding-bottom: 5px;
`

const TraineeRank = styled.span`
  font-weight: bold;
  color: #013DFD;
  :last-child {
    margin-left: -5px;
  }
`

const TraineeName = styled.span`
  font-weight: bold;
  padding: 0 5px;
`

const RankChartContainer = styled.div`
  margin-top: 10px;
`

class Trainee extends Component {
  constructor(props) {
    super(props);
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
      usePunchName,
      disableRankChart,
      children 
    } = this.props;

    return (
      <TraineeContainer>
        <TraineePicture id={trainee.id} name={trainee.name}/>
        <TraineeDescription
          i18n={i18n}
          t={t}
          traineeId={trainee.id}
          name={(usePunchName && trainee.punchName) ? trainee.punchName : trainee.name}
          nameInJapanese={trainee.nameInJapanese}
          nameInEnglish={trainee.nameInEnglish}
          lastRank={trainee.lastRank || 0}
          videoLink={videoLink}
          videoTwitterLink={videoTwitterLink}
          videoInstaLink={videoInstaLink}
          videoFacebookLink={videoFacebookLink}
          dear101Link={dear101idx}
          stepUpToday={(dearHugStepLastDate === moment().utcOffset(9).format('YYYY-MM-DD') ? true : false) }
          preventEventPropagation={this.preventEventPropagation}
          children={children}
        />
      </TraineeContainer>
    );
  }
}

const CustomizedRankLabel = ({ x, y, stroke, value, t }) =>
  <text x={x} y={y} dy={-10} fill={stroke} fontSize={12} textAnchor="middle">
    {value}{t('rank')}
  </text>

const TraineePicture = ({ id, name }) =>
  <TraineePictureContainer>
    <TraineePictureMask />
    <TraineePictureImage
      alt={name}
      src={MAIN_PICTURE_PATH + id + '.jpg'}
    />
  </TraineePictureContainer>

const TraineeDescription = ({ 
  i18n,
  t,
  traineeId,
  name,
  nameInJapanese,
  nameInEnglish,
  lastRank,
  videoLink,
  videoTwitterLink,
  videoInstaLink,
  videoFacebookLink,
  dear101Link,
  stepUpToday,
  preventEventPropagation,
  children
}) =>
  <TraineeDescriptionContainer>
    <TraineeLabel
      i18n={i18n}
      t={t}
      traineeId={traineeId}
      name={name}
      nameInJapanese={nameInJapanese}
      nameInEnglish={nameInEnglish}
      lastRank={lastRank}
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

const TraineeLabel = ({
  i18n,
  t,
  traineeId,
  name,
  nameInJapanese,
  nameInEnglish,
  lastRank,
  videoLink,
  videoTwitterLink,
  videoInstaLink,
  videoFacebookLink,
  dear101Link, 
  stepUpToday,
  preventEventPropagation
}) =>
  <TraineeLabelContainer>
    <TraineeRank>{lastRank}</TraineeRank>
    <TraineeName>{name}</TraineeName>
    {
      (videoLink)
        ? <a onClick={preventEventPropagation} href={videoLink} target="_blank">
            <Icon name='video play'/>
          </a>
       : null
    }
    {
      (videoTwitterLink)
        ? <a onClick={preventEventPropagation} href={videoTwitterLink} target="_blank">
            <Icon name='twitter'/>
          </a>
       : null
    }
    {
      (videoInstaLink)
        ? <a onClick={preventEventPropagation} href={videoInstaLink} target="_blank">
            <Icon name='instagram'/>
          </a>
       : null
    }
    {
      (videoFacebookLink)
        ? <a onClick={preventEventPropagation} href={videoFacebookLink} target="_blank">
            <Icon name='facebook'/>
          </a>
       : null
    }
    {
      (dear101Link) 
        ? <a onClick={preventEventPropagation} href={'https://www.dear101.com/x101_detail.php?idx=' + dear101Link + '&cate=hug'} target="_blank">
            <Icon name='external'/>
          </a>
        : null
    }
    {
      (stepUpToday)
        ? <Label basic pointing='left' size='mini'>
            오늘 상승!    
          </Label>
        : null
    }
  </TraineeLabelContainer>

export default Trainee;