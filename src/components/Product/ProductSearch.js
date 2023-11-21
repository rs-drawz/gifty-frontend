import { useEffect } from "react";
import Metdata from ".././layouts/Metadata";
import { getProducts } from "../../actions/productActions"
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import Loader from ".././layouts/Loader";
import Product from ".././Product/Product";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';



export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products, loading, error, productscount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setprice] = useState([1000, 10000]);
    const [pricechanged, setpricechannged] = useState(price);
    const [category, setcategory] = useState(null);
    const [ratings, setratings] = useState(0);




    const { keyword } = useParams()
    const categories = [
        'Stone art',
        'Resin art',
        'book art',
    ]
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
        dispatch(getProducts(currentPage, keyword, pricechanged, category, ratings))
    }, [error, dispatch, currentPage, keyword, pricechanged, category, ratings])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <Metdata title={'Home'} />
                    <h1 id="products_heading">Searched Products</h1>

                    <section id="products" class="container mt-5">
                        <div class="row">
                            <div className="col-6 col-md-3 mb-5 mt-5">
                                {/* price filter */}
                                <div className="px-5" onMouseUp={() => setpricechannged(price)}>
                                    <Slider
                                        range={true}
                                        marks={
                                            {
                                                1000: "₹1000",
                                                10000: "₹10000"
                                            }
                                        }
                                        min={1000}
                                        max={10000}
                                        defaultValue={price}
                                        onAfterChange={(price) => {
                                            setprice(price)
                                        }}
                                        handleRender={
                                            renderProps => {
                                                return (
                                                    <Tooltip overlay={`₹${renderProps.props['aria-valuenow']}`}>
                                                        <div {...renderProps.props}></div>
                                                    </Tooltip>
                                                )
                                            }
                                        }

                                    />
                                </div>
                                <hr />
                                {/* category filter */}
                                <div className='mt-5'>
                                    <h3 className="mb-3">categories</h3>
                                    <ul className="pl-0">
                                        {categories.map(category =>

                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={category}
                                                onClick={() => {
                                                    setcategory(category)
                                                }}
                                            >
                                                {category}
                                            </li>
                                        )}

                                    </ul>
                                </div>
                                {/* ratings filter */}
                                <hr />
                                <div className="mt-5">
                                    <h4 className="mb-3">
                                        <ul className="pl-0">
                                            {[5, 4, 3, 2, 1].map(rating =>

                                                <li
                                                    style={{
                                                        cursor: "pointer",
                                                        listStyleType: "none"
                                                    }}
                                                    key={rating}
                                                    onClick={() => {
                                                        setratings(rating)
                                                    }}
                                                >
                                                    <div className="rating-outer">
                                                        <div className="rating-inner"
                                                            style={{
                                                                width: `${rating * 20}%`
                                                            }}></div>
                                                    </div>
                                                </li>
                                            )}

                                        </ul>
                                    </h4>
                                </div>
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>


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