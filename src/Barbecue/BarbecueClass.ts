import { AnimationMixer, MathUtils, Mesh } from "three";
import { AnimationService } from "../Services/AnimationService";
import { BarbecueAnimation } from "./BarbecueAnimation";

export class Barbecue{
    public mesh:Mesh;

    constructor(barbMesh:Mesh){
        this.mesh = barbMesh;
        this.mesh.scale.set(0.35,0.35,0.35);
        this.mesh.position.set(-0.2, 0.2, -0.4);
        this.mesh.rotation.y = MathUtils.degToRad(25);
        this.mesh.visible = false;
    }

    animateBarbecueAppears(){
        if(this.mesh.visible == false){
            this.mesh.scale.set(0,0,0);
            this.mesh.visible = true;
            const mixer = new AnimationMixer(this.mesh);
            AnimationService.animationActions.push(mixer.clipAction(BarbecueAnimation.barbecueAppearsClip));
        }
    }
}