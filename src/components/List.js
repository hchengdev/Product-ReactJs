import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function ListProduct() {
    const [product, productState] = useState([]);
    const [genre, genreState] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                const sortedProducts = response.data.sort((a, b) => 
                    a.name.localeCompare(b.name)
                );
                productState(sortedProducts);
                console.log(sortedProducts);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/genre')
            .then(response => genreState(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">List of Product</h1>
            <Link to='/create' className="btn btn-primary mb-3">Add New Product</Link>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Import Date</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map(b => (
                        <tr key={b.productCode}>
                            <td>{b.productCode}</td>
                            <td>{b.name}</td>
                            <td>{b.title}</td>
                            <td>{b.importDate}</td>
                            <td>
                                {genre.length > 0 
                                    ? genre.find(c => c.id === b.genreId)?.name 
                                    : 'Loading...'}
                            </td>
                            <td>{b.price}</td>
                            <td>{b.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
