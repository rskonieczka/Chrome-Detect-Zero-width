// Domyślna lista znaków do wyszukania
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
  { name: 'Cancel Tag', code: 'U+E007F', value: '\uE007F' }
];

// Elementy DOM
const highlightBtn = document.getElementById('highlight-btn');
const clearBtn = document.getElementById('clear-btn');
const charsList = document.getElementById('chars-list');
const charsEdit = document.getElementById('chars-edit');
const saveCharsBtn = document.getElementById('save-chars');
const resultsElement = document.getElementById('results');
const navigationControls = document.getElementById('navigation-controls');
const prevCharBtn = document.getElementById('prev-char-btn');
const nextCharBtn = document.getElementById('next-char-btn');
const currentPositionEl = document.getElementById('current-position');
const autoScanToggle = document.getElementById('auto-scan-toggle');

// Zmienne do nawigacji
let currentCharIndex = 0;
let totalCharsFound = 0;

// Inicjalizacja wtyczki
document.addEventListener('DOMContentLoaded', () => {
  // Pobierz zapisaną listę znaków lub użyj domyślnych
  chrome.storage.sync.get({ 
    invisibleChars: defaultChars,
    autoScanEnabled: false 
  }, (data) => {
    displayCharsList(data.invisibleChars);
    populateEditArea(data.invisibleChars);
    
    // Ustaw stan przełącznika automatycznego skanowania
    autoScanToggle.checked = data.autoScanEnabled;
  });
});

// Obsługa przełącznika trybu automatycznego
autoScanToggle.addEventListener('change', () => {
  const isEnabled = autoScanToggle.checked;
  
  // Zapisz ustawienie
  chrome.storage.sync.set({ autoScanEnabled: isEnabled }, () => {
    // Powiadom background script o zmianie ustawienia
    chrome.runtime.sendMessage({ action: 'autoScanSettingChanged', isEnabled });
    
    // Opcjonalnie: zastosuj zmianę natychmiast na aktualnej stronie
    if (isEnabled) {
      // Jeśli włączono tryb automatyczny, od razu wykonaj skanowanie na obecnej stronie
      highlightBtn.click();
    } else {
      // Jeśli wyłączono, usuń podświetlenia
      clearBtn.click();
    }
  });
});

// Wyświetl listę znaków do wyszukania
function displayCharsList(chars) {
  charsList.innerHTML = '';
  
  chars.forEach((char, index) => {
    const item = document.createElement('div');
    item.className = 'char-item';
    
    item.innerHTML = `
      <input type="checkbox" id="char-${index}" checked>
      <label for="char-${index}">${char.name}</label>
      <span class="char-code">${char.code}</span>
    `;
    
    charsList.appendChild(item);
  });
}

// Wypełnij pole edycji obecną listą znaków
function populateEditArea(chars) {
  const lines = chars.map(char => `${char.name},${char.code}`);
  charsEdit.value = lines.join('\n');
}

// Przetwarzanie edytowanej listy znaków
function parseEditedChars() {
  const lines = charsEdit.value.trim().split('\n');
  const chars = [];
  
  lines.forEach(line => {
    const parts = line.split(',');
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const code = parts[1].trim();
      
      // Konwersja kodu Unicode na rzeczywisty znak
      let value = '';
      try {
        // Obsługa notacji U+XXXX
        if (code.startsWith('U+')) {
          const hexCode = code.substring(2);
          value = String.fromCodePoint(parseInt(hexCode, 16));
        } 
        // Obsługa notacji \uXXXX
        else if (code.startsWith('\\u')) {
          const hexCode = code.substring(2);
          value = String.fromCodePoint(parseInt(hexCode, 16));
        }
        // Inne formaty
        else {
          value = String.fromCodePoint(parseInt(code, 16));
        }
      } catch (e) {
        console.error(`Nie można przetworzyć kodu znaku: ${code}`);
        value = '';
      }
      
      if (value) {
        chars.push({ name, code, value });
      }
    }
  });
  
  return chars;
}

// Zapisz edytowaną listę znaków
saveCharsBtn.addEventListener('click', () => {
  const chars = parseEditedChars();
  
  chrome.storage.sync.set({ invisibleChars: chars }, () => {
    displayCharsList(chars);
    alert('Lista znaków została zapisana!');
  });
});

