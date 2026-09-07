# Three.js boilerplate

A matcap cube on a full-screen black canvas, with OrbitControls and a lil-gui panel.

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

- `main.js`: scene, camera, cube, renderer, animation, and GUI, explained with Hinglish comments.
- `public/image.png`: matcap image used by the cube.
- `style.css`: full-screen canvas styling.
- `index.html`: canvas and JavaScript entry point.

Use the GUI to change color, wireframe, position, rotation, scale, and animation speed. Editing rotation pauses auto-rotation. GUI changes are temporary and are not saved to source code. Drag on the canvas to orbit, scroll to zoom, or right-drag to pan.

The animation uses `renderer.setAnimationLoop()` and renders every frame. The resize handler updates both the camera projection and renderer dimensions. `MeshMatcapMaterial` uses the image's baked shading and does not require lights.
