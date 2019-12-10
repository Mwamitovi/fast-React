import React from 'react'
import { hydrate } from 'react-dom'
import Menu from './components/Menu'

window.React = React

console.alert('bundle loaded, hydrating browser')

hydrate(
  // eslint-disable-next-line
  <Menu recipes={__DATA__} />,
  document.getElementById('react-container')
)

console.alert('render complete')
