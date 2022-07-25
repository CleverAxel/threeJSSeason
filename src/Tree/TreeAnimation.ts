import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack } from "three";

export class TreeAnimation{
    public static positionLeaveKF = new VectorKeyframeTrack(
        '.position',
        [0, 0.6, 0.65, 0.75],
        [
            0, 15, 0, 
            0, 0, 0,
            0, 0.8, 0,
            0, 0, 0
        ],
    );

    public static opacityLeaveKF = new NumberKeyframeTrack(
        '.material.opacity', 
        [0, 0.4], 
        [0, 1]
    ); 
    public static moveLeaveClip = new AnimationClip('moveLeaveAndAppear', -1, [this.positionLeaveKF, this.opacityLeaveKF]);
}