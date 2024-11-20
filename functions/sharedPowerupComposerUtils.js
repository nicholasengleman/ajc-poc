/*
  this is copy/pasted from https://github.com/arcxp/arcxp-shared-components/tree/main/src/utils/powerup-composer-utils because the arcxp npm registry no longer exists.
  it was initially used by the LiveCenterPowerUp feature but can be used by any power up
*/
const parseQueryString = (key) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

export const getPayload = () => JSON.parse(parseQueryString('p'));

export const sendMessage = (action, data = {}) => {
  if (typeof window !== 'undefined') {
    const messagePayload = {
      source: 'custom_embed',
      action,
      data,
      key: parseQueryString('k'),
    };
    if (action === 'ready') {
      messagePayload.isAnsRequired = true;
    }
    window.parent.postMessage(JSON.stringify(messagePayload), '*');
  }
};

export const getStarterPowerUpANS = (idPrefix = 'custom_powerup') => {
  const dateNow = Date.now();
  return {
    id: `${idPrefix}_${dateNow}`,
    url: '/',
    config: {},
  };
};
