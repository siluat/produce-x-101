import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Label } from 'semantic-ui-react';
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

class Trainee extends Component {
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
      children,
    } = this.props;

    return (
      <TraineeContainer>
        <TraineePicture id={trainee.id} name={trainee.name} />
        <TraineeDescription
          i18n={i18n}
          t={t}
          traineeId={trainee.id}
          name={trainee.name}
          nameInJapanese={trainee.nameInJapanese}
          nameInEnglish={trainee.nameInEnglish}
          lastRank={trainee.lastRank || 0}
          week1Rank={trainee.week1Rank}
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
      </TraineeContainer>
    );
  }
}

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
  week1Rank,
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
      week1Rank={week1Rank}
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
  week1Rank,
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
    {lastRank === week1Rank && <span> - </span>}
    {lastRank > week1Rank && (
      <RankDown>
        <Icon name="arrow down" />
        {lastRank - week1Rank}
      </RankDown>
    )}
    {lastRank < week1Rank && (
      <RankUp>
        <Icon name="arrow up" />
        {week1Rank - lastRank}
      </RankUp>
    )}
    {i18n.language !== 'en' && <TraineeName>{name}</TraineeName>}
    {i18n.language === 'en' && <TraineeName>{nameInEnglish}</TraineeName>}
    {videoLink ? (
      <a onClick={preventEventPropagation} href={videoLink} target="_blank">
        <Icon name="video play" />
      </a>
    ) : null}
    {videoTwitterLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoTwitterLink}
        target="_blank"
      >
        <Icon name="twitter" />
      </a>
    ) : null}
    {videoInstaLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoInstaLink}
        target="_blank"
      >
        <Icon name="instagram" />
      </a>
    ) : null}
    {videoFacebookLink ? (
      <a
        onClick={preventEventPropagation}
        href={videoFacebookLink}
        target="_blank"
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

export default withNamespaces('translation')(Trainee);
