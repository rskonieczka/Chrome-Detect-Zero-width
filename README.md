# Wykrywacz niewidocznych znaków

Wtyczka do przeglądarki Chrome służąca do wyszukiwania i podświetlania niewidocznych znaków, takich jak zero-width space (U+200B) i zero-width non-joiner (U+200C).

## Funkcje

- Wyszukiwanie i podświetlanie niewidocznych znaków na stronach internetowych
- Możliwość dostosowania listy wyszukiwanych znaków
- Statystyki znalezionych znaków
- Wyraźne podświetlanie niewidocznych znaków z animacją
- Obsługa chronionych stron (chrome://, about://)

## Domyślnie wyszukiwane znaki

### Podstawowe znaki niewidoczne
- Zero-width space (U+200B) - niewidoczna spacja o zerowej szerokości
- Zero-width non-joiner (U+200C) - znak zapobiegający łączeniu znaków
- Zero-width joiner (U+200D) - znak wymuszający łączenie znaków
- Left-to-right mark (U+200E) - niewidoczny znak sterujący kierunkiem tekstu od lewej do prawej
- Right-to-left mark (U+200F) - niewidoczny znak sterujący kierunkiem tekstu od prawej do lewej
- Word joiner (U+2060) - niewidoczny znak łączący słowa, podobny do ZWSP
- Function application (U+2061) - niewidoczny znak matematyczny "zastosowania funkcji"
- Invisible times (U+2062) - niewidoczny znak mnożenia w notacji matematycznej
- Invisible separator (U+2063) - niewidoczny separator w notacji matematycznej
- Invisible plus (U+2064) - niewidoczny znak dodawania w notacji matematycznej
- Hair space (U+200A) - bardzo wąska spacja
- Narrow no-break space (U+202F) - wąska niełamliwa spacja
- Medium mathematical space (U+205F) - średnia spacja matematyczna
- Soft hyphen (U+00AD) - miękki łącznik, widoczny tylko przy łamaniu linii
- Object replacement character (U+FFFC) - znak zastępujący obiekt
- Byte order mark (BOM) (U+FEFF) - znacznik kolejności bajtów

### Dodatkowe znaki Unicode
- Mongolian Vowel Separator (U+180E) - cienka spacja w piśmie mongolskim
- Left-to-Right Override (U+202D) - wymusza kierunek zapisu od lewej do prawej
- Right-to-Left Override (U+202E) - wymusza kierunek zapisu od prawej do lewej
- Left-to-Right Isolate (U+2066) - izoluje fragment tekstu od lewej do prawej
- Right-to-Left Isolate (U+2067) - izoluje fragment tekstu od prawej do lewej
- First Strong Isolate (U+2068) - izoluje tekst i wykrywa pierwszy mocny kierunek
- Pop Directional Isolate (U+2069) - kończy izolację kierunku
- Inhibit/Activate Arabic Form Shaping (U+206A, U+206B) - przestarzałe znaki kontrolne
- National/Nominal Digit Shapes (U+206C, U+206D) - przestarzałe znaki kontrolne
- Activate/Inhibit Symmetrical Swapping (U+206E, U+206F) - przestarzałe znaki kontrolne
- Ideographic Space (U+3000) - pełnoszerokowa spacja w CJK
- Hangul Filler (U+3164) - pusty glif, używany w koreańskim Hangul
- Braille Pattern Blank (U+2800) - niewidoczny znak brajlowski stałej szerokości
- Variation Selectors 1-16 (U+FE00-U+FE0F) - modyfikatory poprzedniego znaku
- Language Tag (U+E0001) - tag języka
- Tag Space (U+E0020) - spacja używana w tagach
- Cancel Tag (U+E007F) - anuluje działanie tagu

## Instalacja

1. Otwórz Chrome i przejdź do `chrome://extensions/`
2. Włącz "Tryb dewelopera" (przełącznik w prawym górnym rogu)
3. Kliknij przycisk "Załaduj rozpakowane" i wybierz folder z wtyczką
4. Wtyczka powinna pojawić się na liście zainstalowanych rozszerzeń

## Podgląd działania

![Podgląd działania wtyczki](podglad.png)

*Na powyższym obrazku widać interfejs wtyczki oraz sposób podświetlania niewidocznych znaków na stronie.*

### Wykrywanie niewidocznych znaków

Wtyczka podświetla niewidoczne znaki na stronie, czyniąc je łatwymi do wykrycia:

```
Normalny tekst zawiera​niewidoczne​znaki, które są trudne do zauważenia.
```

Po aktywacji wtyczki:

```
Normalny tekst [ZWSP] zawiera [ZWSP] niewidoczne [ZWSP] znaki, które są trudne do zauważenia.
```

### Interfejs użytkownika

Wtyczka oferuje przejrzysty interfejs użytkownika z następującymi elementami:
- Panel z przyciskami "Podświetl niewidoczne znaki" i "Wyczyść podświetlenia"
- Przełącznik trybu automatycznego
- Panel nawigacji z przyciskami "Poprzedni" i "Następny"
- Listę wykrywanych znaków z możliwością edycji
- Sekcję statystyk pokazującą znalezione znaki

### Tryb automatyczny

Po włączeniu trybu automatycznego ikona wtyczki zmienia wygląd, sygnalizując aktywny tryb:
- Standardowa ikona: ![Standardowa ikona](images/icon48.png) (tryb manualny)
- Ikona w trybie automatycznym: ![Ikona aktywna](images/icon48_active.png) (skanowanie automatyczne)

### Nawigacja po znakach

Po znalezieniu niewidocznych znaków, wtyczka umożliwia nawigację między nimi:
- Aktualnie wybrany znak jest podświetlony z animacją pulsowania
- Licznik pokazuje bieżącą pozycję i łączną liczbę znalezionych znaków (np. "3/7")
- Przyciski "Poprzedni" i "Następny" pozwalają łatwo przemieszczać się między znakami

## Użycie

1. Kliknij ikonę wtyczki na pasku narzędzi Chrome
2. Kliknij przycisk "Podświetl niewidoczne znaki", aby wyszukać i podświetlić niewidoczne znaki na aktualnie otwartej stronie
3. Użyj przycisku "Wyczyść podświetlenia", aby usunąć podświetlenia
4. Możesz edytować listę wyszukiwanych znaków w polu tekstowym i zapisać ją za pomocą przycisku "Zapisz listę"
5. Użyj przycisków "Poprzedni" i "Następny" do nawigacji między znalezionymi znakami
6. Włącz opcję "Tryb automatyczny", aby wtyczka automatycznie skanowała każdą odwiedzaną stronę:
   - Po włączeniu tej opcji, ikona wtyczki zmieni swój wygląd na pomarańczowy z zielonym znacznikiem "A"
   - Wszystkie niewidoczne znaki będą automatycznie podświetlane na każdej stronie
   - Możesz w dowolnym momencie wyłączyć tę opcję, aby powrócić do trybu manualnego

## Dodawanie własnych znaków do wyszukiwania

Format dodawania znaków w polu edycji:
```
Nazwa znaku,Kod Unicode
```

Przykład:
```
Zero-width space,U+200B
Zero-width non-joiner,U+200C
Word joiner,U+2060
```

## Informacje techniczne

Wtyczka wykorzystuje:
- Manifest V3 dla rozszerzeń Chrome
- Chrome Storage API do przechowywania ustawień
- Chrome Scripting API do wstrzykiwania skryptów
- Service Worker (background.js) do obsługi trybu automatycznego
- MutationObserver do wykrywania zmian w DOM

Struktura projektu:
- `manifest.json` - plik konfiguracyjny rozszerzenia
- `popup.html` - interfejs użytkownika z kontrolkami
- `popup.js` - logika interfejsu i komunikacja z content.js
- `content.js` - wykrywanie i podświetlanie niewidocznych znaków
- `background.js` - service worker odpowiedzialny za tryb automatyczny
- `styles.css` - style dla podświetlania i interfejsu
- `images/` - ikony w różnych rozmiarach i wariantach
- `test_page.html` - strona testowa z przykładami niewidocznych znaków

## Znane ograniczenia

- Wtyczka nie wykrywa znaków w elementach iframe z innych domen (ograniczenie bezpieczeństwa)
- Niektóre strony z zaawansowanym JavaScript mogą dynamicznie modyfikować DOM, co może wpływać na podświetlenia
- Znaki Unicode z wyższych płaszczyzn (np. niektóre znaki TAG) mogą nie być obsługiwane w starszych przeglądarkach
- Wtyczka nie działa na stronach chrome:// i about:// ze względu na ograniczenia bezpieczeństwa Chrome

## Ostatnie aktualizacje

### Wersja 1.3 (29.04.2025)
- Naprawiono działanie trybu automatycznego przy przełączaniu między kartami
- Zoptymalizowano kod do skanowania kart poprzez wydzielenie wspólnej funkcjonalności
- Poprawiono obsługę zdarzeń przeglądarki dla lepszego wykrywania znaków

### Wersja 1.2 (29.04.2025)
- Ulepszono interfejs użytkownika z rozwijanymi sekcjami funkcji
- Dodano obsługę chronionych stron (chrome://, about://)
- Rozbudowano listę wspieranych znaków Unicode (50+ typów)
- Poprawiono obsługę błędów i raportowanie problemów

### Wersja 1.1 (poprzednia)
- Dodano tryb automatycznego skanowania
- Dodano nawigację po znalezionych znakach (Poprzedni/Następny)
- Dodano animacje dla lepszej widoczności znalezionych znaków
- Rozszerzono listę wspieranych znaków Unicode

## Diagnostyka problemów

Jeśli wtyczka nie działa poprawnie:
1. Upewnij się, że wtyczka ma uprawnienia do wszystkich stron (`<all_urls>`)
2. Sprawdź, czy tryb automatyczny jest włączony, jeśli oczekujesz automatycznego skanowania
3. Odśwież stronę po włączeniu trybu automatycznego
4. Sprawdź konsolę deweloperską (`F12`) pod kątem błędów

## Licencja

MIT

## Autor

Oryginalny pomysł i implementacja: Rafał Skonieczka
