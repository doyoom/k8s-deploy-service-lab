FROM python:3.11-slim
WORKDIR /app
RUN pip install flask==3.0.3
COPY b.py ./
EXPOSE 5001
CMD ["python", "b.py"]
