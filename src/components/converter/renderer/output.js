// import React from "react";
// import { defaultSpacing } from "../../../styles";
// import {
//   BufferGeometry,
//   Color,
//   Curve,
//   DodecahedronGeometry,
//   DoubleSide,
//   Float32BufferAttribute,
//   Group,
//   LineSegments,
//   LineBasicMaterial,
//   Mesh,
//   MeshPhongMaterial,
//   PerspectiveCamera,
//   PointLight,
//   Scene,
//   Shape,
//   Vector3,
//   WireframeGeometry,
//   WebGLRenderer,
// } from "three";

// import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// class CustomSinCurve extends Curve {
//     constructor(scale = 1) {
//       super();

//       this.scale = scale;
//     }

//     getPoint(t, optionalTarget = new Vector3()) {
//       const tx = t * 3 - 1.5;
//       const ty = Math.sin(2 * Math.PI * t);
//       const tz = 0;

//       return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
//     }
//   }

//   function updateGroupGeometry(mesh, geometry) {
//     mesh.children[0].geometry.dispose();
//     mesh.children[1].geometry.dispose();

//     mesh.children[0].geometry = new WireframeGeometry(geometry);
//     mesh.children[1].geometry = geometry;

//     // these do not update nicely together if shared
//   }


// const outputStyle = {
//   ...defaultSpacing,
//   borderStyle: "solid",
//   borderWidth: 1,
//   width: 500,
//   height: 500,
// };





// export const Output = (props) => {
//   const getGeometry = (mesh) => {
//     const data = {
//       radius: 10,
//       detail: 0,
//     };

//     function generateGeometry() {
//       updateGroupGeometry(
//         mesh,
//         new DodecahedronGeometry(data.radius, data.detail)
//       );
//     }

//     const folder = gui.addFolder("THREE.DodecahedronGeometry");

//     folder.add(data, "radius", 1, 20).onChange(generateGeometry);
//     folder.add(data, "detail", 0, 5).step(1).onChange(generateGeometry);

//     generateGeometry();
//   }

//   const gui = new GUI();
//   const scene = new Scene();

//   scene.background = new Color(0x44485a);

//   const camera = new PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     50
//   );
//   camera.position.z = 30;

//   const renderer = new WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   const orbit = new OrbitControls(camera, renderer.domElement);
//   orbit.enableZoom = false;

//   const lights = [];
//   lights[0] = new PointLight(0xffffff, 1, 0);
//   lights[1] = new PointLight(0xffffff, 1, 0);
//   lights[2] = new PointLight(0xffffff, 1, 0);

//   lights[0].position.set(0, 200, 0);
//   lights[1].position.set(100, 200, 100);
//   lights[2].position.set(-100, -200, -100);

//   scene.add(lights[0]);
//   scene.add(lights[1]);
//   scene.add(lights[2]);

//   const group = new Group();

//   const geometry = new BufferGeometry();
//   geometry.setAttribute("position", new Float32BufferAttribute([], 3));

//   const lineMaterial = new LineBasicMaterial({
//     color: 0xffffff,
//     transparent: true,
//     opacity: 0.5,
//   });
//   const meshMaterial = new MeshPhongMaterial({
//     color: 0x156289,
//     emissive: 0x072534,
//     side: DoubleSide,
//     flatShading: true,
//   });

//   group.add(new LineSegments(geometry, lineMaterial));
//   group.add(new Mesh(geometry, meshMaterial));
//   getGeometry(group);
//   scene.add(group);
//   camera.aspect = 500 / 500;
//   camera.updateProjectionMatrix();
//   renderer.setSize(500, 500);


//   function render() {
//     requestAnimationFrame(render);
//     group.rotation.x += 0.005;
//     group.rotation.y += 0.005;
//     renderer.render(scene, camera);
//   }

//   window.addEventListener(
//     "resize",
//     () => {
//       // camera.aspect = window.innerWidth / window.innerHeight;
//       // camera.updateProjectionMatrix();
//       // renderer.setSize(500, 500);
//     },
//     false
//   );

//   render();

//   return (
//     <div style={outputStyle}>
//       {"Output 3D model"}
//     </div>
//   );
// };


import React, { useRef, useEffect } from "react";
import { defaultSpacing } from "../../../styles";
import {
  BufferGeometry,
  Color,
  Curve,
  DodecahedronGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Shape,
  Vector3,
  WireframeGeometry,
  WebGLRenderer,
} from "three";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

class CustomSinCurve extends Curve {
  constructor(scale = 1) {
    super();

    this.scale = scale;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

function updateGroupGeometry(mesh, geometry) {
  mesh.children[0].geometry.dispose();
  mesh.children[1].geometry.dispose();

  mesh.children[0].geometry = new WireframeGeometry(geometry);
  mesh.children[1].geometry = geometry;

  // these do not update nicely together if shared
}

const outputStyle = {
  ...defaultSpacing,
  borderStyle: "solid",
  borderWidth: 1,
  width: 500,
  height: 500,
};

export const Output = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const getGeometry = (mesh) => {
      const data = {
        radius: 10,
        detail: 0,
      };

      function generateGeometry() {
        updateGroupGeometry(
          mesh,
          new DodecahedronGeometry(data.radius, data.detail)
        );
      }

      const folder = gui.addFolder("THREE.DodecahedronGeometry");

      folder.add(data, "radius", 1, 20).onChange(generateGeometry);
      folder.add(data, "detail", 0, 5).step(1).onChange(generateGeometry);

      generateGeometry();
    };

    const gui = new GUI();
    const scene = new Scene();

    scene.background = new Color(0x44485a);

    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    camera.position.z = 30;

    const renderer = new WebGLRenderer({ antialias: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    const lights = [];
    lights[0] = new PointLight(0xffffff, 1, 0);
    lights[1] = new PointLight(0xffffff, 1, 0);
    lights[2] = new PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    const group = new Group();

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute([], 3));

    const lineMaterial = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const meshMaterial = new MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: DoubleSide,
      flatShading: true,
    });

    group.add(new LineSegments(geometry, lineMaterial));
    group.add(new Mesh(geometry, meshMaterial));
    getGeometry(group);
    scene.add(group);
    camera.aspect = 500 / 500;
    camera.updateProjectionMatrix();
    renderer.setSize(500, 500);

    function render() {
      requestAnimationFrame(render);
      group.rotation.x += 0.005;
      group.rotation.y += 0.005;
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(500, 500);
    });

    render();
  }, []);

  return (
    <div style={outputStyle}>
      <canvas ref={canvasRef} />
      {"Output 3D model"}
    </div>
  );
};