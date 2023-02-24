import  ApplicationModel, { Vehicle }  from '../models/Application.js'

export function generateQueryString(applicationModel: ApplicationModel): string {
    const queryParams: string[] = [];
  
    for (const [key, value] of Object.entries(applicationModel)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          if(key !== 'vehicles') {
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

  export function areAllFieldsNonNull(obj: any): boolean {
    return Object.values(obj).every(value => value !== null && value !== '');
  }
  