module.export = function show(content) {
  console.log('content: ', content);
  window.document.getElementById('app').innerText = 'hello,' + content
}