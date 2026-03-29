================================================================================
    SISTEMA DE GESTIÓN VETERINARIA - VeterinariaDAO
    README - Documentación del Proyecto
================================================================================

--------------------------------------------------------------------------------
1. DESCRIPCIÓN DEL PROYECTO
--------------------------------------------------------------------------------

Sistema web de gestión veterinaria desarrollado como prototipo funcional
frontend. Simula el funcionamiento de un sistema real mediante autenticación
básica, un dashboard con navegación dinámica y módulos CRUD para gestionar
mascotas, propietarios y veterinarios.

El sistema está construido con HTML, CSS y JavaScript puro, sin frameworks,
y utiliza localStorage para persistir los datos entre sesiones. El proyecto
incluye además entidades JPA preparadas para una futura integración con base
de datos mediante Jakarta EE.

Tipo de proyecto  : Java Web Application (Maven)
Arquitectura      : Frontend SPA (Single Page Application) simulada
Persistencia      : localStorage (frontend) / JPA EclipseLink (backend futuro)

--------------------------------------------------------------------------------
2. REQUISITOS PREVIOS
--------------------------------------------------------------------------------

Para ejecutar o modificar este proyecto necesitas tener instalado:

  - Java JDK        : Versión 17 o superior
  - NetBeans IDE    : Versión 25
  - Apache Maven    : Incluido en NetBeans
  - Navegador web   : Chrome, Firefox, Edge (versión moderna)
  - Git             : Para clonar y gestionar el repositorio

Para la parte backend (entidades JPA) se requiere adicionalmente:
  - MySQL           : Versión 8.x
  - Apache Tomcat   : Versión 10 o superior (compatible con Jakarta EE 11)

--------------------------------------------------------------------------------
3. CREDENCIALES DE ACCESO
--------------------------------------------------------------------------------

El sistema usa autenticación simulada con las siguientes credenciales:

  Usuario    : admin
  Contraseña : 1234

Estas credenciales están definidas en el archivo js/app.js y pueden
modificarse directamente en las constantes:

  const USUARIO_VALIDO  = "admin";
  const PASSWORD_VALIDA = "1234";

--------------------------------------------------------------------------------
4. INSTRUCCIONES DE DESPLIEGUE
--------------------------------------------------------------------------------

  OPCIÓN A - Abrir directamente en el navegador (más rápido):

    1. Clone el repositorio:
         git clone https://github.com/tu-usuario/VeterinariaDAO.git

    2. Navegue a la carpeta del proyecto:
         cd VeterinariaDAO/src/main/webapp

    3. Abra el archivo index.html directamente en su navegador.

    4. Ingrese con las credenciales de acceso indicadas arriba.

  OPCIÓN B - Desde NetBeans:

    1. Clone o descargue el repositorio.
    2. Abra NetBeans IDE 25.
    3. File → Open Project → seleccione la carpeta VeterinariaDAO.
    4. Espere a que Maven descargue las dependencias.
    5. Clic derecho sobre el proyecto → Run.
    6. El navegador abrirá automáticamente index.html.

  OPCIÓN C - Despliegue en Tomcat (para backend JPA):

    1. Configure su base de datos MySQL con el nombre: veterinariadb
    2. Ajuste las credenciales en src/main/resources/META-INF/persistence.xml
    3. Ejecute: mvn clean package
    4. Copie el archivo target/VeterinariaDAO-1.0-SNAPSHOT.war a:
         [TOMCAT_HOME]/webapps/
    5. Inicie Tomcat y acceda a:
         http://localhost:8080/VeterinariaDAO/

