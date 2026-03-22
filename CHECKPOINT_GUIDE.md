# 🎯 Szybki przewodnik: Checkpointy

## Co to jest checkpoint?

Checkpoint to konkretny punkt posterunkowy na scenerii. Każda sceneria może mieć:
- **Jeden główny checkpoint** (mainCheckpoint)
- **Zero lub więcej dodatkowych checkpointów** (checkpoints array)

## Struktura danych (stationsData.json)

```json
{
    "sceneryName": "Arkadia Zdrój 2022",
    "mainCheckpoint": "Arkadia Zdrój",
    "mainCheckpointSuffix": null,
    "checkpoints": [
        { "name": "Bocznica ACT", "suffix": null },
        { "name": "Nawia", "suffix": ", podg" },
        { "name": "Wyraj", "suffix": ", po" }
    ]
}
```

## Jak używać w URL?

### ✅ Sposób 1: Tylko nazwa (REKOMENDOWANY)

Podaj tylko nazwę checkpointa - aplikacja automatycznie doda suffix:

```
?station=Arkadia_Zdroj_2022&checkpoint=Wyraj
```
→ Aplikacja użyje: `"Wyraj, po"`

```
?station=Arkadia_Zdroj_2022&checkpoint=Nawia
```
→ Aplikacja użyje: `"Nawia, podg"`

```
?station=Arkadia_Zdroj_2022&checkpoint=Arkadia_Zdroj
```
→ Aplikacja użyje: `"Arkadia Zdrój"` (główny checkpoint)

### ✅ Sposób 2: Pełna nazwa z suffixem (LEGACY)

Możesz też podać pełną nazwę - dla backward compatibility:

```
?station=Arkadia_Zdroj_2022&checkpoint=Wyraj,_po
```
→ Aplikacja użyje dokładnie: `"Wyraj, po"`

**Uwaga:** Spacja po przecinku zamieniana jest na `_`

## Jak to działa w kodzie?

1. Aplikacja pobiera parametr `checkpoint` z URL
2. Szuka nazwy w `stationsData.json`:
   - Sprawdza czy to `mainCheckpoint`
   - Sprawdza w tablicy `checkpoints[]`
3. Jeśli znajdzie dopasowanie - dodaje `suffix` automatycznie
4. Jeśli nie znajdzie - używa podanej nazwy (fallback)

## Debug w konsoli

Po załadowaniu strony zobaczysz w konsoli:

```
Checkpoint resolved: "Wyraj" -> "Wyraj, po"
```

To potwierdza że checkpoint został poprawnie rozpoznany i suffix dodany.

## Przykłady praktyczne

### Przykład 1: Prosta stacja bez dodatkowych checkpointów

```json
{
    "sceneryName": "Aleksandrów Kujawski",
    "mainCheckpoint": "Aleksandrów Kujawski",
    "mainCheckpointSuffix": null,
    "checkpoints": []
}
```

URL:
```
?station=Aleksandrow_Kujawski&checkpoint=Aleksandrow_Kujawski
```
lub po prostu:
```
?station=Aleksandrow_Kujawski
```
(brak checkpointa użyje głównego automatycznie)

### Przykład 2: Stacja z wieloma punktami

```json
{
    "sceneryName": "Arkadia Zdrój 2022",
    "mainCheckpoint": "Arkadia Zdrój",
    "checkpoints": [
        { "name": "Bocznica ACT", "suffix": null },
        { "name": "Nawia", "suffix": ", podg" },
        { "name": "Wyraj", "suffix": ", po" }
    ]
}
```

Dostępne URL:
```
?station=Arkadia_Zdroj_2022&checkpoint=Arkadia_Zdroj  # główny
?station=Arkadia_Zdroj_2022&checkpoint=Bocznica_ACT    # bocznica
?station=Arkadia_Zdroj_2022&checkpoint=Nawia           # Nawia, podg
?station=Arkadia_Zdroj_2022&checkpoint=Wyraj           # Wyraj, po
```

## Najczęstsze błędy

❌ **Niepoprawnie:**
```
?checkpoint=Wyraj, po                    # Spacja nie jest zamieniona na _
?checkpoint=Wyraj po                     # Brak przecinka
?station=Arkadia&checkpoint=Wyraj        # Niepełna nazwa stacji
```

✅ **Poprawnie:**
```
?checkpoint=Wyraj                        # Prosty sposób (rekomendowany)
?checkpoint=Wyraj,_po                    # Pełna nazwa (legacy)
?station=Arkadia_Zdroj_2022&checkpoint=Wyraj
```

## W TabliceUrlBuilder.js

```javascript
const url = new TabliceUrlBuilder('https://tablice.example.com')
    .station('Arkadia Zdroj 2022')      // Spacje OK - automatycznie zamienione
    .checkpoint('Wyraj')                 // Tylko nazwa - suffix dodany auto
    .type('krakow')
    .build();

// Lub z pełną nazwą:
    .checkpoint('Wyraj, po')             // Pełna nazwa z suffixem
```

## Podsumowanie

| Co chcesz | Co wpisujesz | Co dostaniesz |
|-----------|--------------|---------------|
| Punkt główny | `checkpoint=Arkadia_Zdroj` | `"Arkadia Zdrój"` |
| Punkt Wyraj | `checkpoint=Wyraj` | `"Wyraj, po"` (auto suffix) |
| Punkt Nawia | `checkpoint=Nawia` | `"Nawia, podg"` (auto suffix) |
| Pełna nazwa | `checkpoint=Wyraj,_po` | `"Wyraj, po"` (dokładnie) |

**💡 Pro tip:** Zawsze używaj sposobu 1 (sama nazwa) - jest prostszy i bardziej czytelny!
