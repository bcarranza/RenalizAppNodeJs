# RenalizAppNodeJs

Estamos usando cloud functions, la cual es tecnología serverless.

## Requerimientos
1. Install Serverless Framework 
2. Install GOOGLE CLOUD SDK

## Invocar una funcion localmente
Commando

```
sls invoke local  --function first
```

Resultado

```
{
    "status": 200,
    "headers": {
        "content-type": "text/html; charset=utf-8",
        "content-length": "12",
        "etag": "W/\"c-Lve95gjOVATpfV8EL5X4nxwjKHE\""
    },
    "body": "Hello World!"
}
```

## Conectar con Google 
1. Setear nuestro proyecto de google como default.

```
gcloud config set project renalizapp-2023
```

2. Hacer login a la cuenta donde associada a GCP Cloud

```
gcloud auth application-default login
```

3. Estos servicios vienen desactivados por defecto, activarlos solo la
   primera vez.

```
gcloud services enable deploymentmanager.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

## Desplegar la función en GCP
1. Opcional: Validar si no tienes algún error de sintaxis

```
sls package
```

2. Desplegar la función.
Comando

```
sls deploy 
```

Resultado

```
Running "serverless" from node_modules
Compiling function "first"...
Creating deployment...
Checking deployment create progress...
.
Done...
Uploading artifacts...
Artifacts successfully uploaded...
Updating deployment...
Checking deployment update progress...
.........................
Done...
Service Information
service: renalizapp-2023
project: renalizapp-2023
stage: dev
region: us-central1

Deployed functions
first
  https://us-central1-renalizapp-2023.cloudfunctions.net/renalizapp-2023-dev-first
```

3. Testear la función hacia la nube.
Comando

```
gcloud functions call renalizapp-2023-dev-first
```

Resultado

```
executionId: h7tbolnbfvzn
result: Hello World!
```

4. Testear con CURL (el viejo Curl siempre es mejor que postman)

Comando

```
curl $FUNCTION_URL -H "Authorization: bearer $(gcloud auth print-identity-token)"
```

Resultado

```
HelloWorld!
```
5. Probar en postman como niña fresa

- Imprimir el token de ouauth2.0
Comando

```
gcloud auth print-identity-token
```

Resultado (solo para efectos de ejemplo, cada sesión es diferente)

```
eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzYWZlN2E5YmRhNDZiYWU2ZWY5N2U0NmM5NWNkYTQ4OTEyZTU5NzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1NzUyNzAxMDk3MDk3MjgyNTMwIiwiZW1haWwiOiJyZW5hbGl6YXBwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNFl1ZGdVRFhXNmFxcUVESV9FUnVwUSIsImlhdCI6MTY5MjQxNTExOCwiZXhwIjoxNjkyNDE4NzE4fQ.Y_S1fp0d_0AFbZZ6x3bClovk_GG9iDhv6qSX6RiiCa1afnbbPtIyu3Rr-pd-SZHidPqAaFzdxq2JojnlCR-kt4vkbRa6Xn4wjBdKgJUqvGzdRt2SFdv4IuyQtXEjJyPjb93z_EMqyVAtOyYCS43NmHBwesovuHic9GY3NMXIiTtUYThLUiDlKHyIUx4qYvWnLd8S86m-Hi0OCKIA1Bi8VlATlgv3-NOnAI3HVYDRzhoYvfc_GuoZNi7gQ2O6yYnvE4LM_zqCxioOquAHGrQNtXsJ0UIALDNrIbqMBTxXLQFQSNOSYCdMmFOdjpbHizzPuafvs6Rrx5hauAEMkfUOCA
```

- En la sección Authenticación escoger OAuth2.0 y pegar el token generado.
![](./img/postman.png)



Referencias
https://blog.devgenius.io/use-serverless-to-deploy-sample-google-cloud-functions-c8901f747540
