var DateFormatter = /** @class */ (function () {
    function DateFormatter() {
        // Elemente initialisieren
        this.dateInput = document.getElementById('date-input');
        this.formatSelect = document.getElementById('select-type');
        this.output = document.getElementById('output');
        // Event-Listener registrieren
        this.registerEvents();
    }
    DateFormatter.prototype.registerEvents = function () {
        var _this = this;
        // Wenn ein Datum eingegeben wird oder das Format geändert wird, rufen wir updateOutput auf
        this.dateInput.addEventListener('input', function () { return _this.updateOutput(); });
        this.formatSelect.addEventListener('change', function () { return _this.updateOutput(); });
    };
    DateFormatter.prototype.updateOutput = function () {
        var dateValue = this.dateInput.value;
        var selectedFormat = this.formatSelect.value;
        // Überprüfen, ob beide Eingabewerte vorhanden sind
        console.log("Date Value:", dateValue); // Debugging
        console.log("Selected Format:", selectedFormat); // Debugging
        if (dateValue && selectedFormat) {
            // Das Datum wird formatiert und in das Ausgabefeld eingefügt
            this.output.value = this.formatDate(dateValue, selectedFormat);
        }
        else {
            // Wenn keine Eingabewerte vorhanden sind, leeren wir das Ausgabefeld
            this.output.value = '';
        }
    };
    DateFormatter.prototype.formatDate = function (dateStr, format) {
        // Das Datum aufsplitten (Jahr, Monat, Tag)
        var _a = dateStr.split('-'), year = _a[0], month = _a[1], day = _a[2];
        // Debugging-Ausgabe für Datumsteilung
        console.log("Year:", year, "Month:", month, "Day:", day); // Debugging
        switch (format) {
            case 'DE':
            case 'CH':
                return "".concat(day, ".").concat(month, ".").concat(year); // Deutschland und Schweiz: TT.MM.JJJJ
            case 'US':
                return "".concat(month, "/").concat(day, "/").concat(year); // USA: MM/TT/JJJJ
            case 'GB':
            case 'FR':
                return "".concat(day, "/").concat(month, "/").concat(year); // Großbritannien und Frankreich: TT/MM/JJJJ
            case 'IN':
                return "".concat(day, "-").concat(month, "-").concat(year); // Indien: TT-MM-JJJJ
            case 'JP':
                return "".concat(year, "/").concat(month, "/").concat(day); // Japan: JJJJ/MM/TT
            case 'CN':
            case 'ISO':
                return "".concat(year, "-").concat(month, "-").concat(day); // China und ISO: JJJJ-MM-TT
            case 'CA':
                return "".concat(year, "-").concat(month, "-").concat(day); // Kanada: JJJJ-MM-TT oder TT/MM/JJJJ (je nach Bedarf)
            default:
                return '';
        }
    };
    return DateFormatter;
}());
// Initialisiere den DateFormatter und übergebe keine Parameter, da die IDs hartcodiert sind
var dateFormatter = new DateFormatter();
