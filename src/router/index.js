import Vue from 'vue'
import Router from 'vue-router'
import RepositorySelect from '@/components/RepositorySelect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RepositorySelect',
      component: RepositorySelect
    }
  ]
})
