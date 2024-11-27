# Pricing-Schemes

## Description
A simple full-stack web application where the user can add multiple pricing schemes in a Dynamic Form. The dynamic form allows multiple and moveable pricing schemes (Fixed Pricing & Variable-based).
The resulting pricing scheme are displayed in a table. The user can move the different pricing scheme instances and will also be reflected in the table.


## Installation

Clone the repository:

```bash
    git clone https://github.com/jmscalma/Pricing_Schemes.git
```

For Frontend:

```bash
    cd frontend/pricing_scheme
    npm install
```

For Backend:

```bash
    cd backend
    npm install
```
     
## Running the project
1. Navigate to frontend directory
```bash
    cd frontend/pricing_scheme
    npm run dev
```

2. Navigate to backend directory
```bash
    cd backend
    node index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST=sample_db_host`

`DB_USER=sample_db_user`

`DB_PASSWORD=sample_db_password`

`DB_PORT=sample_db_port`

`DB_DATABASE=sample_database`

`PORT=sample_port`

`HOST=sample_host`

## Features

- Add Pricing Scheme
    - Select Pricing Scheme Type 
    - Input rate in the Textfield
    - It will automatically save once you remove the cursor focus in the texfield or click outside the Textfield

- Update Pricing Scheme rate
    - Select the Pricing Scheme to be updated
    - Update the rate 
    - It will automatically save once you remove the cursor focus in the texfield or click outside the Textfield

- Delete Pricing Scheme
    - Click the delete button for the pricing scheme to be deleted

- Moveable Pricing Scheme order
    - Each pricing scheme can be moved to indicate its position in the entire pricing scheme


## Technologies
- Frontend: React
- Backend: Node.js, Express
- Database: PostgreSQL
- API: REST

