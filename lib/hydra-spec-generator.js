var MarkdownPreviewView = require('/Applications/Atom.app/Contents/Resources/app/node_modules/markdown-preview/lib/markdown-preview-view.js');
var url = require('url');
var fs = require('fs');

function to_file(html, markdown_css, style_css, suffix){
  var body = document.createElement('div');

  body.appendChild(style_css);
  body.appendChild(markdown_css);
  html.appendTo(body);

  fs.writeFile(
    '/Users/Charlie/Projects/Hydra/Dev_Helpers/HydraSpec' + suffix + '.html',
    '<!DOCTYPE html><head></head><body>' + body.outerHTML + '</body>',
    function(err){
      if (err){
        console.log(err);
      }
    }
  );
}

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

    var dark_syntax_css = document.createElement('link');
    dark_syntax_css.setAttribute('href', 'monokai-syntax.css');
    dark_syntax_css.setAttribute('media', 'all');
    dark_syntax_css.setAttribute('rel', 'stylesheet');

    var light_syntax_css = document.createElement('link');
    light_syntax_css.setAttribute('href', 'atom-light-syntax.css');
    light_syntax_css.setAttribute('media', 'all');
    light_syntax_css.setAttribute('rel', 'stylesheet');

    var markdown_css = document.createElement('link');
    markdown_css.setAttribute('href', 'html_to_pdf.css');
    markdown_css.setAttribute('media', 'all');
    markdown_css.setAttribute('rel', 'stylesheet');

    to_file(html, markdown_css, dark_syntax_css, '-dark');
    to_file(html, markdown_css, light_syntax_css, '-light');
  },
};
