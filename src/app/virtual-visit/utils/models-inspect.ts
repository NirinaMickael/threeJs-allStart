import { Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader } from "three";
import materialDefault from "./Materials";
import * as THREE from 'three';

export const inspectModel = (obj: Mesh<any, any>, scene?: THREE.Scene) => {
  if (['Floor_00_Material_#1127_0'].includes(obj.name)) {
    // const gui = new GUI();
    // const folder = gui.addFolder('Mat Floor');
    // folder.add(obj.material, 'metalness', 0, 1);
    // folder.add(obj.material, 'roughness', 0, 1);
    const plane = new PlaneGeometry(12, 12, 16);


   
    (obj.material ) = materialDefault.tileMat;
  }

  if (['Hand_Rail_Stair_Glass_Glass_0'].includes(obj.name)) {
    obj.material = materialDefault.glassMaterial;
  }

  if (obj.name.includes('Art_Work')) {
    const prevMaterial = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
    (obj as THREE.Mesh).material = new THREE.MeshStandardMaterial();
    THREE.MeshStandardMaterial.prototype.copy.call((obj as THREE.Mesh).material, prevMaterial);
  }

  if (obj.name.startsWith('Light')) {
    // (obj as THREE.Mesh).material = new THREE.MeshBasicMaterial({
    //   color: 0xEE0000
    // });
  }

  if (['Window_Metal_01_0'].includes(obj.name)) {
    console.log('window mat', obj);
    (obj as Mesh<any, any>).material.envMap = materialDefault.hdrEquirect;
  }

};
