This is a service which is useful to
derive simplified summary statistics (mean, min, max) on a dataset

NOTE: Whenever we mention <SS> we mean summary statistics which essentially means 3
values (mean, min, max)

0) TO RUN PROJECT IN DEV MODE:
- put .env file into project root
- run 'npm i'
- run 'npm run start'

1) AUTHORIZATION

This project use Bearer token to autorize requests, to get token use GET ~/api/auth endpoint

2) API endpoints:

////////////////////////////////////////////////////////

Get token to use other endpoints
GET ~/api/auth
Send JSON with next fields:
    - user - string && required
    - password - string && required

NOTE! Login and password can  be found in .env file which was send with github link

if success - { "isOk": true, {token to use in auth header as bearer token} }

examples:

    req:
        curl --location --request GET 'http://localhost:3000/api/auth/' \
        --header 'Authorization: Bearer test' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "user": "admin",
            "password": "12345"
        }'

    res:
        {
            "isOk": true,
            "token": {token}
        }

////////////////////////////////////////////////////////

Add new record
POST ~/api/record/ 
Send JSON with next fields:
    - name - string && required

    - salary - (string || number) && required

    - currency - string && required

    - department - string && required

    - sub_department - string && required

    - on_contract - boolean && not required

if success - { "isOk": true, "result": {data from database} }

examples:

    req:
        curl --location --request POST 'http://localhost:3000/api/record/' \
        --header 'Authorization: Bearer token' \
        --header 'Content-Type: application/json' \
        --data-raw '{
        "name": "Anupam",
        "salary": "200000000",
        "currency": "INR",
        "department": "Engineering",
        "sub_department": "Platform"
        }
        '

    res:
        {
            "isOk": true,
            "result": {
                "name": "Anupam",
                "salary": "200000000",
                "currency": "INR",
                "department": "Engineering",
                "sub_department": "Platform",
                "on_contract": false,
                "_id": "632ef798ead75e4dfad71482",
                "__v": 0
            }
        }

////////////////////////////////////////////////////////

Delete existed record by id
DELETE ~/api/record/{id}

    - id - id from database to delete (without {} brackets)

if success - { "isOk": true }

examples:

    req:
        curl --location --request DELETE 'http://localhost:3000/api/record/632ef798ead75e4dfad71482' \
        --header 'Authorization: Bearer token' \
        --data-raw ''

    res:
        {
            "isOk": true
        }

////////////////////////////////////////////////////////

Get SS data for existed records with
GET ~/api/record
Send JSON with next fields as settings:
    - onContract - boolean && not required - if true, will filter records data by "on_contract": true field

    - department - boolean && not required - if true, will split SS data for each department

    - subDepartment - boolean && not required - if true, will split SS data for each department and sub-department 
    (NOTE: if subDepartment === true: department setting will not affect result)


if success - { "isOk": true, ssData for your settings }

examples:

    req:
        curl --location --request GET 'http://localhost:3000/api/record/' \
        --header 'Authorization: Bearer token' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "department": false,
            "subDepartment": false,
            "onContract": false
        }'

    res:
        {
            "isOk": true,
            "result": {
                "min": 30,
                "max": 200000000,
                "mean": 40065509
            }
        }

    //////

    req:
        curl --location --request GET 'http://localhost:3000/api/record/' \
        --header 'Authorization: Bearer token' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "department": false,
            "subDepartment": false,
            "onContract": true
        }'

    res:
        {
            "isOk": true,
            "result": {
                "min": 90000,
                "max": 110000,
                "mean": 100000
            }
        }

    //////

    req:
        curl --location --request GET 'http://localhost:3000/api/record/' \
        --header 'Authorization: Bearer token' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "department": true,
            "subDepartment": false,
            "onContract": false
        }'

    res:
        {
            "isOk": true,
            "result": {
                "Engineering": {
                    "min": 30,
                    "max": 200000000,
                    "mean": 40099006
                },
                "Banking": {
                    "min": 90000,
                    "max": 90000,
                    "mean": 90000
                },
                "Operations": {
                    "min": 30,
                    "max": 70000,
                    "mean": 35015
                },
                "Administration": {
                    "min": 30,
                    "max": 30,
                    "mean": 30
                }
            }
        }

    //////
    
    req:
        curl --location --request GET 'http://localhost:3000/api/record/' \
        --header 'Authorization: Bearer token' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "department": false,
            "subDepartment": true,
            "onContract": false
        }'

    res:
        {
            "isOk": true,
            "result": {
                "Engineering": {
                    "Platform": {
                        "min": 30,
                        "max": 200000000,
                        "mean": 40099006
                    }
                },
                "Banking": {
                    "Loan": {
                        "min": 90000,
                        "max": 90000,
                        "mean": 90000
                    }
                },
                "Operations": {
                    "CustomerOnboarding": {
                        "min": 30,
                        "max": 70000,
                        "mean": 35015
                    }
                },
                "Administration": {
                    "Agriculture": {
                        "min": 30,
                        "max": 30,
                        "mean": 30
                    }
                }
            }
        }

////////////////////////////////////////////////////////

3) POSIBLE ERRORS
400 - sent data is invalid
404 - not found
401 - not authorized
500 - other errors (see error message)