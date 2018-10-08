import abcjs from 'abcjs'
import * as React from 'react'
import { AbcAdapter } from '../lib/abc.adapter'

interface IScoreMakerProps {
  adapter: AbcAdapter
}

export default class ScoreMaker extends React.Component<IScoreMakerProps> {
  base = 'M:4/4\nL:1/4\n'
  tune = ''

  private readonly abcParams = { responsive: true }

  private compass = 0
  private tempo = 0
  private released: any[] = []
  private toPlay: any[] = []

  componentDidMount(): void {
    if (!this.props.adapter) {
      throw Error('An adapter is needed')
    }

    const adapter = this.props.adapter

    adapter.setAttackCallback(note => {
      this.toPlay.push(note)

      // console.log('A:', note, this.toPlay)
    })

    adapter.setReleaseCallback(note => {
      this.released.push(note)
      // console.log('R:', note, this.released)

      if (this.allRelease()) {
        this.tune += `[${this.toPlay.join('')}]`
        if (++this.tempo === 4) {
          this.tempo = 0
          this.tune += '|'

          if (++this.compass === 4) {
            this.compass = 0
            this.tune += '\n'
          }
        }
        abcjs.renderAbc('score', this.tune)
        this.released = []
        this.toPlay = []
      }
    })

    this.resetScore()
  }

  render() {
    const button =
      this.tune !== this.base ? (
        <button onClick={this.resetScore}>reset</button>
      ) : (
        ''
      )

    return (
      <div>
        <div id="score" />

        {button}
      </div>
    )
  }

  private allRelease() {
    return this.toPlay.every(tp => this.released.indexOf(tp) !== -1)
  }

  private resetScore = () => {
    this.tune = this.base + ''
    this.released = []
    this.toPlay = []
    abcjs.renderAbc('score', this.tune, this.abcParams)
  }
}
