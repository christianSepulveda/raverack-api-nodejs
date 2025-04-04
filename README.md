# RaveRack NodeJS Server

### General
RaveRack NodeJS Server está hecho a base de Express y Sequelize que permite el manejo dinámico 
de variadas funcionalidades de la Aplicación en específico.

Mediante Clean Architecture se puede dar manejo facil y detallado de las entidades, casos de uso y 
modelos de base de datos para la Aplicación en cuestión.

### Organización de ficheros
La estructura de ficheros del proyecto está organizada de la siguiente manera:

```
/src
    /domain # Capa donde se definen las entidades y repositorios de la aplicación
    /application # Capa donde se definen los casos de uso de la aplicación
    /infraestructure # Capa que comunica y configura la aplicación con la base de datos
    /interfaces # Capa encargada de entregar los middleware, utilidades y archivos de controlador a la aplicación
    app.ts # Archivo de entrada de la aplicación
```

## Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```env
PORT
JWT_SECRET
DB_HOST
DB_NAME
DB_USER
DB_PASSWORD
BREVO_API_KEY
```
