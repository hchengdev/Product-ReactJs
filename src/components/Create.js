import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";

export default function CreateProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [genre, setGenres] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/genre')
            .then(response => setGenres(response.data))
            .catch(error => console.error(error));
    }, []);

    const validationSchema = Yup.object({
        productCode: Yup.string()
            .matches(/^PROD - \d{4}$/, "Product code must follow the format PROD - XXXX")
            .required("Product code is required"),
        title: Yup.string().required("Title is required"),
        name: Yup.string().required("Name is required"),
        quantity: Yup.number()
            .required("Quantity is required")
            .positive("Quantity must be greater than 0")
            .integer("Quantity must be an integer"),
        price: Yup.number()
            .required("Price is required")
            .positive("Price must be greater than 0")
            .integer("Price must be an integer"),
        genreId: Yup.number().required("Genre is required").positive().integer(),
        importDate: Yup.date()
            .required("Import date is required")
            .max(new Date(), "Import date cannot be later than today"),
    });

    const formik = useFormik({
        initialValues: {
            productCode: '',
            name: '',
            title: '',
            genreId: 0,
            price: 0,
            importDate: '',
            quantity: 0 
        },
        validationSchema,
        onSubmit: (values) => {
            const productData = {
                ...values,
                genreId: values.genreId,
            };
            axios.post('http://localhost:3000/products', productData)
                .then(response => {
                    alert('Created successfully');
                    navigate('/');
                })
                .catch(error => console.error(error));
        }
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center">Create New Product</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productCode">Product Code</label>
                    <input
                        id="productCode"
                        name="productCode"
                        type="text"
                        className={`form-control ${formik.touched.productCode && formik.errors.productCode ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productCode}
                    />
                    {formik.touched.productCode && formik.errors.productCode ? (
                        <div className="invalid-feedback">{formik.errors.productCode}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="invalid-feedback">{formik.errors.title}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        className={`form-control ${formik.touched.quantity && formik.errors.quantity ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                        <div className="invalid-feedback">{formik.errors.quantity}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <div className="invalid-feedback">{formik.errors.price}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="genreId">Genre</label>
                    <select
                        id="genreId"
                        name="genreId"
                        className={`form-control ${formik.touched.genreId && formik.errors.genreId ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.genreId}
                    >
                        <option value="" label="Select genre" />
                        {genre.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {formik.touched.genreId && formik.errors.genreId ? (
                        <div className="invalid-feedback">{formik.errors.genreId}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="importDate">Import Date</label>
                    <input
                        id="importDate"
                        name="importDate"
                        type="date"
                        className={`form-control ${formik.touched.importDate && formik.errors.importDate ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.importDate}
                    />
                    {formik.touched.importDate && formik.errors.importDate ? (
                        <div className="invalid-feedback">{formik.errors.importDate}</div>
                    ) : null}
                </div>

                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}
