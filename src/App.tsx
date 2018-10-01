import { Layout } from 'antd'
import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tone from 'tone'
import { midiToNote } from './lib/midiToNote'
import { Home } from './pages'

let synth = new Tone.Synth().toMaster()

let { Header, Footer, Content, Sider } = Layout

function handleMidiMessage(message: any) {
  let { data } = message // this gives us our [command/channel, note, velocity] data.
  let [command, note] = data

  // let newVelocity = velocity / 127;

  switch(command) {
    case 144:
      synth.triggerAttack(midiToNote[note])
    case 128:
      synth.triggerRelease()
  }

  console.log('MIDI data', data) // MIDI data [144, 63, 73] === [type of data, note, velocity]
}

class App extends React.Component {
  componentDidMount() {
    navigator.requestMIDIAccess().then(
      access => {
        let midiAccess = access
        let { inputs } = midiAccess
        let inputIterators = inputs.values()

        let firstInput = inputIterators.next().value

        if (!firstInput) return

        firstInput.onmidimessage = handleMidiMessage
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
            <Route path="/" component={Home} />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Router>
    )
  }
}

export default App
