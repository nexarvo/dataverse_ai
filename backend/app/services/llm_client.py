import os
import json
import requests
from typing import Dict, Any, List
from abc import ABC, abstractmethod

class LLMProvider(ABC):
    """Abstract base class for LLM providers"""
    
    @abstractmethod
    def call(self, prompt: str, max_tokens: int, temperature: float) -> str:
        """Make a call to the LLM provider"""
        pass

class OpenAIProvider(LLMProvider):
    """OpenAI API provider implementation"""
    
    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model
        self.base_url = "https://api.openai.com/v1/chat/completions"
    
    def call(self, prompt: str, max_tokens: int, temperature: float) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        
        try:
            response = requests.post(
                self.base_url,
                headers=headers,
                json=data,
                timeout=30
            )
            response.raise_for_status()
            
            result = response.json()
            return result["choices"][0]["message"]["content"]
            
        except Exception as e:
            raise Exception(f"OpenAI API error: {e}")

class AnthropicProvider(LLMProvider):
    """Anthropic API provider implementation"""
    
    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model
        self.base_url = "https://api.anthropic.com/v1/messages"
    
    def call(self, prompt: str, max_tokens: int, temperature: float) -> str:
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01"
        }
        
        data = {
            "model": self.model,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "messages": [{"role": "user", "content": prompt}]
        }
        
        try:
            response = requests.post(
                self.base_url,
                headers=headers,
                json=data,
                timeout=30
            )
            response.raise_for_status()
            
            result = response.json()
            return result["content"][0]["text"]
            
        except Exception as e:
            raise Exception(f"Anthropic API error: {e}")

class OllamaProvider(LLMProvider):
    """Ollama local provider implementation"""
    
    def __init__(self, model: str):
        self.model = model
        self.base_url = "http://localhost:11434/api/generate"
    
    def call(self, prompt: str, max_tokens: int, temperature: float) -> str:
        data = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens
            }
        }
        
        try:
            response = requests.post(
                self.base_url,
                json=data,
                timeout=60  # Longer timeout for local models
            )
            response.raise_for_status()
            
            result = response.json()
            return result["response"]
            
        except Exception as e:
            raise Exception(f"Ollama API error: {e}")

class LLMClient:
    """Client for making calls to LLM providers"""
    
    def __init__(self):
        self.provider = self._create_provider()
        self.max_tokens = int(os.getenv("MAX_TOKENS", "1000"))
        self.temperature = float(os.getenv("TEMPERATURE", "0.7"))
    
    def _create_provider(self) -> LLMProvider:
        """Create the appropriate LLM provider based on configuration"""
        provider_name = os.getenv("LLM_PROVIDER", "ollama")
        
        if provider_name == "openai":
            api_key = os.getenv("OPENAI_API_KEY")
            model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
            if not api_key:
                raise ValueError("OPENAI_API_KEY environment variable is required")
            return OpenAIProvider(api_key, model)
            
        elif provider_name == "anthropic":
            api_key = os.getenv("ANTHROPIC_API_KEY")
            model = os.getenv("ANTHROPIC_MODEL", "claude-3-haiku-20240307")
            if not api_key:
                raise ValueError("ANTHROPIC_API_KEY environment variable is required")
            return AnthropicProvider(api_key, model)
            
        elif provider_name == "ollama":
            model = os.getenv("OLLAMA_MODEL", "llama3.2")
            return OllamaProvider(model)
            
        else:
            raise ValueError(f"Unsupported LLM provider: {provider_name}")
    
    def generate_text(self, prompt: str) -> str:
        """Generate text using the configured LLM provider"""
        try:
            return self.provider.call(prompt, self.max_tokens, self.temperature)
        except Exception as e:
            raise Exception(f"LLM generation failed: {e}")

# Global instance
llm_client = LLMClient() 