const apiKey = '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';
const siteUrl = 'http://127.0.0.1:5500/chatai.html';
const siteName = 'ChatAI';
let chatHistory = [];
let typingMessage = null;
let isFirstInteraction = true;

marked.setOptions({
  highlight: function(code, lang) {
    return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup, lang);
  }
});

document.querySelectorAll('.template-box').forEach(box => {
  box.addEventListener('click', () => {
    const text = box.getAttribute('data-text');
    document.getElementById('inputText').value = text;
    document.getElementById('inputText').focus();
  });
});

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('inputText').value.trim();
  if (!userInput) return;

  document.getElementById('template-container').style.display = 'none';

  if (isFirstInteraction) {
    isFirstInteraction = false;
  }

  chatHistory.push({ role: "user", content: userInput });
  renderChat();

  const loadingDiv = document.createElement('div');
  loadingDiv.className = "loading-spinner";
  loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  document.getElementById('chat-container').appendChild(loadingDiv);

  document.getElementById('send-button').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": siteUrl,
      "X-Title": siteName,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "meta-llama/llama-3.3-70b-instruct:free",
      "messages": chatHistory
    })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('chat-container').removeChild(loadingDiv);
    document.getElementById('send-button').innerHTML = '<i class="fas fa-paper-plane"></i>';
    if (data && data.choices && data.choices.length > 0) {
      const aiResponse = data.choices[0].message.content;
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message ai-message';
      const icon = document.createElement('i');
      icon.className = 'fas fa-robot message-icon';
      const contentDiv = document.createElement('div');
      contentDiv.className = 'formatted-text';
      messageDiv.appendChild(icon);
      messageDiv.appendChild(contentDiv);
      document.getElementById('chat-container').appendChild(messageDiv);
      typingMessage = messageDiv;
      typeWriterEffect(contentDiv, aiResponse, () => {
        chatHistory.push({ role: "assistant", content: aiResponse });
        typingMessage = null;
        renderChat();

        const preElements = contentDiv.querySelectorAll('pre');
        preElements.forEach(pre => {
          const code = pre.querySelector('code');
          if (code) {
            const copyButton = document.createElement('button');
            copyButton.className = 'code-copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.addEventListener('click', () => {
              const codeText = code.innerText;
              navigator.clipboard.writeText(codeText).then(() => {
                alert('Kode disalin ke clipboard!');
              }).catch(err => {
                console.error('Gagal menyalin kode: ', err);
                alert('Gagal menyalin kode.');
              });
            });
            pre.style.position = 'relative';
            pre.appendChild(copyButton);
          }
        });
      });
    } else {
      alert("Tidak ada respons dari AI.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById('chat-container').removeChild(loadingDiv);
    document.getElementById('send-button').innerHTML = '<i class="fas fa-paper-plane"></i>';
    alert("Terjadi kesalahan: " + error);
  });

  document.getElementById('inputText').value = '';
});

function renderChat() {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = '';
  chatHistory.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role === 'user' ? 'user-message' : 'ai-message'}`;
    const icon = document.createElement('i');
    icon.className = `fas ${message.role === 'user' ? 'fa-user' : 'fa-robot'} message-icon`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'formatted-text';
    contentDiv.innerHTML = marked.parse(message.content);
    messageDiv.appendChild(icon);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);

    if (message.role === 'assistant') {
      const preElements = contentDiv.querySelectorAll('pre');
      preElements.forEach(pre => {
        const code = pre.querySelector('code');
        if (code) {
          const copyButton = document.createElement('button');
          copyButton.className = 'code-copy-button';
          copyButton.innerHTML = '<i class="fas fa-copy"></i>';
          copyButton.addEventListener('click', () => {
            const codeText = code.innerText;
            navigator.clipboard.writeText(codeText).then(() => {
              alert('Kode disalin ke clipboard!');
            }).catch(err => {
              console.error('Gagal menyalin kode: ', err);
              alert('Gagal menyalin kode.');
            });
          });
          pre.style.position = 'relative';
          pre.appendChild(copyButton);
        }
      });
    }
  });
  if (typingMessage) {
    chatContainer.appendChild(typingMessage);
  }
  Prism.highlightAll();
  window.scrollTo(0, document.body.scrollHeight);
}

function typeWriterEffect(element, text, callback) {
  let i = 0;
  const speed = 10;
  function type() {
    if (i < text.length) {
      element.innerHTML = marked.parse(text.substring(0, i+1));
      i++;
      setTimeout(type, speed);
    } else {
      element.innerHTML = marked.parse(text);
      Prism.highlightAll();
      callback();
    }
  }
  type();
}

const textarea = document.getElementById('inputText');
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
});

document.getElementById('new-chat').addEventListener('click', () => {
  chatHistory = [];
  document.getElementById('chat-container').innerHTML = '';
  document.getElementById('template-container').style.display = 'flex';
  isFirstInteraction = true;
  document.getElementById('inputText').value = '';
});

document.getElementById('hamburger-btn').addEventListener('click', () => {
  const menu = document.getElementById('menu-dropdown');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  const menu = document.getElementById('menu-dropdown');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (!hamburgerBtn.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});