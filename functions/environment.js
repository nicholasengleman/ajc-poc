import { ENVIRONMENT } from 'fusion:environment';

const fetchEnv = () => {
  const env = ENVIRONMENT || '';
  if (env.includes('localhost') || env.includes('dev')) return 'dev';
  if (env.includes('sandbox') || env.includes('staging')) return 'sandbox';
  return 'prod';
};

export default fetchEnv;
