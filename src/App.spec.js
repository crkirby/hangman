import { mount } from 'enzyme';
import React from 'react'
import App from './App'
import HiddenPhrase from './components/HiddenPhrase';
import LetterBank from './components/LetterBank';
import Hangman from './components/Hangman';
import { random } from 'faker'

describe('App', () => {
  describe('on mount', () => {
    const wrapper = mount(<App />)

    it(' successfully', () => {
      expect(wrapper.exists('.App')).toBeTruthy()
    })

    it('renders "Hangman"', () => {
      expect(wrapper.exists(Hangman)).toBeTruthy()
    })

    it('renders "LetterBank"', () => {
      expect(wrapper.exists(LetterBank)).toBeTruthy()
    })

    it('renders "HiddenPhrase"', () => {
      expect(wrapper.exists(HiddenPhrase)).toBeTruthy()
    })
  })

  describe('when the game is not over', () => {
    let wrapper

    describe('when a letter key is pressed', () => {
      const word = random.word().toUpperCase()
      const wrongAttempts = random.number({ max: 5 })
      const availableLetters = word.split('')
      let key

      beforeAll(() => {
        wrapper = mount(<App />).setState({ word, wrongAttempts, availableLetters })
      })

      describe('when a letter is found in the word', () => {
        beforeAll(() => {
          const ev = document.createEvent('Events')
          ev.initEvent('keyup', true, true)
          key = word[random.number({ max: word.length - 1 })]
          ev.key = key
          document.body.dispatchEvent(ev)
        })

        it('removes the letter from the letter bank', () => {
          expect(wrapper.find(LetterBank).text()).not.toContain(key)
        })

        it('renders all occurrencs of the letter', () => {
          expect(wrapper.find(HiddenPhrase).text()).toContain(key)
        })

      })

      describe('when a letter is not found in the word', () => {
        const notFound = 'XYZ'

        beforeAll(() => {
          const ev = document.createEvent('Events')
          ev.initEvent('keyup', true, true)
          key = notFound[random.number({ max: notFound.length - 1 })]
          ev.key = key
          document.body.dispatchEvent(ev)
        })

        it('removes the letter from the letter bank', () => {
          expect(wrapper.find(LetterBank).text()).not.toContain(key)
        })

        it('renders a new hangman image', () => {
          const expectedHangmanImageStr = `../img/${wrongAttempts}.png`
          const { props: { image: hangmanImage } } = wrapper.find(Hangman).getElement()
          expect(hangmanImage).toEqual(expectedHangmanImageStr)
        })

      })
    })
  })

  describe('when the game is over', () => {
    let wrapper

    describe('when a letter key is pressed', () => {
      const word = random.word().toUpperCase()
      const wrongAttempts = 6
      const availableLetters = word.split(' ')
      let key

      beforeAll(() => {
        wrapper = mount(<App />).setState({ word, wrongAttempts, availableLetters })
        const ev = document.createEvent('Events')
        ev.initEvent('keyup', true, true)
        key = word[random.number({ max: word.length - 1 })]
        ev.key = key
        document.body.dispatchEvent(ev)
      })

      it('does not remove the letter from the letter bank', () => {
        expect(wrapper.find(LetterBank).text()).toContain(key)
      })

      it('does not render occurrencs of this letter', () => {
        expect(wrapper.find(HiddenPhrase).text()).not.toContain(key)
      })

      it('does not render a new hangman image', () => {
        const expectedHangmanImageStr = `../img/${wrongAttempts}.png`
        const { props: { image: hangmanImage } } = wrapper.find(Hangman).getElement()
        expect(hangmanImage).toEqual(expectedHangmanImageStr)
      })

    })
  })

  describe('umount', () => {
    beforeAll(() => {
      const wrapper = mount(<App />)
      jest.spyOn(document.body, 'removeEventListener')
      wrapper.unmount()
    })

    it('removes DOM listener', () => {
      expect(document.body.removeEventListener).toHaveBeenCalledWith('keyup', expect.any(Function))
    })
  })
})
