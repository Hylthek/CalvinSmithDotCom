---
title: 'Extras'
---
<!-- markdownlint-disable MD033 -->

<div style= "font-style: italic; text-align: center; font-size: small;">

![img](/Extras/image.png)
This is some debug information output by FindStepoverPoints() (AKA, FSP), a function which I spent a very long time battling with.

![img](/Extras/image%20(2).png)
This is all the debug information rendered during a full toolpath generation. Every small step forward uses FSP. Clearly, FSP needs to run quickly. Does it? *Not currently.*

![img](/Extras/image%20(3).png)
This is some more FSP debug information. It shows the valid band of vertices that should be distance-checked. Without this optimization, SituCAM has no hope of functioning in real-time. Possibly, this function can instead be implemented with a compute shader.

![img](/Extras/image%20(4).png)
Here is an attempt at rectilinear toolpathing. Unfortunately, the procedural nature of the algorithm increases instability and creates these banana shapes.

![img](/Extras/image%20(5).png)
If I move from 3D space into UV space, it becomes a lot easier to simply squeeze each toolpath into a line. This would create a stabilizing effect that prevents the banana shapes.

![img](/Extras/image%20(6).png)
Heres what it looks like in 3D space. A drawback of doing it this way is that if you're given a warped surface, straight in UV space can be non-straight in 3D space.

![img](/Extras/image%20(8).png)
Heres a before...

![img](/Extras/image%20(7).png)
...and an after.

![img](/Extras/image%20(9).png)
And here's a cool combination of concentric and rectilinear toolpaths.

![img](/Extras/image%20(10).png)
Another cool shape.

![img](/Extras/image%20(11).png)
Heres what my plots looked like when I made them in Excel. It turns out MATLAB is infinitely better for making plots.

![img](/Extras/Figure_Workflow%20(1).png)
Heres a previous version of my flowchart that was slightly confusing.

</div>
