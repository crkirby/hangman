import React from 'react'
import { shallow } from 'enzyme';
import Hangman from './Hangman';

describe('Component: Hangman', () => {
  const image = 'hangman image'
  const wrapper = shallow(<Hangman/>).setProps({ image })

  it('renders the hangman image', () => {
    const { props: { src } } = wrapper.getElement()
    expect(src).toEqual(image)
  })
})