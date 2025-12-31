class ScenePerspective {
    constructor() {
        console.error("This is a static class and should not be instantiated.")
    }
    static vanishing_point = [0.5 * kW, 0.2 * kH]
    static scene_depth = 0.45

    static GetScenePoints() {
        return [
            [ScenePerspective.vanishing_point[0] * ScenePerspective.scene_depth, ScenePerspective.vanishing_point[1] * ScenePerspective.scene_depth],
            [kW - ScenePerspective.vanishing_point[0] * ScenePerspective.scene_depth, ScenePerspective.vanishing_point[1] * ScenePerspective.scene_depth],
            [ScenePerspective.vanishing_point[0] * ScenePerspective.scene_depth, kH - (kH - ScenePerspective.vanishing_point[1]) * ScenePerspective.scene_depth],
            [kW - ScenePerspective.vanishing_point[0] * ScenePerspective.scene_depth, kH - (kH - ScenePerspective.vanishing_point[1]) * ScenePerspective.scene_depth]
        ]
    }
}