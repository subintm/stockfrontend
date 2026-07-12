import React from 'react'
import { API_URL } from '../config';

function UserDashboard() {

  const [stockList, setStockList] = useState([]);
  const tocken = localStorage.getItem('token');

  const getStock = () => {
    try {
      const result = await axios.get(`${API_URL}/api/stock/getstock`, {
        headers: {
          'Authorization': `Bearer ${tocken}`
        }
      })
      result.data.success ? alert(result.data.message) : alert(result.data.message);
    } catch (err) {
      console.log(err);
    }

    setStockList(stock);
  }
  return (
    <div>
      <p>Welcome to your dashboard</p>

      Stock List:

      {stockList.map((stock) => (
        <div key={stock._id}>
          <p>Name: {stock.name}</p>

          <p>Price: {stock.price}</p>
          <p>Quantity: {stock.quantity}</p>
          <p>Store:{stock.Store}</p>

        </div>
      ))}
    </div>
  )
}

export default UserDashboard
