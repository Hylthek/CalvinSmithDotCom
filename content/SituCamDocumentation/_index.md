---
date: 0
title: 'SituCamDocumentation'
---
<!-- markdownlint-disable no-empty-links -->

{{< callout type="warning" >}}
  SituCAM documentation is a work-in-progress.
{{< /callout >}}

[Startup Instructions](./1_StartupInstructions)  
Instructions for how to setup the Meta Quest 3 and run the Unity project.

[BsplineManager.cs](./BsplineManager)  
Stores control point locations and contains functions to calculate basis-surface points.

[BSurfaceGcodeGenerator.cs](./BSurfaceGcodeGenerator)  
Defines functions that allow for procedural toolpathing along a basis-surface.

[BSurfaceMeshHandler.cs](./BSurfaceMeshHandler)  
Creates the mesh of the basis surface.

[CallFitSurfaceToDrawing.cs](./CallFitSurfaceToDrawing)  
Turns a ray interaction into one of two function call.

[CallLiveControlToggle.cs](./CallLiveControlToggle)  
Turns a ray interaction into a function call.

[CallToggleDrawingMode.cs](./CallToggleDrawingMode)  
Turns a ray interaction into a function call.

[CallToggleToolpathingMode.cs](./CallToggleToolpathingMode)  
Turns a ray interaction into a function call.

[ConformalToolpathingManager.cs](./ConformalToolpathingManager)  
Handles main logic for toolpathing UI.

[ConformalToolpathingModeManager.cs](./ConformalToolpathingModeManager)  
Contains public function to toggle toolpathing UI active state.

[ControlPolygonLineManager.cs](./ControlPolygonLineManager)  
Renders control polygon for basis-surface.

[ControlPolygonLiquifyToolManager.cs](./ControlPolygonLiquifyToolManager)  
Handles logic for basis-surface liquify tool.

[DeleteAtPoint.cs](./DeleteAtPoint)  
Handles logic for deleting toolpath vertices.

[DisableOnStart.cs](./DisableOnStart)  
Self explanatory.

[DrawingHandler.cs](./DrawingHandler)  
Main logic for loop-drawing UI.

[DrawingModeHandler.cs](./DrawingModeHandler)  
Contains public function to toggle loop-drawing UI active state.

[EnableOnButtonTimed.cs](./EnableOnButtonTimed)  
Handles enabling of scripts for a duration after a button press.

[FollowClosestToolpath.cs](./FollowClosestToolpath)  
Makes a GameObject move to a vertex on the toolpath that is the closest point to a target.

[GenerateConcentricToolpath.cs](./GenerateConcentricToolpath)  
Turns a ray interaction into a variable increment.

[GenerateRectilinearToolpath.cs](./GenerateRectilinearToolpath)  
Turns a ray interaction into a variable increment.

[LiveControlGcodeSender.cs](./LiveControlGcodeSender)  
Reads transform of virtual end-effector and makes calls to UnityTcpClient.

[LiveControlManipulationHandler.cs](./LiveControlManipulationHandler)  
Handles movement of virtual end-effector via controller input.

[MoveJaws.cs](./MoveJaws)  
Handles movement of end-effector jaw visuals.

[Pointer.cs](./Pointer)  
Contains one reference to a GameObject.

[PressedButtonMovement.cs](./PressedButtonMovement)  
Moves a button when that button is pressed.

[RayGrabbing.cs](./RayGrabbing)  
Allows a GameObject to be grabbed and moved by a controller.

[SurfaceFittingManager.cs](./SurfaceFittingManager)  
Contains algorithms for fitting a basis-surface to a loop heuristically and with least-squares optimization.

[UnityTcpClient.cs](./UnityTcpClient)  
Establishes a TCP connection through an IP address and contains a function to send strings over the connection.
