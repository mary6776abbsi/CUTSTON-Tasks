@echo off
cd /d "%~dp0"

where py >nul 2>&1
if %errorlevel%==0 (
    start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:5179/"
    py -3 -m http.server 5179
    pause
    exit
)

where python >nul 2>&1
if %errorlevel%==0 (
    start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:5179/"
    python -m http.server 5179
    pause
    exit
)

echo Python 3 is required to run this preview.
echo Please install Python 3 and try again.
pause
