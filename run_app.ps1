# PowerShell script to run FloodGuard application
Write-Host "Activating virtual environment..." -ForegroundColor Green
& .\flood_prediction_env\Scripts\Activate.ps1

Write-Host "Starting FloodGuard application..." -ForegroundColor Green
streamlit run main.py