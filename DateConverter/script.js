var DateFormatter = /** @class */ (function () {
    function DateFormatter() {
        this.dateInput = document.getElementById('date-input');
        this.formatSelect = document.getElementById('select-type');
        this.output = document.getElementById('output');
        this.registerEvents();
    }
    DateFormatter.prototype.registerEvents = function () {
        var _this = this;
        this.dateInput.addEventListener('input', function () { return _this.updateOutput(); });
        this.formatSelect.addEventListener('change', function () { return _this.updateOutput(); });
    };
    DateFormatter.prototype.updateOutput = function () {
        var dateValue = this.dateInput.value;
        var selectedFormat = this.formatSelect.value;
        if (dateValue && selectedFormat) {
            this.output.value = this.formatDate(dateValue, selectedFormat);
        }
        else {
            this.output.value = '';
        }
    };
    DateFormatter.prototype.formatDate = function (dateStr, format) {
        var _a = dateStr.split('-'), year = _a[0], month = _a[1], day = _a[2];
        switch (format) {
            case 'DE':
            case 'CH':
                return "".concat(day, ".").concat(month, ".").concat(year);
            case 'US':
                return "".concat(month, "/").concat(day, "/").concat(year);
            case 'GB':
            case 'FR':
                return "".concat(day, "/").concat(month, "/").concat(year);
            case 'IN':
                return "".concat(day, "-").concat(month, "-").concat(year);
            case 'JP':
                return "".concat(year, "/").concat(month, "/").concat(day);
            case 'CN':
            case 'ISO':
                return "".concat(year, "-").concat(month, "-").concat(day);
            case 'CA':
                return "".concat(year, "-").concat(month, "-").concat(day);
            default:
                return '';
        }
    };
    return DateFormatter;
}());
var dateFormatter = new DateFormatter();
