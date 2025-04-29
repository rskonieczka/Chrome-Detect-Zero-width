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
  
  // Nowe dodane znaki
  { name: 'En dash', code: 'U+2013', value: '\u2013' },
  { name: 'Left single quotation mark', code: 'U+2018', value: '\u2018' },
  { name: 'Right single quotation mark', code: 'U+2019', value: '\u2019' },
  { name: 'Paragraph separator', code: 'U+2029', value: '\u2029' },
  { name: 'End of text', code: 'U+0003', value: '\u0003' },
  { name: 'Line tabulation', code: 'U+000B', value: '\u000B' },
  { name: 'Non breaking space', code: 'U+00A0', value: '\u00A0' },
  { name: 'Left double quotation mark', code: 'U+201C', value: '\u201C' },
  { name: 'Right double quotation mark', code: 'U+201D', value: '\u201D' },
  { name: 'Pop directional formatting', code: 'U+202C', value: '\u202C' },
  
  // Dodatkowe znaki zaproponowane w analizie
  // Kontrolne znaki formatujące
  { name: 'Form Feed', code: 'U+000C', value: '\u000C' },
  { name: 'Carriage Return', code: 'U+000D', value: '\u000D' },
  
  // Białe znaki
  { name: 'Em Space', code: 'U+2003', value: '\u2003' },
  { name: 'En Space', code: 'U+2002', value: '\u2002' },
  { name: 'Thin Space', code: 'U+2009', value: '\u2009' },
  { name: 'Figure Space', code: 'U+2007', value: '\u2007' },
  { name: 'Punctuation Space', code: 'U+2008', value: '\u2008' },
  
  // Znaki matematyczne
  { name: 'Mathematical Minus', code: 'U+2212', value: '\u2212' },
  { name: 'Multiplication Sign', code: 'U+00D7', value: '\u00D7' },
  { name: 'Division Sign', code: 'U+00F7', value: '\u00F7' },
  
  // Inne znaki strukturalne
  { name: 'Line Separator', code: 'U+2028', value: '\u2028' },
  { name: 'Ogham Space Mark', code: 'U+1680', value: '\u1680' },
  { name: 'Arabic Letter Mark', code: 'U+061C', value: '\u061C' },
  { name: 'Left-to-right embedding', code: 'U+202A', value: '\u202A' },
  { name: 'Right-to-left embedding', code: 'U+202B', value: '\u202B' },
  
  // Znaki wizualnie podobne do standardowych
  { name: 'Greek Question Mark', code: 'U+037E', value: '\u037E' },
  { name: 'Full-width Semicolon', code: 'U+FF1B', value: '\uFF1B' },
  { name: 'Full-width Comma', code: 'U+FF0C', value: '\uFF0C' },
  { name: 'Full-width Period', code: 'U+FF0E', value: '\uFF0E' },
  
  // Specjalne separatory
  { name: 'Four-Per-Em Space', code: 'U+2005', value: '\u2005' },
  { name: 'Six-Per-Em Space', code: 'U+2006', value: '\u2006' },
  
  // Inne znaki sterujące
  { name: 'Substitute', code: 'U+001A', value: '\u001A' },
  { name: 'Escape', code: 'U+001B', value: '\u001B' },
  { name: 'Delete', code: 'U+007F', value: '\u007F' },
  
  // Dodatkowe różne
  { name: 'Interlinear Annotation Anchor', code: 'U+FFF9', value: '\uFFF9' },
  { name: 'Interlinear Annotation Separator', code: 'U+FFFA', value: '\uFFFA' },
  { name: 'Interlinear Annotation Terminator', code: 'U+FFFB', value: '\uFFFB' },
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
    // Powiadom background script o zmianie ustawienia i obsłuż odpowiedź
    chrome.runtime.sendMessage(
      { action: 'autoScanSettingChanged', isEnabled },
      (response) => {
        // Opcjonalna obsługa odpowiedzi (nie musimy nic robić z odpowiedzią)
        // Jeśli wystąpi błąd komunikacji, logujemy go
        if (chrome.runtime.lastError) {
          console.log('Komunikacja z background script: ', chrome.runtime.lastError.message);
        }
        
        // Opcjonalnie: zastosuj zmianę natychmiast na aktualnej stronie
        if (isEnabled) {
          // Jeśli włączono tryb automatyczny, od razu wykonaj skanowanie na obecnej stronie
          highlightBtn.click();
        } else {
          // Jeśli wyłączono, usuń podświetlenia
          clearBtn.click();
        }
      }
    );
  });
});

