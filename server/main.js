/**
 * Entry point loaded on the server
 *
 */
import "../imports/api/packs.js";
import {
    Meteor
} from "meteor/meteor";
import "../imports/api/wolves.js";

Meteor.startup(() => {
    // code to run on server at startup
});