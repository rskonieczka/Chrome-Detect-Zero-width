// Ustawienia domyślne
let autoScanEnabled = false;

// Domyślna lista znaków do wyszukania (kopia z popup.js)
const defaultChars = [
  { name: 'Zero-width space', code: 'U+200B', value: '\u200B' },
  { name: 'Zero-width non-joiner', code: 'U+200C', value: '\u200C' },
  { name: 'Zero-width joiner', code: 'U+200D', value: '\u200D' },
  { name: 'Left-to-right mark', code: 'U+200E', value: '\u200E' },
  { name: 'Right-to-left mark', code: 'U+200F', value: '\u200F' },
  { name: 'Word joiner', code: 'U+2060', value: '\u2060' },
  { name: 'Function application', code: 'U+2061', value: '\u2061' },
  { name: 'Invisible times', code: 'U+2062', value: '\u2062' },
  { name: 'Invisible separator', code: 'U+2063', value: '\u2063' },
  { name: 'Invisible plus', code: 'U+2064', value: '\u2064' },
  { name: 'Hair space', code: 'U+200A', value: '\u200A' },
  { name: 'Narrow no-break space', code: 'U+202F', value: '\u202F' },
  { name: 'Medium mathematical space', code: 'U+205F', value: '\u205F' },
  { name: 'Soft hyphen', code: 'U+00AD', value: '\u00AD' },
  { name: 'Object replacement character', code: 'U+FFFC', value: '\uFFFC' },
  { name: 'Byte order mark (BOM)', code: 'U+FEFF', value: '\uFEFF' }
];

// Inicjalizacja - wczytaj zapisane ustawienia
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({ 
    autoScanEnabled: false,
    invisibleChars: defaultChars 
  }, (data) => {
    autoScanEnabled = data.autoScanEnabled;
  });
});

// Nasłuchuj na wiadomości z popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'autoScanSettingChanged') {
    autoScanEnabled = message.isEnabled;
    
    // Aktualizuj ikonę, aby pokazać, czy tryb automatyczny jest włączony
    updateExtensionIcon(autoScanEnabled);
  }
  
  // Zawsze zwracaj true, aby obsłużyć komunikację asynchroniczną
  return true;
});

// Funkcja aktualizująca ikonę wtyczki
function updateExtensionIcon(isEnabled) {
  // Zmieniamy wygląd ikony, aby pokazać stan trybu automatycznego
  const iconPath = isEnabled 
    ? { path: { 16: "images/icon16_active.png", 48: "images/icon48_active.png", 128: "images/icon128_active.png" } }
    : { path: { 16: "images/icon16.png", 48: "images/icon48.png", 128: "images/icon128.png" } };
  
  chrome.action.setIcon(iconPath);
}

// Nasłuchuj na zmianę karty
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Wykonaj skanowanie tylko gdy strona jest w pełni załadowana i tryb automatyczny jest włączony
  if (changeInfo.status === 'complete' && autoScanEnabled) {
    // Pobierz zapisane znaki
    chrome.storage.sync.get({ invisibleChars: defaultChars }, (data) => {
      const chars = data.invisibleChars;
      
      // Sprawdź, czy wszystkie znaki mają poprawny format
      const validChars = chars.filter(char => char.value);
      
      if (validChars.length > 0) {
        // Wykonaj skanowanie strony
        chrome.scripting.executeScript({
          target: { tabId },
          function: highlightInvisibleChars,
          args: [validChars]
        });
      }
    });
  }
});

// Funkcja wykonywana na stronie - skopiowana z content.js
function highlightInvisibleChars(chars) {
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
  
  let totalHighlighted = 0;
  
  // Przeszukaj każdy węzeł tekstowy
  textNodes.forEach(textNode => {
    let text = textNode.nodeValue;
    let modified = false;
    
    chars.forEach(char => {
      if (!char.value) return;
      
      try {
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
      } catch (e) {
        console.error(`Błąd podczas przetwarzania znaku: ${char.code}`, e);
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
          span.dataset.charIndex = ++totalHighlighted;
          
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
  
  return { counts, totalHighlighted };
}

// Pomocnicza funkcja do escapowania znaków specjalnych w wyrażeniach regularnych
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
