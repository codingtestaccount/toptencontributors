<template>
  <article>
    <h2 class="title">Input an Organization</h2>

    <form v-on:submit.prevent="fetchOrganization">
      <input v-model="organization" :placeholder="organization">
      <input type="submit" name="button"></input>
    </form>

    <select v-if="repos" v-model="repository" v-on:change="repositorySelected">
      <option value="">Please Select Repository.</option>
      <option v-for="repo in repos" v-bind:value="repo.name">{{repo.name}}</option>
    </select>

    <h1>List of Contributors from {{organization}}<span v-if="repository"> / </span>{{repository}}.</h1>

  </article>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RespositorySelect',
  data () {
    return {
      repos: null,
      organization: 'nodejs',
      repository: '',
      status: '',
      statusMessage: ''
    }
  },
  methods: {
    fetchOrganization: function () {
      axios.get(`https://api.github.com/orgs/${this.organization}/repos`)
        .then(res => {
          this.status = false
          this.statusMessage = res.statusText
          this.repos = res.data
        })
        .catch(error => {
          if (error.response) {
            this.repos = null
            this.repository = null
            this.status = error.response.status
            this.statusMessage = error.response.statusText
          }
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
</style>
