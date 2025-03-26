# ✅ ToDoApp - Angular Frontend

**ToDoApp** es una aplicación de gestión de tareas desarrollada con **Angular 16.0.2**. Permite a los usuarios crear, listar, editar y eliminar tareas, además de visualizar estadísticas de las tareas mediante gráficos. La aplicación cuenta con una interfaz responsiva y cobertura de pruebas unitarias para sus componentes y servicios.

---

## 🚀 Características Principales

- **Gestión de Tareas:** Permite crear, listar, editar y eliminar tareas.
- **Estadísticas:** Visualización de tareas completadas, pendientes y vencidas mediante gráficos (usando Chart.js).
- **Interfaz Responsiva:** Diseño adaptable para múltiples dispositivos.
- **Pruebas Unitarias:** Implementadas para los componentes principales y servicios con Karma, Jasmine y HttpClientTestingModule.

---

## 📄 Tecnologías Utilizadas

- **Framework:** Angular 16.0.2
- **Librerías:**
  - Bootstrap (para estilos)
  - Chart.js (para gráficos)
- **Herramientas de Pruebas:**
  - Karma y Jasmine (para pruebas unitarias)
  - HttpClientTestingModule (para pruebas de servicios)

---

## 📥 Instalación y Ejecución Local

### 1. Clonar el Repositorio

Abre una terminal y ejecuta:

```markdown
git clone https://github.com/kevinalarcon95/todoApp.git
cd ToDoApp
```

### 2. Instalación de Dependencias

Instala las dependencias del proyecto:

```markdown
npm install
```
### 3. Iniciar el Servidor de Desarrollo

Inicia el servidor de desarrollo con:

```markdown
ng serve
```

La aplicación estará disponible en http://localhost:4200.

## 🛠 Scripts Disponibles
- ng serve: Inicia el servidor de desarrollo.
- ng build: Construye la aplicación para producción en la carpeta dist/.
- ng test: Ejecuta las pruebas unitarias con Karma.

## 📂 Estructura del Proyecto

```markdown
src/
├── app/
│   ├── components/
│   │   ├── dashboard/      # Componente principal del dashboard
│   │   ├── sidebar/        # Componente de la barra lateral
│   │   ├── chart-task/     # Componente para gráficos de tareas
│   │   └── all-tasks/      # Componente para listar todas las tareas
│   ├── services/
│   │   └── task.service.ts # Servicio para la gestión de tareas
│   ├── models/
│   │   └── task.model.ts   # Modelo de datos para las tareas
│   └── app.module.ts       # Módulo principal de la aplicación
├── assets/                 # Recursos estáticos (imágenes, estilos, etc.)
└── environments/           # Configuración de entornos (development, production)
```

## 🔬 Pruebas Unitarias

Se han implementado pruebas unitarias para los siguientes componentes y servicios:

###### TaskService:

- Listar tareas (getTasks)
- Crear tareas (saveTask)
- Editar tareas (updateTask)
- Eliminar tareas (deleteTask)
- Manejo de errores HTTP
- Para ejecutar las pruebas, utiliza:

```markdown
ng test
```

## ☁ Despliegue en GitHub Pages

La aplicación está desplegada en GitHub Pages. Para desplegarla, se utiliza el comando de Angular CLI compatible con GitHub Pages (por ejemplo, utilizando el paquete angular-cli-ghpages):

1. Construir la aplicación para producción:

```markdown
ng build --prod --base-href "https://kevinalarcon95.github.io/todoApp/"
```
2. Desplegar a GitHub Pages:

```markdown
npx angular-cli-ghpages --dir=dist/ToDoApp
```

La URL de la aplicación es:
https://kevinalarcon95.github.io/todoApp/

Nota: Asegúrate de que el repositorio esté configurado correctamente para GitHub Pages y que el base-href coincida con la URL del repositorio.

---

## ✍ Autor

Desarrollado por Kevin Alarcón
