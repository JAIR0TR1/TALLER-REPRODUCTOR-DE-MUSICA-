# MusicDLL - Reproductor de Música (Lista Doblemente Enlazada)

Este es un reproductor de música interactivo desarrollado en **TypeScript** y **React**. El objetivo principal del proyecto es demostrar el uso y la gestión de una **Lista Doblemente Enlazada (DLL)** como estructura de datos principal para la navegación de una playlist.

## 🚀 Cómo ejecutar el proyecto

Sigue estos pasos para poner en marcha la aplicación en tu computadora local:

### 1. Requisitos previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).

### 2. Instalación
Abre una terminal en la carpeta del proyecto (`music-player-dll`) y ejecuta:
```bash
npm install
```

### 3. Ejecución
Inicia el servidor de desarrollo con:
```bash
npm run dev
```

### 4. Acceso
Una vez iniciado, abre tu navegador y ve a la dirección que aparece en la terminal (normalmente `http://localhost:5173`).

---

## 🛠️ Detalles Técnicos

### Estructura de Datos
La playlist no utiliza arreglos (`arrays`) para la lógica de navegación. Se ha implementado una **Lista Doblemente Enlazada** manual en `src/structures/DoublyLinkedPlaylist.ts`.
- **Nodos:** Cada canción es un nodo con punteros `next` y `prev`.
- **Navegación:** El paso a la siguiente o anterior canción tiene una complejidad de **O(1)**.
- **Inserción/Eliminación:** Se gestiona mediante el reajuste de punteros, permitiendo insertar en cualquier posición.

### Gestión de Memoria (Caché RAM)
Para evitar que el navegador se bloquee al manejar archivos de audio reales, se ha implementado un servicio de caché (`src/services/AudioCache.ts`) con los siguientes límites:
- **Máximo de canciones:** 15.
- **Tamaño máximo por archivo:** 12 MB.
- **Memoria total acumulada:** 80 MB.
- **Limpieza:** Se utiliza `URL.revokeObjectURL()` para liberar memoria cuando una canción es eliminada.

### Tecnologías usadas
- **TypeScript:** Tipado estricto para toda la lógica de datos.
- **React:** Interfaz de usuario moderna y reactiva.
- **Vite:** Herramienta de construcción ultra rápida.
- **CSS Vanilla:** Estilo personalizado con estética oscura.

---

## 📂 Estructura del Proyecto

- `src/structures/`: Implementación de la Lista Doble.
- `src/services/`: Lógica de caché y validación de archivos.
- `src/hooks/`: Hook `useAudioPlayer` para controlar el flujo de audio.
- `src/components/`: Componentes visuales (Upload, Playlist, Controls).
- `src/models/`: Interfaces y tipos de datos.

---

## 📝 Notas de Uso
- El reproductor consume archivos reales del usuario.
- **No hay backend ni persistencia:** Si refrescas la página, la lista se vacía por seguridad de memoria.
- Soporta formatos: `.mp3`, `.wav`, `.ogg`.
