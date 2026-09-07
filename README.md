# Three.js boilerplate

A red wireframe cube on a full-screen black canvas, based on the reference photos.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use the development server because `main.js` imports an npm package and CSS.

## Build

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Customize

- `main.js`: scene, camera, cube, renderer, and animation. Change `color`, `wireframe`, or the rotation speed (`0.6` radians per second).
- `style.css`: full-screen canvas styling.
- `index.html`: canvas and JavaScript entry point.

The animation uses `renderer.setAnimationLoop()` and renders every frame. The resize handler updates both the camera projection and renderer dimensions. `MeshBasicMaterial` does not require lights.
