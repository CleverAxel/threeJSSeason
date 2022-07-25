import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { mainScene } from "../main";

export class MainPlatform{
    public readonly widthNHeight = {
        width:8,
        height:0.5
    };

    private grassGeometry = new BoxGeometry(this.widthNHeight.width, this.widthNHeight.height, this.widthNHeight.width);
    public grassMaterial = new MeshStandardMaterial({color:0x94c26e});
    public grassMesh = new Mesh(this.grassGeometry, this.grassMaterial);

    private groundGeometry = new BoxGeometry(this.widthNHeight.width-1, this.widthNHeight.height * 2, this.widthNHeight.width-1);
    private groundMaterial = new MeshStandardMaterial({color:0x614418});
    public groundMesh = new Mesh(this.groundGeometry, this.groundMaterial);
    constructor(){
        this.init();
    }

    private init(){
        this.grassMaterial.color.convertSRGBToLinear();
        this.grassMesh.castShadow = true;
        this.grassMesh.receiveShadow = true;

        this.groundMaterial.color.convertSRGBToLinear();
        this.groundMesh.receiveShadow = true;
        this.groundMesh.position.y = -this.widthNHeight.height;
    }

    public addPlatformToScene(){
        mainScene.scene.add(this.grassMesh, this.groundMesh);
    }
}