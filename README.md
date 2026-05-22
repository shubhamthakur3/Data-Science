# DataSci Pro — Data Science Course Management & Analytics Platform

> Discover, compare, and enroll in the best Data Science, AI & ML courses from top institutes across India.

---

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React, Tailwind CSS |
| **Backend** | Django 5.1, Django REST Framework |
| **Database** | PostgreSQL 16 |
| **Cache/Queue** | Redis 7, Celery |
| **DevOps** | Docker, Nginx, GitHub Actions |

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local frontend dev)
- Python 3.12+ (for local backend dev)

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd "Data Science"

# Copy environment file
cp .env.example .env

# Start all services
docker compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api/v1/
# API Docs: http://localhost:8000/api/docs/
# Django Admin: http://localhost:8000/admin/
```

### Local Development

#### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements/development.txt

# Set up PostgreSQL and Redis locally, then:
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
├── backend/               # Django REST API
│   ├── config/             # Settings & configuration
│   ├── apps/               # Django apps (users, courses, etc.)
│   ├── core/               # Shared utilities
│   └── requirements/       # Python dependencies
├── frontend/               # Next.js application
│   └── src/
│       ├── app/            # App Router pages
│       ├── components/     # Reusable components
│       ├── contexts/       # React contexts
│       └── lib/            # API client & utilities
├── nginx/                  # Nginx configuration
├── docker-compose.yml      # Docker orchestration
└── .github/workflows/      # CI/CD pipeline
```

## 🔑 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/auth/register/` | User registration |
| `POST /api/v1/auth/login/` | JWT login |
| `GET /api/v1/courses/` | List courses with filters |
| `GET /api/v1/courses/<slug>/` | Course details |
| `GET /api/v1/courses/compare/` | Compare courses |
| `POST /api/v1/enquiries/` | Submit enquiry |
| `GET /api/v1/institutes/` | List institutes |

## 🧪 Testing

```bash
# Backend
cd backend
pytest --cov=apps -v

# Frontend
cd frontend
npm run lint
npm run build
```

## 📊 Development Phases

- [x] **Phase 1**: MVP — Auth, Courses, Institutes, Enquiries
- [ ] **Phase 2**: Business Ops — Admissions, Placements, Reviews
- [ ] **Phase 3**: Analytics — Dashboards, Reports, KPIs
- [ ] **Phase 4**: ML — Lead Prediction, Course Popularity

## 📄 License

This project is proprietary software.
