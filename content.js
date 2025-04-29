// Ten skrypt jest wstrzykiwany do strony internetowej

// Nasłuchuj na wiadomości od popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'highlightChars') {
    const counts = highlightInvisibleChars(message.chars);
    sendResponse(counts);
    return true;
  } else if (message.action === 'clearHighlights') {
    clearHighlights();
    sendResponse({ success: true });
    return true;
  }
});

// Funkcja podświetlająca niewidoczne znaki
function highlightInvisibleChars(chars) {
  // Usuń istniejące podświetlenia
  clearHighlights();
  
  // Znajdź wszystkie węzły tekstowe na stronie
  const textNodes = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  
  let node;
  while (node = walk.nextNode()) {
    // Pomijamy węzły w elementach script, style, textarea, itp.
    const parent = node.parentNode;
    if (parent && (
      parent.tagName === 'SCRIPT' ||
      parent.tagName === 'STYLE' ||
      parent.tagName === 'TEXTAREA' ||
      parent.tagName === 'INPUT' ||
      parent.isContentEditable
    )) {
      continue;
    }
    
    textNodes.push(node);
  }
  
  const counts = {};
  chars.forEach(char => {
    counts[char.name] = 0;
  });
  
  // Przeszukaj każdy węzeł tekstowy
  textNodes.forEach(textNode => {
    let text = textNode.nodeValue;
    let modified = false;
    
    chars.forEach(char => {
      if (!char.value) return;
      
      const regex = new RegExp(escapeRegExp(char.value), 'g');
      const matches = text.match(regex);
      
      if (matches) {
        counts[char.name] = (counts[char.name] || 0) + matches.length;
        
        // Zamień niewidoczny znak na oznaczony span
        text = text.replace(regex, (match) => {
          return `###INVISIBLE_CHAR_${char.code}###`;
        });
        
        modified = true;
      }
    });
    
    if (modified) {
      // Utwórz nowy element zawierający podświetlone znaki
      const fragment = document.createDocumentFragment();
      const parts = text.split(/###INVISIBLE_CHAR_([^#]+)###/g);
      
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          // Zwykły tekst
          fragment.appendChild(document.createTextNode(parts[i]));
        } else {
          // Kod znaku
          const code = parts[i];
          const span = document.createElement('span');
          span.className = 'invisible-char-highlight';
          span.title = `Niewidoczny znak: ${code}`;
          span.dataset.code = code;
          
          // Dodaj rzeczywisty znak, ale w podświetleniu
          const charObj = chars.find(c => c.code === code);
          if (charObj) {
            span.textContent = charObj.value;
          }
          
          fragment.appendChild(span);
        }
      }
      
      // Zastąp oryginalny węzeł tekstowy
      const parent = textNode.parentNode;
      parent.replaceChild(fragment, textNode);
    }
  });
  
  return counts;
}

// Funkcja usuwająca podświetlenia
function clearHighlights() {
  const highlights = document.querySelectorAll('.invisible-char-highlight');
  
  // Przywróć oryginalne znaki
  highlights.forEach(highlight => {
    const text = document.createTextNode(highlight.textContent);
    highlight.parentNode.replaceChild(text, highlight);
  });
}

// Pomocnicza funkcja do escapowania znaków specjalnych w wyrażeniach regularnych
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
