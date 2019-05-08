const fs = require('fs');
const puppeteer = require('puppeteer');
const _ = require('lodash');

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
});

const URL = 'http://produce-x-101.mnet.com/pc/rank/1';
const DB_TABLE_NAME = 'produce-x-101';
const FILE_PATH = './data/dear101idx.json';

console.info('1주차 순위 업데이트 시작!');

const trainees = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL);

  const primeSelector = '.rank1to10';
  await page.waitForSelector(primeSelector);

  let rank = 1;

  const nameOf1to10 = await page.evaluate(getnameOf1to10);
  nameOf1to10.forEach(name => {
    const id = _.find(trainees, { name: name }).id;

    console.log(id, name, rank);

    store({
      id,
      name,
      rank,
    });

    rank++;
  });

  const nameOf11to30 = await page.evaluate(getnameOf11to30);
  nameOf11to30.forEach(name => {
    const id = _.find(trainees, { name: name }).id;

    console.log(id, name, rank);

    store({
      id,
      name,
      rank,
    });

    rank++;
  });

  const nameOf31to50 = await page.evaluate(getNameOf31to50);
  nameOf31to50.forEach(name => {
    const id = _.find(trainees, { name: name }).id;

    console.log(id, name, rank);

    store({
      id,
      name,
      rank,
    });

    rank++;
  });

  const nameOf51to70 = await page.evaluate(getNameOf51to70);
  nameOf51to70.forEach(name => {
    const id = _.find(trainees, { name: name }).id;

    console.log(id, name, rank);

    store({
      id,
      name,
      rank,
    });

    rank++;
  });

  const nameOf71to90 = await page.evaluate(getNameOf71to90);
  nameOf71to90.forEach(name => {
    const id = _.find(trainees, { name: name }).id;

    console.log(id, name, rank);

    store({
      id,
      name,
      rank,
    });

    rank++;
  });

  const nameOf91to101 = await page.evaluate(getNameOf91to101);
  nameOf91to101.forEach(name => {
    const id = _.find(trainees, { name: name }).id;

    console.log(id, name, rank);

    store({
      id,
      name,
      rank,
    });

    rank++;
  });

  await browser.close();

  console.info('1주차 순위 업데이트 완료!');
})();

const getnameOf1to10 = () => {
  const list = [];

  document.querySelectorAll('.rank1to10 li p a').forEach(li => {
    list.push(li.textContent);
  });

  return list;
};

const getnameOf11to30 = () => {
  const list = [];

  document.querySelectorAll('ol[olno="1"] li p a').forEach(li => {
    list.push(li.textContent);
  });

  return list;
};

const getNameOf31to50 = () => {
  const list = [];

  document.querySelectorAll('ol[olno="2"] li p a').forEach(li => {
    list.push(li.textContent);
  });

  return list;
};

const getNameOf51to70 = () => {
  const list = [];

  document.querySelectorAll('ol[olno="3"] li p a').forEach(li => {
    list.push(li.textContent);
  });

  return list;
};

const getNameOf71to90 = () => {
  const list = [];

  document.querySelectorAll('ol[olno="4"] li p a').forEach(li => {
    list.push(li.textContent);
  });

  return list;
};

const getNameOf91to101 = () => {
  const list = [];

  document.querySelectorAll('ol[olno="5"] li p a').forEach(li => {
    list.push(li.textContent);
  });

  return list;
};

function store(item) {
  const params = {
    TableName: DB_TABLE_NAME,
    Key: {
      id: item.id,
    },
    UpdateExpression: 'set week1Rank = :r, lastRank = :lr',
    ExpressionAttributeValues: {
      ':r': item.rank,
      ':lr': item.rank,
    },
  };

  console.info('Store ' + item.name + "'s data...");

  documentClient.update(params, (err, data) => {
    if (err) {
      console.error(err);
      console.error(params);
      process.exit();
    }
  });
}
