# Pledge for Action

This Clarinet project implements a "Pledge for Action" smart contract on the Stacks blockchain. The goal is to create a simple, public, and immutable ledger where individuals and organizations can commit to positive actions, fostering a global sense of accountability and collective effort to solve world problems.

## 🌟 Project Purpose

- **Public Accountability:** Pledges are recorded on the blockchain, visible to everyone.
- **Simplicity:** The contract is intentionally minimal, making it easy to understand, audit, and interact with.
- **Inspiration:** By seeing the pledges of others, more people can be inspired to take positive action.

## 🚀 Features

The `pledge-for-action` smart contract allows you to:

- `make-pledge`: Create a new pledge with a descriptive message.
- `get-pledge`: Retrieve the details of a specific pledge by its ID.
- `get-pledge-count`: Get the total number of pledges made.

## 📋 Requirements

- Node.js (v18 or higher)
- Clarinet

## 🛠️ Setup and Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd Marth
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

## 🧪 Running Tests

This project uses Vitest for unit testing. To run the tests and ensure the contract is working correctly, use the following command:

```bash
npm test
```

You can also generate a coverage and cost report:
```bash
npm run test:report
```