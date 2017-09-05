<template>
  <article>
    <div class="container">
      <h2 class="title">Type in a valid organization.</h2>

      <form class="organization-request" v-on:submit.prevent="fetchOrganization">
        <input v-model="organization" :placeholder="organization">
        <input type="submit" name="button"></input>
      </form>

      <select v-if="repos" class="repo-select" v-model="repositorySelected" v-on:change="repositorySelect">
        <option value="">Please Select Repository.</option>
        <option v-for="repo in repos" v-bind:value="repo.name">{{repo.name}}</option>
      </select>

      <p v-if="statusMessage !== 'OK'">{{statusMessage}}</p>
      <h1 v-if="repositorySelected" class="repository-info">Top contributors from {{organization}}<span v-if="repositorySelected"> / </span>{{repositorySelected}}.</h1>
    </div>
    <ContributorsList v-if="statusMessage === 'OK'" :repositoryData="repositoryData"></ContributorsList>

  </article>
</template>

<script>
import axios from 'axios'
import ContributorsList from './Contributorslist.vue'

export default {
  name: 'RespositorySelect',
  components: {
    ContributorsList
  },
  data () {
    return {
      repos: '',
      organization: 'nodejs',
      repositorySelected: '',
      repositoryData: '',
      status: '',
      statusMessage: ''
    }
  },
  methods: {
    fetchOrganization: function () {
      this.repos = ''
      this.repositoryData = ''
      this.repositorySelected = ''
      axios.get(`https://api.github.com/orgs/${this.organization}/repos`)
        .then(res => {
          this.status = ''
          this.statusMessage = res.statusText
          this.repos = res.data
        })
        .catch(error => {
          if (error.response) {
            this.repos = ''
            this.repositoryData = ''
            this.repositorySelected = ''
            this.status = error.response.status
            this.statusMessage = error.response.statusText
          }
        })
    },
    repositorySelect: function () {
      this.repositoryData = this.repos.filter(repo => {
        return this.repositorySelected === repo.name ? repo : ''
      })
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

h2.title{
  border-bottom: 1px solid;
  padding-bottom: 20px;
  margin: 0;
}

.container{
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}

input, select{
  padding: 5px;
  font-size: 16px;
}

.organization-request, .repo-select{
  padding: 25px 0;
}

.repository-info{
  font-size: 15px;
  text-align: left;
  padding: 20px 0;
}
</style>
