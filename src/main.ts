import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Barbecue } from "./Barbecue/BarbecueClass";
import { Bee } from "./Bee/BeeClass";
import { PathCurve } from "./CurvePath/PathCurveClass";
import { Flower } from "./Flower/FlowerClass";

import { MainPlatform } from "./MainPlatform/MainPlatformClass";
import { MainScene } from "./MainScene/MainSceneClass";
import { SeasonHandler } from "./SeasonHandler/SeasonHandlerClass";
import { AnimationService } from "./Services/AnimationService";
import { GLTFService } from './Services/GLTFService';
import { Tombstone } from "./Tombstone/TombstoneClass";
import { Tree } from './Tree/TreeClass';
const CONTAINER = document.getElementById("container") as HTMLDivElement;

let leaveMesh = await GLTFService.LoadGLTF("/leaveTree.glb");
let logMesh = await GLTFService.LoadGLTF("/logTree.glb");
let flowerMesh = await GLTFService.LoadGLTF("/flower.glb", true);
let beeMesh = await GLTFService.LoadGLTF("/bee.glb", true);
let barbecueMesh = await GLTFService.LoadGLTF("/barbecue.glb", true);
let tombstoneMesh = await GLTFService.LoadGLTF("/tombstone.glb", true);
export const seasonHandler = new SeasonHandler();
export const mainScene = new MainScene();
export const pathCurve = new PathCurve();
mainScene.scene.add(pathCurve.mesh)

export let bee = new Bee(beeMesh);
mainScene.scene.add(bee.mesh);

export let barbecue = new Barbecue(barbecueMesh);
mainScene.scene.add(barbecue.mesh);

export let tombstone = new Tombstone(tombstoneMesh);
mainScene.scene.add(tombstone.mesh);

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
    mainScene.scene.add(flower.mesh);
})

export const mainPlatform = new MainPlatform();
mainPlatform.addPlatformToScene();

const controls = new OrbitControls( mainScene.camera, mainScene.renderer.domElement );
controls.update();

const clock = new THREE.Clock();

CONTAINER.appendChild(mainScene.renderer.domElement);

animate(0);
function animate(time:DOMHighResTimeStamp){
    if(pathCurve.canAnimateMesh){
        pathCurve.moveMeshAlongPath(time);
    }

    let delta = clock.getDelta();
    if(AnimationService.animationMixers.length != 0){
        AnimationService.animationMixers.forEach(mixer => {
            mixer.update(delta);
        });
    }

    if(barbecue.canAnimateSmoke){
        barbecue.animateSmoke(delta);
        
    }
    mainScene.renderer.render(mainScene.scene, mainScene.camera);
    requestAnimationFrame(animate);
}

function GetRandomLocation(max:number, min:number){
    return (Math.floor(Math.random() * (max - min) ) + min) + ((Math.floor(Math.random() * (100 - 1) ) + 1) / 100);
}