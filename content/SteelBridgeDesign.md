---
title: Student Steel Bridge Competition
toc: false
---

<style>
    main h2 {
        text-align: center;
    }
    main h3 {
        text-align: center;
        font-size: 1.2rem !important;
        text-decoration: underline;
    }
    main p, main li, main div, main a {
        text-align: left;
        font-size: 1.2rem;
    }
    .flex-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .flex-object {
        flex: 1;
        margin: 0.5rem;
        object-fit: contain;
        min-width: 0;
    }
    .subtitle {
        font-size: 1rem;
        font-style: italic;
    }
    .model-viewer-flex-container {
        display:flex;
        margin: 0 auto;
        width: 80%;
    }
    .model-viewer {
        margin: 0 auto;
        width: 100%;
        height: 300px;
        border: dashed 1px;
        flex: 1;
    }
    @media (max-width: 768px) {
        .flex-container {
            flex-direction: column !important;
        }
    }
</style>

<p class="subtitle">
    The Student Steel Bridge Competition, organized by the American Institute of Steel Construction, is an annual event where schools compete to design, fabricate, and construct the strongest bridge in the nation. Additionally, there are also 20 regional competitions that decide who qualifies to compete in the nationals. A total of 195 schools competed in regional competitions in 2025, with 43 schools moving onto nationals.<br>
    I was chosen as CalPolyPomona's design captain for the 2024-2025 school year.<br>
    (note: to view image caption information, hover on desktop or long-press on mobile)
</p>

<p style="text-align:center;">
    LMB: Rotate&emsp;RMB: Pan&emsp;Scroll: Zoom
</p>
<div class="model-viewer-flex-container">
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
    <model-viewer class="model-viewer" src="/SteelBridge/BridgeModel.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="/ImuMouse/Hourglass.png" shadow-intensity="1" exposure="0.3"> </model-viewer>
</div>
<a style="display: block; text-align: center;" target="_blank" href="https://cad.onshape.com/documents/676f52f8dab36ba779c7b326/w/3148f26d6cff73f5c8d6a1f6/e/e703fe933e12774a4e3951a1?renderMode=0&uiState=68a5079a21cc7963a95a295a">
    View in Onshape.
</a>

<h2>
    Background
</h2>

<div class="flex-container">
    <p class="flex-object">
        Basic SSBC rules require that teams design a 20ft steel bridge that can withstand a total load of 2500lbs.<br>
        Additionally, the bridge must be assembled on-site from individual 3.5ft pieces (members) during timed construction.
    </p>
    <div class="flex-object flex-container" style="flex-direction:column; flex: 1.5;">
        <img tabindex="1" class="flex-object" alt="Example Loading" src="/SteelBridge/Loading.jpg" title="A bridge being loaded with the 2500lbs distributed across two areas."></img>
        <img tabindex="1" class="flex-object" alt="Example Construction" src="/SteelBridge/Construction.png" title="Timed construction at the competition site."></img>
    </div>
</div>

<p>
    A team's overall score is determined by their bridge's structural efficiency and build-team's construction economy.
</p>

<h3>
    Structural Efficiency
</h3>

<div class="flex-container" style="flex-direction: column;">
    <div class="flex-object">
        Structural efficiency is a function of lightness and stiffness.<br>
        The total weight of the bridge is recorded after timed construction.<br>
        The amount that the bridge deflects under the 2500lbs load is also recorded.<br>
        Common challenges when trying to achieve structural efficiency include:<br>
        <ul>
            <li>Designing truss geometry that fits inside the provided boundaries (figure below).</li>
            <li>Finding the balance between light/flexible steel, and heavy/rigid steel.</li>
            <li>Accommodating for constructibility, as an efficient structure is not necessarily a constructable one.</li>
        </ul>
    </div>
    <img tabindex="1" class="flex-object" src="/SteelBridge/EnvelopeSideView.png" title="A side view of the bridge envelope, these are dimensional constraints that teams must design around."></img>
</div>

<h3>
    Construction Economy
</h3>

