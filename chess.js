let map;
let divSquare = '<div id="s$cord" class="square $color"></div>';
let divFigure = '<div id="f$cord" class="figure">$figure</div>';

$(function () {
    start();
});

function start() {
    map = new Array(64);
    addSquares();
    showFiguresPHP();
}

function setDraggable() {
    $('.figure').draggable();
}

function setDroppable() {
    $('.square').droppable({
        drop: function (event, ui) {
            let frCord = ui.draggable.attr('id').substring(1);
            let toCord = this.id.substring(1);
            moveFigure(frCord, toCord);
        }
    });
}

function moveFigure(frCord, toCord) {
    figure = map[frCord];
    showFigureAt(frCord, '1');
    showFigureAt(toCord, figure);
}

function addSquares() {
    $(".board").html('');
    for (let cord = 0; cord <  64; cord++) {
        $('.board').append(divSquare
            .replace('$cord', cord)
            .replace('$color', isBlackSquareAt(cord) ? 'black' : 'white'));
    }
    setDroppable();
}

function showFigures(figures) {
    for (let cord = 0; cord < 64; cord++) {
        showFigureAt(cord, figures.charAt(cord));
    }
}

function showFigureAt(cord, figure) {
    map[cord] = figure;
    $('#s' + cord).html(divFigure
        .replace('$cord', cord)
        .replace('$figure', getChessSymbol(figure)));
    setDraggable();
}

function getChessSymbol(figure) {
    switch (figure) {
        case 'K': return '&#9812';
        case 'Q': return '&#9813';
        case 'R': return '&#9814';
        case 'B': return '&#9815';
        case 'N': return '&#9816';
        case 'P': return '&#9817';
        case 'k': return '&#9818';
        case 'q': return '&#9819';
        case 'r': return '&#9820';
        case 'b': return '&#9821';
        case 'n': return '&#9822';
        case 'p': return '&#9823';
        default : return '';

    }
}

function isBlackSquareAt(cord) {
    return (cord % 8 + Math.floor(cord / 8)) % 2;
}

function showFiguresPHP() {
    $.get('chess.php?getFigures', showFigures);
}