# LLM Integration Setup

This guide explains how to set up LLM integration for dynamic question generation.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# LLM Configuration (defaults to ollama for local development)
LLM_PROVIDER=ollama  # ollama, openai, anthropic

# Ollama Configuration (for local development)
OLLAMA_MODEL=llama3.2  # or any model you have installed

# OpenAI Configuration (for production)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Anthropic Configuration (for production)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-haiku-20240307

# LLM Settings
MAX_TOKENS=1000
TEMPERATURE=0.7
```

## Setup Instructions

### For Local Development (Ollama)

1. **Install Ollama**:

   ```bash
   # macOS
   curl -fsSL https://ollama.ai/install.sh | sh

   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

2. **Pull a Model**:

   ```bash
   ollama pull llama3.2
   # or any other model like: ollama pull codellama
   ```

3. **Start Ollama**:

   ```bash
   ollama serve
   ```

4. **Configure Environment**:
   ```bash
   # In your .env file
   LLM_PROVIDER=ollama
   OLLAMA_MODEL=llama3.2
   ```

### For Production (OpenAI/Anthropic)

1. **Get API Keys**:

   - OpenAI: Get your API key from https://platform.openai.com/api-keys
   - Anthropic: Get your API key from https://console.anthropic.com/

2. **Configure Provider**:

   - Set `LLM_PROVIDER` to either `openai` or `anthropic`
   - Add the corresponding API key

3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Backend**:
   ```bash
   python main.py
   ```

## How It Works

The system now uses LLM to generate dynamic questions based on:

- **Dataset Structure**: Column names, types, and data analysis
- **Sample Data**: First few rows of the uploaded dataset
- **Category Focus**: Different prompts for Learn, Explore, Business, and Visualize categories

## Fallback Behavior

If the LLM API fails or is not configured, the system falls back to hardcoded questions to ensure the application continues to work.

## Supported Providers

- **Ollama**: Local models (llama3.2, codellama, mistral, etc.)
- **OpenAI**: GPT-4o-mini, GPT-4, GPT-3.5-turbo
- **Anthropic**: Claude-3-Haiku, Claude-3-Sonnet, Claude-3-Opus

## Local Development Benefits

- ✅ **No API costs** during development
- ✅ **Privacy**: Data stays on your machine
- ✅ **Offline capability**: Works without internet
- ✅ **Fast iteration**: No API rate limits
- ✅ **Custom models**: Use any model available in Ollama
