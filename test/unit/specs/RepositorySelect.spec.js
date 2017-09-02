import RepositorySelect from '@/components/RepositorySelect'
import moxios from 'moxios'

import { mount } from 'avoriaz'

describe('RepositorySelect.vue', () => {
  it('should render correct contents', () => {
    const component = mount(RepositorySelect)
    const title = component.find('h2.title')[0]
    expect(title.text()).to.equal('Input an Organization')
  })

  it('sets the organization data from the input', () => {
    const component = mount(RepositorySelect)
    component.setData({
      organization: 'test'
    })
    expect(component.data().organization).to.contain('test')
  })

})
