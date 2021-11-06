import React from 'react';
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import useAuth from '../../hooks/useAuth'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const {user} = useAuth();
    const authToken = localStorage.getItem('idToken');
    const history = useHistory();
    // alert(authToken)

    useEffect(()=>{
        fetch(`http://localhost:5000/orders?email=${user.email}`,{
            headers:{
                'authorization':`Bearer ${authToken}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }else{
                history.push('/login');
            }
            
        })
        .then(data => setOrders(data))
    },[]);
    return (
        <div>
            <h2>This is orders page {orders.length} </h2>
            <ul>
                {
                    orders.map(order => <li key={order._id}>
                        {order.name}, {order.email}
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Orders;