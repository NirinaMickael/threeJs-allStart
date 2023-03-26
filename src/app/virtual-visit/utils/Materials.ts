import { MeshPhysicalMaterial, MeshStandardMaterial, Texture, TextureLoader } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import * as THREE from 'three';

export class MaterialsDefault {

  public glassMaterial!: MeshPhysicalMaterial;
  public hdrEquirect!: Texture;
  tileMat!: MeshStandardMaterial;
  constructor() {
    this.setGlassMaterial();
    this.setTileMaterial();
  }

  setGlassMaterial() {
      this.hdrEquirect = new RGBELoader().load(
        "assets/env/pursky.hdr",  
        () => { 
          this.hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        }
      );
      this.glassMaterial = new MeshPhysicalMaterial({
        roughness: 0,
        transmission: 1,
        thickness: 0,
        envMap: this.hdrEquirect
      } as any);
  }


  setTileMaterial() {
    const textureLoader = new TextureLoader();
    const materialPath = 'assets/materials/vintage-tile/vintage-tile1';
    const map = textureLoader.load(`${materialPath}_albedo.png`);
    const aoMap = textureLoader.load(`${materialPath}_ao.png`);
    const normalMap = textureLoader.load(`${materialPath}_normal-ogl.png`);
    const metalnessMap = textureLoader.load(`${materialPath}_metallic.png`);
    const roughnessMap = textureLoader.load(`${materialPath}_roughness.png`);
    const displacementMap = textureLoader.load(`${materialPath}_height.png`);
    
    [map, aoMap, normalMap, metalnessMap, roughnessMap, displacementMap].forEach(t => {
      t.encoding = THREE.sRGBEncoding;
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      // t.repeat.set(2, 2);
    })  
    this.tileMat = new MeshStandardMaterial({
      map,
      aoMap,
      normalMap,
      metalnessMap,
      roughnessMap,
      displacementMap,
    });
  }
}

export default new MaterialsDefault();