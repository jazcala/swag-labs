# My Playwright Portfolio Project

## Overview

This project presents a robust and scalable end-to-end test automation framework built with Playwright and TypeScript, specifically designed for the [Sauce Demo web application](https://www.saucedemo.com/). It serves as a comprehensive portfolio piece, showcasing modern UI test automation principles and my expertise in building maintainable, efficient, and reliable test suites.

The framework is engineered to demonstrate:

* **Best-in-Class Test Architecture**: Leveraging the Page Object Model (POM) for enhanced maintainability, readability, and reusability of test code.
* **Robust Locator Strategies**: Utilizing data-test attributes for resilient and stable element identification, minimizing test fragility.
* **Comprehensive Test Coverage**: Automating critical user flows and edge cases to ensure application quality.
* **Seamless CI/CD Integration**: Demonstrating automated test execution as part of a Continuous Integration pipeline using GitHub Actions, with test reports published directly to GitHub Pages for easy access and review. [Sauce Demo Report](https://jazcala.github.io/swag-labs/).
* **Detailed Reporting**: Generating insightful test reports for quick analysis and debugging.

## Why Playwright?

Playwright was chosen as the core automation tool for this project due to its cutting-edge capabilities and developer-friendly features, making it ideal for modern web application testing:

* **Cross-Browser Compatibility**: Supports Chromium, Firefox, and WebKit (Safari).
* **Auto-Waiting & Reliability**: Intelligently waits for elements to be actionable, significantly reducing flaky tests and improving execution stability.
* **Fast & Efficient Execution**: Designed for parallel test execution, leading to rapid feedback cycles.
* **Powerful Debugging Tools**: Includes Playwright Inspector, Codegen, and Trace Viewer for efficient test development and troubleshooting.

## Technologies Used

* **Playwright Test**: The primary testing framework.
* **Node.js / npm**: Runtime environment and package manager.
* **TypeScript / JavaScript**: Programming language used for writing tests.
* **Git / GitHub Actions / GitHub Pages**: For version control, continuous integration, and automated test report publishing.
* **Allure Report**: For generating detailed and interactive test reports.

## Features & Scenarios Demonstrated

This project automates key functionalities and scenarios of the Sauce Demo application, ensuring thorough test coverage:

### Core Functionality Testing

* **User Authentication**:
  * Successful login with valid credentials (```standard_user```).
  * Handling of invalid login attempts.

* **Product Catalog Interaction**:
  * Viewing the product inventory page.
  * Adding specific items to the shopping cart by product name.
  * Removing items from the shopping cart.
  * Verifying shopping cart badge updates.
  * Sorting products by various criteria (e.g., Price: Low to High).
* **End-to-End Purchase Flow**:
  * Adding items to cart.
  * Navigating to the shopping cart.
  * Proceeding through the checkout information (filling personal details, with data generated using Faker).
  * Reviewing the checkout overview.
  * Completing the order.
  * Verifying successful order completion.
* **Error Handling**:
  * Validation of form submissions (e.g., login error messages).
  * Handling of navigation to restricted pages without authentication.

### Advanced Automation Concepts Demonstrated

* **Page Object Model (POM)**: Clearly structured ```pages``` directory with dedicated classes for each major application screen, encapsulating locators and actions. This ensures high maintainability and reusability.
* **Reusable Test Flows**: Centralized common test setup procedures (e.g., ```loginAsStandardUser```) in ```utils/testFlows.ts``` to promote the DRY principle and streamline ```beforeEach``` hooks.
* **Data Management**: Utilization of ```utils/testData.ts``` for managing test data, including standard user credentials and potentially dynamic data generation.
* **Network Interception**: Implemented using Playwright's ```page.route()``` to intercept and mock API responses, simulate network conditions, and virtualize services, enhancing test isolation and ability to test edge cases.

## Project Structure

```text
.
├── .github/                 # GitHub Actions workflows for CI/CD
│   └── workflows/
│       └── playwright.yml   # Workflow to run tests on push/PR
├── pages/                   # Page Object Model (POM) classes
│   ├── LoginPage.ts         # Encapsulates login page elements and actions
│   ├── ProductsPage.ts      # Encapsulates product listing page elements and actions
│   ├── CartPage.ts          # Encapsulates shopping cart page elements and actions
│   ├── CheckoutPage.ts      # Encapsulates checkout steps (info, overview, complete)
│   └── ...
├── tests/                   # Playwright test files
│   ├── login.spec.ts        # Tests related to login functionality
│   ├── products.spec.ts     # Tests related to product interactions
│   ├── checkout.spec.ts     # End-to-end checkout flow tests
│   └── ...
├── utils/                   # Reusable helper functions and test data
│   ├── testData.ts          # Constants for users, URLs, etc.
│   ├── testFlows.ts         # High-level reusable test sequences (e.g., login helper)
│   └── ...
├── playwright.config.ts     # Playwright configuration file
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked dependencies
└── .gitignore               # Files/folders to ignore by Git
```

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

1. Prerequisites:
Make sure you have Node.js (which includes npm) installed.
2. Clone the Repository:

    ```bash
    git clone https://github.com/jazcala/swag-labs.git
    cd swag-labs
    ```

3. Install Dependencies:
Navigate into the project directory and install the required Node.js packages and Playwright browsers:

    ```bash
    npm install
    npx playwright install
    ```

    Note: If you created the project using ```npm init playwright@latest```, ```npm install``` and ```npx playwright install``` might have already been run for you during the initial setup.

## How to Run Tests

You can execute the tests from your terminal:

* Run all tests:

    ```bash
    npx playwright test
    ```

* Run tests in a specific browser (e.g., Chromium):

    ```bash
    npx playwright test --project=chromium
    ```

* Run tests in UI mode (interactive debugging):

    ```bash
    npx playwright test --ui
    ```

* Run a specific test file:

    ```bash
    npx playwright test tests/products.spec.ts
    ```

## Viewing Reports and Traces

Playwright provides excellent tools for analyzing test results:

* **HTML Report**: After running tests, an HTML report is is automatically generated. You can open it locally with:

    ```bash
    npx playwright show-report
    ```

    For projects integrated with CI/CD, this report can also be published and viewed via GitHub Pages, providing easy access to test results directly from your repository.

* **Trace Viewer**: If you enable tracing in
```playwright.config.ts```, you can view detailed traces of your test runs (including screenshots, DOM snapshots, and action logs) for debugging:

    ```bash
    npx playwright show-trace test-results/<test-run-folder>/trace.zip
    ```

## Contributing

Feel free to fork this repository, explore the code, and suggest improvements.

## License

This project is open-source and available under the MIT License.
