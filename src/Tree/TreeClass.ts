import { AnimationMixer, Box3, Color, MathUtils, Mesh, MeshStandardMaterial } from "three";
import { IVector3NRotationY } from "../Interface/IVector3NRotationY";
import { AnimationService } from "../Services/AnimationService";
import { LeaveAutumnClass } from "./LeaveAutumn/LeaveAutumnClass";
import { TreeAnimation } from "./TreeAnimation";

const colorLeave = {
    spring: new Color(0x80de54),
    summer: new Color(0x5f9e41),
    autumn: new Color(0xcca956)
}

export class Tree{
    public mainMesh = new Mesh();
    public logMesh:Mesh;
    public leaveMesh:Mesh;

    public logMaterial = new MeshStandardMaterial();
    public leaveMaterial = new MeshStandardMaterial();
    public leaveBoundingBox = new Box3();

    public leaveAutumn:LeaveAutumnClass;

    constructor(logMesh:Mesh, leaveMesh:Mesh, position?:IVector3NRotationY){
        this.logMesh = logMesh;
        this.leaveMesh = leaveMesh;

        logMesh.material = this.logMaterial;
        leaveMesh.material = this.leaveMaterial;
        this.logMaterial.color.set(0x856c51).convertSRGBToLinear();
        this.leaveMaterial.color.set(colorLeave.spring).convertSRGBToLinear();
        this.leaveMaterial.transparent = true;
        this.leaveMesh.visible = false;

        if(position){
            this.mainMesh.position.set(position.vector.x, position.vector.y, position.vector.z);
            this.mainMesh.rotation.y = MathUtils.degToRad(position.rotationY);
        }
        this.mainMesh.add(logMesh, leaveMesh);
        this.getLeaveBoudingBox();
        this.leaveAutumn = new LeaveAutumnClass(this.leaveBoundingBox)
    }

    SpringLeave(){
        if(this.leaveMesh.visible == false){
            this.animateLeaveFall();
            this.leaveMaterial.color.set(colorLeave.spring).convertSRGBToLinear();
        }else{
            this.lerpColorLeave(0.15, colorLeave.spring);
        }
        this.leaveAutumn.mesh.visible = false;
    }

    SummerLeave(){
        if(this.leaveMesh.visible == false){
            this.animateLeaveFall();
            this.leaveMaterial.color.set(colorLeave.summer).convertSRGBToLinear();
        }else{
        //this.leaveMaterial.color.set(colorLeave.summer).convertSRGBToLinear();
            this.lerpColorLeave(0.15, colorLeave.summer);
        }
        this.leaveAutumn.mesh.visible = false;
    }

    AutumnLeave(){
        if(this.leaveMesh.visible == false){
            this.animateLeaveFall();
            this.leaveMaterial.color.set(colorLeave.autumn).convertSRGBToLinear();
        }else{
        //this.leaveMaterial.color.set(colorLeave.summer).convertSRGBToLinear();
            this.lerpColorLeave(0.15, colorLeave.autumn);
        }
        this.leaveAutumn.mesh.visible = true;
    }

    private lerpColorLeave(speed:number, colorToLerp:Color){
        let alpha = 0;
        let oldColor = this.leaveMaterial.color.clone();
        let id = setInterval(() => {
            alpha += speed;
            this.leaveMaterial.color.lerpColors(oldColor, colorToLerp, alpha).convertSRGBToLinear();
            if(alpha > 1){
                clearInterval(id);
            }
        }, 33);
    }

    animateLeaveFall(){
        this.leaveMesh.position.y = 15;
        this.leaveMaterial.opacity = 0;
        this.leaveMesh.visible = true;
        const mixer = new AnimationMixer(this.leaveMesh);
        AnimationService.animationActions.push(mixer.clipAction(TreeAnimation.moveLeaveClip));
    }

    setLeaveToFinalPosition(){
        this.leaveMesh.position.set(0,0,0);
        this.leaveMaterial.opacity = 1;
        this.leaveMesh.visible = true;
    }

    private getLeaveBoudingBox(){
        this.leaveBoundingBox.setFromObject(this.mainMesh);
        this.leaveBoundingBox.max.y -= 1.5;
        this.leaveBoundingBox.min.y += 2;
        this.leaveBoundingBox.max.y = Math.floor(this.leaveBoundingBox.max.y);
        this.leaveBoundingBox.min.y = Math.floor(this.leaveBoundingBox.min.y);
    }

    public makeAutumnLeaveFall(delta:number){
        this.leaveAutumn.makeLeaveFall(delta);
    }


}

