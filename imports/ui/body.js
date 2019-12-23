/**
 * body.js
 * - client side code
 * - contains functions, helpers and events for the Packs (which is the home page)
 * - makes call to the back ent to retrive, delete or post data
 */

import bootbox from "bootbox";
import {
  Template
} from "meteor/templating";
import "./body.html";
import "/imports/ui/navbar.js";
import {
  Promise
} from "meteor/promise";

// A general functions used to make calls to the back end

export const callWithPromise = (method, myParameters) => {
  return new Promise((resolve, reject) => {
    Meteor.call(method, myParameters, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

Template.home.onCreated(function () {
  const template = this;
  template.retrivePacks = new ReactiveVar();
  template.retrivePackDetails = new ReactiveVar();
  template.packsIds = new ReactiveVar([]);
  template.retrieveWolves = new ReactiveVar([]);

  // Call to the back end to retrive the packs and the wolves
  (async function () {
    template.packsIds.set(
      await callWithPromise("get.packs.ids", template.packsIds.get())
    );
    template.retrivePacks.set(
      await callWithPromise("get.packs.details", template.packsIds.get())
    );
    template.retrieveWolves.set(await callWithPromise("get.wolves"));
  })();
});

Template.home.helpers({
  packs() {
    return Template.instance().retrivePacks.get();
  }
});

/** Events */
Template.home.events({
  /** Delete a wolf from a pack */
  "click .deleteWolfFromPack"() {
    const wolfId = this.id;
    const packId = this.pivot.pack_id;

    Meteor.call(
      "remove.wolfFromPack",
      wolfId.toString(),
      packId.toString(),
      error => {
        if (error) {
          console.warn(error);
        } else {
          bootbox.alert(
            "Wolf removed from the pack! Refresh to see the changes."
          );
        }
      }
    );
  },

  /** Add a wolf to a pack */

  "click .addWolf"() {
    // Get the wolves
    const template = Template.instance();
    const packId = this.id.toString();
    let options = [];
    const wolves = template.retrieveWolves.get();

    // TODO: filter from displaying the already existing ones

    // Check if there are wolves on the list
    if (wolves) {
      // Wolves to be added to the pack
      wolves.forEach(element => {
        options.push({
          text: element.name,
          value: element.id
        });
      });

      // Display the name as a key(name) :value (id) on the modal dialog
      bootbox.prompt({
        title: `Select the wolves that you want to add to pack: <b> ${this.name} </b>`,
        inputType: "select",
        multiple: true,
        inputOptions: options,
        callback: function (result) {
          console.log(result);
          // Call to the backend to add the wolf to selected pack
          Meteor.call("add.wolf2pack", result, packId.toString(), error => {
            if (error) {
              console.log("Error adding the wolf to the pack!", error);
            } else {
              bootbox.alert(
                "Wolf added to the pack! Refresh to see the changes."
              );
            }
          });
        }
      });
    }
  },

  /** Event to togle the drop down list and the icons for the drop down list */
  "click .toggleDetails"(event) {
    event.preventDefault();
    // const template = Template.instance();
    // const element = event.target;
    // const packId = this;

    if ($(event.target).hasClass("showDetails")) {
      $(event.target).removeClass("fa fa-angle-down showDetails");
      $(event.target).addClass("fa fa-angle-right hideDetails");
    } else {
      $(event.target).removeClass("fa fa-angle-right hideDetails");
      $(event.target).addClass("fa fa-angle-down showDetails");
    }
  }
});