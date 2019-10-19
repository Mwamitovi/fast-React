import C from '../../../src/constants'
import { color } from '../../../src/store/reducers'
import DeepFreeze from 'deep-freeze'

/* eslint-disable no-undef */

describe('color Reducer', () => {

  it('ADD_COLOR success', () => {
    const state = {}
    const action = {
      type: C.ADD_COLOR,
      id: 0,
      title: 'Test Teal',
      color: '#90C3D4',
      timestamp: new Date().toString()
    }
    DeepFreeze(state)
    DeepFreeze(action)
    const results = color(state, action)
    expect(results)
      .toEqual({
        id: 0,
        title: 'Test Teal',
        color: '#90C3D4',
        timestamp: action.timestamp,
        rating: 0
      })
  })

  it('RATE_COLOR success', () => {
    const state = {
      id: 0,
      title: 'Test Teal',
      color: '#90C3D4',
      timestamp: 'Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)',
      rating: undefined
    }
    const action = {
      type: C.RATE_COLOR,
      id: 0,
      rating: 3
    }
    DeepFreeze(state)
    DeepFreeze(action)
    const results = color(state, action)
    expect(results)
      .toEqual({
        id: 0,
        title: 'Test Teal',
        color: '#90C3D4',
        timestamp: 'Sat Oct 19 2019 13:32:09 GMT+0300 (EAT)',
        rating: 3
      })
  })
})