<template>
  <div class="email-compose">
    <button @click="openDialog" class="button is-danger">Compose</button>
    <modal name="compose-email" width="50%" height="60%">
      <div class="compose-email-container columns is-centered">
        <div class="column is-10">
          <div class="field">
            <label class="label">To</label>
            <div class="control">
              <input
                class="input recipient"
                type="text"
                v-model="recipients"
                placeholder="Recipient name, if multiple then comma seperated"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Subject</label>
            <div class="control">
              <input class="input subject" type="text" v-model="subject" placeholder="Subject" />
            </div>
          </div>
          <div class="field">
            <label class="label">Body</label>
            <div class="control">
              <textarea
                class="input email-body"
                type="text"
                v-model="message"
                placeholder="Message"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-success" @click="sendEmail">Send</button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import localdb from "../services/dbservice";
export default {
  name: "EmailCompose",

  data() {
    return {
      recipients: "",
      subject: "",
      message: ""
    };
  },

  methods: {
    openDialog() {
      this.$modal.show("compose-email");
    },

    sendEmail: function() {
      if (this.recipients != "" && this.subject !== "" && this.message !== "") {
        localdb.addEmail({
          timestamp: Date.now(),
          date: new Date().toLocaleString(),
          recipients: this.recipients,
          subject: this.subject,
          message: this.message,
          from: this.$session.get("username")
        });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
    .compose-email-container
        padding: 3rem 0rem
        height: 100%

        div.field:nth-child(1), div.field:nth-child(2)
            height:20%
        
        div.field:nth-child(3)
            height:50%
            div.control,textarea.email-body 
                height: 90%
</style>