--------------------------------------------------------------------------------
5. ESTRUCTURA DEL PROYECTO
--------------------------------------------------------------------------------

  VeterinariaDAO/
  ├── src/
  │   ├── main/
  │   │   ├── java/
  │   │   │   ├── com.mycompany.veterinariadao/
  │   │   │   │   └── JakartaRestConfiguration.java
  │   │   │   ├── com.mycompany.veterinariadao.resources/
  │   │   │   │   └── JakartaEE11Resource.java
  │   │   │   ├── logica/                          (Entidades JPA)
  │   │   │   │   ├── Usuario.java
  │   │   │   │   ├── Propietario.java
  │   │   │   │   ├── Mascota.java
  │   │   │   │   ├── Veterinario.java
  │   │   │   │   ├── Cita.java
  │   │   │   │   └── HistorialMedico.java
  │   │   │   ├── Persistencia/                    (Controladores JPA)
  │   │   │   └── servlets/                        (Servlets HTTP)
  │   │   ├── resources/
  │   │   │   └── META-INF/
  │   │   │       └── persistence.xml              (Configuración JPA)
  │   │   └── webapp/                              (Frontend)
  │   │       ├── index.html                       (Login)
  │   │       ├── dashboard.html                   (Dashboard + CRUD)
  │   │       ├── css/
  │   │       │   └── styles.css                   (Estilos)
  │   │       └── js/
  │   │           └── app.js                       (Lógica CRUD)
  └── pom.xml                                      (Dependencias Maven)

--------------------------------------------------------------------------------
6. FUNCIONALIDADES IMPLEMENTADAS
--------------------------------------------------------------------------------

  1. LOGIN
     - Validación de campos vacíos
     - Autenticación simulada con JavaScript
     - Sesión almacenada en localStorage
     - Redirección automática al dashboard
     - Protección del dashboard sin sesión activa

  2. DASHBOARD
     - Navegación dinámica sin recargar la página
     - Barra superior con nombre de usuario y cierre de sesión
     - Menú lateral con indicador de vista activa
     - Carga dinámica de vistas mediante manipulación del DOM

  3. GESTIÓN DE MASCOTAS (CRUD completo)
     - Crear mascota (nombre, edad, tipo, propietario)
     - Listar mascotas en tabla renderizada con <template>
     - Editar mascota (carga datos en formulario)
     - Eliminar mascota (con confirmación)

  4. GESTIÓN DE PROPIETARIOS (CRUD completo)
     - Crear propietario (nombre, teléfono, dirección)
     - Listar propietarios en tabla renderizada con <template>
     - Editar propietario (carga datos en formulario)
     - Eliminar propietario (con confirmación)

  5. GESTIÓN DE VETERINARIOS (CRUD completo)
     - Crear veterinario (nombre, especialidad, contacto)
     - Listar veterinarios en tabla renderizada con <template>
     - Editar veterinario (carga datos en formulario)
     - Eliminar veterinario (con confirmación)

  6. USO DE <template>
     - Un template por cada entidad (3 en total)
     - Render dinámico usando cloneNode() y querySelector()
     - Botones de editar y eliminar dentro de cada fila

  7. PERSISTENCIA CON localStorage
     - Los datos se conservan al cerrar y reabrir el navegador
     - Guardado automático en cada operación CRUD

--------------------------------------------------------------------------------
7. ENTIDADES JPA
--------------------------------------------------------------------------------

Las siguientes entidades están preparadas para integración futura con MySQL
mediante Jakarta Persistence API (JPA) con EclipseLink como proveedor.

  +------------------+----------------------+--------------------------------+
  | Entidad          | Tabla                | Relaciones                     |
  +------------------+----------------------+--------------------------------+
  | Usuario          | usuarios             | Ninguna                        |
  | Propietario      | propietarios         | 1 a N Mascotas                 |
  | Mascota          | mascotas             | N a 1 Propietario              |
  |                  |                      | 1 a N Citas                    |
  |                  |                      | 1 a N HistorialMedico          |
  | Veterinario      | veterinarios         | 1 a N Citas                    |
  |                  |                      | 1 a N HistorialMedico          |
  | Cita             | citas                | N a 1 Mascota                  |
  |                  |                      | N a 1 Veterinario              |
  | HistorialMedico  | historial_medico     | N a 1 Mascota                  |
  |                  |                      | N a 1 Veterinario              |
  +------------------+----------------------+--------------------------------+

Todas las entidades usan:
  - @Entity y @Table de jakarta.persistence
  - @Id con @GeneratedValue(strategy = IDENTITY)
  - Relaciones @OneToMany y @ManyToOne según corresponda

Dependencias Maven utilizadas:
  - jakarta.jakartaee-api     11.0.0-M1
  - org.eclipse.persistence   4.0.2
  - mysql-connector-j         8.3.0

================================================================================
    Desarrollado por: Oscar Leonardo Andrade Diaz
    Curso: Desarrollo de Software Web Backend en Java
    Fecha: Marzo 2026
================================================================================
