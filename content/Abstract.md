---
title: "Undergraduate Research Abstract"
toc: false
---
<!-- markdownlint-disable MD033 -->
<style>
p {
    text-align: justify;
    margin: 0;
}
.caption {
    font-style: italic;
    text-align: center;
    font-size: small;
}
</style>

<p style="text-align: center; margin: 2rem 0; color: lightgrey;">
    This research abstract was submitted to the 2025 BMES Annual Meeting.
</p>

<hr style="margin: 0 0 24px;">

<h2 style="text-align: center;">Intro</h2>

Minimally invasive in-situ bioprinting is a form of automated robotic surgery that allows for advanced organ repair. Traditionally, the organ is printed in-vitro and transplanted; however, there are drawbacks to this, one being that repair sites may drastically change in the time it takes between printing and transplanting. Existing solutions for robotic surgery include use of the Da Vinci Surgical System with its manual control. Unfortunately, procedures like bioprinting require many precise, repetitive movements, something difficult for a surgeon to perform manually. Additionally, automation would allow a surgeon to focus on the procedure as a whole, instead of on each task individually, increasing safety.

A key aspect of automated robotic surgery is the use of movement commands (toolpaths) that are sent to the robot. Therefore, there is a need for intuitive, real-time development of complex toolpathing for the surgical field, as surgery is unpredictable and time-sensitive. Current solutions involve generating toolpaths in existing computer-aided manufacturing (CAM) software. This process is slow, and generated toolpaths are unalterable.

A computer application is proposed which will allow a surgeon to generate toolpaths in a timely manner, making automated robotic surgery safer. To achieve this, the program must be intuitive, and must run quickly. Additionally, a requirement specific to bioprinting must be met. In bioprinting, the toolpaths output by the application must maintain constant separation; if toolpaths are too far apart, they will not adhere to each other, and if they are too close together, they will overlap and create areas of unwanted material.

<h2 style="text-align: center;">Methods</h2>

Before generating toolpaths, geometry needs to be created to contain those paths. Basis-surfaces (b-surfaces) were used because of their smoothness and interactive simplicity. B-surfaces are mathematically defined surfaces that maintain continuous curvature at every point. Any toolpath generated across a b-surface will, in turn, be smooth, reducing future algorithmic complexity. Moreover, a b-surface is defined by only a small grid of control points. This allows manipulation of the surface to be clutter-free and intuitive (Fig. 1). Manipulation of the surface was implemented through a virtual reality (VR) user interface (UI) because it is an intuitive way to visualize and modify 3D geometry.

![Fig 1](abstract/fig1.png)
<p class="caption">
Figure 1: The basis-surface and its 6x6 grid of control points.
</p>

To maintain workflow simplicity, automatic surface generation is implemented. If a surgeon needs to cover an organic defect quickly, it is desirable to only have to trace a loop around the defect and run an algorithm. Using least-squares optimization, paired with the mathematical nature of b-surfaces, we can instantaneously fit a surface to any closed loop. Additionally, surfaces can be changed and then refit to the loop while retaining their alterations (Fig. 2).

![Fig 2](abstract/fig2.png)
<p class="caption">
Figure 2: Demonstration of loop-fitting and loop-refitting.
</p>

To achieve constant toolpath separation, path generation will be done procedurally, point-by-point, rather than purely mathematically. This achieves our required constant separation, but sacrifices computational speed. To account for this, algorithmic optimizations such as caching and input filtering are used to reduce generation time.

<h2 style="text-align: center;">Results, Conclusions, and Discussions</h2>

The created software demonstrates effortless workflow. Given a virtual tissue defect, a surgeon will only perform a few simple tasks in order to design a toolpath (Fig. 3). This is in contrast to most CAM software, where complex functionality is required to maximize precision, at the cost of simplicity and speed. Moreover, every algorithm except toolpath generation is executed in real-time. A benefit of this is that in the event of a design alteration, a task can be redone without additional delay.

![Fig 3](abstract/fig3.png)
<p class="caption">
Figure 3: Typical workflow performed by user.
</p>

For toolpath generation, runtimes were recorded for two toolpath modes as well as two surface sizes. Four tests were conducted: the generation time for small concentric paths, small rectilinear paths, large concentric paths, and large rectilinear paths. Respective times were 18.5s, 13.5s, 151s, & 106s (Fig. 4). These results show that toolpath generation is not only the slowest part of design, but that computation times grow rapidly as the surface size increases. Although this is not ideal, the process can be greatly optimized. The algorithm currently iterates over all vertices of the toolpath, but the surface could instead be split into chunks, meaning that only a fraction of the toolpath is run. Additionally, compute shaders, programs executed on the GPU instead of the CPU, could run multiple algorithms at the same time.

![Fig 4](abstract/fig4.png)
<p class="caption">
Figure 4: Four toolpathed surfaces and their generation times in the Unity runtime profiler.
</p>

Separation measurements were sampled for concentric and rectilinear toolpaths. Two types of rectilinear toolpaths were sampled: “self-straightening” and “non-straightening”. The target separation was 0.004 units of length. Measurements were plotted on a binned histogram and a kernel density estimation plot (Fig. 5). Although concentric toolpaths outperform the others in stepover precision, they do not provide as much structural integrity compared to rectilinear toolpaths, with their much stronger, straight lines. This is in contrast to self-straightened toolpaths, which instead sacrifice precision for maximum structural integrity. Finally, non-straightened toolpaths demonstrate a compromise between concentric and straightened rectilinear toolpaths, boasting acceptable stepover precision, as well as suitably robust structure. All three toolpath modes can be used in combination to facilitate design and maximize safety.

![Fig 5](abstract/fig5.png)
<p class="caption">
Figure 5: Stepover samples plotted in binned-histograms and KDE curves. Notice the difference in the plotted domain between RectStraight and the others.
</p>
