const dev = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://n1axgoghfg.execute-api.us-east-1.amazonaws.com/dev'
  }
};

const prod = {
  apiGateway: {
    REGION: '',
    URL: ''
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Add common config values here
  ...config
};
