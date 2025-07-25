---
date: '2025-07-20T00:16:08-04:00'
draft: false
title: 'Home Page'
---

<!-- markdownlint-disable MD033 -->
<style>
@media (max-width: 974px) {
    .content-row {
        flex-direction: column !important;
        gap: 2em !important;
    }
    .content-row img {
        max-width: min(80vw, 15em) !important;
        max-height: min(40vh, 15em) !important;
    }
    .cat-with-wings {
        max-width: min(80vw, 15em) !important;
        height: auto
    }
}
@media (min-width: 975px) {
    .content-row {
        flex-wrap: nowrap !important;
    }
}
</style>
<div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
    text-align: center;
    padding: 1em;
">
    <div class="content-row" style="
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 1em;
    ">
        <img src="fig1.png" alt="Abstract Figure 1" style="
            max-width:  min(50vw, 20em);
            max-height: min(50vh, 20em);
        ">
        <a href="./abstract" style="
            font-size: 1.3em;
            text-decoration: underline;
            color: white;
            text-align: center;
            white-space: nowrap;
        ">Read the Research Abstract</a>
        <img src="fig5.png" alt="Abstract Figure 5" style="
            max-width:  min(50vw, 20em);
            max-height: min(50vh, 20em);
        ">
    </div>
    <a
        href="https://safiyamhart.weebly.com/blog/frame-animation"
        target="_blank" rel="noopener noreferrer"
    >
        <img src="cat-w-wings_orig.gif" alt="Cat With Wings"
            style="
                height: auto;
                max-width: min(80vw, 30em);
            "
            class="cat-with-wings"
        >
    </a>
</div>
