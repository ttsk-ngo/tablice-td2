# Parametry URL - Dokumentacja

Aplikacja tablice-td2 może być w pełni sterowana przez parametry URL, co umożliwia integrację z symulatorami lub używanie jako "headless" display.

## 🎯 Podstawowe parametry

### `station` (wymagany)
Nazwa scenerii do wyświetlenia
```
?station=Krakow_Glowny
?station=Tomaszow_Mazowiecki
```
**Uwaga:** Spacje w nazwach zastąp przez `_` (underscore)

### `checkpoint` (opcjonalny)
Konkretny punkt posterunkowy na scenerii
```
?station=Krakow_Glowny&checkpoint=Krakow_Glowny,R1
```

### `region` (opcjonalny, domyślnie: `eu`)
Serwer TD2
- `PL1` lub `eu` - serwer PL1 (domyślny)
- `PL2` lub `cae` - serwer PL2
- `DE` lub `usw` - serwer DE
- `CZ` lub `us` - serwer CZ

```
?station=Example&region=PL2
```

---

## 🎨 Wygląd i typ tablicy

### `type` (opcjonalny, domyślnie: `krakow`)
Styl wizualny tablicy
- `tomaszow` - styl Tomaszów Mazowiecki
- `krakow` - styl Kraków Główny
- `starysacz` - styl Stary Sącz
- `plakat` - styl Plakat
- `wyciag` - styl Wyciąg z rozkładu jazdy

```
?type=plakat
```

### `timetables` (opcjonalny, domyślnie: `arrival`)
Typ tablicy
- `departure` - odjazdy
- `arrival` - przyjazdy

```
?timetables=departure
```

### `size` (opcjonalny, domyślnie: `normal`)
Rozmiar interfejsu (tylko dla `type=krakow`)
- `normal` - normalny rozmiar
- `enlarged` - powiększony

```
?type=krakow&size=enlarged
```

---

## 🚂 Filtry pociągów

### `trainTypes` (opcjonalny, domyślnie: `EMRP`)
Typy pociągów do wyświetlenia (maska bitowa kategorii)
- `E` - Express (EI, EC, EN)
- `M` - Majowe (MP, MH, MM, MO)
- `R` - Regionalne (RP, RA, RM, RO/AP)
- `P` - Pospieszne (poprzednie kategorie)
- `T` - Towarowe
- `L` - Luzem
- `Z` - Utrzymaniowe/Naprawcze

**Można łączyć wartości przecinkami:**
```
?trainTypes=EMRP        # Tylko pasażerskie
?trainTypes=E,M,R,P,T   # Pasażerskie + towarowe
?trainTypes=T,L,Z       # Tylko towarowe/specjalne
```

### `trainCategory` (opcjonalny)
Dokładne kategorie pociągów do wyświetlenia (lista kodów)

Dostępne kategorie:
- Express: `EI`, `EC`, `EN`
- Majowe: `MP`, `MH`, `MM`, `MO`
- Regionalne: `RP`, `RA`, `RM`, `RO` (AP)
- Towarowe: `TC`, `TG`, `TR`, `TD`, `TM`, `TN`, `TK`, `TS`
- Lokomotywy: `LP`, `LT`, `LS`

```
?trainCategory=EC,IC,EIP
?trainCategory=RP,RA
```

---

## 📍 Filtry punktów pośrednich

### `stopTypes` (opcjonalny, domyślnie: `ph`)
Jakie punkty pośrednie pokazywać
- `ph` - posterunek manewrowy handlowy
- `pt` - posterunek techniczny
- `pm` - posterunek manewrowy
- `all` - wszystkie punkty pośrednie

**Można łączyć wartości przecinkami (oprócz `all`):**
```
?stopTypes=ph
?stopTypes=ph,pt,pm
?stopTypes=all
```

### `isStopped` (opcjonalny, domyślnie: `false`)
Pokazuj tylko rozkłady z postojem na stacji
```
?isStopped=true
?isStopped=false
```

---

## 📜 Opcje wyświetlania

### `showOperators` (opcjonalny, domyślnie: `false`)
Pokazuj przewoźników na tablicach
```
?showOperators=true
```

### `showHistory` (opcjonalny, domyślnie: `false`)
Pokazuj rozkłady historyczne (zakończone)
```
?showHistory=true
```

### `isFulfilled` (opcjonalny, domyślnie: `false`)
Pokazuj rozkłady niezrealizowane
```
?isFulfilled=true
```

### `isTerminated` (opcjonalny, domyślnie: `true`)
Pokazuj rozkłady zakończone
```
?isTerminated=true
```

---

## ⚙️ Opcje techniczne

### `refreshTime` (opcjonalny, domyślnie: `60`)
Czas odświeżania danych w sekundach
```
?refreshTime=30
?refreshTime=120
```

### `hideUI` (opcjonalny, domyślnie: `false`)
Ukryj przyciski interfejsu użytkownika
```
?hideUI=true
```

### `mode=kiosk` (legacy, zachowane dla kompatybilności)
Aktywuje tryb kiosk (ukrywa UI). **Uwaga:** w poprzedniej wersji nadpisywał inne parametry, teraz tylko ukrywa UI.
```
?mode=kiosk
```
**Zalecane:** Użyj `hideUI=true` zamiast `mode=kiosk`

---

## 📋 Przykłady użycia

### Przykład 1: Podstawowa tablica odjazdów
```
?station=Krakow_Glowny&timetables=departure&type=krakow
```

### Przykład 2: Tablica w trybie kiosk z historią
```
?station=Tomaszow_Mazowiecki&type=plakat&showHistory=true&hideUI=true
```

### Przykład 3: Tylko pociągi express na serwerze PL2
```
?station=Warszawa_Centralna&region=PL2&trainTypes=E&trainCategory=EC,EIC,EIP
```

### Przykład 4: Pełna konfiguracja dla symulatora
```
?station=Krakow_Glowny
&checkpoint=Krakow_Glowny,R1
&region=eu
&type=krakow
&size=enlarged
&timetables=departure
&trainTypes=EMRP
&stopTypes=ph,pt
&showOperators=true
&showHistory=false
&isStopped=false
&refreshTime=30
&hideUI=true
```

### Przykład 5: Wyciąg z rozkładu jazdy
```
?station=Stary_Sacz&type=wyciag&trainTypes=EMRP,T&showOperators=true&hideUI=true
```

---

## 🔄 Priorytet wartości

1. **Parametry URL** - najwyższy priorytet, zawsze nadpisują inne wartości
2. **localStorage** - zapamiętane ustawienia użytkownika
3. **Wartości domyślne** - jeśli brak powyższych

**Parametry URL automatycznie zapisują się do localStorage**, więc po odświeżeniu strony bez parametrów URL, aplikacja zachowa ostatnie ustawienia.

---

## 🐛 Debugowanie

Możesz sprawdzić jakie parametry są aktywne otwierając konsolę przeglądarki (F12) i wpisując:
```javascript
console.log({
    station: window.station,
    overlayName: window.overlayName,
    isDeparture: window.isDeparture,
    trainTypes: window.trainTypes,
    stopTypes: window.stopTypes,
    showOperators: window.showOperators,
    showHistory: window.showHistory
});
```

---

## 📝 Notatki

- Wszystkie wartości boolean przyjmują `true` lub `false` (case-sensitive)
- Spacje w nazwach stacji zastępuj przez `_` (underscore)
- Wartości w listach rozdzielaj przecinkami bez spacji
- Parametry są case-sensitive
- Jeśli parametr ma nieprawidłową wartość, użyta zostanie wartość domyślna
