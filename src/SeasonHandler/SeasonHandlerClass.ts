import { flowers, trees } from "../main";
import { AnimationService } from "../Services/AnimationService";

export class SeasonHandler{
    private readonly buttons = document.querySelectorAll<HTMLButtonElement>(".containerButtons > button");
    public seasonChoosed?:season;
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
                        this.seasonChoosed = season.summer;
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
    private startSpring(){
        AnimationService.animationInAction = true;

        //SECOND CALL
        const callFlowersSpring = () => {
            //when leaves are there call flower
            flowers.forEach(flower =>{
                flower.animateFlowerSpring();
            });
            
            AnimationService.GetAnimationMixerFromAction();
            AnimationService.PlayAnimation(true, this.setPropsToFinalPositionSpring);
        }

        //FIRST CALL
        trees.forEach(tree => {
            tree.animateLeaveSpring();
        });
        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, callFlowersSpring);
    }

    //THIRD CALL OR FINAL CALL
    public setPropsToFinalPositionSpring(){
        setTimeout(() => {                
            trees.forEach(tree =>{
                tree.setLeaveToFinalPosition();
            });

            flowers.forEach(flower =>{
                flower.setFlowerToFinalPosition();
            });
            AnimationService.animationInAction = false;
        });
    }
    //#endregion
}

enum season{
    spring,
    summer,
    autumn,
    winter,
}