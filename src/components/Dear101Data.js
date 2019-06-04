import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

const VideoLink = styled.a`
  color: #fff;
  font-size: 1.1rem;
  &:hover {
    color: #fff;
  }
`;

const DearStepProgressContainer = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #e9ecef;
  border-radius: 0.5rem;
  box-sizing: border-box;
  height: 30px;
`;

const DearStepBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  height: 30px;
  background-color: ${props => (props.retired ? '#868e96' : '#013dfd')};
  transition: width 0.6s ease;
  box-sizing: border-box;
  font-size: 0.86rem;
  font-weight: bold;
  &:not(:last-child) {
    border-right: 0.1px solid #fff;
  }
`;

const Dear101Data = ({
  t,
  selectedMenu,
  retired,
  dearHugRate,
  dear101FirstVideo,
  dear101SecondVideo,
  dear101ThirdVideo,
  dear101FourthVideo,
  dear101FifthVideo,
  dearHugStep13Date,
  dearHugStep23Date,
  dearHugStep33Date,
  dearHugStep43Date,
  dearHugStep53Date,
}) => (
  <DearStepProgress>
    {dearHugRate >= 20 ? (
      <DearStepBar style={{ width: '20%' }} retired={retired}>
        {(() => {
          switch (selectedMenu) {
            case 'video':
              return dear101FirstVideo ? (
                <VideoLink href={dear101FirstVideo} target="_blank">
                  <Icon name="video" />
                </VideoLink>
              ) : (
                <span>-</span>
              );
            case 'timestamp':
              return <span>{moment(dearHugStep13Date).format('M/D')}</span>;
            case 'days':
              return (
                <span>
                  {moment(dearHugStep13Date).diff('2019-04-09', 'days')}
                  {t('dear101.dayText')}
                </span>
              );
            default:
              return <span>{t('dear101.step', { value: 1 })}</span>;
          }
        })()}
      </DearStepBar>
    ) : (
      <DearStepBar style={{ width: dearHugRate + '%' }} retired={retired} />
    )}
    {dearHugRate >= 40 ? (
      <DearStepBar style={{ width: '20%' }} retired={retired}>
        {(() => {
          switch (selectedMenu) {
            case 'video':
              return dear101SecondVideo ? (
                <VideoLink href={dear101SecondVideo} target="_blank">
                  <Icon name="video" />
                </VideoLink>
              ) : (
                <span>-</span>
              );
            case 'timestamp':
              return <span>{moment(dearHugStep23Date).format('M/D')}</span>;
            case 'days':
              return (
                <span>
                  {moment(dearHugStep23Date).diff(dearHugStep13Date, 'days')}
                  {t('dear101.dayText')}
                </span>
              );
            default:
              return <span>{t('dear101.step', { value: 2 })}</span>;
          }
        })()}
      </DearStepBar>
    ) : (
      <DearStepBar
        style={{ width: dearHugRate - 20 + '%' }}
        retired={retired}
      />
    )}
    {dearHugRate >= 60 ? (
      <DearStepBar style={{ width: '20%' }} retired={retired}>
        {(() => {
          switch (selectedMenu) {
            case 'video':
              return dear101ThirdVideo ? (
                <VideoLink href={dear101ThirdVideo} target="_blank">
                  <Icon name="video" />
                </VideoLink>
              ) : (
                <span>-</span>
              );
            case 'timestamp':
              return <span>{moment(dearHugStep33Date).format('M/D')}</span>;
            case 'days':
              return (
                <span>
                  {moment(dearHugStep33Date).diff(dearHugStep23Date, 'days')}
                  {t('dear101.dayText')}
                </span>
              );
            default:
              return <span>{t('dear101.step', { value: 3 })}</span>;
          }
        })()}
      </DearStepBar>
    ) : (
      <DearStepBar
        style={{ width: dearHugRate - 40 + '%' }}
        retired={retired}
      />
    )}
    {dearHugRate >= 80 ? (
      <DearStepBar style={{ width: '20%' }} retired={retired}>
        {(() => {
          switch (selectedMenu) {
            case 'video':
              return dear101FourthVideo ? (
                <VideoLink href={dear101FourthVideo} target="_blank">
                  <Icon name="video" />
                </VideoLink>
              ) : (
                <span>-</span>
              );
            case 'timestamp':
              return <span>{moment(dearHugStep43Date).format('M/D')}</span>;
            case 'days':
              return (
                <span>
                  {moment(dearHugStep43Date).diff(dearHugStep33Date, 'days')}
                  {t('dear101.dayText')}
                </span>
              );
            default:
              return <span>{t('dear101.step', { value: 4 })}</span>;
          }
        })()}
      </DearStepBar>
    ) : (
      <DearStepBar
        style={{ width: dearHugRate - 60 + '%' }}
        retired={retired}
      />
    )}
    {dearHugRate >= 100 ? (
      <DearStepBar style={{ width: '20%' }} retired={retired}>
        {(() => {
          switch (selectedMenu) {
            case 'video':
              return dear101FifthVideo ? (
                <VideoLink href={dear101FifthVideo} target="_blank">
                  <Icon name="video" />
                </VideoLink>
              ) : (
                <span>-</span>
              );
            case 'timestamp':
              return <span>{moment(dearHugStep53Date).format('M/D')}</span>;
            case 'days':
              return (
                <span>
                  {moment(dearHugStep53Date).diff(dearHugStep43Date, 'days')}
                  {t('dear101.dayText')}
                </span>
              );
            default:
              return <span>{t('dear101.step', { value: 5 })}</span>;
          }
        })()}
      </DearStepBar>
    ) : (
      <DearStepBar
        style={{ width: dearHugRate - 80 + '%' }}
        retired={retired}
      />
    )}
  </DearStepProgress>
);

const DearStepProgress = ({ children }) => (
  <DearStepProgressContainer>{children}</DearStepProgressContainer>
);

export default withNamespaces('translation')(Dear101Data);
