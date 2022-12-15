<template>
  <div class="container">
    <Dashboard />

    <div class="row justify-content-center mt-5">
      <div class="col-12">
        <div class="card shadow  text-white bg-dark">
          <div class="card-header">Coding Challenge - Network connections</div>
          <div class="card-body">
            <div class="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
              <label @click="makeActive('suggestions')"
                     class="btn btn-outline-primary"
                     for="btnradio1"
                     id="get_suggestions_btn">
                Suggestions ({{ suggestionsCount }})
              </label>

              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
              <label @click="makeActive('sentRequests')"
                     class="btn btn-outline-primary"
                     for="btnradio2"
                     id="get_sent_requests_btn">
                Sent Requests ({{ sentRequestsCount }})
              </label>

              <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
              <label @click="makeActive('receivedRequests')"
                     class="btn btn-outline-primary"
                     for="btnradio3"
                     id="get_received_requests_btn">
                Received Requests({{ receivedRequestsCount }})
              </label>

              <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
              <label @click="makeActive('connections')"
                     class="btn btn-outline-primary"
                     for="btnradio4"
                     id="get_connections_btn">
                Connections ({{ connectionsCount }})
              </label>
            </div>
            <hr>

            <div v-if="activeTab === 'suggestions'">
              <LazySuggestions @setSuggestionCount="setSuggestionCount"/>
            </div>

            <div v-if="activeTab === 'sentRequests'">
              <LazySentRequests @setSentRequestCount="setSentRequestCount"/>
            </div>

            <div v-if="activeTab === 'receivedRequests'">
              <LazyReceivedRequests @setReceivedRequestCount="setReceivedRequestCount"/>
            </div>

            <div v-if="activeTab === 'connections'">
              <LazyConnections @setConnectionCount="setConnectionCount"/>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import LazySuggestions from "~/components/Connections/LazySuggestions";
import LazyConnections from "~/components/Connections/LazyConnections";
import LazySentRequests from "~/components/Connections/LazySentRequests";
import LazyReceivedRequests from "~/components/Connections/LazyReceivedRequests";

import { mapActions } from "vuex";

export default {
  auth: true,
  middleware: ['auth'],
  data() {
    return {
      activeTab: 'suggestions',

      suggestionsCount: 0,
      sentRequestsCount: 0,
      receivedRequestsCount: 0,
      connectionsCount: 0,
    }
  },
  components: { LazySentRequests, LazyConnections, LazySuggestions, LazyReceivedRequests },
  created() {
  },
  methods: {
    ...mapActions('global', ['index']),
    makeActive(value) {
      this.activeTab = value;
    },

    removeSelectedIndex(data) {
      let indexOfObject = this.suggestions.findIndex(object => {
        return object.id === data.with_user;
      });
      this.suggestions.splice(indexOfObject, 1);
    },

    setSuggestionCount(count) {
      this.suggestionsCount = count;
    },
    setSentRequestCount(count) {
      this.sentRequestsCount = count;
    },
    setReceivedRequestCount(count) {
      this.receivedRequestsCount = count;
    },
    setConnectionCount(count) {
      this.connectionsCount = count;
    },
  }
};
</script>

<style>

</style>
