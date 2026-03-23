<h1>SYMULATOR TABLIC ZBIORCZYCH</h1>

## 🎯 Sterowanie przez URL

Aplikacja może być w pełni sterowana przez parametry URL - **idealne do integracji z symulatorami!**

### 📚 Dokumentacja
- **[URL_PARAMETERS.md](URL_PARAMETERS.md)** - Kompletna dokumentacja wszystkich parametrów URL
- **[TabliceUrlBuilder.js](TabliceUrlBuilder.js)** - Helper do programowego budowania URL-i
- **[CHECKPOINT_GUIDE.md](CHECKPOINT_GUIDE.md)** - Przewodnik po punktach posterunkowych

### ⚡ Szybki start

```
# Podstawowa tablica odjazdów
?station=Krakow_Glowny&timetables=departure&type=krakow

# Tryb kiosk (ukryty UI) + historia
?station=Tomaszow_Mazowiecki&type=plakat&showHistory=true&hideUI=true

# Tylko pociągi express
?station=Warszawa_Centralna&trainTypes=E&trainCategory=EC,EIC,EIP

# Pełna konfiguracja dla symulatora
?station=Krakow_Glowny&type=krakow&size=enlarged&timetables=departure
&trainTypes=EMRP&showOperators=true&hideUI=true&refreshTime=30
```

### 🔧 Użycie programowe (JavaScript)

```javascript
const url = new TabliceUrlBuilder('https://tablice.example.com')
    .station('Krakow_Glowny')
    .type('krakow')
    .departure()
    .trainTypes(['E', 'M', 'R', 'P'])
    .showOperators()
    .hideUI()
    .build();
```

### 📋 Dostępne parametry URL

| Parametr | Wartości | Opis |
|----------|----------|------|
| `station` | nazwa_stacji | **Wymagane** - Nazwa stacji |
| `type` | tomaszow\|krakow\|starysacz\|plakat\|wyciag | Styl wizualny tablicy |
| `timetables` | departure\|arrival | Odjazdy lub przyjazdy |
| `region` | PL1\|PL2\|DE\|CZ | Serwer TD2 |
| `trainTypes` | E,M,R,P,T,L,Z | Typy pociągów (maska) |
| `stopTypes` | ph,pt,pm\|all | Typy punktów pośrednich |
| `showOperators` | true\|false | Pokazuj przewoźników |
| `showHistory` | true\|false | Pokazuj rozkłady historyczne |
| `hideUI` | true\|false | Ukryj interfejs (tryb kiosk) |
| `animations` | false\|true\|auto | Animacje tekstów (auto) |
| `refreshTime` | liczba | Odświeżanie w sekundach |

Zobacz [URL_PARAMETERS.md](URL_PARAMETERS.md) dla pełnej listy parametrów.

---

## 🛠️ Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
npm run lint:fix
```

### Format
```bash
npm run format
```