# Summarizer Backend

This is the backend API for the Summarizer project. It is built using Node.js and Express, providing functionality to handle text summarization requests. 

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up the project locally and run it on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://npmjs.com/) (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sindhuja23/Summarizer-Backend.git
Navigate to the project folder:

bash
Copy
Edit
cd Summarizer-Backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file at the root of the project with necessary environment variables. For example:

ini
Copy
Edit
OPENAI_API_KEY=your-openai-api-key
Usage
Start the server locally with:

bash
Copy
Edit
npm start
This will run the backend server on http://localhost:5001 by default. You can change the port by modifying the .env file.

API Documentation
POST /summarize
This endpoint takes in text and returns a summarized version.

Request Body:

json
Copy
Edit
{
  "text": "Your long text to summarize"
}
Response:

json
Copy
Edit
{
  "summary": "The summarized version of the provided text"
}
