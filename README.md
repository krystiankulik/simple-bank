## Simple Bank

Remote URL: https://simple-bank-xi.vercel.app

There are already some transactions set up for the username **Tester**. However, use any username you wish - a new account will be created.

### How to run it locally?

with Docker: *docker-compose up --build*

### Remote deployment and pipeline

The app is running on Vercel.

The CI/CD pipeline automatically deploys the app when new changes are pushed to the GitHub repository.
It's also running the Prisma migrations and running tests to ensure that the existing functionality is not broken.

It all happens within a build command:

`npm run test & prisma generate && prisma migrate deploy && next build`

### Testing

There are two types of tests in the app:

- Jest tests for the api routes in *./app/api/\_\_tests\_\_* directory
- UI tests with Jest and React Testing Library in *./app/components/\_\_tests\_\_* directory

It's not covering the whole app because of the time and effort it requires, but it does test the crucial parts of
the application.

### Additional libraries

There are few libraries imported to the project to help with UI or business logic.

- **daisyui** - provides additional Tailwind classes to easily create specific components (like buttons)  
- **react-infinite-scroll-component** - handles infinite scroll when loading the list of transactions  
- **ibankit** - provides utilities to create and validate IBANs

### Potential Improvements
- **Better API fetching in the UI**: Axios was used to handle API calls but it could be optimized in terms of caching, performance, and code quality. Using a tool like React Query could have a positive impact. However, at this stage of development and because of the time constraints, it was an overkill.
- **Higher test coverage**: Only the crucial parts of the app were tested. To ensure robustness, achieving higher test coverage would be necessary.
- **User authentication**: Although it was not a requirement, adding authentication would make the app resemble a real-world application more closely.
- **Proper design with mockups**: In a real world scenario I would firstly develop UI mockups with Figma to firstly validate all the assumptions about the app functionality.