<p style="margin: 1.5rem auto;">
    While the objective is to create a light and stiff bridge, not taking constructibility into account will lower a team's total score considerably.
</p>

<div class="flex-container">
    <p class="flex-object" style="flex: 1.5;">
        Construction economy is a function of time taken & builders used.<br>
        The building area is divided into five sections: 2 construction zones, 2 rivers, and restricted island.<br>
        What's important to note is that a builder in the construction zone counts as 1 builder, but a builder in the river, AKA a barge, counts as 2.1 builders. No builder can be placed in the restricted island.<br>
        The effective size of the gap between the two halves of the building area is very important to consider.<br>
        Gaps can range between 5ft, 9ft, and 13ft, depending on if a team chooses to use 2, 1, or 0 barges.
        The objective is to design a bridge that is light, stiff, and can be built quickly without the need for barges.<br>
    </p>
    <img tabindex="1" class="flex-object" src="/SteelBridge/ConstructionZone.png" title="A bird's-eye view of the construction site.&#10;The west end is up top and the east end is below."></img>
</div>

<h2>
    Initial Design
</h2>

<div class="flex-container" style="flex-direction: row;">
    <p class="flex-object">
        This year, the team chose an arch design as opposed to a traditional under-decking design.<br>
        A benefit to this approach is that the envelope allowed for a structure with a greater vertical depth when using an arch compared to using an under-decking.<br>
        Additionally, the arch design promised safer construction, as members close to the ground run the risk of construction penalties, such as dropping members or PPE.<br>
    </p>
    <div class="flex-container flex-object" style="flex-direction: column;">
        <img tabindex="1" class="flex-object" src="/SteelBridge/Arch.jpg" title="A typical arch design."></img>
        <img tabindex="1" class="flex-object" src="/SteelBridge/BottomDecking.JPG" title="A typical under-decking design."></img>
        <img tabindex="1" class="flex-object" src="/SteelBridge/EnvelopeFrontView.png" title="A front view of the envelope.&#10;Note that the allowed vertical space is greater if teams choose to extend into the arch region."></img>
    </div>
</div>

<div class="flex-container" style="flex-direction: row-reverse;">
    <p class="flex-object">
        On the other hand, the arch design was not without its challenges.<br>
        Since the load is placed eccentrically from the supporting structure, the use of sturdy transverse beams was required, which increases overall weight.<br>
        The arch design also requires more members and more connections than a lower decking bridge, increasing the complexity of the overall design and affecting construction speed.<br>
    </p>
    <img tabindex="1" class="flex-object" src="/SteelBridge/TransverseBeams.png" title="An elevated front view of the bridge, showing the transverse beams which transfer the load from the beams to the arch."></img>
</div>
    
<h3>
    Design Inspiration
</h3>

<div class="flex-container" style="flex-direction: column;">
    <p class="flex-object">
        Last year, University of Florida (UFL) competed and placed first nationally.<br>
        Something to note about their bridge is that there is no trussing at the mid-span.<br>
        Despite this lack of trussing, the bridge supported the applied load with the smallest deflection of all the competitors.<br>
        After our team analyzed the bridge, we concluded that, since trussing is used to resist shearing forces, and there is less shear at the mid-span, the trussing could be removed from the middle, reducing weight while retaining structural integrity.<br>
    </p>
    <img tabindex="1" class="flex-object" src="/SteelBridge/FloridaBridge.png" title="UFL's 2024 bridge."></img>
</div>

The advantage of UFL's design was that barges weren't necessary for construction.<br>
Due to very little of the structure existing at the mid-span, there was not a need for builders close to the middle.<br>
This idea helped inspire the initial arch design, a bridge with a truss-less gap in the mid-span.<br>

<h3>
    Considerations
</h3>

