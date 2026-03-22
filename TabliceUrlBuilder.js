/**
 * Tablice TD2 - URL Builder Helper
 * Pomocnicza klasa do budowania URL-i z parametrami dla aplikacji tablice-td2
 * 
 * Użycie:
 * const url = new TabliceUrlBuilder('https://twoj-host.com')
 *     .station('Krakow_Glowny')
 *     .type('krakow')
 *     .departure()
 *     .hideUI()
 *     .build();
 */

class TabliceUrlBuilder {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // usuń trailing slash
        this.params = new URLSearchParams();
    }

    /**
     * Ustaw stację (wymagane)
     * @param {string} stationName - Nazwa stacji (spacje zastąpione przez _)
     * @returns {TabliceUrlBuilder}
     */
    station(stationName) {
        this.params.set('station', stationName.replace(/ /g, '_'));
        return this;
    }

    /**
     * Ustaw punkt posterunkowy
     * @param {string} checkpointName - Nazwa punktu
     * @returns {TabliceUrlBuilder}
     */
    checkpoint(checkpointName) {
        this.params.set('checkpoint', checkpointName.replace(/ /g, '_'));
        return this;
    }

    /**
     * Ustaw region/serwer
     * @param {string} region - 'PL1'|'eu'|'PL2'|'cae'|'DE'|'usw'|'CZ'|'us'
     * @returns {TabliceUrlBuilder}
     */
    region(region) {
        this.params.set('region', region);
        return this;
    }

    /**
     * Ustaw typ tablicy
     * @param {string} type - 'tomaszow'|'krakow'|'starysacz'|'plakat'|'wyciag'
     * @returns {TabliceUrlBuilder}
     */
    type(type) {
        this.params.set('type', type);
        return this;
    }

    /**
     * Ustaw tablicę ODJAZDÓW
     * @returns {TabliceUrlBuilder}
     */
    departure() {
        this.params.set('timetables', 'departure');
        return this;
    }

    /**
     * Ustaw tablicę PRZYJAZDÓW
     * @returns {TabliceUrlBuilder}
     */
    arrival() {
        this.params.set('timetables', 'arrival');
        return this;
    }

    /**
     * Ustaw rozmiar interfejsu (tylko dla krakow)
     * @param {string} size - 'normal'|'enlarged'
     * @returns {TabliceUrlBuilder}
     */
    size(size) {
        this.params.set('size', size);
        return this;
    }

    /**
     * Ustaw typy postoju
     * @param {string|string[]} types - 'all' lub ['ph', 'pt', 'pm']
     * @returns {TabliceUrlBuilder}
     */
    stopTypes(types) {
        if (Array.isArray(types)) {
            this.params.set('stopTypes', types.join(','));
        } else {
            this.params.set('stopTypes', types);
        }
        return this;
    }

    /**
     * Ustaw typy pociągów (maska kategorii)
     * @param {string|string[]} types - ['E', 'M', 'R', 'P', 'T', 'L', 'Z']
     * @returns {TabliceUrlBuilder}
     */
    trainTypes(types) {
        if (Array.isArray(types)) {
            this.params.set('trainTypes', types.join(','));
        } else {
            this.params.set('trainTypes', types);
        }
        return this;
    }

    /**
     * Ustaw kategorie pociągów
     * @param {string[]} categories - np. ['EC', 'IC', 'EIP']
     * @returns {TabliceUrlBuilder}
     */
    trainCategory(categories) {
        this.params.set('trainCategory', categories.join(','));
        return this;
    }

    /**
     * Tylko rozkłady z postojem
     * @param {boolean} value
     * @returns {TabliceUrlBuilder}
     */
    isStopped(value = true) {
        this.params.set('isStopped', String(value));
        return this;
    }

    /**
     * Pokazuj przewoźników
     * @param {boolean} value
     * @returns {TabliceUrlBuilder}
     */
    showOperators(value = true) {
        this.params.set('showOperators', String(value));
        return this;
    }

    /**
     * Pokazuj rozkłady historyczne
     * @param {boolean} value
     * @returns {TabliceUrlBuilder}
     */
    showHistory(value = true) {
        this.params.set('showHistory', String(value));
        return this;
    }

    /**
     * Pokazuj rozkłady niezrealizowane
     * @param {boolean} value
     * @returns {TabliceUrlBuilder}
     */
    isFulfilled(value = true) {
        this.params.set('isFulfilled', String(value));
        return this;
    }

    /**
     * Pokazuj rozkłady zakończone
     * @param {boolean} value
     * @returns {TabliceUrlBuilder}
     */
    isTerminated(value = true) {
        this.params.set('isTerminated', String(value));
        return this;
    }

    /**
     * Ustaw czas odświeżania w sekundach
     * @param {number} seconds
     * @returns {TabliceUrlBuilder}
     */
    refreshTime(seconds) {
        this.params.set('refreshTime', String(seconds));
        return this;
    }

    /**
     * Ukryj interfejs użytkownika
     * @param {boolean} value
     * @returns {TabliceUrlBuilder}
     */
    hideUI(value = true) {
        this.params.set('hideUI', String(value));
        return this;
    }

    /**
     * Tryb kiosk (legacy - użyj hideUI zamiast)
     * @returns {TabliceUrlBuilder}
     */
    kioskMode() {
        this.params.set('mode', 'kiosk');
        return this;
    }

    /**
     * Zbuduj finalny URL
     * @returns {string}
     */
    build() {
        const queryString = this.params.toString();
        return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
    }

    /**
     * Zbuduj tylko query string (bez base URL)
     * @returns {string}
     */
    buildQuery() {
        return this.params.toString();
    }
}

// Eksport dla Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabliceUrlBuilder;
}

// Export dla ES6 modules
if (typeof window !== 'undefined') {
    window.TabliceUrlBuilder = TabliceUrlBuilder;
}

/**
 * Przykłady użycia:
 * 
 * // Przykład 1: Podstawowa tablica
 * const url1 = new TabliceUrlBuilder('https://tablice.example.com')
 *     .station('Krakow_Glowny')
 *     .type('krakow')
 *     .departure()
 *     .build();
 * // => https://tablice.example.com?station=Krakow_Glowny&type=krakow&timetables=departure
 * 
 * // Przykład 2: Tryb kiosk z historią
 * const url2 = new TabliceUrlBuilder('http://localhost:8080')
 *     .station('Tomaszow_Mazowiecki')
 *     .type('plakat')
 *     .showHistory()
 *     .hideUI()
 *     .build();
 * 
 * // Przykład 3: Tylko pociągi express
 * const url3 = new TabliceUrlBuilder()
 *     .station('Warszawa_Centralna')
 *     .region('PL2')
 *     .trainTypes(['E'])
 *     .trainCategory(['EC', 'EIC', 'EIP'])
 *     .buildQuery();
 * // => station=Warszawa_Centralna&region=PL2&trainTypes=E&trainCategory=EC,EIC,EIP
 * 
 * // Przykład 4: Pełna konfiguracja dla symulatora
 * const url4 = new TabliceUrlBuilder('https://sim.td2.pl/tablice')
 *     .station('Krakow_Glowny')
 *     .checkpoint('Krakow_Glowny,R1')
 *     .region('eu')
 *     .type('krakow')
 *     .size('enlarged')
 *     .departure()
 *     .trainTypes(['E', 'M', 'R', 'P'])
 *     .stopTypes(['ph', 'pt'])
 *     .showOperators()
 *     .refreshTime(30)
 *     .hideUI()
 *     .build();
 */
