class CheckPalindrom {
    private checkButton: HTMLButtonElement;

    constructor() {
        this.checkButton = document.getElementById('check-btn') as HTMLButtonElement;
        this.bindEvents();
    }

    bindEvents() {
        this.checkButton.addEventListener('click', (event) => {
            this.checkPalindrome();
        })
    }

    isPalindrome(str: string): boolean {
        if (typeof str !== 'string') return false;
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = cleaned.split('').reverse().join('');
        return cleaned === reversed;
    }

    checkPalindrome(): void {
        const input = (document.getElementById('input-text') as HTMLInputElement).value;
        const resultDiv = document.getElementById('result-text');

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
            resultDiv.textContent = `"${input}" is a valid Palindrom`;
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = `"${input}" is not a valid Palindrom`;
            resultDiv.style.color = 'red';
        }
    }
}

let checkPalindrom = new CheckPalindrom();
