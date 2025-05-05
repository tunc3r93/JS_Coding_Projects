class GridPainter {
    private container: HTMLDivElement;
    private gridButton: HTMLButtonElement;
    private clearGridButton: HTMLButtonElement;
    private gridWidth: HTMLInputElement;
    private gridHeight: HTMLInputElement;
    private colorButton: HTMLInputElement;
    private eraseBtn: HTMLButtonElement;
    private paintBtn: HTMLButtonElement;
    private widthValue: HTMLElement;
    private heightValue: HTMLElement;

    private draw: boolean = false;
    private erase: boolean = false;
    private deviceType: 'mouse' | 'touch';

    private events = {
        mouse: {
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup',
        },
        touch: {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend',
        },
    };

    constructor() {
        this.container = document.querySelector('.container') as HTMLDivElement;
        this.gridButton = document.getElementById('submit-grid') as HTMLButtonElement;
        this.clearGridButton = document.getElementById('clear-grid') as HTMLButtonElement;
        this.gridWidth = document.getElementById('width-range') as HTMLInputElement;
        this.gridHeight = document.getElementById('height-range') as HTMLInputElement;
        this.colorButton = document.getElementById('color-input') as HTMLInputElement;
        this.eraseBtn = document.getElementById('erase-btn') as HTMLButtonElement;
        this.paintBtn = document.getElementById('paint-btn') as HTMLButtonElement;
        this.widthValue = document.getElementById('width-value')!;
        this.heightValue = document.getElementById('height-value')!;

        this.deviceType = this.detectDevice();

        this.addEventListeners();
        this.resetInputs();
    }

    private detectDevice(): 'mouse' | 'touch' {
        return ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? 'touch' : 'mouse';
    }

    private addEventListeners(): void {
        this.gridButton.addEventListener('click', () => this.createGrid());
        this.clearGridButton.addEventListener('click', () => this.clearGrid());

        this.eraseBtn.addEventListener('click', () => this.erase = true);
        this.paintBtn.addEventListener('click', () => this.erase = false);

        this.gridWidth.addEventListener('input', () => {
            const width = parseInt(this.gridWidth.value);
            this.widthValue.innerHTML = width < 10 ? `0${width}` : `${width}`;
        });

        this.gridHeight.addEventListener('input', () => {
            const height = parseInt(this.gridHeight.value);
            this.heightValue.innerHTML = height < 10 ? `0${height}` : `${height}`;
        });

        window.addEventListener('load', () => this.resetInputs());
    }

    private resetInputs(): void {
        this.gridWidth.value = '0';
        this.gridHeight.value = '0';
        this.widthValue.innerHTML = '00';
        this.heightValue.innerHTML = '00';
    }

    private createGrid(): void {
        this.container.innerHTML = '';
        let count = 0;
        const height = parseInt(this.gridHeight.value);
        const width = parseInt(this.gridWidth.value);

        for (let i = 0; i < height; i++) {
            const row = document.createElement('div');
            row.classList.add('gridRow');

            for (let j = 0; j < width; j++) {
                const col = document.createElement('div');
                col.classList.add('gridCol');
                col.id = `gridCol${count++}`;

                // DOWN
                col.addEventListener(this.events[this.deviceType].down, () => {
                    this.draw = true;
                    col.style.backgroundColor = this.erase ? 'transparent' : this.colorButton.value;
                });

                // MOVE
                col.addEventListener(this.events[this.deviceType].move, (e: any) => {
                    if (!this.draw) return;

                    const x = this.deviceType === 'mouse' ? e.clientX : e.touches[0].clientX;
                    const y = this.deviceType === 'mouse' ? e.clientY : e.touches[0].clientY;

                    const target = document.elementFromPoint(x, y) as HTMLElement;
                    if (target && target.classList.contains('gridCol')) {
                        target.style.backgroundColor = this.erase ? 'transparent' : this.colorButton.value;
                    }
                });

                // UP
                col.addEventListener(this.events[this.deviceType].up, () => {
                    this.draw = false;
                });

                row.appendChild(col);
            }

            this.container.appendChild(row);
        }
    }

    private clearGrid(): void {
        this.container.innerHTML = '';
    }
}

let grid = new GridPainter();