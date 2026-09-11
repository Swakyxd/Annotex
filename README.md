# Annotex: A Transparent and Incentive-Driven Data Labeling Platform

**Annotex** is a full-stack data labeling platform designed to address the opacity and compensation issues in traditional crowdsourcing. It integrates automated validation, real-time analytics, and blockchain-based incentives to create a trustworthy ecosystem for high-quality machine learning data.

---

##  Project Overview

High-quality labeled data is essential for modern machine learning systems. Existing platforms often suffer from opacity in quality assessment, delayed compensation, and limited performance visibility. 

Annotex solves these challenges by allowing contributors to perform labeling tasks while transparently tracking completion rates, quality metrics, and earnings. Administrators can upload datasets, configure validation rules, monitor quality through dashboards, and manage crypto-based payouts.

##  Key Features

### For Contributors
* **Task Discovery:** Browse available tasks with detailed descriptions and transparent reward information.
* **Real-time Analytics:** Track personal performance metrics, including accuracy rates and productivity trends.
* **Immediate Feedback:** Receive instant updates on label acceptance status.
* **Secure Payouts:** Connect Solana wallets for secure, verifiable earnings.

### For Administrators
* **Dataset Management:** Upload datasets in various formats (CSV, JSON, Images) and define labeling parameters.
* **Automated Validation:** Implement majority voting with configurable acceptance thresholds and consensus rules.
* **Quality Monitoring:** Visualize inter-annotator agreement and overall dataset reliability.
* **Batch Payments:** Execute bulk payouts via blockchain transactions to ensure timely compensation.

---

##  Technology Stack

The platform follows a modular three-tier architecture (Presentation, Application, Data).

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14+ | Server-side rendered React with App Router and Tailwind CSS. |
| **Backend** | Express.js / Node.js | RESTful API with JWT authentication and Prisma ORM. |
| **Database** | PostgreSQL | Relational storage ensuring ACID compliance and data integrity. |
| **Blockchain** | Solana Pay / @solana/web3.js | Wallet integration and transaction verification on Solana devnet. |
| **DevOps** | Docker | Containerized deployment via Docker Compose. |
| **Auth** | JWT / Bcrypt | Secure session management and password hashing. |

---

##  Core Workflow

1.  **Task Creation:** Admins upload data and set validation rules/rewards.
2.  **Label Submission:** Contributors complete assignments via task-specific interfaces.
3.  **Validation Engine:** Submissions are processed using majority voting algorithms.
4.  **Metric Updates:** Accepted labels automatically update quality scores.
5.  **Payout Processing:** Rewards are calculated and transferred via blockchain.

---

##  Database Schema

The system uses a normalized PostgreSQL schema designed for integrity and efficient querying:

* **Users:** Authentication credentials, roles, wallet addresses, and earnings.
* **Tasks:** Dataset references, label types, validation configurations, and status.
* **Labels:** Submission values, timestamps, and validation/acceptance flags.
* **Payouts:** Transaction hashes, amounts, and completion status.
* **Metrics:** Aggregated performance data for dashboards.

---

##  Installation & Setup

### Prerequisites
* Docker & Docker Compose
* Node.js 18+ (for local frontend/backend development)

### Quick Start

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Yashb404/Annotex.git
    cd Annotex
    ```

2.  **Run the Stack**
    ```bash
    docker-compose up --build
    ```
    This starts the Frontend, Backend, and Database containers.

3.  **Access the Application**
    Open [http://localhost:3000](http://localhost:3000) in your browser.
    - Default backend API: `http://localhost:5000`
    - Database: PostgreSQL on port 5433

### Local Development (without Docker)

If you want to run services locally:

1.  **Backend Setup**
    ```bash
    cd backend
    npm install
    cp .env.example .env
    npm run dev
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3.  **Database**
    PostgreSQL must be running (see `.env` for connection details)

## Deployment (Production)

**Deploying to a server? See [DEPLOYMENT.md](DEPLOYMENT.md)** — a step-by-step guide from
a blank AWS account to a live HTTPS site, plus [deploy/ec2-bootstrap.sh](deploy/ec2-bootstrap.sh),
which does it in one command.

To run the production stack locally against [docker-compose.prod.yml](docker-compose.prod.yml):

```bash
cp .env.production.example .env.production
# fill in real secrets, then:
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
docker compose --env-file .env.production -f docker-compose.prod.yml ps
```

Notes:
- Backend runs Prisma migrations at startup using `prisma migrate deploy`, which reads
  `DIRECT_URL` (not `DATABASE_URL`). Both are set in the compose file.
- Backend refuses to start in production when required env vars are missing or JWT secrets are left on insecure defaults.
- `NEXT_PUBLIC_API_BASE_URL` is compiled into the frontend bundle at **build** time, so
  changing it requires a rebuild, not just a restart.
- The first Admin must be promoted directly in the database — signup cannot grant the
  admin role. See [DEPLOYMENT.md](DEPLOYMENT.md#part-4--make-yourself-an-admin).
- Use reverse proxy/TLS (Nginx, Caddy, or a cloud load balancer) for public HTTPS.

---

* **ML-Assisted Pre-labeling:** Integration of models to suggest labels and speed up workflow.
* **Reputation System:** Advanced contributor scoring to identify high-value
