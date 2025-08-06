# Dataverse.ai

A no-login data analysis platform for startup founders and RevOps professionals. Upload CSV files and ask questions in plain English to get instant insights, tables, and charts.

## Features

- **No Login Required**: Start analyzing data immediately
- **Natural Language Queries**: Ask questions like "Show me top 5 revenue sources" or "What's the average order value?"
- **Instant Results**: Get tables, charts, and insights in seconds
- **File Support**: Upload CSV, Excel files up to 50MB
- **Modern UI**: Clean, responsive interface built with Next.js and shadcn/ui

## Tech Stack

### Frontend

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Dropzone** for file uploads
- **Lucide React** for icons

### Backend

- **FastAPI** for API development
- **Python 3.10+** for data processing
- **Pandas** for data manipulation
- **Uvicorn** for ASGI server

## Project Structure

```
dataverse.ai/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── FileUpload.tsx
│   │   │   └── DataAnalysis.tsx
│   │   ├── lib/            # Utility libraries
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Helper functions
│   └── package.json
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   │   ├── upload.py   # File upload endpoints
│   │   │   └── analyze.py  # Data analysis endpoints
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Pydantic models
│   │   └── services/       # Business logic
│   ├── main.py             # FastAPI application entry point
│   └── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the development server:

   ```bash
   python main.py
   ```

5. The API will be available at [http://localhost:8000](http://localhost:8000)

## API Endpoints

### File Upload

- `POST /api/v1/upload` - Upload CSV/Excel files
- `GET /api/v1/files/{file_id}` - Get file information

### Data Analysis

- `POST /api/v1/analyze` - Analyze data with natural language questions

## Development

### Adding New Components

1. Create new components in `frontend/src/components/`
2. Use shadcn/ui components for consistency
3. Follow TypeScript best practices

### Adding New API Endpoints

1. Create new router files in `backend/app/api/`
2. Define Pydantic models in `backend/app/models/`
3. Include routers in `backend/main.py`

### Environment Variables

Create `.env.local` in the frontend directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Backend (Railway/Render)

1. Set up Python environment
2. Install dependencies from `requirements.txt`
3. Set environment variables
4. Deploy with `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Roadmap

- [ ] Real-time data streaming
- [ ] Advanced chart types (scatter plots, heatmaps)
- [ ] Data export functionality
- [ ] Team collaboration features
- [ ] Database integration for persistent storage
- [ ] AI-powered insights and recommendations
