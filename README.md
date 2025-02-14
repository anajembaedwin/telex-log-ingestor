# **Log Ingestor Integration**

## **Overview**  
The **Log Ingestor Integration** is a custom solution that collects and forwards log data to Telex in real time using webhooks. This integration is designed for monitoring and managing logs from various sources with minimal setup.

## **Features**  
- Real-time log ingestion and monitoring  
- Custom log levels (`INFO`, `ERROR`, `DEBUG`)  
- Simple integration with any application  
- Docker support for containerized deployment  

---

## **Project Structure**  
```
telex-log-ingestor/
├── src/
│   ├── index.js         # Main entry file
│   └── utils.js         # Helper functions for sending logs
├── .env                 # Environment variables
├── Dockerfile           # Docker configuration
├── package.json         # Project dependencies
└── README.md            # Documentation
```

---

## **Setup Instructions**  

### **Prerequisites**  
- Node.js and npm  
- Docker (optional)  
- Telex account with a webhook URL  

### **Installation**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/anajembaedwin/telex-log-ingestor.git
   cd telex-log-ingestor
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory and add the following:  
   ```
   PORT=3000
   TELEX_WEBHOOK_URL=https://ping.telex.im/v1/webhooks/your-webhook-id
   ```

4. **Start the Server**  
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

---

## **Docker Usage**  

1. **Build the Docker Image**  
   ```bash
   docker build -t telex-log-ingestor .
   ```

2. **Run the Container**  
   ```bash
   docker run -p 3000:3000 telex-log-ingestor
   ```

---

## **API Endpoints**  

### **1. Health Check**  
**GET /health**  
- **Description**: Check if the service is running.  
- **Response**:  
  ```json
  {
    "status": "OK",
    "message": "Log Ingestor is running"
  }
  ```

### **2. Send Log**  
**POST /send-log**  
- **Description**: Send a log to the Telex webhook.  
- **Request Body**:  
  ```json
  {
    "logLevel": "INFO",
    "message": "Test log message"
  }
  ```  
- **Response**:  
  ```json
  {
    "status": "success",
    "telexResponse": { ... }
  }
  ```

---

## **Testing the Integration**  

1. **Health Check**  
   Visit `http://localhost:3000/health` in your browser or use `curl`:  
   ```bash
   curl http://localhost:3000/health
   ```

2. **Submit a Log**  
   Use Postman or `curl` to test the `/send-log` endpoint:  
   ```bash
   curl -X POST http://localhost:3000/send-log \
     -H "Content-Type: application/json" \
     -d '{"logLevel":"INFO","message":"Test log message"}'
   ```

---

## **Future Updates**  
- **Add Authentication**: Secure the `/send-log` endpoint with an API key.  
- **Build a Log Dashboard**: Create a visual interface for monitoring logs.  
- **Enhance Error Handling**: Add retries and logging for failed webhook requests.  

---

## **License**  
MIT