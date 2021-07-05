import React from 'react'

const Watchlist = (props) => {

    const list = props.watchList.map((stock,index)=>{
        return (
            <tr key={index}>
                <td>{stock}</td>
                <td>{stock}</td>
                <td>{stock}</td>
            </tr>

        )

    })


    return (
        <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
        
             <tr>
            <td>AAPL</td>
            <td>$131.45</td>
            <td>+$1.23</td>
          </tr>
            {list}
        </tbody>
      </table>
    )
}

export default Watchlist
