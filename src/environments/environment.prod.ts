/**
 * This is the base URI
 */
const baseUri = `http://34.238.165.243/`;

/**
 * Set the port var
 */
const port = '9002';

const googleKey = '';

/**
 * These are the constants for the production config
 */

export const environment = {
  production: true,
  environmentName: 'Default Environment',
  userUri: `${baseUri}:${port}/users/`,
  loginUri: `${baseUri}:${port}/login/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`,
  emailUri: `${baseUri}:${port}/email`,
  googleMapKey: `${googleKey}`,
  reservationUri: `${baseUri}:${port}/reservations`,
  approveRequestUri: `${baseUri}:${port}/approveDash`,
  deniedRequestUri: `${baseUri}:${port}/declineDash`,
};
