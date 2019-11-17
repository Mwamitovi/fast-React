import React from 'react'
import deepFreeze from 'deep-freeze'

global.React = React
global._testColors = deepFreeze([
  {
    id: '8658c1d0-9eda-4a90-95e1-8001e8eb6036',
    title: 'lawn',
    color: '#44ef37',
    timestamp: 'Sat Nov 16 2019 12:54:19 GMT+0300 (EAT)',
    rating: 4
  },
  {
    id: 'f9005b4e-975e-433d-a646-79df172e1dbb',
    title: 'ocean blue',
    color: '#0061ff',
    timestamp: 'Sat Nov 16 2019 12:54:31 GMT+0300 (EAT)',
    rating: 2
  },
  {
    id: '58d9caee-6ea6-4d7b-9984-65b145031979',
    title: 'tomato',
    color: '#ff4b47',
    timestamp: 'Sat Nov 16 2019 12:54:43 GMT+0300 (EAT)',
    rating: 0
  }
])
