# ToDoApp

ToDoApp es una aplicación de gestión de tareas desarrollada con Angular. Permite a los usuarios crear, listar, editar y eliminar tareas, además de visualizar estadísticas de las tareas mediante gráficos.

## Características

- **Gestión de tareas**: Crear, listar, editar y eliminar tareas.
- **Estadísticas**: Visualización de estadísticas de tareas completadas, pendientes y vencidas mediante gráficos.
- **Interfaz responsiva**: Diseño adaptable para dispositivos móviles y de escritorio.
- **Pruebas unitarias**: Cobertura de pruebas para componentes principales y servicios.

## Tecnologías utilizadas

- **Framework**: Angular 16.0.2
- **Librerías**:
  - Bootstrap para estilos.
  - Chart.js para gráficos.
- **Herramientas de pruebas**:
  - Karma y Jasmine para pruebas unitarias.
  - HttpClientTestingModule para pruebas de servicios.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ToDoApp.git
   cd ToDoApp

2. Instalación de dependencias:
    ```bash
    npm install 

3. Inicia el servidor de desarrollo:
    ```bash
    ng serve

## Scripts disponibles
 - ng serve: Inicia el servidor de desarrollo.
 - ng build: Construye la aplicación para producción en la carpeta dist/.
 - ng test: Ejecuta las pruebas unitarias con Karma.
 - ng lint: Analiza el código para detectar problemas de estilo y errores.

## Estructura del proyecto
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Componente principal del dashboard
│   │   ├── sidebar/            # Componente de la barra lateral
│   │   ├── chart-task/         # Componente para gráficos de tareas
│   │   └── all-tasks/          # Componente para listar todas las tareas
│   ├── services/
│   │   └── task.service.ts     # Servicio para la gestión de tareas
│   ├── models/
│   │   └── task.model.ts       # Modelo de datos para las tareas
│   └── app.module.ts           # Módulo principal de la aplicación
├── assets/                     # Recursos estáticos
└── environments/               # Configuración de entornos

## Pruebas
# Pruebas unitarias
Se han implementado pruebas unitarias para los siguientes componentes y servicios:

TaskService:

Listar tareas (getTasks).
Crear tareas (saveTask).
Editar tareas (updateTask).
Eliminar tareas (deleteTask).
Manejo de errores HTTP.



