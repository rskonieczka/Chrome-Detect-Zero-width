# Wykrywacz niewidocznych znaków

Wtyczka do przeglądarki Chrome służąca do wyszukiwania i podświetlania niewidocznych znaków, takich jak zero-width space (U+200B) i zero-width non-joiner (U+200C).

## Funkcje

- Wyszukiwanie i podświetlanie niewidocznych znaków na stronach internetowych
- Możliwość dostosowania listy wyszukiwanych znaków
- Statystyki znalezionych znaków
- Wyraźne podświetlanie niewidocznych znaków z animacją

## Domyślnie wyszukiwane znaki

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

## Instalacja

1. Otwórz Chrome i przejdź do `chrome://extensions/`
2. Włącz "Tryb dewelopera" (przełącznik w prawym górnym rogu)
3. Kliknij przycisk "Załaduj rozpakowane" i wybierz folder z wtyczką
4. Wtyczka powinna pojawić się na liście zainstalowanych rozszerzeń

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
- Manifest V3 (najnowsza wersja API Chrome Extensions)
- JavaScript do wyszukiwania i podświetlania znaków
- CSS do stylizacji podświetleń
- Chrome Storage API do zapisywania ustawień