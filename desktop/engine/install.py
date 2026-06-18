"""SwapLive Engine installer — clones Deep-Live-Cam and downloads AI models."""
import subprocess
import sys
import os
import urllib.request
import json


MODELS = [
    {
        "name": "inswapper_128_fp16.onnx",
        "url": "https://huggingface.co/hacksider/deep-live-cam/resolve/main/inswapper_128_fp16.onnx",
    },
    {
        "name": "GFPGANv1.4.pth",
        "url": "https://huggingface.co/hacksider/deep-live-cam/resolve/main/GFPGANv1.4.pth",
    },
]


def run(cmd: list, **kwargs):
    print(f"  $ {' '.join(cmd)}")
    result = subprocess.run(cmd, **kwargs)
    if result.returncode != 0:
        print(f"[ERREUR] La commande a échoué avec le code {result.returncode}")
        sys.exit(1)


def download_file(url: str, dest: str):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.exists(dest):
        print(f"  ✓ {os.path.basename(dest)} déjà présent, on passe.")
        return

    print(f"  ⬇ Téléchargement de {os.path.basename(dest)}...")

    def progress(count, block_size, total_size):
        if total_size > 0:
            pct = min(100, int(count * block_size * 100 / total_size))
            print(f"\r  {pct}%", end="", flush=True)

    urllib.request.urlretrieve(url, dest, reporthook=progress)
    print()


def install_deep_live_cam():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    engine_dir = os.path.join(base_dir, "deep_live_cam")

    print("\n🚀 Installation de SwapLive Engine...\n")

    # Clone Deep-Live-Cam
    if not os.path.exists(engine_dir):
        print("📦 Clonage de Deep-Live-Cam...")
        run(["git", "clone", "https://github.com/hacksider/deep-live-cam.git", engine_dir])
    else:
        print("📦 Deep-Live-Cam déjà cloné, mise à jour...")
        run(["git", "-C", engine_dir, "pull"])

    # Install Python deps
    print("\n📦 Installation des dépendances Python...")
    run([sys.executable, "-m", "pip", "install", "-r", os.path.join(engine_dir, "requirements.txt")])

    # Install engine API deps
    print("\n📦 Installation des dépendances API...")
    run([sys.executable, "-m", "pip", "install", "fastapi", "uvicorn[standard]", "websockets", "pydantic"])

    # Download models
    models_dir = os.path.join(engine_dir, "models")
    print("\n🤖 Téléchargement des modèles IA...")
    for model in MODELS:
        download_file(model["url"], os.path.join(models_dir, model["name"]))

    # Write version file
    version_file = os.path.join(base_dir, "version.json")
    with open(version_file, "w") as f:
        json.dump({"version": "2.1.6", "installed": True}, f)

    print("\n✅ SwapLive Engine installé avec succès!")
    print("   Lancez l'API avec : python api_server.py")


if __name__ == "__main__":
    install_deep_live_cam()
