"""Entry point — starts the SwapLive API server."""
import uvicorn

if __name__ == "__main__":
    print("🎭 SwapLive Engine v2.1.6 démarrage...")
    print("📡 Dashboard accessible sur http://localhost:3000")
    print("🔌 API Engine sur http://127.0.0.1:8765")
    print("⏹  Ctrl+C pour arrêter\n")
    uvicorn.run(
        "api_server:app",
        host="127.0.0.1",
        port=8765,
        reload=False,
        log_level="info",
    )
