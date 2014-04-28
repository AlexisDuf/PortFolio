/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    var firstTime = true;
    var currentParent = null;
    var wait;

    /***** Var for Slider ****/
    var maxSize = 4;
    var minSize = 2;
    var currentSize = 2;

    /************************/

    /****** SVG var ********/
    var widthWindow = $(window).width();
    var heigthWindow = $(window).height();
    var path = "";
    /************************/

    $(window).resize(function() {
        widthWindow = $(window).width();
        heigthWindow = $(window).height();
    });



    if (firstTime) {
        $.ajax({
            "url": "html/presentation.html",
            "success": function(data) {
                Utils.showContent($("#container"), data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrow) {
                alert(textStatus);
            }
        });
        firstTime = false;
    }

    $("#menu").click(function(ev) {

        var namePage = ev.target.id;
        if (namePage === "presentation" || namePage === "portfolio" || namePage === "about") {
            $.ajax({
                url: "html/" + namePage + ".html",
                progress: function(progressEvent) {
                    /*if (progressEvent.lengthComputable) {
                     console.log("Loaded " + (Math.round(progressEvent.loaded / progressEvent.total * 100)) + "%");
                     } else {
                     console.log("Loading...");
                     }*/
                    Utils.runTransition(widthWindow, heigthWindow, 500, 300);
                },
                success: function(data) {
                    Utils.showContent($("#container"), data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrow) {
                    alert(textStatus);
                }
            });
        }

    });



    $("#container")
            .delegate(".project", "mouseenter", function(ev) {
        var parent = $(this).attr("class");
        var splitClass = parent.split(' ');
        currentParent = splitClass[1];
        wait = setTimeout(function() {
            Utils.showResume(currentParent);
        }, 500);
        

    })
            .delegate(".project", "mouseleave", function(ev) {
        var wait;
        var parent = $(this).attr("class");
        var splitClass = parent.split(' ');
        currentParent = splitClass[1];
        Utils.hideResume(currentParent);
    })
            .delegate(".flaticon-arrow74", "click", function() {
        var arrowClass = $(this).attr("class");
        var specificArrow = Utils.splitClass(arrowClass, 1);
        var currentProject;

        if (specificArrow === "next" && currentSize <= maxSize) {
            currentProject = Utils.splitClass($("#allProject").children()[currentSize].className, 1);
            Utils.slideProject(currentProject, 0);

            currentSize++;
        }
        if (specificArrow === "previous" && currentSize > minSize) {
            currentSize--;
            currentProject = Utils.splitClass($("#allProject").children()[currentSize].className, 1);
            Utils.slideProject(currentProject, 16.6666666);
        }
        if (currentSize < maxSize && currentSize > minSize) {
            Utils.hideOrNotArrow($(".next"), false);
            Utils.hideOrNotArrow($(".previous"), false);
        } else {
            if (currentSize === maxSize) {
                Utils.hideOrNotArrow($(".next"), true);
            }
            if (currentSize === minSize) {
                Utils.hideOrNotArrow($(".previous"), true);
            }
        }
    });
});
