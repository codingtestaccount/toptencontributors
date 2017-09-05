<template>
  <div v-if="repositoryDataProps" v-bind="repositoryDataProps">
    <div v-if="contributors" class="contributor-listing" v-for="(contributor, index)  in repositoryDataRender">
      <div>
        <h1>#{{index + 1}}</h1>
        <img v-bind:src='contributor.avatar_url' />
        <p v-if="contributor.login">{{ contributor.login }}</p>
      </div>
      <div>
        <h1>{{ contributor.contributions }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContributorsList',
  props: [
    'repositoryData'
  ],
  data () {
    return {
      contributors: ''
    }
  },
  computed: {
    repositoryDataProps () {
      return this.repositoryData !== '' ? this.fetchContributors() : null
    },
    repositoryDataRender () {
      if (this.contributors.length > 0) {
        let topTen = []
        let contributorsLength = this.contributors.length > 10 ? 10 : this.contributors.length
        for (var i = 0; i < contributorsLength; i++) {
          topTen.push(this.contributors[i])
        }
        return topTen
      }
    }
  },
  methods: {
    fetchContributors: function () {
      return axios.get(this.repositoryData[0].contributors_url)
        .then(res => {
          this.status = null
          this.contributors = res.data
        })
        .catch(error => {
          if (error.response) this.status = error.response.status
        })
    }
  }
}
</script>

<style media="screen" scoped>
.contributor-listing{
  display: flex;
  margin: 0 auto;
  max-width: 500px;
  border-top: 1px solid;
  justify-content: space-between;
}

.contributor-listing div:nth-child(1){
  display: flex;
  align-items: center;
}

.contributor-listing div:nth-child(1) img{
  max-width: 40px;
  max-height: 40px;
  margin: 0 10px;
}
</style>
