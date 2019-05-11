import React from 'react'
import { shallow } from 'enzyme';
import LetterBank from './LetterBank';

describe('Component: Letter Bank', () => {
  const bank = 'b'
  const wrapper = shallow(<LetterBank/>).setProps({ bank })

  it('renders the letter bank', () => {
    expect(wrapper.text()).toEqual(bank)
  })
})