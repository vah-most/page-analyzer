# A11y-Analyzer

A RESTful API for managing a11y analysis, built with Node.js, Express, and TypeScript.

## Table of Contents

- [Features](#features)
- [Implementation Highlights](#implementation-highlights)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Docker Support](#docker-support)
- [Example Request](#example-request)

## Features

- Swagger/OpenAPI documentation

## Prerequisites

- Node.js
- npm, pnpm or yarn package manager

## Installation

1. Install dependencies:

   ```bash
   pnpm install
   # or
   yarn install
   ```

2. Optionally, create a `.env` file in the root directory based on the guideline in `.env.sample`:
   ```
   SERVER_PORT=3000
   SERVER_HOST=localhost
   ...
   ```

## Configuration

The application can be configured through environment variables:

- `SERVER_PORT`: Port number for the server (default: 3000)
- `SERVER_HOST`: Base host for the server (default: localhost)
- ...

## Running the Application

1. Start the development server:

   ```bash
   pnpm run dev
   # or
   yarn dev
   ```

2. Start the production server:
   ```bash
   pnpm build
   pnpm start
   # or
   yarn build
   yarn start
   ```

The server will be available at `http://localhost:3000` (or your configured port).

## API Documentation

You can access the interactive API docs via Swagger at `http://localhost:3000/docs` (or your configured port) when the server is running. It provides:

- Interactive API testing interface
- Request/response schemas
- Authentication requirements
- Example requests

## Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Run `pnpm test` to execute unit tests
- **E2E Tests**: Run `pnpm test:e2e` to execute end-to-end tests
- **Test Coverage**: Run `pnpm test:coverage` to generate coverage reports
- **Watch Mode**: Run `pnpm test:watch` to run tests in watch mode

## Linting

The project uses ESLint for code quality and consistency:

- **Run Linter**: Execute `pnpm lint` to check for code style and potential issues
- **Auto-fix**: Run `pnpm lint --fix` to automatically fix fixable issues
- **Lint Configuration**: See `eslint.config.js` for detailed linting rules

## Docker Support

The project includes Docker support for both development and production environments.

### Prerequisites

- Docker Desktop installed on your system
- Docker Compose

### Development Environment

To start the development environment:

```bash
docker-compose up
```

This will start:

- API server on port 3000

### Production Environment

To build and run the production environment:

```bash
docker build -t a11y-analyzer-api .
docker run -p 3000:3000 a11y-analyzer-api
```

## Example Request

TBD
