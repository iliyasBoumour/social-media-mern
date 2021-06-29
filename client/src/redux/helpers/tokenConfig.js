const tokenConfig = (getState) => {
  const token = getState().auth.token;
  //config headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) config.headers['auth-token'] = token;
  return config;
};

export default tokenConfig;
