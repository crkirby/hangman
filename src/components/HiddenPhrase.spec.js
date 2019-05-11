import React from 'react'
import { shallow } from 'enzyme';
import HiddenPhrase from './HiddenPhrase';

describe('Component: HiddenPhrase', () => {
  const phrase = '_'
  const wrapper = shallow(<HiddenPhrase/>).setProps({ phrase })

  it('renders the hidden phrase', () => {
    expect(wrapper.text()).toEqual(phrase)
  })
})