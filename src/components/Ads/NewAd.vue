<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb3">Create new ad</h1>
          <v-form v-model="valid" ref="form" validation class="mb-3">
            <v-text-field 
              name="title"
              label="Ad title"
              type="text"
              v-model="title"
              required
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>
            <v-text-field 
              name="description" 
              label="Ad description" 
              type="text"
              v-model="description"
              multi-line=""
              :rules="[v => !!v || 'Description is required']"
            ></v-text-field>
          </v-form>
          <v-layout row class="mb-3">
            <v-flex xs12>
              <v-btn class="warning">
                Upload
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <img src="" alt="" height="100">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-switch
                label="Ad to promo?"
                v-model="promo"
                color="primary"
              >
              </v-switch>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-spacer></v-spacer>
              <v-btn
                :loading = "loading"
                :disabled="!valid || loading"
                class="success" 
                @click="createAd"
              >Create ad</v-btn>
            </v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc: 'https://static.frontendmasters.com/resources/2017-07-14-vue/thumb.jpg'
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    }
  }
}
</script>