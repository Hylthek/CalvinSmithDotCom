---
draft: true
title: 'SituCamDocumentation'
---
<!-- markdownlint-disable no-empty-links -->

[BezierSurfaceRenderer.cs](./BezierSurfaceRenderer) - Unused.

[BsplineManager.cs](./BsplineManager) - Stores control point locations and contains functions to calculate basis-surface points.

[BSurfaceGcodeGenerator.cs](./BSurfaceGcodeGenerator) - Defines functions that allow for procedural toolpathing along a basis-surface.

[BsurfaceGridLineManager.cs](./BsurfaceGridLineManager) - Unused.

[BSurfaceMeshHandler.cs](./BSurfaceMeshHandler) - Creates the mesh of the basis surface.

[CallFitSurfaceToDrawing.cs](./CallFitSurfaceToDrawing) - Turns a ray interaction into one of two function call.

[CallGcodeGenerate.cs](./CallGcodeGenerate) - Unused.

[CallGcodePerform.cs](./CallGcodePerform) - Unused.

[CallLiveControlToggle.cs](./CallLiveControlToggle) - Turns a ray interaction into a function call.

[CallToggleDrawingMode.cs](./CallToggleDrawingMode) - Turns a ray interaction into a function call.

[CallToggleToolpathingMode.cs](./CallToggleToolpathingMode) - Turns a ray interaction into a function call.

[ConformalToolpathingManager.cs](./ConformalToolpathingManager) - Handles main logic for toolpathing UI.

[ConformalToolpathingModeManager.cs](./ConformalToolpathingModeManager) - Contains public function to toggle toolpathing UI active state.

[ConnectToolpathNodes.cs](./ConnectToolpathNodes) - Unused.

[ControlPolygonLineManager.cs](./ControlPolygonLineManager) - Renders control polygon for basis-surface.

[ControlPolygonLiquifyToolManager.cs](./ControlPolygonLiquifyToolManager) - Handles logic for basis-surface liquify tool.

[DeleteAtPoint.cs](./DeleteAtPoint) - Handles logic for deleting toolpath vertices.

[DisableOnStart.cs](./DisableOnStart) - Self explanatory.

[DisappearOnStart.cs](./DisappearOnStart) - Unused.

[DrawingHandler.cs](./DrawingHandler) - Main logic for loop-drawing UI.

[DrawingModeHandler.cs](./DrawingModeHandler) - Contains public function to toggle loop-drawing UI active state.

[EnableOnButtonTimed.cs](./EnableOnButtonTimed) - Handles enabling of scripts for a duration after a button press.

[Follow.cs](./Follow) - Unused.

[FollowClosestToolpath.cs](./FollowClosestToolpath) - Makes a GameObject move to a vertex on the toolpath that is the closest point to a target.

[GcodeGenerator.cs](./GcodeGenerator) - Unused.

[GcodePerformer.cs](./GcodePerformer) - Unused.

[GenerateConcentricToolpath.cs](./GenerateConcentricToolpath) - Turns a ray interaction into a variable increment.

[GenerateRectilinearToolpath.cs](./GenerateRectilinearToolpath) - Turns a ray interaction into a variable increment.

[LiveControlGcodeSender.cs](./LiveControlGcodeSender) - Reads transform of virtual end-effector and makes calls to UnityTcpClient.

[LiveControlManipulationHandler.cs](./LiveControlManipulationHandler) - Handles movement of virtual end-effector via controller input.

[MoveHandheldMenu.cs](./MoveHandheldMenu) - Unused.

[MoveJaws.cs](./MoveJaws) - Handles movement of end-effector jaw visuals.

[Pointer.cs](./Pointer) - Contains one reference to a GameObject.

[PressedButtonMovement.cs](./PressedButtonMovement) - Moves a button when that button is pressed.

[RayGrabbing.cs](./RayGrabbing) - Allows a GameObject to be grabbed and moved by a controller.

[RenderBezierCurve.cs](./RenderBezierCurve) - Unused.

[SurfaceFittingManager.cs](./SurfaceFittingManager) - Contains algorithms for fitting a basis-surface to a loop heuristically and with least-squares optimization.

[UnityTcpClient.cs](./UnityTcpClient) - Establishes a TCP connection through an IP address and contains a function to send strings over the connection.
