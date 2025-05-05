var GridPainter = /** @class */ (function () {
    function GridPainter() {
        this.draw = false;
        this.erase = false;
        this.events = {
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
        this.container = document.querySelector('.container');
        this.gridButton = document.getElementById('submit-grid');
        this.clearGridButton = document.getElementById('clear-grid');
        this.gridWidth = document.getElementById('width-range');
        this.gridHeight = document.getElementById('height-range');
        this.colorButton = document.getElementById('color-input');
        this.eraseBtn = document.getElementById('erase-btn');
        this.paintBtn = document.getElementById('paint-btn');
        this.widthValue = document.getElementById('width-value');
        this.heightValue = document.getElementById('height-value');
        this.deviceType = this.detectDevice();
        this.addEventListeners();
        this.resetInputs();
    }
    GridPainter.prototype.detectDevice = function () {
        return ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? 'touch' : 'mouse';
    };
    GridPainter.prototype.addEventListeners = function () {
        var _this = this;
        this.gridButton.addEventListener('click', function () { return _this.createGrid(); });
        this.clearGridButton.addEventListener('click', function () { return _this.clearGrid(); });
        this.eraseBtn.addEventListener('click', function () { return _this.erase = true; });
        this.paintBtn.addEventListener('click', function () { return _this.erase = false; });
        this.gridWidth.addEventListener('input', function () {
            var width = parseInt(_this.gridWidth.value);
            _this.widthValue.innerHTML = width < 10 ? "0".concat(width) : "".concat(width);
        });
        this.gridHeight.addEventListener('input', function () {
            var height = parseInt(_this.gridHeight.value);
            _this.heightValue.innerHTML = height < 10 ? "0".concat(height) : "".concat(height);
        });
        window.addEventListener('load', function () { return _this.resetInputs(); });
    };
    GridPainter.prototype.resetInputs = function () {
        this.gridWidth.value = '0';
        this.gridHeight.value = '0';
        this.widthValue.innerHTML = '00';
        this.heightValue.innerHTML = '00';
    };
    GridPainter.prototype.createGrid = function () {
        var _this = this;
        this.container.innerHTML = '';
        var count = 0;
        var height = parseInt(this.gridHeight.value);
        var width = parseInt(this.gridWidth.value);
        for (var i = 0; i < height; i++) {
            var row = document.createElement('div');
            row.classList.add('gridRow');
            var _loop_1 = function (j) {
                var col = document.createElement('div');
                col.classList.add('gridCol');
                col.id = "gridCol".concat(count++);
                // DOWN
                col.addEventListener(this_1.events[this_1.deviceType].down, function () {
                    _this.draw = true;
                    col.style.backgroundColor = _this.erase ? 'transparent' : _this.colorButton.value;
                });
                // MOVE
                col.addEventListener(this_1.events[this_1.deviceType].move, function (e) {
                    if (!_this.draw)
                        return;
                    var x = _this.deviceType === 'mouse' ? e.clientX : e.touches[0].clientX;
                    var y = _this.deviceType === 'mouse' ? e.clientY : e.touches[0].clientY;
                    var target = document.elementFromPoint(x, y);
                    if (target && target.classList.contains('gridCol')) {
                        target.style.backgroundColor = _this.erase ? 'transparent' : _this.colorButton.value;
                    }
                });
                // UP
                col.addEventListener(this_1.events[this_1.deviceType].up, function () {
                    _this.draw = false;
                });
                row.appendChild(col);
            };
            var this_1 = this;
            for (var j = 0; j < width; j++) {
                _loop_1(j);
            }
            this.container.appendChild(row);
        }
    };
    GridPainter.prototype.clearGrid = function () {
        this.container.innerHTML = '';
    };
    return GridPainter;
}());
var grid = new GridPainter();
