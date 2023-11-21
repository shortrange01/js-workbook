export const answer = (data: any): string | void => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const dataArr = data[0].split("");
    for (let i = 0; i < alphabet.length; i++) {
        if (dataArr.indexOf(alphabet[i]) < 0) return alphabet[i];
    }
};
