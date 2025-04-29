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
  } else if (message.action === 'scrollToChar') {
    const result = scrollToHighlightedChar(message.index);
    sendResponse({ success: result });
    return true;
  } else if (message.action === 'ping') {
    // Odpowiedź na ping, aby background.js wiedział, że content.js jest załadowany
    sendResponse({ status: 'ok' });
    return true;
  }
});

// Funkcja podświetlająca niewidoczne znaki
function highlightInvisibleChars(chars) {
  // Usuń istniejące podświetlenia
  clearHighlights();
  
  // Sprawdź, czy jesteśmy w Dokumentach Google
  const isGoogleDocs = window.location.hostname.includes('docs.google.com');
  
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
      // Nie pomijamy elementów contentEditable, jeśli jesteśmy w Dokumentach Google
      (!isGoogleDocs && parent.isContentEditable)
    )) {
      continue;
    }
    
    textNodes.push(node);
  }
  
  const counts = {};
  chars.forEach(char => {
    counts[char.name] = 0;
  });
  
  let totalHighlighted = 0;
  let uniqueId = 0; // Dodajemy unikalny identyfikator dla każdego znalezionego znaku
  
  // Przeszukaj każdy węzeł tekstowy
  textNodes.forEach(textNode => {
    let text = textNode.nodeValue;
    let modified = false;
    
    chars.forEach(char => {
      if (!char.value) return;
      
      const regex = new RegExp(escapeRegExp(char.value), 'g');
      const matches = text.match(regex);
      
      if (matches) {
        const matchCount = matches.length;
        counts[char.name] = (counts[char.name] || 0) + matchCount;
        
        // Zamień każde wystąpienie na unikalny marker
        text = text.replace(regex, (match) => {
          uniqueId++;
          return `###INVISIBLE_CHAR_${char.code}_${uniqueId}###`;
        });
        
        modified = true;
      }
    });
    
    if (modified) {
      // Utwórz nowy element zawierający podświetlone znaki
      const fragment = document.createDocumentFragment();
      const parts = text.split(/###INVISIBLE_CHAR_([^#_]+)_(\d+)###/g);
      
      for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) {
          // Zwykły tekst
          fragment.appendChild(document.createTextNode(parts[i]));
        } else if (i % 3 === 1) {
          // Kod znaku
          const code = parts[i];
          const id = parts[i+1]; // Ignorujemy identyfikator, potrzebny tylko do rozróżnienia markerów
          
          const span = document.createElement('span');
          span.className = 'invisible-char-highlight';
          
          // Dodaj rzeczywisty znak, ale w podświetleniu
          const charObj = chars.find(c => c.code === code);
          
          // Dodanie nazwy znaku do podpowiedzi
          span.title = `Niewidoczny znak: ${charObj ? charObj.name : ''} (${code})`;
          span.dataset.code = code;
          span.dataset.charIndex = ++totalHighlighted; // Przypisz indeks do znaku
          
          if (charObj) {
            span.textContent = charObj.value;
          }
          
          fragment.appendChild(span);
          i++; // Pomiń następny element (identyfikator)
        }
      }
      
      // Zastąp oryginalny węzeł tekstowy
      const parent = textNode.parentNode;
      parent.replaceChild(fragment, textNode);
    }
  });
  
  // Obsługa specyficzna dla Dokumentów Google - dodatkowe skanowanie edytowalnej zawartości
  if (isGoogleDocs) {
    totalHighlighted += scanGoogleDocsContent(chars, counts);
  }
  
  return counts;
}

// Funkcja do skanowania zawartości Dokumentów Google
function scanGoogleDocsContent(chars, counts) {
  // Znajdujemy główny edytowalny obszar w Dokumentach Google
  const editorElements = document.querySelectorAll('.kix-appview-editor');
  
  if (editorElements.length === 0) return 0;
  
  // Główny edytor Dokumentów Google
  const editor = editorElements[0];
  
  // Znajdujemy wszystkie linie tekstu w edytorze
  const lineElements = editor.querySelectorAll('.kix-lineview-content');
  
  let totalHighlightedInDocs = 0;
  let uniqueId = 10000; // Zaczynamy od wysokiej wartości, aby uniknąć kolizji z innymi identyfikatorami
  
  lineElements.forEach(lineElement => {
    // Znajdujemy wszystkie span'y z tekstem
    const textSpans = lineElement.querySelectorAll('.kix-wordhtmlgenerator-word-node');
    
    textSpans.forEach(span => {
      let text = span.textContent;
      let modified = false;
      
      chars.forEach(char => {
        if (!char.value) return;
        
        const regex = new RegExp(escapeRegExp(char.value), 'g');
        const matches = text.match(regex);
        
        if (matches) {
          counts[char.name] = (counts[char.name] || 0) + matches.length;
          totalHighlightedInDocs += matches.length;
          
          // W przypadku Google Docs tworzymy osobny span dla każdego znaku
          matches.forEach(() => {
            uniqueId++;
            
            // Tworzymy nowego spana z podświetleniem
            const highlightSpan = document.createElement('span');
            highlightSpan.className = 'invisible-char-highlight gdocs-highlight';
            highlightSpan.title = `Niewidoczny znak: ${char.name} (${char.code})`;
            highlightSpan.dataset.code = char.code;
            highlightSpan.dataset.charIndex = uniqueId;
            highlightSpan.textContent = char.value;
            
            // Dodajemy do oryginalnego spana informację
            span.style.position = 'relative';
            span.appendChild(highlightSpan);
          });
          
          modified = true;
        }
      });
    });
  });
  
  return totalHighlightedInDocs;
}

// Funkcja do przewijania do określonego znaku
function scrollToHighlightedChar(index) {
  // Znajdź znak o danym indeksie
  const charElement = document.querySelector(`.invisible-char-highlight[data-char-index="${index}"]`);
  
  if (charElement) {
    // Usuń klasę aktywną ze wszystkich znaków
    document.querySelectorAll('.invisible-char-highlight.active').forEach(el => {
      el.classList.remove('active');
    });
    
    // Dodaj klasę aktywną do bieżącego znaku
    charElement.classList.add('active');
    
    // Przewiń do znaku
    charElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Opcjonalnie: dodaj dodatkowe efekty wizualne
    charElement.style.transition = 'all 0.3s';
    charElement.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
      charElement.style.transform = 'scale(1)';
    }, 500);
    
    return true;
  }
  
  return false;
}

// Funkcja usuwająca podświetlenia
function clearHighlights() {
  const highlights = document.querySelectorAll('.invisible-char-highlight');
  
  // Przywróć oryginalne znaki
  highlights.forEach(highlight => {
    // Sprawdzamy, czy to highlight w Google Docs
    if (highlight.classList.contains('gdocs-highlight')) {
      // Usuwamy tylko element highlight, nie zmieniając oryginalnego tekstu
      highlight.parentNode.removeChild(highlight);
    } else {
      // Standardowe zachowanie dla zwykłych stron
      const text = document.createTextNode(highlight.textContent);
      highlight.parentNode.replaceChild(text, highlight);
    }
  });
}

// Pomocnicza funkcja do escapowania znaków specjalnych w wyrażeniach regularnych
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
