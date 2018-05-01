const Stack = require('@bjacobel/cloudformer-node');

const template = require('../template');
const config = require('../../config');

module.exports = () => {
  const stack = new Stack(config.ProjectName);
  stack.apply(
    template,
    {
      Parameters: Object.entries(config).reduce((prev, [key, val]) => {
        if (Object.keys(JSON.parse(template).Parameters).includes(key)) {
          return { ...prev, [key]: val };
        } else {
          return prev;
        }
      }, {}),
      Tags: {
        Name: config.ProjectName,
      },
    },
    console.log
  );
  console.log(`Check on the progress of the stack in the AWS console:
    \rhttps://console.aws.amazon.com/cloudformation/home#/stacks?filter=active\n
    \rLeaving this process running will tail CloudFormation stack events to the console as well.\n`);
};
