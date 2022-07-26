import { barbecue, bee, flowers, trees } from "../main";
import { AnimationService } from "../Services/AnimationService";

export class SeasonHandler{
    private readonly buttons = document.querySelectorAll<HTMLButtonElement>(".containerButtons > button");
    public seasonChoosed?:season;
    private isOnScene = {
        leave:false,
        flower:false,
        bee:false,
        barbecue:false,
    }
    constructor(){
        this.init();
    }

    private init(){
        if(this.buttons){
            for(let i = 0; i < this.buttons.length; i++){
                this.buttons[i].addEventListener("click", () => {
                    if(i == 0){
                        if(this.seasonChoosed != season.spring){
                            this.seasonChoosed = season.spring;
                            this.startSpring();
                        }
                    }
                    else if(i == 1){
                        if(this.seasonChoosed != season.summer){
                            this.seasonChoosed = season.summer;
                            this.startSummer();
                        }
                    }
                    else if(i == 2){
                        this.seasonChoosed = season.autumn;
                    }
                    else if(i == 3){
                        this.seasonChoosed = season.winter;
                    }
                });
            }
        }
    }
    //#region SPRING
    /**********************************
     * First call for spring animation
     **********************************/
    private startSpring(){
        trees.forEach(tree => {
            tree.SpringLeave();
        });
        if(this.isOnScene.flower == false){
            this.MakeFlowersAppearWithAnimation();
            this.isOnScene.flower = true;
        }
        if(this.isOnScene.bee == false){
            bee.animateBeeAppears();
            bee.makeBeeFollowPath();
            this.isOnScene.bee = true;
        }

        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, this.setPropsToFinalPositionForSpring.bind(this));
        this.isOnScene.leave = true;
    }

    /********************************
     * second call for spring animation
     ********************************/
    private setPropsToFinalPositionForSpring(){
        setTimeout(() => {                
            this.SetLeaveToFinalPosition();
            this.SetFlowersToFinalPosition();
            bee.setBeeToFinalState();
        });
    }
    //#endregion



    //#region SUMMER
    /**********************************
     * First call for summer animation
     **********************************/
    private startSummer(){
        trees.forEach(tree => {
            tree.SummerLeave();
        });
        if(this.isOnScene.flower == false){
            this.MakeFlowersAppearWithAnimation();
            this.isOnScene.flower = true;
        }
        if(this.isOnScene.bee){
            bee.animateBeeDisappears();
            this.isOnScene.bee = false;
        }
        if(this.isOnScene.barbecue == false){
            barbecue.animateBarbecueAppears();
            this.isOnScene.barbecue = true;
        }
        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, this.setPropsToFinalPositionForSummer.bind(this));
    }
    /**********************************
     * second call for summer animation
     **********************************/
     private setPropsToFinalPositionForSummer(){
        setTimeout(() => {                
            this.SetLeaveToFinalPosition();
            this.SetFlowersToFinalPosition();
            bee.removeBeeFromScene();
        });
    }
    //#endregion


    private MakeFlowersAppearWithAnimation(){
        flowers.forEach(flower =>{
            flower.animateFlowerAppears();
        });
    }

    private SetFlowersToFinalPosition(){
        flowers.forEach(flower =>{
            flower.setFlowerToFinalPosition();
        });   
    }

    private SetLeaveToFinalPosition(){
        trees.forEach(tree =>{
            tree.setLeaveToFinalPosition();
        });
    }
}

enum season{
    spring,
    summer,
    autumn,
    winter,
}