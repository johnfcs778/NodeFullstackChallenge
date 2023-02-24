# NodeFullstackChallenge

## Dependencies
- Node
- NPM

## Usage:
- Checkout the repository
- CD to the backend directory and run `npm install` followed by `npm run build` and then `npm run start`
- CD to the frontend directory and run 'npm install' followed by `npm run start`
- The backend api should be available at `localhost:5000/api/v1`
- The frontend application should be available at `localhost:3000/application`

## DEMO:
[Video Demo](https://www.youtube.com/watch?v=aGyvDUow5nE)

## Example Requests:

POST api/v1/applications
```json
{
    "firstName":"John",
    "lastName": "Fahnestock",
    "dob": "1996-01-30",
    "street": "123 test lane",
    "city": "TESTUPDATE",
    "zipCode": "15203",
    "state": "Pennsylvania",
    "vehicles": [
        {
            "vin": "9999",
            "year": "2023",
            "make": "test",
            "model": "testmodel"
        },
        {
            "vin": "4321",
            "year": "2019",
            "make": "test",
            "model": "testmodel"
        },
        {
            "vin": "7891",
            "year": "1985",
            "make": "test",
            "model": "testmodel"
        }
    ]

}
```
GET api/v1/applications/lastName
- Returns the application for the given last name

POST api/v1/applications/validate
- Returns an object showing price and validation status


