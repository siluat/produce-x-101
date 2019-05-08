const puppeteer = require('puppeteer');
const moment = require('moment');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
});
const sns = new AWS.SNS({ region: 'ap-northeast-2' });

const DB_TABLE_NAME = 'produce-x-101';
const AWS_SNS_TARGET_ARN = 'arn:aws:sns:ap-northeast-2:876863305772:toSlack';

const params = {
  TableName: DB_TABLE_NAME,
};

process.on('unhandledRejection', error => {
  const message = '[ERROR][Dear 101] ' + error.message;

  const params = {
    Message: message,
    TargetArn: AWS_SNS_TARGET_ARN,
  };

  // sns.publish(params, (err, data) => {
  //   if (err)  console.log(err, err.stack);
  //   else      console.log(data);

  //   process.exit();
  // });
});

documentClient.scan(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    crawling(
      data.Items.filter(item => {
        return !item.retired;
      }),
    );
  }
});

const getDear101Url = idx => {
  return 'https://www.dear101.com/x101_detail.php?idx=' + idx + '&cate=hug';
};

const crawling = async items => {
  console.info('Dear 101 후원 현황 크롤링 시작!');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let url = getDear101Url(item.dear101idx);

    await page.goto(url, { waitUntil: 'networkidle2' });

    const primeSelector = '#my_hug_';
    await page.waitForSelector(primeSelector);

    const hugRate = await page.evaluate(getHugRate);

    store(item, hugRate);
  }

  await browser.close();

  // await reportComplete();

  console.info('Dear 101 후원 현황 크롤링 완료!');
};

const getHugRate = () => {
  const selector = ['#steps', 'p', 'span'].join(' ');
  return parseFloat(document.querySelector(selector).style.width);
};

function store(item, hugRate) {
  const updateExpression = ['set dearHugRate = :ghr'];
  let expressionAttributeValues = { ':ghr': hugRate };
  let lastDate;

  if (hugRate === 6.6 && !item.dearHugStep11Date) {
    updateExpression.push('dearHugStep11Date = :step11date');
    expressionAttributeValues[':step11date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 13.2 && !item.dearHugStep12Date) {
    updateExpression.push('dearHugStep12Date = :step12date');
    expressionAttributeValues[':step12date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 20 && !item.dearHugStep13Date) {
    updateExpression.push('dearHugStep13Date = :step13date');
    expressionAttributeValues[':step13date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 26.6 && !item.dearHugStep21Date) {
    updateExpression.push('dearHugStep21Date = :step21date');
    expressionAttributeValues[':step21date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 33.2 && !item.dearHugStep22Date) {
    updateExpression.push('dearHugStep22Date = :step22date');
    expressionAttributeValues[':step22date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 40 && !item.dearHugStep23Date) {
    updateExpression.push('dearHugStep23Date = :step23date');
    expressionAttributeValues[':step23date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 46.6 && !item.dearHugStep31Date) {
    updateExpression.push('dearHugStep31Date = :step31date');
    expressionAttributeValues[':step31date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 53.2 && !item.dearHugStep32Date) {
    updateExpression.push('dearHugStep32Date = :step32date');
    expressionAttributeValues[':step32date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 60 && !item.dearHugStep33Date) {
    updateExpression.push('dearHugStep33Date = :step33date');
    expressionAttributeValues[':step33date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 66.6 && !item.dearHugStep41Date) {
    updateExpression.push('dearHugStep41Date = :step41date');
    expressionAttributeValues[':step41date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 73.2 && !item.dearHugStep42Date) {
    updateExpression.push('dearHugStep42Date = :step42date');
    expressionAttributeValues[':step42date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 80 && !item.dearHugStep43Date) {
    updateExpression.push('dearHugStep43Date = :step43date');
    expressionAttributeValues[':step43date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 86.6 && !item.dearHugStep51Date) {
    updateExpression.push('dearHugStep51Date = :step51date');
    expressionAttributeValues[':step51date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 93.2 && !item.dearHugStep52Date) {
    updateExpression.push('dearHugStep52Date = :step52date');
    expressionAttributeValues[':step52date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (hugRate === 100 && !item.dearHugStep53Date) {
    updateExpression.push('dearHugStep53Date = :step53date');
    expressionAttributeValues[':step53date'] = moment().format('YYYY-MM-DD');
    lastDate = moment().format('YYYY-MM-DD');
  }

  if (lastDate) {
    updateExpression.push('dearHugStepLastDate = :ld');
    expressionAttributeValues[':ld'] = lastDate;
  }

  console.log(updateExpression.join(', '));
  console.log(expressionAttributeValues);

  const params = {
    TableName: DB_TABLE_NAME,
    Key: {
      id: item.id,
    },
    UpdateExpression: updateExpression.join(', '),
    ExpressionAttributeValues: expressionAttributeValues,
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

const reportComplete = async () => {
  var message = 'Dear 101 후원 현황 정보를 업데이트 했습니다.';

  var params = {
    Message: message,
    TargetArn: AWS_SNS_TARGET_ARN,
  };

  for (var i = 0; i < 1; i++) {
    sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }
};
