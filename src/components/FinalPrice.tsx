// @ts-ignore
const finalPriceStyle = {
    fontFamily: "Iset Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "40px",
    lineHeight: "140%",
    TextAlign: "center",
    color: "#FFFFFF"
}

const MOUNT_PRICE = 2990
const DISMOUNT_PRICE = 6990

function calculateFinalPrice(mount, dismount) {
    let finalPrice = 0

    if (mount) {
        finalPrice += MOUNT_PRICE
    }

    if (dismount) {
        finalPrice += DISMOUNT_PRICE
    }

    return finalPrice
}

export function FinalPrice(mount, dismount) {
    return (<p style={finalPriceStyle}>
        Финальная цена — до {calculateFinalPrice(mount, dismount)} ₽
    </p>);
}
