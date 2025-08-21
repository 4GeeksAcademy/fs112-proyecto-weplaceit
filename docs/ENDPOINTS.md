# API Endpoints Documentation

Esta documentación describe los formatos de los distintos endpoints de la plataforma de reservas.

## Formato General

- **Base URL:** `https://api.tu-plataforma.com/v1/`
- **Autenticación:** Bearer Token en el header `Authorization`

---

## Endpoints

### 1. Login

#### `POST /api/login`

**Descripción:** Inicia sesión y obtiene un token de acceso.

**Request Body:**
```json
{
    "email": "usuario@ejemplo.com",
    "password": "tu_contraseña"
}
```

**Response:**
```json
{
    "token": "jwt_token",
    "user": {
        "datos": "Datos del user"
    }
}
```

---