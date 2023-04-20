export const shuffleArr = (arr) => {
    /* Вариация алгоритма Фишера-Йетса*/
    for(let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random()*(i + 1));
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
