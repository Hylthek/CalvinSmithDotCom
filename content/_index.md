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
}
.portrait {
    min-width:0;
    flex:1;
    align-self:center;
    margin: 1em 1em;
    border-radius: 50%;
}
.BioResumeDiv {
    min-width: 0;
    flex: 1;
    margin: 1em 1em;
}
.subtitle {
    text-align: center;
}
</style>

<!-- Profile picture and bio div. -->
<div style="display:flex;">
    <img src="/portrait.png" alt="portrait" class="portrait">
    </img>
    <div class="BioResumeDiv">
        <p class="bio">
            // 2-3 sentence biography.<br>
            // Extra line.<br>
            // Extra line.<br>
            // Extra line.<br>
            // Extra line.<br>
            // Extra line.<br>
            // Extra line.<br>
            // Extra line.<br>
        </p>
        {{< cards >}}
            {{< card link="/resume" title="View My Resume" icon="document-text">}}
        {{< /cards >}}
    </div>
</div>

<!-- WFU REU section. -->
<h2 style="text-align:center;">
    Wake Forest University<br>
    Undergraduate Research Experience<br>
    (Summer 2025)
</h2>
<p class="subtitle">
    // Short description of section.
</p>
{{< cards >}}
  {{< card link="/Abstract" image="abstract/fig1.png" title="Undergraduate Research Abstract" subtitle="Undergraduate research abstract.<br>Submitted to 2025 BMES annual meeting." >}}
  {{< card link="/ReuPowerPoint" image="/ReuPowerPoint/image015.png" title="Research Presentation" subtitle="End-of-summer presentation<br>Wake Forest University Undergraduate Research." >}}
{{< /cards >}}

<!-- Mouse project section. -->
<h2 style="text-align:center;">
    Space Mouse Project
</h2>
<p class="subtitle">
    // Short description of section.
</p>
{{< cards cols="1">}}
    {{< card link="/imuspacemouse" image="" title="Space Mouse Project" subtitle="// description of card." >}}
{{< /cards >}}

<!-- Mouse project section. -->
<h2 style="text-align:center;">
    SSBC 2025
</h2>
<p class="subtitle">
    // Short description of section.
</p>
{{< cards cols="1">}}
    {{< card link="/steelbridgedesign" image="" title="Steel Bridge Design" subtitle="// description of card." >}}
{{< /cards >}}
