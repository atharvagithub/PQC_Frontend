PQC_Frontend
============

A frontend application for interacting with the PQC (Post‑Quantum Cryptography) backend. This app lets users submit data to the backend for encryption, decryption, view results, etc.

This project uses standard web frontend tools (JavaScript, Node/NPM, etc.), includes a `docker-compose.yml` for convenient local setup.

---

## Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn
- A running PQC backend service (e.g. your C++ microservice) accessible via HTTP
- (Optional) Docker & Docker Compose if you want to run frontend with backend & IPFS together
- Access to IPFS / metadata backend if used

---

## Setup & Running Locally

1. Clone the repo

```bash
git clone https://github.com/atharvagithub/PQC_Frontend.git
cd PQC_Frontend
```

2. Install dependencies

```bash
npm install
```
_or_
```bash
yarn install
```

3. Configure environment variables

You may need to set backend URL (where your encryption/decryption API lives), e.g.:

```env
REACT_APP_BACKEND_URL=http://localhost:9000
```

If present, verify `.env` or config file.

4. Run development server

```bash
npm start
```
_or_
```bash
yarn start
```

This should launch the frontend app (often on `http://localhost:3000`).

---

## Docker / Docker Compose

There is a `docker-compose.yml` in the repo. To run frontend + backend (if backend is included) together:

```bash
docker compose up --build
```

This spins up the frontend container (and any other services defined) so you can access the app via browser at whatever port is declared (often `http://localhost:3000` or similar).

---

## How It Works / API Integration

- The frontend connects to the backend via REST endpoints (e.g. `/encrypt_data`, `/decrypt_data`) using fetch/Axios.
- The payloads are JSON, containing data or metadata needed for encryption & decryption (e.g. public key, ciphertext, etc).
- Upon encryption, the frontend displays returned metadata (iv, tag, kem_ciphertext, etc).
- For decryption, frontend sends necessary metadata + private key + maybe file/CID to backend and receives decrypted result.

---

## Tips for CORS & Networking

- Make sure the backend allows CORS from the frontend origin.
- If using Docker Compose, ensure frontend and backend are on same network, and that frontend’s API URLs reference service names or mapped ports.
- Example: if backend runs in Docker as `pqc-service`, from frontend container use `http://pqc-service:9000`.

---

## Available Scripts

- `npm start` — start dev server
- `npm run build` — build production bundle
- Others as per `package.json` (lint, test, etc.)

---

## Easy Setup

- If you dont want to install everything seperatly then navigate to POC Frontend github link and clone the project
- https://github.com/atharvagithub/PQC_Frontend
- First run the frontend by enterring command "npm start"
- Second start the docker file by the command "docker compose up -d"

---

NOTE - main branch is the latest branch

## 📄 License

MIT License — see the LICENSE file in the repo.
