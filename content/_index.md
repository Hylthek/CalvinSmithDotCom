---
toc: false
---
<!-- markdownlint-disable MD033 -->

<!-- CSS style classes. -->
<style>
.bio {
    flex: 1;
    text-align: left;
    font-weight: bold;
}
.portrait {
    margin: 1em 1em;
    min-width:0;
    flex:1;
    align-self:center;
    border-radius: 50%;
    object-fit: contain;
}
.BioResumeDiv {
    min-width: 0;
    flex: 1;
    margin: 1em 1em;
}
.subtitle {
    text-align: justify;
    line-height: 1.5;
    margin: 1rem 0 1.5rem;
}
.flex-container {
    display: flex;
    align-items: flex-start;
}
@media (max-width: 768px) { /* hx:md is typically 768px */
    .flex-container {
        flex-direction: column;
        align-items: center;
    }
}
</style>

<!-- Profile picture and bio div. -->
<div class="flex-container">
    <img src="/portrait.png" alt="portrait" class="portrait">
    </img>
    <div class="BioResumeDiv">
        <div class="bio">
            <p style="text-align:center;font-size:1.5rem;">My name is Calvin Smith.</p>
            <br>
            I’m an undergraduate computer engineer at Cal Poly Pomona, interested in engineering, math, and art. Throw any interesting subject my way, and I’ll be sure to learn everything there is to know.
        </div>
        {{< cards cols="1" >}}
            {{< card link="/resume" title="View My Resume" icon="document-text">}}
        {{< /cards >}}
    </div>
</div>

<!-- WFU REU section. -->
<h2 style="text-align:center;">
    Wake Forest University<br>
    Undergraduate Research Experience
</h2>
<p class="subtitle">
    In the summer of 2025, I worked alongside Dr. Philip Brown and others to develop a novel VR application for the research and development of in situ laparoscopic bioprinting.
</p>
{{< cards cols="2">}}
  {{< card link="/Abstract" image="abstract/fig1.png" title="Undergraduate Research Abstract" subtitle="Submitted to 2025 BMES annual meeting." >}}
  {{< card link="/BmesPoster" image="/Poster/PosterPointing.jpg" title="BMES Poster" subtitle="Poster session at BMES 2025 Annual Meeting." >}}
{{< /cards >}}
{{< cards cols="1">}}
  {{< card link="/ReuPowerPoint" image="/ReuPowerPoint/slide2.png" title="Research Presentation" subtitle="End-of-internship presentation." >}}
{{< /cards >}}

<!-- Mouse project section. -->
<h2 style="text-align:center;">
    Space Mouse Project
</h2>
<p class="subtitle">
    During the fall semester of 2024, I created an open-source project researching a new approach to 6DoF space mice.
</p>
{{< cards cols="1">}}
    {{< card link="/imuspacemouse" image="/ImuMouse/MousePhotos.png" title="Space Mouse Project" subtitle="Overview, Purpose, and Approach">}}
{{< /cards >}}

<!-- Mouse project section. -->
<h2 style="text-align:center;">
    Steel Bridge 2025
</h2>
<p class="subtitle">
    During my third year at Cal Poly Pomona, I was chosen as design captain for our Steel Bridge Club. Over the course of the school year, I was tasked with designing and validating a 20ft steel bridge model for the purposes of competing at AISC’s 2025 Student Steel Bridge Competition (SSBC).
</p>
{{< cards cols="1">}}
    {{< card link="/steelbridgedesign" image="/SteelBridge/GroupPhoto.png" title="Steel Bridge Design" subtitle="Competition objective and design process." >}}
{{< /cards >}}

<style>
    #fly-id {
        position: absolute;
        transform: translate(-50%,-50%) scale(0.15) rotate(30deg);
    }
</style>


<!-- Inline styles are used here so that js can access them. -->
<a href="/insect.html" id="fly-id" style="top: 10rem; left: 40px; transform: translate(-50%,-50%) scale(0.06) rotate(30deg);">
    <img src="Fly/fly.png" alt="fly">
</a>

<script src="Fly/index_fly.js"></script>