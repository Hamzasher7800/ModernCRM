@echo off
echo Starting Modern CRM Development Environment...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm start"

echo.
echo Modern CRM is starting up!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Demo credentials:
echo Email: demo@moderncrm.com
echo Password: demo123
echo.
pause
