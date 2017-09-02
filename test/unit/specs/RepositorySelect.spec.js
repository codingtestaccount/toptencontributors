import Vue from 'vue'
import RepositorySelect from '@/components/RepositorySelect'

describe('RepositorySelect.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(RepositorySelect)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.repositorySelect h2').textContent)
      .to.equal('Input an Organization')
  })
})
