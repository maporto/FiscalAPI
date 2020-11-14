import { isString } from "lodash";

function comparaNcm(str, strComparacao) {
    if (!isString(str) || !isString(strComparacao)) {
        return false;
    }

    if (str.length < strComparacao.length) {
        return strComparacao.includes(str);
    } else {
        return str.includes(strComparacao);
    }
}

export default comparaNcm;