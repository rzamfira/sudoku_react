export function getBorderClasses(rowIndex, columnIndex) {

    const classes = [];

    if ((columnIndex + 1) % 3 === 0) {
        classes.push('no-right-border');
    }

    if (columnIndex % 3 === 0) {
        classes.push('no-left-border');
    }

    if ((rowIndex + 1) % 3 === 0) {
        classes.push('no-bottom-border');
    }

    if (rowIndex % 3 === 0) {
        classes.push('no-top-border');
    }

    return classes.join(' ');

}

export function getSquareBorderClasses(squareIndex) {

    const classes = [];

    if (squareIndex % 3 !== 0) {
        classes.push('border-right');
    }

    if (squareIndex <= 6) {
        classes.push('border-bottom');
    }

    return classes.join(' ');

}