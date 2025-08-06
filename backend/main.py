from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from app.api import upload, analyze

app = FastAPI(
    title="Dataverse.ai API",
    description="Data analysis platform for startup founders and RevOps",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(upload.router, prefix="/api/v1", tags=["upload"])
app.include_router(analyze.router, prefix="/api/v1", tags=["analyze"])

@app.get("/")
async def root():
    return {"message": "Dataverse.ai API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 