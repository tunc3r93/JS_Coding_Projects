var CheckPalindrom = /** @class */ (function () {
    function CheckPalindrom() {
        this.checkButton = document.getElementById('check-btn');
        this.bindEvents();
    }
    CheckPalindrom.prototype.bindEvents = function () {
        var _this = this;
        this.checkButton.addEventListener('click', function (event) {
            _this.checkPalindrome();
        });
    };
    CheckPalindrom.prototype.isPalindrome = function (str) {
        if (typeof str !== 'string')
            return false;
        var cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        var reversed = cleaned.split('').reverse().join('');
        return cleaned === reversed;
    };
    CheckPalindrom.prototype.checkPalindrome = function () {
        var input = document.getElementById('input-text').value;
        var resultDiv = document.getElementById('result-text');
        if (!resultDiv) {
            console.error('Result div not found');
            return;
        }
        if (input.trim() === '') {
            resultDiv.textContent = 'Enter a word or phrase:';
            resultDiv.style.color = 'gray';
            return;
        }
        if (this.isPalindrome(input)) {
            resultDiv.textContent = "\"".concat(input, "\" is a valid Palindrom");
            resultDiv.style.color = 'green';
        }
        else {
            resultDiv.textContent = "\"".concat(input, "\" is not a valid Palindrom");
            resultDiv.style.color = 'red';
        }
    };
    return CheckPalindrom;
}());
var checkPalindrom = new CheckPalindrom();
