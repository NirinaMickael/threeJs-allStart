import * as THREE from 'three';
import { AmbientLight, BoxGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, PointLight, Raycaster, TextureLoader, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isEqual } from './utils/math';
import { fromEvent } from 'rxjs';
import { debounceTime, filter} from 'rxjs/operators';
import { GROUND } from './contants/Ground';
import { Easing, Tween, update as TweenUpdateFunc } from "@tweenjs/tween.js";
import { inspectModel } from './utils/models-inspect';
import materialDefault from './utils/Materials';
import { GUI } from 'dat.gui';

export class VirtualVisit {

  raycaster: Raycaster;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  container!: Element;
  orbitControl!: OrbitControls;

  delta!: number;
  prevTime: number = 0;

  //#region default value params;
  cameraDefaultPosition = new Vector3(-3, 2, 1.5);
  enableOrbitControls = false;
  defaultLongitude = 0;

  updateFunctions: ((...args: any[]) => void)[] = [];
  isIntercationLocked = false;

  isCameraLocked: any;
  isUserInteracting = false;
  onPointerDownMouseX: any;
  onPointerDownMouseY: any;
  onPointerDownLon: any;
  longitude: any;
  onPointerDownLat: any;
  latitude: any;
  onDocumentMouseWheel: any;
  phi: any;
  theta: any;
  dragged = false;
  startX = 0;
  startY = 0;
  referencePosition!: THREE.Mesh;
  lastMove: any;

  modelObjects: any[] = [];
  

  constructor(
    private containerSelector: string
  ) {
    this.raycaster = new THREE.Raycaster();
  }

  init() {
    this.initScene();
    this.loadModel();
    this.setupLight();
    this.setOrbitalControls();
    this.init360();
    this.initEvent();
    this.initTween();
  }

  initScene(): void {
    const fov = window.innerHeight * 65 / 935;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      fov + 30,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.container = document.querySelector(this.containerSelector) as Element;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);
    this.camera.position.copy(this.cameraDefaultPosition);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    this.update();

