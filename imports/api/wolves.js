/**
 * wolves.js
 * - contains the methods (server side functions)
 * - makes http requests to the Wolfpack APIs
 * - that are related to Wolves
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

// Authentification required
let userAuth = Meteor.settings.wolfpack.s_key;
const url = `https://join.wolfpackit.nl/api/v1`;

Meteor.methods({
    /** DELETE request: removes a wolf from a pack*/

    "remove.wolfFromPack"(wolfId, packId) {
        check(wolfId, String);
        check(packId, String);
        try {
            HTTP.call("DELETE", `${url}/packs/${packId}/wolf/${wolfId}`, {
                headers: {
                    Authorization: "Bearer " + userAuth
                }
            });
        } catch (e) {
            console.error("Error removing the wolf from the pack!", e);
        }
    },

    /** GET request to retrive all the existing wolves */

    "get.wolves"() {
        let wolves = [];
        try {
            const wolvesResult = HTTP.call("GET", `${url}/wolves`, {
                headers: {
                    Authorization: "Bearer " + userAuth
                }
            });
            wolves = wolvesResult.data;
        } catch (e) {
            console.error("Error displaying the wolves", e);
        }

        //const x = wolves.map(wolf => wolf).slice(0, 10);
        return wolves.map(wolf => wolf);
    }
});