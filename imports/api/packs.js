/**
 * pack.js
 * - contains the methods (server side functions)
 * - makes http requests to the Wolfpack APIs
 * - that are related to Packs
 */

import {
  Meteor
} from "meteor/meteor";

import {
  HTTP
} from "meteor/http";

import {
  check
} from "meteor/check";

let userAuth = Meteor.settings.wolfpack.s_key;

const url = `https://join.wolfpackit.nl/api/v1`;

Meteor.methods({
  /** Get request to retrive all the packs */

  "display.packs"() {
    let packs = [];
    try {
      const packResult = HTTP.call("GET", `${url}/packs`, {
        headers: {
          Authorization: "Bearer " + userAuth
        }
      });
      packs = packResult.data;
    } catch (e) {
      console.error("Error displaying the packs!", e);
    }
    return packs;
  },

  /** GET request to retrive the id of each pack */

  "get.packs.ids"() {
    let packsIds = [];
    try {
      const packs = HTTP.call("GET", `${url}/packs`, {
        headers: {
          Authorization: "Bearer " + userAuth
        }
      });
      packsIds = packs.data.map(element => element.id.toString());
    } catch (e) {
      console.error("Error displaying the packs!", e);
    }
    return packsIds;
  },

  /** GET request to retrive the details of each pack */

  "get.packs.details"(packIds) {
    check(packIds, [String]);

    let packsDetails = [];
    try {
      packIds.forEach(packId => {
        const packData = HTTP.call("GET", `${url}/packs/${packId}`, {
          headers: {
            Authorization: "Bearer " + userAuth
          }
        });
        packsDetails.push(packData.data);
      });
    } catch (e) {
      console.error("Error displaying the packs!", e);
    }
    return packsDetails;
  },

  /** POST request to create a new pack */

  "create.pack"(packName, longitude, latitude) {
    check(packName, String);
    check(longitude, String);
    check(latitude, String);

    try {
      HTTP.call(
        "POST",
        `${url}/packs?name=${packName}&lng=${longitude}&lat=${latitude}`, {
          headers: {
            Authorization: "Bearer " + userAuth,
            "Content-Type": "application/json"
          }
        }
      );
    } catch (e) {
      console.error("Error creating the pack ", e);
    }
  },

  /** POST request to add a wolf to a pack */

  "add.wolf2pack"(wolves, packId) {
    check(wolves, [String]);
    check(packId, String);
    this.unblock();

    wolves.forEach(wolfId => {
      try {
        HTTP.call("POST", `${url}/packs/${packId}/wolf/${wolfId}`, {
          headers: {
            Authorization: `Bearer ${userAuth}`,
            "Content-Type": "application/json"
          }
        });
      } catch (e) {
        console.error("Error adding the wolf to the pack ", e);
      }
    });
  }
});