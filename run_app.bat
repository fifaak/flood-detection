@echo off
echo Activating virtual environment...
call flood_prediction_env\Scripts\activate

echo Starting FloodGuard application...
streamlit run main.py

pause