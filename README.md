✔️ 1. Requisitos previos

Docker Desktop instalado

No es necesario instalar Node.js ni MySQL localmente

Proyecto descargado o clonado

✔️ 2. Levantar el proyecto

Ejecutar en la carpeta raíz:

docker-compose up -d --build

✔️ 3. Probar el backend

Abrir:

👉 http://localhost:3000

Debe mostrar:

API funcionando

✔️ 4. Probar el frontend

Abrir:

👉 http://localhost:3002

Verificar:

Crear una tarea

Listar tareas

Comunicación correcta con el backend

✔️ 5. Acceder a Metabase

Abrir:

👉 http://localhost:3001

Verificar:

Conexión a la base de datos

Visualización de la tabla tareas

Creación de un gráfico simple

✔️ 6. Comprobar base de datos MySQL
docker exec -it tp-mysql mysql -u benja -p


Clave: 280519.Benjamin

Luego:

USE entornos;
SELECT * FROM tareas;


Las tareas creadas desde el frontend deben aparecer aquí.

✔️ 7. Finalizar la corrección
docker-compose down -v

✔️ 8. Objetivo pedagógico demostrado

Este proyecto demuestra:

Manejo de Docker Compose

Comunicación entre contenedores

API REST en Node.js

Persistencia en MySQL

Integración full stack (Frontend + Backend + DB)

Uso de Metabase para análisis de datos

Manejo de healthchecks y scripts de readiness