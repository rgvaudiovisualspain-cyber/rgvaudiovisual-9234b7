# RGV Audiovisual

Web corporativa de RGV Audiovisual, una productora independiente centrada en cortometrajes de autor. El sitio presenta la identidad del estudio, el cortometraje **Voy con todo**, su cobertura de prensa y una sección de contacto.

## Tecnologías

- TanStack Start y TanStack Router
- React 19 y TypeScript
- Vite 7
- CSS personalizado con Tailwind CSS 4 como herramienta de estilos
- Lucide React para iconografía
- Adaptador de Netlify para despliegue

## Desarrollo local

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en el puerto indicado por Vite. Para generar la versión de producción:

```bash
pnpm build
```

## Estructura principal

- `src/routes/index.tsx`: contenido, navegación e interacciones de la web.
- `src/routes/__root.tsx`: documento base y metadatos.
- `src/styles.css`: dirección visual, diseño adaptable y animaciones.
- `public/`: recursos estáticos públicos.
