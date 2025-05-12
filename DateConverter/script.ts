class DateFormatter {
    private dateInput: HTMLInputElement;
    private formatSelect: HTMLSelectElement;
    private output: HTMLInputElement;

    constructor() {
        this.dateInput = document.getElementById('date-input') as HTMLInputElement;
        this.formatSelect = document.getElementById('select-type') as HTMLSelectElement;
        this.output = document.getElementById('output') as HTMLInputElement;

        this.registerEvents();
    }

    private registerEvents(): void {
        this.dateInput.addEventListener('input', () => this.updateOutput());
        this.formatSelect.addEventListener('change', () => this.updateOutput());
    }

    private updateOutput(): void {
        const dateValue = this.dateInput.value;
        const selectedFormat = this.formatSelect.value;

        if (dateValue && selectedFormat) {
            this.output.value = this.formatDate(dateValue, selectedFormat);
        } else {
            this.output.value = '';
        }
    }

    private formatDate(dateStr: string, format: string): string {
        const [year, month, day] = dateStr.split('-');

        switch (format) {
            case 'DE':
            case 'CH':
                return `${day}.${month}.${year}`;
            case 'US':
                return `${month}/${day}/${year}`;
            case 'GB':
            case 'FR':
                return `${day}/${month}/${year}`;
            case 'IN':
                return `${day}-${month}-${year}`;
            case 'JP':
                return `${year}/${month}/${day}`;
            case 'CN':
            case 'ISO':
                return `${year}-${month}-${day}`;
            case 'CA':
                return `${year}-${month}-${day}`;
            default:
                return '';
        }
    }
}

const dateFormatter = new DateFormatter();
