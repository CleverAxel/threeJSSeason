import { AnimationClip, VectorKeyframeTrack } from "three";

export class BarbecueAnimation{
    public static scaleBarbecueKF = new VectorKeyframeTrack(
        '.scale',
        [0, 0.5, 0.6, 0.63],
        [
            0, 0, 0,
            0.35,0.35,0.35,
            0.37, 0.37, 0.37,
            0.35,0.35,0.35,
        ],
    );
    public static barbecueAppearsClip = new AnimationClip('opacityBeeAppears', -1, [this.scaleBarbecueKF]);
}