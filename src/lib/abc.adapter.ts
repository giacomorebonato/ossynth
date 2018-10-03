export class AbcAdapter {
  private attackCallBack: (note) => void
  private releaseCallback: (note) => void

  setAttackCallback(cb: (note) => void) {
    if (this.attackCallBack) {
      console.warn('A play callback is already set')
    }
    this.attackCallBack = cb
  }

  setReleaseCallback(cb: (note) => void) {
    if (this.releaseCallback) {
      console.warn('A release callback is already set')
    }
    this.releaseCallback = cb
  }

  play(note: string) {
    if (!this.attackCallBack) {
      throw Error('No play callback')
    }

    this.attackCallBack(this.transformNote(note))
  }

  release(note: string) {
    if (!this.releaseCallback) {
      throw Error('No release callback')
    }

    this.releaseCallback(this.transformNote(note))
  }

  // TODO: do a proper parsing of note
  private transformNote(note: string): string {
    return note.replace(/[0-9]/g, '')
  }
}
