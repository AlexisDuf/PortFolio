/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var Utils = (function() {
    return {
        showContent: function(zone, data) {
            zone.empty();
            zone.append(data);
        },
        showResume: function(parent) {

            $("." + parent).find(".info").css("visibility", "visible");

            $("." + parent).find(".squareInfo").animate({
                height: "100%"
            }, 1000);
            $("." + parent).find("h2").animate({
                top: "10%"
            }, 700);
        },
        hideResume: function(parent) {
            $("." + parent).find(".info").css("visibility", "hidden");
            $("." + parent).find(".squareInfo").animate({
                height: "0%"
            }, 1000);
            $("." + parent).find("h2").animate({
                top: "50%"
            }, 700);
        },
        hideOrNotArrow: function(data, bool) {
            if (bool) {
                data.css("visibility", "hidden");
            } else {
                data.css("visibility", "visible");
            }

        },
        runTransition: function(width, height, pas1, pas2) {
            console.log(width);
            //return "M 0,0 L 0,0 L 0," + -height + " L 0," + -height + " Z";
        },
                slideProject: function(project, value) {
            $("." + project).css("width", value + "%");
        },
        splitClass: function(string, index) {
            var splitString = string.split(' ');
            return splitString[index];
        }
    };
})();