import { useEffect } from "react";
import Metdata from "./layouts/Metadata";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import Loader from "./layouts/Loader";
import Product from "./Product/Product";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import { useState } from "react";



export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productscount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    // console.log(currentPage)
    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER

            });
        }
        dispatch(getProducts(currentPage, null, null, null, null))
    }, [error, dispatch, currentPage])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <Metdata title={'Home'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" class="container mt-5">
                        <div class="row">
                            {products && products.map(product => (
                                <Product col={3} key={product._id} product={product} />
                            ))}

                        </div>
                    </section>
                    {productscount > 0 && productscount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productscount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={"Next"}
                                firstPageText={"First"}
                                lastPageText={"Last"}
                                itemClass={'page-item'}
                                linkClass={'page-link'}

                            />
                        </div> : null}
                </Fragment>
            }
        </Fragment>

    )
}