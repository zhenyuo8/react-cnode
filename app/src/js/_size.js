window.onload=function(){
    new function() {
        document.documentElement.style.fontSize = innerWidth / 7.5 + "px";
        window.addEventListener("resize", function() {
            document.documentElement.style.fontSize = innerWidth / 7.5 + "px";
        }, false);
    }
}