# MacOS - Swiss AI Chat

## Python AI Model Project

This project demonstrates how to use the `mlx-lm` library to run a Hugging Face model for text generation on MacOS.

As an example, it is using the Swiss LLM, Apertus.


## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.x
- Node.js (v22+)
- npm (v11+)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd macos-swiss-ai-chat
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Install the Node.js dependencies:**
    ```bash
    npm install
    ```

5. **Build the frontend:**
    ```bash
    npm run build
    ```

## Running the project

To run the server app, execute the following command:

```bash
uvicorn main:app --reload
```
