import "./navbar.html";

/* Toggle between showing and hiding the navigation menu links
 when the user clicks on the hamburger menu / bar icon */

Template.navBar.events({
    "click #nav-bar": function () {
        // TODO: update this code and remove jquery
        let element = document.getElementById("pagesLinks");
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }
});