// Wyświetl listę znaków do wyszukania
function displayCharsList(chars) {
  charsList.innerHTML = '';
  
  chars.forEach((char, index) => {
    const item = document.createElement('div');
    item.className = 'char-item';
    
    item.innerHTML = `
      <input type="checkbox" id="char-${index}" class="char-checkbox" checked>
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
    const checkboxes = document.querySelectorAll('.char-checkbox');
    
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        checkedChars.push(chars[index]);
      }
    });
    
    if (checkedChars.length === 0) {
      alert('Wybierz przynajmniej jeden znak do wyszukania!');
      return;
    }
    
    // Wykonaj skrypt na aktywnej karcie
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Sprawdź, czy URL nie jest typu chrome:// lub about:
      const currentUrl = tabs[0].url;
      if (currentUrl.startsWith('chrome://') || currentUrl.startsWith('about:')) {
        resultsElement.textContent = 'Wtyczka nie ma dostępu do stron chrome:// lub about://';
        resultsElement.style.color = 'red';
        navigationControls.style.display = 'none';
        return;
      }
      
      // Najpierw wyślij wiadomość do content script w celu podświetlenia znaków
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'highlightChars', chars: checkedChars },
        (response) => {
          if (chrome.runtime.lastError) {
            // Jeśli wystąpił błąd komunikacji (content script nie działa), wstrzyknij i uruchom
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['content.js']
            }, () => {
              // Po załadowaniu content.js ponów próbę wysłania wiadomości
              setTimeout(() => {
                chrome.tabs.sendMessage(
                  tabs[0].id,
                  { action: 'highlightChars', chars: checkedChars },
                  (newResponse) => {
                    if (chrome.runtime.lastError) {
                      resultsElement.textContent = `Błąd: ${chrome.runtime.lastError.message}`;
                      resultsElement.style.color = 'red';
                      navigationControls.style.display = 'none';
                      return;
                    }
                    displayResults(newResponse);
                  }
                );
              }, 100); // Daj czas na załadowanie content.js
            });
            return;
          }
          
          displayResults(response);
        }
      );
    });
  });
});

// Wyświetl wyniki skanowania
function displayResults(counts) {
  if (!counts) {
    resultsElement.textContent = 'Nie udało się przetworzyć wyników.';
    navigationControls.style.display = 'none';
    return;
  }
  
  // Oblicz całkowitą liczbę znalezionych znaków
  let totalHighlighted = 0;
  Object.values(counts).forEach(count => {
    totalHighlighted += count;
  });
  
  // Aktualizuj licznik i pokaż kontrolki nawigacji
  totalCharsFound = totalHighlighted;
  currentCharIndex = totalHighlighted > 0 ? 1 : 0;
  updatePositionCounter();
  
  // Wyświetl wyniki
  if (totalHighlighted > 0) {
    let resultsText = `Znaleziono ${totalHighlighted} niewidocznych znaków:<br>`;
    
    Object.keys(counts).forEach(name => {
      if (counts[name] > 0) {
        resultsText += `${name}: ${counts[name]}<br>`;
      }
    });
    
    resultsElement.innerHTML = resultsText;
    navigationControls.style.display = 'block';
  } else {
    resultsElement.textContent = 'Nie znaleziono niewidocznych znaków na stronie.';
    navigationControls.style.display = 'none';
  }
  
  // Jeśli znaleziono znaki, skocz do pierwszego
  if (totalCharsFound > 0) {
    navigateToChar(1);
  }
}

// Wyczyść podświetlenia na aktywnej stronie
clearBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Sprawdź, czy URL nie jest typu chrome:// lub about:
    const currentUrl = tabs[0].url;
    if (currentUrl.startsWith('chrome://') || currentUrl.startsWith('about:')) {
      return; // Nie wykonuj akcji na chronionych stronach
    }
    
    // Wyślij wiadomość do content script
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'clearHighlights' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }
        
        resultsElement.textContent = 'Podświetlenia zostały usunięte.';
        navigationControls.style.display = 'none';
        totalCharsFound = 0;
        currentCharIndex = 0;
        updatePositionCounter();
      }
    );
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
    // Wyślij wiadomość do content script
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'scrollToChar', index },
      (response) => {
        // Aktualizuj licznik pozycji
        currentCharIndex = index;
        updatePositionCounter();
      }
    );
  });
}

// Aktualizacja licznika pozycji
function updatePositionCounter() {
  currentPositionEl.textContent = totalCharsFound > 0 
    ? `${currentCharIndex}/${totalCharsFound}` 
    : '0/0';
}
