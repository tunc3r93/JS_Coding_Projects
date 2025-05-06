class SmallTextEditor {
    private fontList: string[] = [
        "Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive"
    ];

    constructor() {
        this.initButtons();
        this.initAdvancedOptions();
        this.initFonts();
        this.observeSelection();
        this.resetButtonStates();
        this.initDownloadButton();
    }

    private initButtons() {
        const buttons = document.querySelectorAll(".option-button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                document.execCommand(button.id, false, null);

                const isActive = document.queryCommandState(button.id);
                if (isActive) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            });
        });
    }

    private initAdvancedOptions() {
        const advancedOptions = document.querySelectorAll(".adv-option-button");
        advancedOptions.forEach(option => {
            option.addEventListener("change", () => {
                const input = option as HTMLInputElement | HTMLSelectElement;
                document.execCommand(input.id, false, input.value);
            });
        });
    }

    private initFonts() {
        const fontName = document.getElementById("fontName") as HTMLSelectElement;
        const fontSize = document.getElementById("fontSize") as HTMLSelectElement;

        this.fontList.forEach(font => {
            const option = document.createElement("option");
            option.value = font;
            option.textContent = font;
            fontName.appendChild(option);
        });

        for (let i = 1; i <= 7; i++) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.textContent = i.toString();
            fontSize.appendChild(option);
        }

        fontSize.value = "3";
    }

    private observeSelection() {
        document.addEventListener("selectionchange", () => {
            const buttons = document.querySelectorAll(".option-button");
            buttons.forEach(button => {
                const isActive = document.queryCommandState(button.id);
                button.classList.toggle("active", isActive);
            });
        });
    }

    private resetButtonStates() {
        const buttons = document.querySelectorAll(".option-button");
        buttons.forEach(button => button.classList.remove("active"));
    }

    private initDownloadButton() {
        const downloadButton = document.getElementById("downloadBtn") as HTMLButtonElement;
        downloadButton.addEventListener("click", () => {
            const textContent = document.getElementById("text-input")?.innerText || "";
            const blob = new Blob([textContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "textfile.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => new SmallTextEditor());
