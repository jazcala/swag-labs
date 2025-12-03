# 1. BASE IMAGE: Start from the official Playwright image with Node.js and browsers pre-installed.
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# 2. WORKDIR: Set the working directory inside the container.
WORKDIR /app

# 3. COPY: Copy package.json and package-lock.json to the working directory.
COPY package.json package-lock.json ./

# 4. RUN: Install project dependencies.
RUN npm install

# 5. COPY: Copy the rest of the application code to the working directory.
COPY . .

# 6. CMD: Define the command to run tests using Playwright.
CMD [ "npx", "playwright", "test" ]
