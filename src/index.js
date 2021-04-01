/**
 * The main script file of the application.
 */

import './components/bart-board/'

const node = document.createElement('div')
node.setAttribute('id', 'test1')
document.querySelector('body').appendChild(node)
const bartBoard1 = document.createElement('bart-board')
bartBoard1.setAttribute('id', 'bartBoard1')
document.querySelector('#test1').appendChild(bartBoard1)

document.querySelector('#bartBoard1').addEventListener('filled', (event) => {
  event.target.clear()
})

const bartBoard2 = document.createElement('bart-board')
bartBoard2.setAttribute('text', ' <3 Lina <3 ')
bartBoard2.setAttribute('id', 'bartBoard2')
document.querySelector('body').appendChild(bartBoard2)

document.querySelector('#bartBoard2').addEventListener('filled', (event) => {
  event.target.clear()
})

const frejaBoard = document.createElement('bart-board2')
document.querySelector('body').appendChild(frejaBoard)
frejaBoard.setAttribute('id', 'bartBoard3')
frejaBoard.setAttribute('speed', 1)

document.querySelector('#bartBoard3').addEventListener('filled', (event) => {
  event.target.clear()
})

document.body.addEventListener('click', event => {
  if (event.target.nodeName === 'BUTTON') {
    console.log('clicked', event.target.textContent)
  }
})