<div class="flex-container" style="flex-direction: row;">
    <p class="flex-object">
        A shear diagram of the competition load was used to visualize shear forces across the bridge, to better determine the best location for the gap, which was between the 8ft and 12ft locations.<br>
    </p>
    <div class="flex-container flex-object" style="flex-direction: column;">
        <img tabindex="1" class="flex-object" src="/SteelBridge/ShearDiagram.png" title="Shear diagram. X-axis is distance from the west end, Y-axis is shear force generated by competition loads."></img>
        <img tabindex="1" class="flex-object" src="/SteelBridge/GapView.png" title="One of the arches, showing where the gap was placed."></img>
    </div>
</div>

<div class="flex-container" style="flex-direction: row-reverse;">
    <p class="flex-object">
        Additional research was also conducted to improve the initial design of the bridge.<br>
        <a href="https://www.aisc.org/globalassets/aisc/awards/tr-higgins/past-winners/structural-innovation--combining-classic-theories-with-new-technologies.pdf" target="_blank">
            Structural Innovation: Combining Classic Theories With New Technologies
        </a>, by William F. Baker, is a paper about an iterative approach to geometry optimization in trusses.<br>
        I used the findings about similar angles on pages 5&6 to assist in overall design.<br>
    </p>
    <img tabindex="1" class="flex-object" src="/SteelBridge/Figure6FromPaper.png" title="A figure from the paper, showing the tendency for optimized trusses to converge towards similar angles."></img>
</div>
<img tabindex="1" class="flex-object" src="/SteelBridge/SimilarAngles.png" title="The designed trussing which incorporates the similar trussing angles described in the paper"></img>

<h2>
    Intermediate to Final Design
</h2>

After the initial linework was created, steel tube dimensions (sections) needed to be chosen, and safety analysis needed to be conducted.

<h3>
    Sectioning
</h3>

<div class="flex-container" style="flex-direction: row;">
    <p class="flex-object">
        I specified the cross-sectional dimensions of each trussing element. Each section was chosen to minimize elastic deformation under load while also maintaining a low bridge weight.<br>
        This was done with a guess-and-check method of iteration, although the process was simplified by logistical limitations on fabrication and construction.<br>
        Limitations such as thin sections being impossible to work with and thick sections making members too heavy to carry.<br>
    </p>
    <img tabindex="1" class="flex-object" src="/SteelBridge/SectionMcMasterCarr.png" title="An example of a steel section that was used. Source: McMasterCarr"></img>
</div>

<h3>
    Nonlinear Analysis
</h3>

<img tabindex="1" class="flex-object" src="/SteelBridge/SapLinearAnalysis.png" title="SAP2000's linear static analysis, which was used to optimize stiffness and weight."></img>
<div class="flex-container" style="flex-direction: row;">
    <p class="flex-object">
        While most of the initial structural analysis was done in SAP2000's linear FEA solver, structural integrity also required nonlinear analysis to be performed.<br>
        Linear solvers do not account for how the structure's own deformation can effect stiffness, meaning that they cannot predict complex buckling failures.<br>
    </p>
    <div class="flex-container flex-object" style="flex-direction: column;">
        <img tabindex="1" class="flex-object" src="/SteelBridge/SapNonlinearAnalysis.png" title="SAP2000's nonlinear static analysis, which was used to prevent complex failure of the structure under load. Seen here is a scaled-up load being used to determine failure modes. Buckling of the east columns and south arch are the most prevalent."></img>
    </div>
</div>

<div class="flex-container" style="flex-direction: column;">
    <p class="flex-object">
        Pushover curves were generated which highlighted the maximum load before failure.<br>
        Additionally, nonlinear analysis showed the type of failure at maximum load.<br>
        Using this information, I was able to locate the weakest parts of the bridge.<br>
        After many iterations of tweaking geometries and cross sections, I was able to verify a safety factor of 2, meaning only a load of >5000lbs would cause the bridge to fail.<br>
    </p>
        <img tabindex="1" class="flex-object" src="/SteelBridge/PushoverCurves.png" title="Two pushover curves, showing the failure points of two versions of the bridge. The x-axis is deflection (zero on the right), y-axis is load applied. The bridge is considered failed as soon as the deflection/load relationship becomes nonlinear."></img>
</div>
