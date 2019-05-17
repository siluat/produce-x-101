import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import LoadingContent from './LoadingContent';

const PATH_FETCH =
  'https://7orvtlfpoh.execute-api.ap-northeast-2.amazonaws.com/default/scan-produce-x-101';

class CrawlerStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      traineeData: [],
      isLoading: false,
    };

    this.fetchTraineeData = this.fetchTraineeData.bind(this);
    this.setTraineeData = this.setTraineeData.bind(this);
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
    this.setState({
      traineeData: data,
      isLoading: false,
    });
  }

  render() {
    const { traineeData, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <LoadingContent />
        ) : (
          <div>
            <Table unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>이름</Table.HeaderCell>
                  <Table.HeaderCell>최근 수집 시간</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {traineeData
                  .sort((a, b) => {
                    return (
                      moment(a.x1maLastTime).format('X') -
                      moment(b.x1maLastTime).format('X')
                    );
                  })
                  .map(trainee => {
                    return (
                      <Table.Row key={trainee.id}>
                        <Table.Cell>{trainee.name}</Table.Cell>
                        <Table.Cell>{trainee.x1maLastTime}</Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default CrawlerStatus;
