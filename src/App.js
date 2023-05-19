import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPkemon, getPokemon } from './utils/pokemon';

// 状態変数
// 1.pokemonAPIエンドポイントを記述
function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  
  // 5.データを取得する時のloading処理を作成
  const [loading, setLoading] = useState(true)

  // 7.pokemonデータを取得する関数を作成
  const [pokemonData, setPokemonData] = useState([])

  // 次のページのURL
  const [nextURL, setNextURL] = useState('')

  //　前のページのURL
  const [prevURL, setPrevURL] = useState('')

    // 2.リロードした時にデータを取得するためにuseEffectを使う
      // 一度だけ実行するために第二引数に空の配列を渡す
      // ポケモンデータを取得する関数を作成する
      // 非同期処理で行うためasyncをつける
      // ポケモンデータを取得する変数(getAllPokemon)を作成する
      // 引数にURLを渡す（initialURL）
      // getAllPokemon関数をsrc/utils/pokemon.jsに記述する
      // App.jsのPromiseを使うためココでasync,awaitを使う

    // 4.pokemon.jsで取得したresolve(data)をawaitで待っている状態
      // 全てのポケモンデータをresで受け取る
      // ポケモンデータを読み込む
      // getAllPkemonをimportする

      useEffect(() => {
        const fetchPokemonData = async () => {
          // 4.全てのポケモンデータを取得
          let res = await getAllPkemon(initialURL)
          // 7.各ポケモンデータの詳細なデータを取得
          loadPokemon(res.results)
          // console.log(res)
          setNextURL(res.next)
          setPrevURL(res.previous)
          setLoading(false)
        }
        fetchPokemonData()
      }, [])
      
     
    // 7.各ポケモンデータの詳細なデータを取得するために各ポケモンのURLを取得する
      // fetchして取得
      // Promise.allを使用
      // res.resultsで受け取ったデータをmapで展開していく
      // それぞれのポケモンのURLを取得する変数(pokemonRecord)と
      // 関数（getPokemon)を作成
      // getPokemon関数をsrc/utils/pokemon.jsに記述する        
      const loadPokemon = async (data) => {
         let _pokemonData = await Promise.all(
           data.map((pokemon) => {
              let pokemonRecord = getPokemon(pokemon.url)
              return pokemonRecord
            })
          )
          setPokemonData(_pokemonData)
        }
        // console.log(pokemonData)

        // 10.次のページのデータを取得する関数を作成
        const handleNextPage =  async () => {
          setLoading(true)
          let data = await getAllPkemon(nextURL)
          // console.log(data)
          await loadPokemon(data.results)
          setNextURL(data.next)
          setPrevURL(data.previous)
          setLoading(false)
        }

        // 11.前のページのデータを取得する関数を作成
        // prevURLがnullの時は前のページがないのでreturn
        const handlePrevPage = async () => {
          if(!prevURL) return

          setLoading(true)
          let data = await getAllPkemon(prevURL)
          await loadPokemon(data.results)
          setNextURL(data.next)
          setPrevURL(data.previous)
          setLoading(false)
        }

  // 6.loadingがtrue、faulsそれぞれの時のローディング画面を三項演算子で設定
  return  (
    <>
    <Navbar />
     <div className="App">
       {loading ?(
         <h1>ロード中...</h1>
        ) :(
          <>
        {/* 8.ポケモンデータをHTMLに書き出す
            Cardコンポーネントを作成
            Cardコンポーネントにprops(pokemon)を渡す
            CardコンポーネントをApp.jsにimportする
            Cardコンポーネントにkeyを設定する
            9.Card.js作成しApp.jsでタブ補完を行いCard.jsをimport  */}
              <div className="pokemonCardContainer">
                {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />
                })}
              </div>
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
             </>
            )}
     </div>
     </>
   );
}

export default App;
