import ip from 'ip';

export const getLocalIp = (): string => {
  return ip.address();
};
