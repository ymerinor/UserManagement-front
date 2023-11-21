# Proyecto React con Autenticación

Este proyecto es una aplicación React que utiliza autenticación mediante JWT y realiza operaciones en una API de usuarios. La API está construida en .NET Core con arquitectura hexagonal.

## Pasos para Ejecutar el Proyecto

### Requisitos Previos

1. Asegúrate de tener Node.js y npm instalados en tu máquina.

### Configuración y Ejecución del Frontend (React)

1. Navega a la raíz del proyecto.

2. Ejecuta el siguiente comando para instalar las dependencias del frontend:

    ```bash
    npm install
    ```

3. Luego, ejecuta el siguiente comando para iniciar la aplicación React:

    ```bash
    npm start
    ```

4. Abre tu navegador y accede a `http://localhost:3000` para ver la aplicación en acción.

### Usuario de Prueba para Autenticación

- Usuario: `yeinermeri@gmail.com`
- Contraseña: `0123456789`

## Características del Proyecto

- **Autenticación JWT:** La aplicación utiliza JWT para autenticar a los usuarios. Un token JWT se obtiene al iniciar sesión con las credenciales proporcionadas.
- **Operaciones CRUD de Usuarios:** La aplicación permite crear, leer usuarios a través de la API.

## Notas Importantes

- El proyecto tiene configurado por defecto el usuario `yeinermeri@gmail.com` con la contraseña `0123456789` para facilitar el proceso de autenticación y obtención del token.
