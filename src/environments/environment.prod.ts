/**
 * This is the base URI
 */
const baseUri = `http://34.238.165.243/`;

/**
 * Set the port var
 */
const port = '9002';

/**
 * These are the constants for the production config
 */

export const environment = {
  production: true,
  environmentName: 'Production Environment',
  userUri: `${baseUri}:${port}/users/`,
  loginUri: `${baseUri}:${port}/login/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`,
  emailUri: `${baseUri}:${port}/email`,
  reservationDriverUri: `${baseUri}:${port}/reservations/driver`,
};
