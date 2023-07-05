FROM python:3.11.4-alpine3.18
WORKDIR /backend
COPY ["requirements.txt", "./"]
RUN pip install -r requirements.txt
COPY ["./", "/backend"]
EXPOSE 5000
CMD ["python", "app.py"]