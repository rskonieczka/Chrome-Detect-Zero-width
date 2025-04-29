// Ustawienia domyślne
let autoScanEnabled = false;

// Domyślna lista znaków do wyszukania (kopia z popup.js)
const defaultChars = [
  // Podstawowe znaki niewidoczne
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
  { name: 'Byte order mark (BOM)', code: 'U+FEFF', value: '\uFEFF' },
  
  // Dodatkowe znaki zgodnie z rozszerzoną listą
  { name: 'Mongolian Vowel Separator', code: 'U+180E', value: '\u180E' },
  { name: 'Left-to-Right Override', code: 'U+202D', value: '\u202D' },
  { name: 'Right-to-Left Override', code: 'U+202E', value: '\u202E' },
  { name: 'Left-to-Right Isolate', code: 'U+2066', value: '\u2066' },
  { name: 'Right-to-Left Isolate', code: 'U+2067', value: '\u2067' },
  { name: 'First Strong Isolate', code: 'U+2068', value: '\u2068' },
  { name: 'Pop Directional Isolate', code: 'U+2069', value: '\u2069' },
  { name: 'Inhibit Arabic Form Shaping', code: 'U+206A', value: '\u206A' },
  { name: 'Activate Arabic Form Shaping', code: 'U+206B', value: '\u206B' },
  { name: 'National Digit Shapes', code: 'U+206C', value: '\u206C' },
  { name: 'Nominal Digit Shapes', code: 'U+206D', value: '\u206D' },
  { name: 'Activate Symmetrical Swapping', code: 'U+206E', value: '\u206E' },
  { name: 'Inhibit Symmetrical Swapping', code: 'U+206F', value: '\u206F' },
  { name: 'Ideographic Space', code: 'U+3000', value: '\u3000' },
  { name: 'Hangul Filler', code: 'U+3164', value: '\u3164' },
  { name: 'Braille Pattern Blank', code: 'U+2800', value: '\u2800' },
  { name: 'Variation Selector-1', code: 'U+FE00', value: '\uFE00' },
  { name: 'Variation Selector-2', code: 'U+FE01', value: '\uFE01' },
  { name: 'Variation Selector-3', code: 'U+FE02', value: '\uFE02' },
  { name: 'Variation Selector-4', code: 'U+FE03', value: '\uFE03' },
  { name: 'Variation Selector-5', code: 'U+FE04', value: '\uFE04' },
  { name: 'Variation Selector-6', code: 'U+FE05', value: '\uFE05' },
  { name: 'Variation Selector-7', code: 'U+FE06', value: '\uFE06' },
  { name: 'Variation Selector-8', code: 'U+FE07', value: '\uFE07' },
  { name: 'Variation Selector-9', code: 'U+FE08', value: '\uFE08' },
  { name: 'Variation Selector-10', code: 'U+FE09', value: '\uFE09' },
  { name: 'Variation Selector-11', code: 'U+FE0A', value: '\uFE0A' },
  { name: 'Variation Selector-12', code: 'U+FE0B', value: '\uFE0B' },
  { name: 'Variation Selector-13', code: 'U+FE0C', value: '\uFE0C' },
  { name: 'Variation Selector-14', code: 'U+FE0D', value: '\uFE0D' },
  { name: 'Variation Selector-15', code: 'U+FE0E', value: '\uFE0E' },
  { name: 'Variation Selector-16', code: 'U+FE0F', value: '\uFE0F' },
  { name: 'Language Tag', code: 'U+E0001', value: '\uE0001' },
  { name: 'Tag Space', code: 'U+E0020', value: '\uE0020' },
  { name: 'Cancel Tag', code: 'U+E007F', value: '\uE007F' },
  
  // Wzorce tekstowe
  { name: 'Podwójna spacja', code: 'PATTERN', value: '  ', pattern: true },
  { name: 'Spacja przed kropką', code: 'PATTERN', value: ' .', pattern: true },
  { name: 'Spacja przed przecinkiem', code: 'PATTERN', value: ' ,', pattern: true },
  { name: 'Spacja przed średnikiem', code: 'PATTERN', value: ' ;', pattern: true },
  { name: 'Spacja przed dwukropkiem', code: 'PATTERN', value: ' :', pattern: true },
  { name: 'Spacja przed wykrzyknikiem', code: 'PATTERN', value: ' !', pattern: true },
  { name: 'Spacja przed pytajnikiem', code: 'PATTERN', value: ' ?', pattern: true }
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
    // Sprawdź, czy URL nie jest typu chrome:// lub about:
    if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('about:'))) {
      console.log('Pominięto skanowanie chronionej strony:', tab.url);
      return; // Nie wykonuj skanowania na chronionych stronach
    }
    
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
        }).catch(error => {
          console.error('Błąd podczas wykonywania skryptu:', error);
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
        if (char.pattern) {
          const regex = new RegExp(escapeRegExp(char.value), 'g');
          const matches = text.match(regex);
          
          if (matches) {
            counts[char.name] = (counts[char.name] || 0) + matches.length;
            
            // Zamień wzorzec na oznaczony span
            text = text.replace(regex, (match) => {
              return `###PATTERN_${char.name}###`;
            });
            
            modified = true;
          }
        } else {
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
        }
      } catch (e) {
        console.error(`Błąd podczas przetwarzania znaku: ${char.code || char.name}`, e);
      }
    });
    
    if (modified) {
      // Utwórz nowy element zawierający podświetlone znaki
      const fragment = document.createDocumentFragment();
      const parts = text.split(/###(PATTERN_|INVISIBLE_CHAR_)([^#]+)###/g);
      
      for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) {
          // Zwykły tekst
          fragment.appendChild(document.createTextNode(parts[i]));
        } else if (i % 3 === 1) {
          // Typ oznaczenia (PATTERN_ lub INVISIBLE_CHAR_)
          const type = parts[i];
          const code = parts[i+1];
          const span = document.createElement('span');
          span.className = 'invisible-char-highlight';
          span.title = type === 'PATTERN_' ? `Wzorzec: ${code}` : `Niewidoczny znak: ${code}`;
          span.dataset.code = code;
          span.dataset.charIndex = ++totalHighlighted;
          
          // Dodaj rzeczywisty znak lub wzorzec, ale w podświetleniu
          const charObj = type === 'PATTERN_' 
            ? chars.find(c => c.name === code) 
            : chars.find(c => c.code === code);
            
          if (charObj) {
            span.textContent = charObj.value;
          }
          
          fragment.appendChild(span);
          i++; // Pomiń następny element (kod znaku)
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
