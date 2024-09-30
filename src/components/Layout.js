import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Layout() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [genre, setGenre] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("");

    const handleSearch = () => {
        if (!searchTerm.trim() && !selectedGenre) {
            return;
        }

        const filteredProduct = products.filter(product => {
            const matchesSearchTerm = searchTerm.trim() ? product.name.toLowerCase().includes(searchTerm.toLowerCase()): true;
            const matchesGenre = selectedGenre ? product.genreId === selectedGenre : true; 

            return matchesSearchTerm && matchesGenre;
        });

        navigate('/search', { state: { filteredProduct, searchTerm, genre, selectedGenre } });
    };

    useEffect(() => {
        const fetchProdcuts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                const sortedProducts = response.data.sort((a, b) => 
                    a.name.localeCompare(b.name)
                );
                setProducts(sortedProducts)
            } catch (error) {
                setError("Lỗi khi lấy sách");
            } finally {
                setLoading(false);
            }
        };

        fetchProdcuts();
    }, []);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axios.get('http://localhost:3000/genre');
                setGenre(response.data);
            } catch (error) {
                setError("Lỗi khi lấy danh mục");
            }
        };

        fetchGenre();
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <header className="my-4">
                <h1 className="text-center">Ứng Dụng Sản Phẩm Của Tôi</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append" style={{ margin: "0 20px" }}>
                        <select
                            className="custom-select"
                            id="genreId"
                            name="genreId"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="" label="Chọn thể loại" />
                            {genre.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
