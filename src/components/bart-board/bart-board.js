/**
 * The bart-board web component module.
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      background:#002418;
      font-size: 1.2em;
      color:white;
      width:500px;
      height:200px;
      padding:10px;
      border:6px solid #9b3b00;
      border-bottom:12px solid #9b3b00;
      overflow:hidden;
      margin:10px;
      float:left;
      border-radius: 3px;
    }
    p {
      margin: 0;
      padding: 0;
    }
  </style>

  <p part="text"></p>
`

/**
 *
 * Define custom element.
 *
 * @class bart-board.
 */
customElements.define('bart-board',
  /**
   *
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the p-element in which we add the text.

      this._textElement = this.shadowRoot.querySelector('p')
      this._letter = 0
      this._text = 'Jag ska aldrig ta Tors leksak igen! '
      this._speed = 10
      this._intervalID = null
    }

    /**
     *
     * Watches the attributes "text" and "speed" for changes on the *element.
     *
     * @returns {string} - text
     */
    static get observedAttributes () {
      return ['text', 'speed']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'text') {
        this._text = newValue
      } else if (name === 'speed') {
        this._speed = newValue
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener('mousedown', this._onWrite)
      this.addEventListener('mouseup', this.stopWriting)
      this.addEventListener('mouseleave', this.stopWriting)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.removeEventListener('mousedown', this._onWrite)
      this.removeEventListener('mouseup', this.stopWriting)
      this.removeEventListener('mouseleave', this.stopWriting)
      this.stopWriting()
    }

    /**
     *
     * Stops the writing.
     *
     * @returns {*} this.
     */
    stopWriting () {
      clearTimeout(this._intervalID)
      return this
    }

    /**
     *
     * Wipes the board clean and resets the letter counter.
     *
     * @returns {*} this.
     */
    clear () {
      this._textElement.textContent = ''
      this._letter = 0
      return this
    }

    /**
     * When the user clicks the mousebutton we should write letters on the board.
     *
     * @param {any} event information.
     */
    _onWrite (event) {
      this._intervalID = setInterval(() => {
        if (this._textElement.offsetHeight >= this.offsetHeight) {
          this.dispatchEvent(new window.CustomEvent('filled'))
          this.stopWriting()
          return
        }

        this._textElement.textContent += this._text.charAt(this._letter++)
        if (this._letter >= this._text.length) {
          this._textElement.textContent += ' '
          this._letter = 0
        }
      }, this._speed)
    }
  }
)
