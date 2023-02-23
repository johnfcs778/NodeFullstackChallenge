import  ApplicationModel  from '../models/Application.js'

export function generateQueryString(applicationModel: ApplicationModel): string {
    const queryParams: string[] = [];
  
    for (const [key, value] of Object.entries(applicationModel)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          for (const [subKey, subValue] of Object.entries(value)) {
            if (subValue !== undefined && subValue !== null) {
              if (typeof subValue === 'string'){
                queryParams.push(`${subKey}=${subValue.replace(/ /g, "%20")}`);
              } else {
                queryParams.push(`${subKey}=${subValue}`);
              }
             
            }
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
// export function generateQueryString(application: ApplicationModel): string {
//   let queryString = "";

//   for (const [key, value] of Object.entries(application)) {
//     if (value !== undefined) {
//       if (queryString.length === 0) {
//         queryString += `?${key}=${value}`;
//       } else {
//         queryString += `&${key}=${value}`;
//       }
//     }
//   }

//   return queryString;
// }
