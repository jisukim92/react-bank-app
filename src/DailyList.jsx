import React from 'react'
import MyData from './data.json'
import './main.css'

const DailyList = () => {
  let dataList = []

  const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
      let group = el[key]

      if (carry[group] === undefined) {
        carry[group] = []
      }

      carry[group].push(el)
      return carry
    }, {})
  }
  let historyList = groupBy(MyData, 'date')

  let initialValue = 0

  function totalPrice(value) {
    value.map((e, index) => {
      initialValue += e.price
    })
    return initialValue
  }

  Object.keys(historyList).forEach((key) => {
    dataList.push({
      date: key,
      total: totalPrice(historyList[key]),
    })
  })

  const DayComponent = (props) => {
    return (
      <>
        <div className='day-use__wrap'>
          <p className='day'>{props.date}</p>
          <p className='day-spend'>{props.total}원</p>
        </div>
      </>
    )
  }

  const ListComponent = (props) => {
    return (
      <>
        <li className='history__list'>
          <p className='item'>{props.item}</p>
          <p className='price'>{props.price}</p>
        </li>
      </>
    )
  }
  return (
    <div className='history-scroll'>
      <div className='history-day'>
        {dataList.map((e) => (
          <>
            <div className='day-money-wrap'>
              <DayComponent date={e.date} total={e.total} />
              <ul className='money-history'>
                {historyList[e.date].map((he, hi) => (
                  <>
                    <ListComponent item={he.item} price={he.price} />
                  </>
                ))}
              </ul>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default DailyList
