# File upload
This app allows you to upload a file to AWS S3 and verify if it is a Portable Executable (PE).

# Features
- PE format validation
- File streaming
- SHA256 hashing for storing uniqueness
- Duplicate file event registration
- File metadata storage, such as location and size (bytes)

# Requirements
- docker
- docker-compose
# Installation
The project is configurable through a `.env` file. A `.env.example` file was provided for a easier visualization of the required variables.

This solution is completely dockerized through `docker-compose`. If required to individually interact with each container, separated Dockerfiles are available.

## Environment variables
```
AWS_KEY=KEY #AWS Key
AWS_SECRET_KEY=SECRET_KEY #AWS Secret key
AWS_S3_BUCKET=BUCKET #AWS S3 bucket for the files to be uploaded
DATABASE_USER=user #Database user
DATABASE_PASSWORD=password #Database password
DATABASE_DB=db #Database name
DATABASE_HOST=localhost #Database host. DEFAULT: database
DATABASE_PORT=9999 #Database port
``` 
If you're developing using the `api` container, you can modify it's port with the optional env variable `API_PORT`

# How to use
Once installed, just access `http://localhost/` and you should be greeted with a simple form that only requires a file. Pick the file, hit **Upload**!
