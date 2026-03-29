# AI Freelancer Proposal Generator

A production-ready monorepo for generating high-converting freelancer proposals with FastAPI, React, Tailwind CSS, and the OpenAI Responses API.

## Folder Structure

```text
vourpy/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── clients/
│   │   ├── core/
│   │   ├── prompts/
│   │   ├── schemas/
│   │   └── services/
│   ├── tests/
│   ├── .env.example
│   └── pyproject.toml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Run Instructions

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -e .[dev]
copy .env.example .env
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

### Tests

```bash
cd backend
pytest

cd ../frontend
npm run test
```

