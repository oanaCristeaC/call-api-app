/** Create a new pack */

import {
    Template
} from "meteor/templating";
import "./pack.html";

Template.pack.onCreated(function () {});

Template.pack.helpers({});

/** Events */
Template.pack.events({
    /** Create a new pack: gets the template data and submited to the server */
    "submit .packData": function (event, template) {
        event.preventDefault();
        const pack = event.target;
        const packName = pack.packName.value;
        const packLocationLatidude = pack.packLocationLatidude.value;
        const packLocationLongitude = pack.packLocationLongitude.value;

        // call to the server with colected data to create the pack
        Meteor.call(
            "create.pack",
            packName,
            packLocationLatidude,
            packLocationLongitude,
            (error, response) => {
                if (error) {
                    console.warn(error);
                } else {
                    console.log(response);
                }
            }
        );
    }
});