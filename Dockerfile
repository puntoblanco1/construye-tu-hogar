FROM python:3.9-slim

WORKDIR /app

COPY backend/ ./backend/

RUN cd backend && pip install -r requirements.txt

EXPOSE 8000

CMD cd backend && uvicorn server:app --host 0.0.0.0 --port 8000
