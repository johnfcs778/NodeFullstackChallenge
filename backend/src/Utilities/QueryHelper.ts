/**
 *  This file defines helper utility functions
 *  Author: John Fahnestock
 */

import ApplicationModel, { Vehicle } from '../models/Application.js'

/**
 * Generates a "resume" route that points to the frontend URL that loads the application
 * @param applicationModel 
 * @returns 
 */
export function generateQueryString(applicationModel: ApplicationModel): string {
  const queryParams: string[] = [];
  // Loop through the entries in the object and add them to the query string
  for (const [key, value] of Object.entries(applicationModel)) {
    if (value !== undefined && value !== null) {
      // Account for one layer of nested objects to include the nested fields
      if (typeof value === 'object') {
        if (key !== 'vehicles') {
          for (const [subKey, subValue] of Object.entries(value)) {
            if (subValue !== undefined && subValue !== null) {
              if (typeof subValue === 'string') {
                queryParams.push(`${subKey}=${subValue.replace(/ /g, "%20")}`);
              } else {
                queryParams.push(`${subKey}=${subValue}`);
              }

            }
          }
        } else {
          queryParams.push(`${key}=${value.toString()}`);
        }
      } else {
        queryParams.push(`${key}=${value.replace(/ /g, "%20")}`);
      }
    }
  }

  if (queryParams.length === 0) {
    return '';
  } else {
    return '?' + queryParams.join('&');
  }
}


/**
 * Helper function to validate object fields
 * @param obj 
 * @returns 
 */
export function areAllFieldsNonNull(obj: any): boolean {
  return Object.values(obj).every(value => value !== null && value !== '');
}
