const fs = require('fs');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
});

const DB_TABLE_NAME = 'produce-x-101';
const FILE_PATH = './data/x1maDirectCam.json';

console.info('_지마 평가 직캠 영상 주소 업데이트 시작!');

const items = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

items.forEach(item => {
  if (item.value.length) {
    store(item);
  }
});

console.info('_지마 평가 직캠 영상 업데이트 완료!');

function store(item) {
  const params = {
    TableName: DB_TABLE_NAME,
    Key: {
      id: item.id,
    },
    UpdateExpression: 'set x1maDirectCamUrl = :r',
    ExpressionAttributeValues: {
      ':r': item.value,
    },
  };

  documentClient.update(params, (err, data) => {
    if (err) {
      console.error(err);
      console.error(params);
      process.exit();
    }
  });
}
