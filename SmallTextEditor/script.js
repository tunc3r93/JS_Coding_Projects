var SmallTextEditor = /** @class */ (function () {
    function SmallTextEditor() {
        this.fontList = [
            "Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive"
        ];
        this.initButtons();
        this.initAdvancedOptions();
        this.initFonts();
        this.observeSelection();
        this.resetButtonStates();
        this.initDownloadButton();
    }
    SmallTextEditor.prototype.initButtons = function () {
        var buttons = document.querySelectorAll(".option-button");
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                document.execCommand(button.id, false, null);
                var isActive = document.queryCommandState(button.id);
                if (isActive) {
                    button.classList.add("active");
                }
                else {
                    button.classList.remove("active");
                }
            });
        });
    };
    SmallTextEditor.prototype.initAdvancedOptions = function () {
        var advancedOptions = document.querySelectorAll(".adv-option-button");
        advancedOptions.forEach(function (option) {
            option.addEventListener("change", function () {
                var input = option;
                document.execCommand(input.id, false, input.value);
            });
        });
    };
    SmallTextEditor.prototype.initFonts = function () {
        var fontName = document.getElementById("fontName");
        var fontSize = document.getElementById("fontSize");
        this.fontList.forEach(function (font) {
            var option = document.createElement("option");
            option.value = font;
            option.textContent = font;
            fontName.appendChild(option);
        });
        for (var i = 1; i <= 7; i++) {
            var option = document.createElement("option");
            option.value = i.toString();
            option.textContent = i.toString();
            fontSize.appendChild(option);
        }
        fontSize.value = "3";
    };
    SmallTextEditor.prototype.observeSelection = function () {
        document.addEventListener("selectionchange", function () {
            var buttons = document.querySelectorAll(".option-button");
            buttons.forEach(function (button) {
                var isActive = document.queryCommandState(button.id);
                button.classList.toggle("active", isActive);
            });
        });
    };
    SmallTextEditor.prototype.resetButtonStates = function () {
        var buttons = document.querySelectorAll(".option-button");
        buttons.forEach(function (button) { return button.classList.remove("active"); });
    };
    SmallTextEditor.prototype.initDownloadButton = function () {
        var downloadButton = document.getElementById("downloadBtn");
        downloadButton.addEventListener("click", function () {
            var _a;
            var textContent = ((_a = document.getElementById("text-input")) === null || _a === void 0 ? void 0 : _a.innerText) || "";
            var blob = new Blob([textContent], { type: "text/plain" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "textfile.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    };
    return SmallTextEditor;
}());
window.addEventListener("DOMContentLoaded", function () { return new SmallTextEditor(); });
