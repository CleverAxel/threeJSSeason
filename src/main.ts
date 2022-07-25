import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Flower } from "./Flower/FlowerClass";

import { MainPlatform } from "./MainPlatform/MainPlatformClass";
import { MainScene } from "./MainScene/MainSceneClass";
import { SeasonHandler } from "./SeasonHandler/SeasonHandlerClass";
import { AnimationService } from "./Services/AnimationService";
import { GLTFService } from './Services/GLTFService';
import { Tree } from './Tree/TreeClass';
const CONTAINER = document.getElementById("container") as HTMLDivElement;

let leaveMesh = await GLTFService.LoadGLTF("/leaveTree.glb");
let logMesh = await GLTFService.LoadGLTF("/logTree.glb");
let flowerMesh = await GLTFService.LoadGLTF("/flower.gltf", true);

export const mainScene = new MainScene();
export const seasonHandler = new SeasonHandler();
export let trees = [
    new Tree(logMesh.clone(), leaveMesh.clone(), {vector:new THREE.Vector3(-1.7, -0.2, -2), rotationY : 0}),
    new Tree(logMesh.clone(), leaveMesh.clone(), {vector:new THREE.Vector3(-2, -0.5 , 2), rotationY : 90}),
    new Tree(logMesh.clone(), leaveMesh.clone(), {vector:new THREE.Vector3(2.8, 0, 0.7), rotationY : 180}),
];
trees.forEach(tree => {
    mainScene.scene.add(tree.mainMesh);
})

export let flowers = [
    new Flower(flowerMesh.clone(), 0.2, {
        vector: new THREE.Vector3(GetRandomLocation(4,-4), 0.15, GetRandomLocation(4,-4)),
        rotationY : Math.floor(Math.random() * 181 )
    }),
    new Flower(flowerMesh.clone(), 0.2, {
        vector: new THREE.Vector3(GetRandomLocation(4,-4), 0.15, GetRandomLocation(4,-4)),
        rotationY : Math.floor(Math.random() * 181 )
    }),
    new Flower(flowerMesh.clone(), 0.2, {
        vector: new THREE.Vector3(GetRandomLocation(4,-4), 0.15, GetRandomLocation(4,-4)),
        rotationY : Math.floor(Math.random() * 181 )
    }),
];
flowers.forEach(flower => {
    mainScene.scene.add(flower.mainMesh);
})

const mainPlatform = new MainPlatform();
mainPlatform.addPlatformToScene();

const controls = new OrbitControls( mainScene.camera, mainScene.renderer.domElement );
controls.update();

const clock = new THREE.Clock();

CONTAINER.appendChild(mainScene.renderer.domElement);

animate();
function animate(){
    let delta = clock.getDelta();
    if(AnimationService.animationMixers.length != 0){
        AnimationService.animationMixers.forEach(mixer => {
            mixer.update(delta);
        });
    }
    mainScene.renderer.render(mainScene.scene, mainScene.camera);
    requestAnimationFrame(animate);
}

function GetRandomLocation(max:number, min:number){
    return (Math.floor(Math.random() * (max - min) ) + min) + ((Math.floor(Math.random() * (100 - 1) ) + 1) / 100);
}