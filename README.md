This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# ****Memory Leak problem on Blitz testing****
We noticed in a full stack application that we are working with Blitz that there is a memory leak problem while running tests. When we try to run all existing tests on our github repo, the memory limit is always exceeding and the Action is failing.

We created basic tests and duplicated them over and over again to show the problem happening, in this application we made the memory consumed reach 1GB. In our work, it even exceeded 2GB.

## Getting Started

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL="file:./db.sqlite"
```



## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

