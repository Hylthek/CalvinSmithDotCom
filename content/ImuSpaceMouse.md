---
title: Space Mouse Project
toc: false
---
<!-- markdownlint-disable MD033 -->

<style>
.model-viewer {
    margin: 0 auto;
    width: 100%;
    height: 500px;
    border: dashed 1px;
    flex: 1;
}
.caption {
    font-style: italic;
    text-align: center;
    font-size: small;
}
main {
    text-align: justify;
}
.image {
    width: 100%;
}
h2 {
    text-align: center;
}
.model-viewer-flex-container {
    display:flex;
    margin: 0;
}
@media (max-width: 768px) {
    /* Styles for screens smaller than medium (md) */
    .model-viewer-flex-container {
        flex-direction: column;
        width: 100%;
        height: 500px;
    }
}
</style>

<img class="image" src="/ImuMouse/hand_tracker_demo.gif" alt="_" ></img>
<p class="caption">HandTracker being used to control a Cirrus Vision SF50 in X-Plane.</p>

## Overview

HandTracker is an open-source 3D mouse designed for use in CAD software and games. It has 6 degrees of freedom (DoF). It functions like a regular mouse when flat on the table, but when you lift and rotate its top shell you can, for example, control the orientation of 3D objects or viewpoints. It is built around the RP2040 microcontroller, an optical tracking sensor, and an Inertial Measurement Unit (IMU).

<img class="image" src="/ImuMouse/MousePhotos.png" alt="_" ></img>
<p class="caption">Some close-ups of the hardware.</p>

## Purpose

HandTracker was created because current 3D mice (such as the SpaceMouse product line by 3Dconnexion) control position relatively, like a joystick, rather than absolutely, like a computer mouse. The sensitivity of a relative controller can either be on the slower side or the faster side. If the user wants maximum speed as well as maximum precision, they are out of luck. Absolute control, on the other hand, allows the user to build intuitions about how rapid positional changes relate to cursor movements, allowing them to opt for speedy control without sacrificing precision by increasing sensitivity.

<div class="image" style="display:flex; margin: 0 auto;">
    <img style="flex:3; min-width:0;" src="/ImuMouse/ImuMouseSchematic.png" alt="_" ></img>
    <img style="flex:1; min-width:0;" src="/ImuMouse/ImuMouseLayout.png" alt="_" ></img>
</div>
<p class="caption">Circuit board schematics and layouts.</p>

## Approach

A major goal of the project was to have a 3D mouse that functions just as well as a normal computer mouse. One major roadblock to this was IMU integral drift. Affordable IMUs are noisy. They measure linear acceleration and angular velocity, and when those values are integrated to obtain position and rotation, a drift over time (integral drift) is observed. If we used IMUs to replace the standard optical sensors found in mice, the cursor would quickly drift to the edges of the screen. A standard optical sensor was used to eliminate drift in two linear DoFs (left-right & front-back), leaving four more DoFs with integral drift. To eliminate drift in roll and pitch measurements, the direction of gravitational acceleration was obtained from the IMU and then used to correct drift. For the last two DoFs, future work could involve using magnetometers to correct yaw drift, and lidar to correct up-down drift.

<p style="text-align:center;">
    LMB: Rotate&emsp;RMB: Pan&emsp;Scroll: Zoom
</p>
<div class="model-viewer-flex-container">
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
    <model-viewer class="model-viewer" src="/ImuMouse/Mouse.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="/ImuMouse/Hourglass.png" shadow-intensity="1" exposure="0.3"> </model-viewer>
    <model-viewer class="model-viewer" src="/ImuMouse/ExplodedMouse.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="/ImuMouse/Hourglass.png" shadow-intensity="1" exposure="0.3"> </model-viewer>
</div>
