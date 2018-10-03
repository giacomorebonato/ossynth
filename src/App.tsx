import { Layout } from 'antd'
import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tone from 'tone'
import ScoreMaker from './components/score.maker'
import { AbcAdapter } from './lib/abc.adapter'
import { midiToNote } from './lib/midiToNote'
import { Home } from './pages'

let synth = new Tone.PolySynth(10, Tone.Synth).toMaster()

let { Header, Footer, Content, Sider } = Layout

class App extends React.Component {
  state = {
    notesPlaying: {}
  }

  private adapter: AbcAdapter

  constructor(props) {
    super(props)

    this.adapter = new AbcAdapter()
  }

  componentDidMount() {
    navigator.requestMIDIAccess().then(
      midiAccess => {
        let { inputs } = midiAccess
        let inputIterators = inputs.values()

        let firstInput = inputIterators.next().value

        if (!firstInput) return

        firstInput.onmidimessage = this.handleMidiMessage
      },
      error => {
        throw error
      }
    )
  }

  public render() {
    return (
      <Router>
        <Layout>
          <Header>Ossynth</Header>
          <Content>
            <Sider>Sider</Sider>

            <ScoreMaker adapter={this.adapter} />

            <h2>{this.getNotes()}</h2>

            <Route path="/" component={Home} />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Router>
    )
  }

  private handleMidiMessage = (message: any) => {
    let { data } = message // this gives us our [command/channel, note, velocity] data.
    let [command, midi, velocity] = data
    let notesPlaying: any = { ...this.state.notesPlaying }
    const note = midiToNote[midi]

    // As per API definition, some devices indicate the stop command changin velocity to 0
    if (command === 128 || velocity === 0) {
      synth.triggerRelease(note)
      this.adapter.release(note)
      delete notesPlaying[midi]
    } else {
      synth.triggerAttack(note, undefined, velocity / 127)
      notesPlaying[midi] = note
      this.adapter.play(note)
    }
    this.setState({ notesPlaying })
    // console.log('MIDI data', data) // MIDI data [144, 63, 73] === [type of data, note, velocity]
  }

  private getNotes() {
    return Object.keys(this.state.notesPlaying)
      .sort()
      .map(k => this.state.notesPlaying[k])
      .join(' - ')
  }
}

export default App
