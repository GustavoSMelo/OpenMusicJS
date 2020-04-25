function Verify(...params) {
    return params.find(
        (item) =>
            item === undefined ||
            item === null ||
            item === '' ||
            item.lenght <= 0 ||
            item == null
    );
}

export default Verify;
