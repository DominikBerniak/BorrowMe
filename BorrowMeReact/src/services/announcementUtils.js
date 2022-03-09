import { isWithinInterval } from "date-fns";

export const getCorrectPaymentElem = (announcement, quantity = 0) => {
    switch (announcement.paymentType) {
        case 0:
            return "Za darmo";
        case 1:
            return quantity > 0 ? `${(announcement.price)*quantity} zł` : `${(announcement.price)} zł / dzień`;
        case 2:
            return `Za ${announcement.otherPaymentType}`;
    }
}

const isWithinRange = (date, range) => {
    return isWithinInterval(date, { start:range[0], end:range[1]});
}

export const isWithinRanges = (date, ranges) => {
    return ranges.some(range => isWithinRange(date, range));
}