    this.scene.background = materialDefault.hdrEquirect;
  }

  initTween(): void {
    this.updateFunctions.push((delta) => {
      TweenUpdateFunc();
    });
  }

  update(): void {
    requestAnimationFrame(this.update.bind(this));
    const time = performance.now()
    this.delta = (time - this.prevTime) / 1000;

    for (let updateFun of this.updateFunctions) {
      updateFun(this.delta);
    }

    this.prevTime = time;
    this.renderer.render(this.scene, this.camera);
  }

  loadModel() {
    const loader = new GLTFLoader();

    loader.load("assets/models/house/scene.gltf", (result) => {
      result.scene.traverse((obj: Object3D) => {
        if (!(obj as any).isMesh) {
          return;
        }
        else {
          this.modelObjects.push(obj);
          inspectModel(obj as Mesh, this.scene)
        }
      })
      this.scene.add(result.scene);
    })

    loader.load("assets/models/rollup/scene.gltf", (result) => {
      result.scene.traverse((obj: Object3D) => {
        if (!(obj as any).isMesh) {
          return;
        }
        else {
          this.modelObjects.push(obj);
          if (['Object_2'].includes(obj.name)) {
            const t = new TextureLoader();
            const txt = t.load('assets/materials/misa-banner.png');
            txt.encoding = THREE.sRGBEncoding;
            // txt.flipY = false;
            const mat = new MeshBasicMaterial({map: txt, side: THREE.DoubleSide});
            (obj as any).material = mat;
          }

          if (['Object_5', 'Object_4'].includes(obj.name)) {
            (obj as Mesh<any, MeshStandardMaterial>).material.metalness = 0.8;
            (obj as Mesh<any, MeshStandardMaterial>).material.roughness = 0;
            (obj as Mesh<any, MeshStandardMaterial>).material.map = materialDefault.hdrEquirect;
            (obj as Mesh<any, MeshStandardMaterial>).material.needsUpdate = true;
          }
        }
      })
      result.scene.scale.set(0.7, 0.7, 0.7);
      result.scene.rotation.y = Math.PI/2;
      result.scene.position.x = -5;
      this.scene.add(result.scene);
    })
  }


  setOrbitalControls() {
    this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControl.enableDamping = true;
    this.orbitControl.enableZoom = true;
    this.orbitControl.enablePan = true;
    this.orbitControl.update();
    this.orbitControl.enabled = this.enableOrbitControls;
    this.updateFunctions.push(() => {
      this.orbitControl.update();
    });
  }

  setupLight() {
    const ambientLight = new AmbientLight(0xFFFFFF, 0);
    this.scene.add(ambientLight);

   
    const intensity = {intensity: 0};
    new Tween(intensity)
    .to({intensity: 1})
    .onUpdate(({ intensity }) => {
      ambientLight.intensity = intensity;
    })
    .onComplete(() => {
      [{x: 15.046367094804719, y: 4, z: 3}].forEach(({x, y, z}) => {
        const pointLight = new PointLight(0xFFFFFF, 0.4);
        pointLight.position.set(x, y, z);
        this.scene.add(pointLight);
      })
    })
    .easing(Easing.Exponential.In)
    .duration(3000)
    .start();
  }

  //#region Events

  initEvent(): void {
    this.container.addEventListener("click", this.onWindowClick.bind(this));
    this.container.addEventListener("dblclick", this.onWindowDblClick.bind(this));
    this.container.addEventListener("tap", this.onWindowClick.bind(this));
    document.addEventListener('pointerdown', this.onPointerDown.bind(this), { passive: false });
    document.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    document.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: false });
    document.addEventListener('touchmove', (event) => {this.lastMove = event});
    window.addEventListener('resize', this.onWindowsResize.bind(this));

    fromEvent(this.container, 'mousemove').pipe(
     debounceTime(1),
     filter(() => !this.isIntercationLocked)
    ).subscribe((event) => {
      this.onMouseMove(event);
    })
  }

  onWindowsResize() {
      const fov = window.innerHeight * 75 / 935;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onWindowClick(event: any) {
    if (event.touches) {
      event = event.touches[0]
    }
    const isDragged = !isEqual(event.pageX, this.startX, 3) || !isEqual(event.pageY, this.startY, 3);
    if (isDragged) return;
    let intersections = this.getIntersection(event);
    if (intersections[0]) {
      const obj = intersections[0].object;

      if (GROUND.includes(obj.name)) {
        if (this.orbitControl.enabled) {
          this.longitude = - (THREE.MathUtils.radToDeg(this.orbitControl.getAzimuthalAngle()) + 90);
          this.onWindowsResize();
        }
        this.orbitControl.enabled = false;
        this.orbitControl.autoRotate = false;

        // this.targetedByControl = "";
        const from = {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
        }
        const to = {
          x: intersections[0].point.x,
          z: intersections[0].point.z,
          y: 2
        }
        const dx = Math.abs(from.x - to.x);
        const dz = Math.abs(from.z - to.z);
        const disptance = Math.sqrt(dx*dx + dz*dz);
        new Tween(from)
          .to(to)
          .onUpdate(({ x, y, z }) => {
            this.camera.position.x = x;
            this.camera.position.y = y;
            this.camera.position.z = z;
          })
          .easing(Easing.Quartic.In)
          .duration(200 * disptance)
          .start();
      } else {
        console.log(obj, intersections[0].point);
      }
    }
  }

  onWindowDblClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  onMouseMove(event: any) {
    if (this.isUserInteracting) return;
    let intersections = this.getIntersection(event);
    if (intersections[0]) {
      const obj = intersections[0].object;
      console.log('name', obj.name);
      if ([''].includes((obj as any).name) && intersections[0].point.y < -1) {
        // this.referencePosition.visible = true;
        // this.referencePosition.position.y = intersections[0].point.y + 0.1;
      } else {
        // this.referencePosition.visible = false;
      }
      // this.referencePosition.position.x = intersections[0].point.x;
      // this.referencePosition.position.z = intersections[0].point.z;
    }
  }


  onTouchStart(event: any) {
    this.lastMove = event;
    if (event.target instanceof HTMLCanvasElement) event.preventDefault()
    this.onPointerDown(event.touches[0], true);
  }

  onTouchEnd() {
    if (this.lastMove?.target instanceof HTMLCanvasElement) this.lastMove.preventDefault()
    this.onWindowClick(this.lastMove.touches[0]);
  }

  onPointerDown(event: any, onMobile = false) {
    if (event.isPrimary === false || this.isIntercationLocked || this.isCameraLocked) return;
    this.startX = event.pageX;
    this.startY = event.pageY;
    this.isUserInteracting = true;

    this.onPointerDownMouseX = event.clientX;
    this.onPointerDownMouseY = event.clientY;

    this.onPointerDownLon = this.longitude;
    this.onPointerDownLat = this.latitude;
    if (!onMobile) {
      document.addEventListener('pointermove', this.onPointerMove.bind(this), { passive: false });
      document.addEventListener('pointerup', this.onPointerUp.bind(this), { passive: false });
    } else {
      document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
      document.addEventListener('touchend', this.onPointerUp.bind(this), { passive: false });
    }

  }

  onTouchMove(event: any) {
    event.preventDefault()
    event = event.touches[0];
    this.onPointerMove(event);
  }

  onPointerMove(event: any) {
    if (event.isPrimary === false || this.isUserInteracting === false || this.isIntercationLocked || this.isCameraLocked) return;
    this.dragged = true;
    this.longitude = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
    this.latitude = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
  }

  onPointerUp(event: any) {
    if (this.isIntercationLocked || this.isCameraLocked) return;
    this.isUserInteracting = false;
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }
  //#endregion

  getIntersection(event: any) {
    const mouse = { x: 0, y: 0 };
    mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 -
      1;
    mouse.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 +
      1;
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects: any = this.raycaster.intersectObjects(
      this.modelObjects
    );
    return intersects;
  }

  init360(): void {
    this.latitude = this.theta = this.phi = 0; // Setting camera orientation
    this.longitude = this.defaultLongitude;
    this.updateFunctions.push(() => {
      if (!this.orbitControl.enabled) {
        this.latitude = Math.max(- 85, Math.min(85, this.latitude));
        this.phi = THREE.MathUtils.degToRad(90 - this.latitude);
        this.theta = THREE.MathUtils.degToRad(this.longitude);

        const x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        const y = 100 * Math.cos(this.phi);
        const z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.camera.lookAt(x, y, z);
      }
    })
  }
}