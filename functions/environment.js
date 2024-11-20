// import { ENVIRONMENT } from 'fusion:environment';

const fetchEnv = () => {
  // TOTO: Get fix for getting environment
  const env = "";
  if (env.includes("localhost") || env.includes("dev")) return "dev";
  if (env.includes("sandbox") || env.includes("staging")) return "sandbox";
  return "prod";
};

export default fetchEnv;
