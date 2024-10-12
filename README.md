# services-orchestration

# Dynamic Service Execution POC

This project demonstrates a proof of concept for dynamically executing services based on input parameters, with support for dependent services.

## How It Works

1. **Services**: The application defines six main services (A, B, C, D, E, F) and two dependent services (DependentService1, DependentService2).

2. **Dependency Rules**:
   - If Service A or B is requested, DependentService1 will run first.
   - If Service C or D is requested, DependentService2 will run first.

3. **Service Execution**:
   - The application exposes an HTTP GET endpoint at `/execute`.
   - The endpoint accepts a query parameter `services` which is a comma-separated list of service keys to execute.
   - Example: `/execute?services=A,B,C`

4. **Execution Flow**:
   - The `ServiceExecutor` class handles the execution of services.
   - It first checks and executes any required dependent services.
   - Then it executes the requested services in the order they were specified.

5. **Dependency Injection**:
   - The project uses TypeDI for dependency injection, making it easy to manage and test services.

## Project Structure

- `src/index.ts`: Main application file, sets up the Express server and routes.
- `src/services.ts`: Defines the main services (A, B, C, D, E, F).
- `src/dependentServices.ts`: Defines the dependent services.
- `src/serviceExecutor.ts`: Contains the logic for executing services and managing dependencies.

## Running the Application

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Access the API at `http://localhost:3000/execute?services=A,B,C` (replace A,B,C with desired services)

## Service Execution Examples

Here are some examples of service execution and their expected outcomes:

1. **Execute A and B:**
   - Request: `/execute?services=A,B`
   - Expected outcome:
     ```
     [
       "Dependent Service 1 executed",
       "Service A executed",
       "Service B executed"
     ]
     ```
   - Explanation: DependentService1 is executed first because A or B is requested.

2. **Execute C and D:**
   - Request: `/execute?services=C,D`
   - Expected outcome:
     ```
     [
       "Dependent Service 2 executed",
       "Service C executed",
       "Service D executed"
     ]
     ```
   - Explanation: DependentService2 is executed first because C or D is requested.

3. **Execute A, C, and E:**
   - Request: `/execute?services=A,C,E`
   - Expected outcome:
     ```
     [
       "Dependent Service 1 executed",
       "Dependent Service 2 executed",
       "Service A executed",
       "Service C executed",
       "Service E executed"
     ]
     ```
   - Explanation: Both DependentService1 and DependentService2 are executed because A and C are requested.

4. **Execute E and F:**
   - Request: `/execute?services=E,F`
   - Expected outcome:
     ```
     [
       "Service E executed",
       "Service F executed"
     ]
     ```
   - Explanation: No dependent services are executed because E and F don't have dependencies.

5. **Execute A, B, C, D:**
   - Request: `/execute?services=A,B,C,D`
   - Expected outcome:
     ```
     [
       "Dependent Service 1 executed",
       "Dependent Service 2 executed",
       "Service A executed",
       "Service B executed",
       "Service C executed",
       "Service D executed"
     ]
     ```
   - Explanation: Both dependent services are executed, but only once each, even though multiple services require them.

These examples demonstrate how the service executor handles different combinations of service requests and manages the execution of dependent services.
