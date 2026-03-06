[![Playwright Tests](https://github.com/olenamkolesnik/AutomationExercise-TestAutomation/actions/workflows/playwright.yml/badge.svg)](https://github.com/olenamkolesnik/AutomationExercise-TestAutomation/actions/workflows/playwright.yml)
[View latest Playwright report ⬈](https://olenamkolesnik.github.io/AutomationExercise-TestAutomation/)
# AutomationExercise Test Automation

A comprehensive, professionally-structured test automation suite for [AutomationExercise](https://automationexercise.com) using TypeScript and Playwright. Features both API and UI test coverage with robust data management, type-safe contracts, and industry best practices.

## 📋 Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Description

**AutomationExercise Test Automation** is a production-grade test automation suite designed to ensure the quality and reliability of the AutomationExercise e-commerce platform. The project combines comprehensive API testing with end-to-end UI test scenarios, leveraging industry-standard patterns and tools.

### Key Features

- **🔍 Comprehensive Test Coverage**
  - API testing for user management, products, and authentication
  - UI/E2E scenarios covering signup, login, cart, checkout, and payment flows
  - Positive, negative, and boundary test cases

- **🏗️ Professional Architecture**
  - Page Object Model (POM) for UI tests
  - Data Transfer Objects (DTOs) for type-safe API contracts
  - Factory pattern for realistic test data generation
  - Mapper functions for domain transformation
  - Base client abstractions for code reuse

- **🛡️ Robust Error Handling**
  - Exponential backoff retry logic for transient failures
  - Comprehensive error context and logging
  - Schema validation using AJV

- **📊 Production-Quality Logging**
  - Configurable log levels (DEBUG, INFO, WARN, ERROR)
  - Sensitive data masking for security
  - Structured logging with context
  - Color-coded console output for readability

- **🧪 Maintainable Test Code**
  - Fixture composition for code reuse
  - Clear separation of concerns
  - Semantic test descriptions
  - Well-organized test data management

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Language** | TypeScript | 5.9.3 |
| **Test Framework** | Playwright | 1.57.0 |
| **Assertion/Schema Validation** | AJV | 8.17.1 |
| **Data Generation** | Faker | 10.1.0 |
| **Linting/Code Quality** | ESLint | 10.0.2 |
| **Code Formatting** | Prettier | 3.8.1 |
| **Runtime** | Node.js | 18+ (recommended) |

### Key Libraries

- `@playwright/test` - Web automation and end-to-end testing framework
- `@faker-js/faker` - Generate realistic test data
- `ajv` & `ajv-formats` - JSON Schema validation
- `dotenv` - Environment variable management
- `jiti` - Runtime TypeScript module loader
- ESLint plugins: `@typescript-eslint`, `playwright`, `simple-import-sort`, `unused-imports`

---

## 🚀 Installation

### Prerequisites

- **Node.js** v18 or higher (download from [nodejs.org](https://nodejs.org))
- **npm** v9 or higher (included with Node.js)
- **Git** for version control

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/automationexercise-testautomation.git
   cd automationexercise-testautomation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Create environment configuration**
   
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env  # If example exists
   ```
   
   Or manually create `.env` with:
   ```env
   BASE_URL=https://automationexercise.com
   LOG_LEVEL=INFO
   ```

5. **Verify setup**
   ```bash
   npm run lint
   npx playwright test --list  # Lists all available tests
   ```

---

## 📝 Usage

### Running Tests

#### All Tests
```bash
npx playwright test
```

#### API Tests Only
```bash
npx playwright test tests/api
```

#### UI Tests Only
```bash
npx playwright test tests/ui
```

#### Specific Test File
```bash
npx playwright test tests/api/user/create/create-user.positive.spec.ts
```

#### Tests Matching a Pattern
```bash
npx playwright test -g "create.*positive"
```

### Debug Mode

**Interactive Debug Mode** - pause and step through tests:
```bash
LOG_LEVEL=DEBUG npx playwright test --debug
```

**Headed Mode** - see browser window during test execution:
```bash
npx playwright test --headed
```

**Combined Debug + Headed**:
```bash
LOG_LEVEL=DEBUG npx playwright test --headed --debug
```

### View Test Reports

**HTML Report** - visual test results with screenshots and videos:
```bash
npx playwright show-report
```

**JSON Report** - machine-readable test results:
```bash
cat test-results/results.json
```

---

## 🧪 Testing

### Test Framework

Tests are built with **Playwright Test** and organized into two main suites:

#### API Testing (`tests/api/`)

Tests RESTful API endpoints with comprehensive coverage:

```typescript
// Example: Create User Test
test.describe('Create User Positive Tests', () => {
  let testUser: ReturnType<typeof buildUser>;

  test.beforeEach(() => {
    testUser = buildUser();
  });
  test.afterEach(async ({ userClient }) => {
    try {
      await userClient.deleteUser({
        email: testUser.email,
        password: testUser.password,
      });
    } catch (error) {
      logger.error(`Error occurred while deleting user: ${error}`);
    }
  });

  test('Should create user with valid required data', async ({
    userClient,
  }) => {
    const response = await userClient.createUser(mapToCreateUserDto(testUser));

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');
    expect(response.data).toBeNull();

    const retrievedResponse = await userClient.getUserByEmail(testUser.email);
    const retrievedUser = validateAndMapUser(retrievedResponse.data);
    expectUsersToBeEqual(retrievedUser, testUser);
  });
});

```

**Coverage includes:**
- User Management (Create, Read, Update, Delete)

**Test Variations:**
- **Positive Tests** - valid inputs, expected success
- **Negative Tests** - invalid inputs, error handling
- **Boundary Tests** - edge cases and limits

#### UI Testing (`tests/ui/`)

End-to-end workflows using Page Object Model:

```typescript
// Example: Login Workflow
test.describe('Login Page - login to account', () => {
  test('should login successfully with valid credentials', async ({
    loginPage,
    homePage,
    testUser,
  }) => {
    await loginPage.navigateToLogin();
    await loginPage.fillLoginForm(testUser.email, testUser.password);
    await loginPage.submitLoginForm();

    await homePage.expectLoggedInAs(testUser.name);
    await homePage.expectLogoutVisible();
  });
});
```

**Coverage includes:**
- User Registration & Signup
- Login & Logout Flows
- Product Browsing & Filtering
- Shopping Cart Operations
- Checkout Process
- Payment Handling

### Running Specific Test Types

```bash
# Run all API tests
npm run test:api

# Run all UI tests
npm run test:ui

# Run single test file
npx playwright test tests/api/user/create/create-user.positive.spec.ts

# Run with specific reporter
npx playwright test --reporter=html
```

### Key Testing Concepts

- **Fixtures** - Test setup/teardown with dependency injection
- **DTOs** - Type-safe data contracts validated against schemas
- **Mappers** - Transform API responses to domain models
- **Factories** - Generate realistic test data with Faker
- **Validators** - Schema validation using AJV

---

## 🔄 CI/CD

### Current Configuration

Tests are configured to run in the following environments:

### GitHub Actions Example

To integrate with GitHub Actions, create `.github/workflows/test.yml`:

```yaml
name: Test Automation

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npx playwright test
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: |
            test-results/
            playwright-report/
```

### Test Reporters

Configure output format in `playwright.config.ts`:

```typescript
{
  reporter: [
    ['html'],                                          // HTML report
    ['junit', { outputFile: 'test-results/junit.xml' }], // JUnit format
    ['github']                                         // GitHub Actions
  ],
}
```

### Running Tests in CI

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run tests with all reporters
npx playwright test --reporter=html,junit,json,github
```

---

## 📁 Folder Structure

```
.
├── src/                          # Source code
│   ├── api/                      # API testing layer
│   │   ├── assertions/          # API response assertions
│   │   ├── clients/             # API client implementations
│   │   │   ├── auth-client.ts
│   │   │   ├── user-client.ts
│   │   │   └── products-client.ts
│   │   ├── constants/           # API endpoints, status codes, etc.
│   │   ├── contracts/           # API contracts (DTOs, schemas)
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── schemas/        # JSON schemas for validation
│   │   │   └── validators/     # Schema validators
│   │   ├── core/               # Base API client & utilities
│   │   │   ├── base-api.client.ts
│   │   │   └── response-wrapper.ts
│   │   ├── data/               # Test data factories & boundaries
│   │   ├── mappers/            # DTO → Domain model mappers
│   │   └── utils/              # Utilities (retry, helpers)
│   │
│   ├── ui/                       # UI testing layer
│   │   ├── assertions/          # Custom UI assertions
│   │   ├── components/          # Reusable UI components (POM)
│   │   ├── data/                # UI test data factories
│   │   ├── flows/              # Multi-step user workflows
│   │   ├── models/             # Domain models (card, address, etc.)
│   │   └── pages/              # Page Object Model classes
│   │
│   └── common/                   # Shared code
│       ├── assertions/          # Common assertions
│       ├── fixtures/            # Playwright fixtures
│       ├── models/              # Domain models
│       ├── types/               # TypeScript types
│       └── utils/               # Utilities (logger, helpers)
│
├── tests/                        # Test files (mirrors src structure)
│   ├── api/
│   │   └── user/
│   │       ├── create/
│   │       ├── read/
│   │       ├── update/
│   │       └── delete/
│   └── ui/
│       └── pages/
│           ├── login-page/
│           ├── cart-page/
│           ├── checkout-page/
│           └── payment-page/
│
├── playwright-report/            # Generated HTML test report
├── test-results/                 # Generated test results (JUnit, JSON)
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mts             # ESLint configuration
├── package.json                  # Project dependencies & scripts
├── .env                          # Environment variables (create locally)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `src/api` | API client implementations, DTOs, validators, mappers |
| `src/ui` | Page Objects, components, flows, and UI assertions |
| `src/common` | Shared fixtures, utilities, types, and assertions |
| `tests/api` | API integration test specifications |
| `tests/ui` | UI and E2E test specifications |
| `playwright-report/` | Generated HTML test report (ignore in git) |
| `test-results/` | Machine-readable test results - JUnit, JSON (ignore in git) |

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Faker.js Documentation](https://fakerjs.dev)
- [AJV JSON Schema Validator](https://ajv.js.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Tests fail with "Cannot find BASE_URL"**
- **Solution**: Ensure `.env` file exists in project root with `BASE_URL` set

**Issue: Playwright browsers not found**
- **Solution**: Run `npx playwright install`

**Issue: ESLint errors on save**
- **Solution**: Run `npm run lint:fix` to auto-correct issues

**Issue: Tests timeout**
- **Solution**: Increase timeout in `playwright.config.ts` or use `--timeout=60000`

**Issue: Sensitive data visible in logs**
- **Solution**: Verify `maskHelper.ts` is properly masking credentials

---

**Last Updated:** March 2026  
