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
    var idFirstVisibleProject = 2;
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
    $("#menu").click(function(ev) {
        var namePage = ev.target.id;
        if (namePage === "presentation" || namePage === "portfolio") {
            idFirstVisibleProject = 2;
            var History = window.History;
            History.pushState(null, null, namePage );
            ev.preventDefault();
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
        clearTimeout(wait);
        var parent = $(this).attr("class");
        var splitClass = parent.split(' ');
        currentParent = splitClass[1];
        Utils.hideResume(currentParent);
    })
            .delegate(".flaticon-arrow74", "click", function() {
        var arrowClass = $(this).attr("class");
        var specificArrow = Utils.splitClass(arrowClass, 1);
        var currentProject;
        maxSize = $("#allProject").children().size() - 4 - minSize;
        if (specificArrow === "next" && idFirstVisibleProject <= maxSize) {
            currentProject = Utils.splitClass($("#allProject").children()[idFirstVisibleProject].className, 1);
            Utils.slideProject(currentProject, 0);
            idFirstVisibleProject++;
        }

        if (specificArrow === "previous" && idFirstVisibleProject > minSize) {
            idFirstVisibleProject--;
            currentProject = Utils.splitClass($("#allProject").children()[idFirstVisibleProject].className, 1);
            Utils.slideProject(currentProject, 16.6666666);
        }

        if (idFirstVisibleProject < maxSize && idFirstVisibleProject > minSize) {
            Utils.hideOrNotArrow($(".next"), false);
            Utils.hideOrNotArrow($(".previous"), false);
        } else {
            if (idFirstVisibleProject === maxSize) {
                Utils.hideOrNotArrow($(".next"), true);
            }
            if (idFirstVisibleProject === minSize) {
                Utils.hideOrNotArrow($(".previous"), true);
            }
        }
    });
});
(function(window, undefined) {

    var History = window.History;
    var State = History.getState();
    // Bind to StateChange Event
    History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
        var name = location.pathname;
        name = name.split("/");
        name = name[name.length - 1];
        if (name === undefined || name === "index")
            name = "presentation";
        launchPage(name);
    });
    var launchPage = function(url) {
        $.ajax({
            url: "content/" + url + ".php",
            success: function(data) {

                Utils.showContent($("#container"), data);
            }, 
            error: function(textStatus) {
                alert(textStatus);
            },
            xhr: function()
            {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        
                        var percentComplete = evt.loaded / evt.total;
                        
                        //Do something with upload progress
                        console.log(percentComplete);
                    }
                }, false);
                //Download progress
                xhr.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with download progress
                        console.log(percentComplete);
                    }
                }, false);
                return xhr;
            }

        });
    };
})(window);




