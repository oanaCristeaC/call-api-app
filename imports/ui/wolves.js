/**
 * wolves.js
 * - client side code
 * - contains functions, helpers and events for retriving Wolves data
 * - makes call to the back ent to retrive Wolves data
 */

import "./wolves.html";
import {
    Template
} from "meteor/templating";

import {
    callWithPromise
} from "./body.js";

Template.wolves.onCreated(function () {
    const template = Template.instance();
    template.wolvesData = new ReactiveVar();
    template.showWolvesDetails = new ReactiveVar(false);

    // Call to the back end to get the wolves details
    (async function () {
        template.wolvesData.set(await callWithPromise("get.wolves"));
    })();
});

// Display the wolves and toggle show more details about wolves
Template.wolves.helpers({
    wolves() {
        return Template.instance().wolvesData.get();
    },
    showWolvesDetails() {
        return Template.instance().showWolvesDetails.get();
    },
    // Toggle show/hide icon
    toggleShowWolvesDetails() {
        if (Template.instance().showWolvesDetails.get()) {
            return "down ";
        }
        return "right ";
    }
});

/** Events */
Template.wolves.events({

    /** Toggle show details event */
    "click .display-wolves-details"() {
        const template = Template.instance();
        if (template.showWolvesDetails.get()) {
            template.showWolvesDetails.set(false);
        } else {
            template.showWolvesDetails.set(true);
        }
    }
});