#!/bin/bash
set -e

echo "============================================"
echo "  SwapLive Engine - Installation macOS"
echo "============================================"
echo ""

# Check Python
if ! command -v python3 &>/dev/null; then
    echo "[ERREUR] Python 3 n'est pas installé."
    echo "Installe-le avec: brew install python3"
    exit 1
fi

# Check Git
if ! command -v git &>/dev/null; then
    echo "[ERREUR] Git n'est pas installé."
    echo "Installe-le avec: xcode-select --install"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENGINE_DIR="$SCRIPT_DIR/../engine"

echo "[1/3] Mise à jour de pip..."
python3 -m pip install --upgrade pip

echo "[2/3] Installation de SwapLive Engine..."
cd "$ENGINE_DIR"
python3 install.py

echo "[3/3] Création du script de lancement..."
cat > "$SCRIPT_DIR/../SwapLive.command" <<'EOF'
#!/bin/bash
cd "$(dirname "$0")/engine"
python3 api_server.py
EOF
chmod +x "$SCRIPT_DIR/../SwapLive.command"

echo ""
echo "============================================"
echo "  Installation terminée avec succès!"
echo "  Double-clique sur SwapLive.command"
echo "============================================"
