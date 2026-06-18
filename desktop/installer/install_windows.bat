@echo off
echo ============================================
echo   SwapLive Engine - Installation Windows
echo ============================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Python n'est pas installe.
    echo Telecharge Python 3.10+ sur https://python.org
    pause
    exit /b 1
)

REM Check Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe.
    echo Telecharge Git sur https://git-scm.com
    pause
    exit /b 1
)

echo [1/3] Mise a jour de pip...
python -m pip install --upgrade pip

echo [2/3] Installation de SwapLive Engine...
cd %~dp0..\engine
python install.py

echo [3/3] Creation du raccourci...
echo @echo off > "%~dp0..\SwapLive.bat"
echo cd "%~dp0..\engine" >> "%~dp0..\SwapLive.bat"
echo python api_server.py >> "%~dp0..\SwapLive.bat"

echo.
echo ============================================
echo   Installation terminee avec succes!
echo   Lancez SwapLive.bat pour demarrer.
echo ============================================
pause
