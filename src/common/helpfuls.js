function numberToDate(numOfDay) {
    switch (numOfDay) {
        case 6:
            return "Sob.";
        case 0:
            return "Nd.";
        case 1:
            return "Pon.";
        case 2:
            return "Wt.";
        case 3:
            return "Śr.";
        case 4:
            return "Czw.";
        case 5:
            return "Pt.";
    }
}

export {numberToDate};