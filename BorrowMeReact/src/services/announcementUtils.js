export const getCorrectPaymentElem = (announcement, quantity = 1) => {
    switch (announcement.paymentType) {
        case 0:
            return "Za darmo";
        case 1:
            return `${(announcement.price)*quantity} zł / dzień`;
        case 2:
            return `Za ${announcement.otherPaymentType}`;
    }
}

