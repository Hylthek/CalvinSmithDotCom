---
title: 'Home'
toc: false
---
<!-- markdownlint-disable MD033 -->

<!-- CSS style classes. -->
<style>
main {
    font: 1.2rem 'Garamond';
}
.bio {
    flex: 1;
    margin: 1em 1em;
    text-align: justify;
    font-weight: bold;
}
.portrait {
    min-width:0;
    flex:1;
    align-self:center;
    margin: 0;
    border-radius: 50%;
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
</style>

<!-- Profile picture and bio div. -->
<div style="display:flex;">
    <img src="/portrait.png" alt="portrait" class="portrait">
    </img>
    <div class="BioResumeDiv">
        <p class="bio">
            My name is Calvin Smith.<br><br>
            I’m an undergraduate computer engineer at Cal Poly Pomona, interested in engineering, math, and art. Throw any interesting subject my way, and I’ll be sure to learn everything there is to know.
        </p>
        {{< cards >}}
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
{{< cards >}}
  {{< card link="/Abstract" image="abstract/fig1.png" title="Undergraduate Research Abstract" subtitle="Submitted to 2025 BMES annual meeting." >}}
  {{< card link="/ReuPowerPoint" image="/ReuPowerPoint/image015.png" title="Research Presentation" subtitle="End-of-internship presentation." >}}
{{< /cards >}}

<!-- Mouse project section. -->
<h2 style="text-align:center;">
    Space Mouse Project
</h2>
<p class="subtitle">
    During the fall semester of 2024, I created an open-source project researching a new approach to 6DoF space mice. I used the skills I had recently attained in my summer internship at Ti Point Inc. earlier that year.
</p>
{{< cards cols="1">}}
    {{< card link="/imuspacemouse" image="" title="Space Mouse Project" subtitle="// description of card." >}}
{{< /cards >}}

<!-- Mouse project section. -->
<h2 style="text-align:center;">
    Steel Bridge 2025
</h2>
<p class="subtitle">
    During my third year at Cal Poly Pomona, I was chosen as design captain for our Steel Bridge Club. Over the course of the school year, I was tasked with designing and validating a 20ft steel bridge model for the purposes of competing at AISC’s 2025 Student Steel Bridge Competition (SSBC).
</p>
{{< cards cols="1">}}
    {{< card link="/steelbridgedesign" image="" title="Steel Bridge Design" subtitle="// description of card." >}}
{{< /cards >}}
