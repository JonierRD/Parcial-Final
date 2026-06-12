# OpticaVista — Parcial Final

Tienda de lentes (HTML, CSS, Bootstrap 5, JS vanilla).

## Estructura

- `index.html` — Home con hero, colección y modal de registro
- `usuarios.html` — Tabla con usuarios registrados (lee `localStorage`)
- `css/styles.css` — Estilos y animación de la línea dorada
- `js/app.js` — Validación, localStorage, renderizado y observer
- `assets/` — imágenes y recursos

## Cómo probar localmente

1. Abrir `index.html` en el navegador.
2. Abrir modal "Registrarme", completar formulario y registrar.
3. Ver `usuarios.html` para confirmar el registro.

## Despliegue en Vercel

- Framework Preset: Other / No Framework
- Build command: (vacío)
- Output directory: `.`
- Conectar el repositorio `NORMAN-ITP/ParcialFinal` o `JonierRD/Parcial-Final` según corresponda.

## Notas

- El proyecto usa `localStorage` para guardar usuarios; es una vista interna (noindex).
- Tipografías importadas desde Google Fonts en `css/styles.css`.
