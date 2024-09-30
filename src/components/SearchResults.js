import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchResults() {
    const location = useLocation();
    const { filteredProduct = [], searchTerm = '', genre = [], selectedGenre = [] } = location.state || {}; 
    const genreMatch = genre.find(g => g.id === selectedGenre[0]);
    const genreName = genreMatch ? genreMatch.name : '';

    return (
        <div className="container mt-4">
            <h2>Kết quả tìm kiếm cho: "{searchTerm} "{genreName}" </h2>
            {filteredProduct.length > 0 ? (
                <div>
                    <h1>Danh Sách Sản Phẩm</h1>
                    <Link to='/' className="btn btn-primary mb-3">Quay lại Danh sách Sản Phẩm</Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Tiêu đề</th>
                                <th>Ngày Nhập</th>
                                <th>Thể Loại</th>
                                <th>Số Lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProduct.map(b => (
                                <tr key={b.productCode}> 
                                    <td>{b.productCode}</td>
                                    <td>{b.name}</td>
                                    <td>{b.title}</td>
                                    <td>{b.importDate}</td>
                                    <td>
                                        {genre.length > 0 
                                            ? genre.find(c => c.id === b.genreId)?.name || 'Thể loại không xác định' 
                                            : 'Đang tải...'}
                                    </td>
                                    <td>{b.quantity}</td>
                                    <td>{b.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
            )}
        </div>
    );
}
