var MarkdownPreviewView = require('/Applications/Atom.app/Contents/Resources/app/node_modules/markdown-preview/lib/markdown-preview-view.js');
var url = require('url');
var fs = require('fs');

module.exports = {
  activate: function() {
    console.log('registering command');

    atom.workspaceView.command(
      'hydra-spec-generator:log-html',
      this.html
    );
  },

  html: function() {
    console.log('html got called');
    var editor = atom.workspace.getActiveEditor();
    var mpv = new MarkdownPreviewView(editor);
    var html = mpv.renderMarkdownText(editor.getText());

    var body = document.createElement('div');

    var markdown_css = document.createElement('link');
    markdown_css.setAttribute('href', 'monokai-syntax.css');
    markdown_css.setAttribute('media', 'all');
    markdown_css.setAttribute('rel', 'stylesheet');

    var syntax_css = document.createElement('link');
    syntax_css.setAttribute('href', 'html_to_pdf.css');
    syntax_css.setAttribute('media', 'all');
    syntax_css.setAttribute('rel', 'stylesheet');

    body.appendChild(markdown_css);
    body.appendChild(syntax_css);
    html.appendTo(body);

    fs.writeFile(
      '/Users/Charlie/Projects/Hydra/Dev_Helpers/HydraSpec.html',
      '<!DOCTYPE html><head></head><body>' + body.outerHTML + '</body>',
      function(err){
        if (err){
          console.log(err);
        }
      }
    );
  }
};
