'use babel';

import BoSlotTerbaikView from './bo-slot-terbaik-view';
import { CompositeDisposable } from 'atom';

export default {

  boSlotTerbaikView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.boSlotTerbaikView = new BoSlotTerbaikView(state.boSlotTerbaikViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.boSlotTerbaikView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bo-slot-terbaik:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.boSlotTerbaikView.destroy();
  },

  serialize() {
    return {
      boSlotTerbaikViewState: this.boSlotTerbaikView.serialize()
    };
  },

  toggle() {
    console.log('BoSlotTerbaik was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
