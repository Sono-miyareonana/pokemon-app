// 3.getAllPkemonを作成
    // 非同期処理でPromise(約束)を返す関数を作成する
    // resolve(成功)
    // reject(失敗)
    // fetchでポケモンデータを(url)取得し
    // thenメソッドで繋げてresで受け取りjson形式に変換する
    // json形式で受け取ったデータをthenメソッドで繋げてdataで受け取る
    // resolve(data)で成功したらdataを返す
    // returnでjson形式にしたresolve(data)を返す

    // Promiseを使った理由は
    // fetch,thenメソッドが成功した時するまで処理を待つことを約束している
    // 処理が成功し取得したresolve(data)をApp.jsのawaitに返すため

// 全てのポケモンデータを取得
export const getAllPkemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
    })
    }

// 8.getPokemonを作成(仮)しApp.jsでimportする
// 各ポケモンの詳細なデータを取得
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            resolve(data)})
    })
}


