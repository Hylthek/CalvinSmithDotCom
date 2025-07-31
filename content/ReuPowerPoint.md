---
title: ReuPowerPoint
toc: false
---
<!-- markdownlint-disable MD033 -->

<script>
function checkPassword() {
    var password = prompt("Enter password:");
    if (password !== "21279") {
        alert("Incorrect password!");
        window.location.href = "/";
        return false;
    }
}
// window.onload = checkPassword
</script>

<iframe
    src="/REU_PowerPoint_WebFormat.htm"
    scrolling = "no"
    style="
        top: 50px;
        width: 100%;
    "
    onload= "this.style.height = (this.contentWindow.document.body.scrollHeight * 1)+'px';"
>
