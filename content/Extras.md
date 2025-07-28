---
title: 'Extras'
---
<!-- markdownlint-disable MD033 -->

<div style= "font-style: italic; text-align: center; font-size: small;">

![img](/Extras/image.png)
This is the debug information output by FindStepoverPoints() (AKA, FSP), a function which I spent a very long time battling with.

![img](/Extras/image%20(2).png)
This is all the debug information rendered during a full toolpath generation. Every small step forward uses FSP. Clearly, FSP needs to run quickly. Does it? *no.*

![img](/Extras/image%20(3).png)
This is some more FSP debug information. It shows the valid band of vertices that should be distance-checked. Without this optimization, {insert_name_of_my_software} has no hope of breaking medical frontiers.

![img](/Extras/image%20(4).png)
Here is an attempt at rectilinear toolpathing. Unfortunately, the procedural nature of the algorithm increases instability and creates these banana shapes.

![img](/Extras/image%20(5).png)
If I move from 3D space into UV space, it becomes a lot easier to simple squeeze each toolpath into a line. This would create a stabilizing affect. A algorithmic homeostatis, if you will. Anyway, thats what I did.

![img](/Extras/image%20(6).png)
Heres what it looks like in 3D space. A drawback of doing it this way is that "straight" can be non-straight given a warped surface. I try not to think about that.

![img](/Extras/image%20(8).png)
Heres a before...

![img](/Extras/image%20(7).png)
...and an after.

![img](/Extras/image%20(9).png)
And here's a cool combination of concentric and rectilinear toolpaths. Reminded me of the Black Mesa logo.

![img](/Extras/image%20(10).png)
Another cool shape.

![img](/Extras/image%20(11).png)
Heres what my plots looked like before I realized I'm not a business major (Excel -> MATLAB). This one in particular took me a couple of hours to format.

![img](/Extras/Figure_Workflow%20(1).png)
Heres a previous version of my flowchart. Yea...

</div>