// Podświetl niewidoczne znaki na aktywnej stronie
highlightBtn.addEventListener('click', () => {
  chrome.storage.sync.get({ invisibleChars: defaultChars }, (data) => {
    const chars = data.invisibleChars;
    
    // Pobierz zaznaczone znaki
    const checkedChars = [];
    document.querySelectorAll('.char-item input:checked').forEach((checkbox, index) => {
      if (checkbox.checked && chars[index]) {
        checkedChars.push(chars[index]);
      }
    });
    
    if (checkedChars.length === 0) {
      alert('Wybierz przynajmniej jeden znak do wyszukania!');
      return;
    }
    
    // Wykonaj skrypt na aktywnej karcie
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: highlightInvisibleChars,
        args: [checkedChars]
      }, (results) => {
        if (results && results[0] && results[0].result) {
          const counts = results[0].result.counts;
          totalCharsFound = results[0].result.totalHighlighted;
          let totalCount = 0;
          let resultsHtml = '<h3>Wyniki wyszukiwania:</h3><ul>';
          
          Object.keys(counts).forEach(charName => {
            resultsHtml += `<li>${charName}: ${counts[charName]} wystąpień</li>`;
            totalCount += counts[charName];
          });
          
          resultsHtml += '</ul>';
          resultsHtml += `<p>Razem: ${totalCount} niewidocznych znaków</p>`;
          
          resultsElement.innerHTML = resultsHtml;
          
          // Resetuj indeks i aktualizuj licznik pozycji
          currentCharIndex = totalCharsFound > 0 ? 1 : 0;
          updatePositionCounter();
          
          // Pokaż kontrolki nawigacji, jeśli znaleziono znaki
          navigationControls.style.display = totalCharsFound > 0 ? 'block' : 'none';
          
          // Jeśli znaleziono znaki, skocz do pierwszego
          if (totalCharsFound > 0) {
            navigateToChar(1);
          }
        }
      });
    });
  });
});

// Wyczyść podświetlenia na aktywnej stronie
clearBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clearHighlights
    });
    
    resultsElement.innerHTML = 'Podświetlenia zostały usunięte.';
    
    // Ukryj kontrolki nawigacji
    navigationControls.style.display = 'none';
    currentCharIndex = 0;
    totalCharsFound = 0;
  });
});

// Nawigacja do poprzedniego znaku
prevCharBtn.addEventListener('click', () => {
  if (currentCharIndex <= 1) {
    // Jeśli jesteśmy na pierwszym znaku, przejdź do ostatniego
    currentCharIndex = totalCharsFound;
  } else {
    currentCharIndex--;
  }
  navigateToChar(currentCharIndex);
});

// Nawigacja do następnego znaku
nextCharBtn.addEventListener('click', () => {
  if (currentCharIndex >= totalCharsFound) {
    // Jeśli jesteśmy na ostatnim znaku, przejdź do pierwszego
    currentCharIndex = 1;
  } else {
    currentCharIndex++;
  }
  navigateToChar(currentCharIndex);
});

// Funkcja do nawigacji do określonego znaku
function navigateToChar(index) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: scrollToHighlightedChar,
      args: [index]
    });
    
    // Aktualizuj licznik pozycji
    currentCharIndex = index;
    updatePositionCounter();
  });
}

// Aktualizacja licznika pozycji
function updatePositionCounter() {
  currentPositionEl.textContent = totalCharsFound > 0 
    ? `${currentCharIndex}/${totalCharsFound}` 
    : '0/0';
}

// Funkcja wykonywana na stronie - podświetlanie znaków
function highlightInvisibleChars(chars) {
  // Usuń istniejące podświetlenia
  clearHighlights();
  
  // Znajdź wszystkie węzły tekstowe na stronie
  const textNodes = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  
  let node;
  while (node = walk.nextNode()) {
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
      const regex = new RegExp(char.value, 'g');
      const matches = text.match(regex);
      
      if (matches) {
        counts[char.name] += matches.length;
        
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
          span.dataset.charIndex = ++totalHighlighted; // Przypisz indeks do znaku
          
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

// Funkcja wykonywana na stronie - usuwanie podświetleń
function clearHighlights() {
  const highlights = document.querySelectorAll('.invisible-char-highlight');
  
  // Przywróć oryginalne znaki
  highlights.forEach(highlight => {
    const text = document.createTextNode(highlight.textContent);
    highlight.parentNode.replaceChild(text, highlight);
  });
}
