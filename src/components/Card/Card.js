// 9.Cardコンポーネント作成
// rafceでタブ補完
// {pokemon.sprites.front_default}は開発者ツールで確認しそのまま入力
// ポケモンの名前を入れる{pokemon.name}
// ポケモンのタイプを表示する　mapで展開する
// 重さ、高さ、アビリティを表示する ポケモンの情報は開発者ツールで確認
import React from 'react'
import './Card.css'

const Card = ({ pokemon }) => {
  return (
    <div className='card'>
        <div className='cardImg'>
            <img src={pokemon.sprites.front_default} alt=''/>
        </div>
        <h3 className='cardName'>{pokemon.name}</h3>
        <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return(
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          )
        })}
    </div>
    <div className="cardInfo">
      <div className="cardData">
        <p className="title">重さ:{pokemon.weight}</p>
      </div>
      <div className="cardData">
        <p className="title">高さ:{pokemon.height}</p>
      </div>
      <div className="cardData">
        <p className="title">アビリティ:{pokemon.abilities[0].ability.name}</p>
      </div>
    </div>
    </div>
  )
}

export default Card

