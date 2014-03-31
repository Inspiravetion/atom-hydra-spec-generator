Hydra-pec-enerator = require '../lib/hydra--spec--generator'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "Hydra-pec-enerator", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('hydra-pec-enerator')

  describe "when the hydra--spec--generator:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.hydra--spec--generator')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'hydra--spec--generator:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.hydra--spec--generator')).toExist()
        atom.workspaceView.trigger 'hydra--spec--generator:toggle'
        expect(atom.workspaceView.find('.hydra--spec--generator')).not.toExist()
