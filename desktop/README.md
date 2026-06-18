# SwapLive Engine — Application Desktop

Moteur local Deep-Live-Cam avec API FastAPI.

## Installation

### Windows
Double-cliquer sur `installer/install_windows.bat`

### macOS
```bash
chmod +x installer/install_mac.sh
./installer/install_mac.sh
```

## Démarrage

```bash
cd engine
python run_server.py
```

L'API démarre sur `http://127.0.0.1:8765`

## Endpoints

| Méthode | Path | Description |
|---------|------|-------------|
| GET | /api/status | Statut du moteur |
| POST | /api/swap/start | Démarre le swap |
| POST | /api/swap/stop | Arrête le swap |
| WS | /ws/stats | Stats temps réel |

## Configuration requise

- Windows 10/11 ou macOS 12+
- Python 3.10+
- 8 GB RAM minimum
- GPU NVIDIA (optionnel, améliore la qualité)
