import React, {useEffect, useState} from 'react'
import s from './HomePage.module.css'
import Filter from './Filter/Filter'
import {db} from '../../firebase'
import ProductCard from '../common/ProductCard/ProductCard'

const HomePage = () => {
    const [sortBy, setSortBy] = useState('name')
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            db
                .collection('products')
                .get()
                .then(p => setProducts(p.docs.map(doc => ({id: doc.id, data: doc.data()}))))
        }
        fetchProducts()
    }, [])

    const handleSortChange = (event) => {
        setSortBy((event.target.value))
    }

    return (
        <div className={s.page}>
            <Filter sortBy={sortBy} handleSortChange={handleSortChange}/>
            <div className={s.products}>
                {sortBy === 'name'
                    ?
                    products
                    .sort((a, b) => {
                            if (a.data.name < b.data.name) return -1
                            if (a.data.name > b.data.name) return 1
                            return 0
                    })
                    .map(p => <ProductCard {...p}/>)
                :
                    products
                        .sort((a, b) => a.data.inStock - b.data.inStock)
                        .reverse()
                        .map(p => <ProductCard {...p}/>)}
            </div>
        </div>
    )
}

export default HomePage
