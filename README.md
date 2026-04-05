# Timeline Vida

Una aplicación web interactiva para crear y visualizar la línea de tiempo de tu vida. Registra los momentos importantes de tu historia personal, profesional y más.

An interactive web application to create and visualize your life timeline. Record the important moments of your personal and professional history.

## Características / Features

- **Gestión de eventos**: Agrega, edita y elimina eventos de tu línea de tiempo / Add, edit and delete events on your timeline
- **Categorías personalizables**: Crea categorías con colores personalizados / Create categories with custom colors
- **Exportación PDF**: Exporta tu línea de tiempo como documento PDF / Export your timeline as a PDF
- **Multidioma**: Interfaz disponible en español e inglés / Interface available in Spanish and English
- **Diseño responsivo**: Funciona en dispositivos de escritorio y móviles / Works on desktop and mobile
- **Persistencia local**: Tus datos se guardan en el navegador / Your data is saved in the browser

## Instalación / Installation

```bash
npm install
```

## Ejecución / Running

```bash
npm run dev
```

Abre / Open [http://localhost:5173](http://localhost:5173) en tu navegador / in your browser.

## Cómo usar / How to use

### Agregar eventos / Adding events

1. Haz clic en el botón **"+"** en la parte superior / Click the **"+"** button at the top
2. Ingresa el año del evento / Enter the year of the event
3. Escribe la descripción del evento / Write the event description
4. Selecciona una categoría / Select a category
5. Guarda el evento / Save the event

### Gestionar categorías / Managing categories

1. Abre el panel de configuración (ícono de engranaje) / Open the settings panel (gear icon)
2. Agrega, edita o elimina categorías / Add, edit or delete categories
3. Personaliza el nombre y los colores de cada categoría / Customize the name and colors of each category

### Exportar a PDF / Exporting to PDF

1. Haz clic en el botón de exportar en el header / Click the export button in the header
2. Selecciona el rango de años / Select the year range
3. Descarga tu línea de tiempo / Download your timeline

## Estructura de datos (JSON) / Data structure (JSON)

Los eventos se almacenan en el siguiente formato: / Events are stored in the following format:

```json
{
  "yearStart": 1990,
  "yearEnd": 2030,
  "categories": [
    {
      "id": "c1",
      "name": "Personal",
      "bg": "rgba(140, 109, 63, 0.18)",
      "border": "#8c6d3f",
      "text": "#8c6d3f"
    }
  ],
  "events": {
    "1990": [
      { "text": "Nací en marzo", "catId": "c1" }
    ]
  }
}
```

Puedes ver un ejemplo completo en `public/example.json`. / You can see a complete example in `public/example.json`.

## Tecnologías / Technologies

- React 19
- Vite
- Radix UI (Dialog)
- i18next (internacionalización / internationalization)
- jsPDF + html2canvas (exportación PDF / PDF export)

## Desplegar a GitHub Pages / Deploy to GitHub Pages

1. Cambia el valor de `homepage` en `package.json` con tu usuario de GitHub: / Change the `homepage` value in `package.json` with your GitHub username:

```json
"homepage": "https://tu-usuario.github.io/timeline-vida"
```

2. Cambia la base en `vite.config.js` si es necesario: / Change the base in `vite.config.js` if needed:

```js
base: '/my-life-timeline/',
```

3. Instala las dependencias e inicializa git si no lo has hecho: / Install dependencies and init git if you haven't:

```bash
npm install
git init
git add .
git commit -m "Initial commit"
```

4. Crea el repositorio en GitHub y conecta: / Create the repository on GitHub and connect:

```bash
git remote add origin https://github.com/alejomontoya/my-life-timeline.git
```

5. Despliega: / Deploy:

```bash
npm run deploy
```

O si prefieres usar GitHub Actions, añade la configuración en `.github/workflows/deploy.yml`. / Or if you prefer using GitHub Actions, add the config in `.github/workflows/deploy.yml`.
