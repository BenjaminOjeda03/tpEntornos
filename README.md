# Mini Plataforma Web con Docker Compose

## 🚀 Servicios incluidos
- **Backend (Node.js + Express)** — API REST para gestionar tareas.
- **MySQL** — Base de datos con persistencia en volumen.
- **Metabase** — Dashboard opcional para visualizar datos.

---

## 🐳 Puesta en marcha

### 1. Clonar el proyecto
git clone <repo>

### 2. Crear archivo `.env`
Copiar el siguiente contenido:

BACKEND_PORT=3000
MYSQL_ROOT_PASSWORD=root123
MYSQL_DATABASE=tareasdb
MYSQL_USER=user
MYSQL_PASSWORD=user123

### 3. Levantar servicios
docker compose up -d

### 4. Endpoints disponibles

| Método | Ruta | Descripción |
|-------|-------|--------------|
| GET | `/` | Prueba de vida |
| GET | `/tareas` | Lista todas las tareas |
| POST | `/tareas` | Crea una tarea |

Ejemplo para crear una tarea:

```json
POST http://localhost:3000/tareas
{
  "titulo": "Comprar insumos",
  "estado": "ToDo"
}

## 5. Documento de decisiones tecnológicas**

## 📌 Backend → Node.js + Express
- Express es liviano, rápido para prototipos y fácil de dockerizar.  
- Amplia comunidad y soporte.  
- Buen manejo de JSON y APIs REST.

## 📌 Base de datos → MySQL
- Imagen oficial estable y ampliamente usada en producción.  
- Soporte para volúmenes persistentes.  
- Compatible con Metabase para dashboards.

## 📌 Metabase (opcional)
- Permite visualizar y consultar datos sin programar.  
- Útil para reportes internos de la pyme.  
- Se levanta con una sola imagen Docker.

## 📌 Docker Compose
- Permite levantar todos los servicios con un solo comando.  
- Manejo simple de redes, variables y volúmenes.  
- Ideal para entorno educativo y prototipos.

---

# ✅ **6. Endpoint de prueba para Postman**

### **POST – Crear tarea**
URL:
