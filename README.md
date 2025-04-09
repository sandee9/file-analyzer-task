# File Analyzer API

## Prerequisites

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* An API client like [curl](https://curl.se/), [Postman](https://www.postman.com/), or [Insomnia](https://insomnia.rest/) for testing the endpoint.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd file-analyzer-task
    ```
2.  **Navigate into the project directory**:
    ```bash
    cd /path/to/your/project/root
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Server

To start the API server:

```bash
npm start
```

## Supported languages for analysis
* java
* python

## Testing API Endpoint
```bash
curl --location 'http://localhost:3000/analyze' \--form 'sourceFile=@"path-to-your-file"'
```
