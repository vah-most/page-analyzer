# 🚧 Project Status: In Development 🚧

**Note:** This project is currently under active development.  
Many required modules and applications are not yet complete or available.  
Features, APIs, and documentation are subject to change.

# A11y-Analyzer

A monorepo for the A11y-Analyzer project, built with Turborepo and pnpm. This project aims to provide a comprehensive accessibility analysis platform.

## 🏗️ Project Structure

```
a11y-monorepo/
├── apps/
│   └── api-gateway/     # API Gateway service
├── packages/            # Shared packages
├── turbo.json          # Turborepo configuration
└── package.json        # Root package.json
```

## Applications and Packages

- API-Gateway: see [README](./apps/api-gateway/README.md)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v10.4.1)
- PostgreSQL (for database)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd a11y-monorepo
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp apps/api-gateway/.env.example apps/api-gateway/.env
   ```

   Edit the `.env` file with your configuration.

4. Initialize the database:
   ```bash
   cd apps/api-gateway
   pnpm db:generate
   pnpm db:migrate
   ```

### Development

To start the development server:

```bash
# Start all apps in development mode
pnpm dev

# Start a specific app
cd apps/api-gateway
pnpm dev
```

### Building

To build all apps:

```bash
pnpm build
```

## 📦 Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all apps
- `pnpm lint` - Run linting
- `pnpm test` - Run tests
- `pnpm format` - Format code

## 🔧 Technology Stack

- **Monorepo Management**: Turborepo
- **Package Manager**: pnpm
- **API Gateway**:
  - TypeScript
  - Express.js
  - Prisma
  - PostgreSQL
  - Swagger/OpenAPI

## 📄 License

This project is currently UNLICENSED. All rights reserved.

## 👤 Author

Mostafa Vahabzadeh
