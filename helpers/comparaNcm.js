function comparaNcm(str, strComparacao) {
    if (str.length >= strComparacao.length) {
        return str.includes(strComparacao);
    } else {
        return strComparacao.includes(str);
    }
}

export default comparaNcm;