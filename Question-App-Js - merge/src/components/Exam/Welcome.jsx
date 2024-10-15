import { NavLink } from "react-router-dom"
export const Welcome = () => {
    return (
        <div className="container-fluid vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-body-secondary">
            <h4>Teste hoşgeldiniz!</h4>
            <p>Soruları boş bırakmayınız.</p>
            <p className="fw-bold">Başarılar!</p>
            <div className="d-flex gap-4">
                <NavLink to='/questions' className='btn btn-outline-success p-2' type="submit">Sınavı Başlat</NavLink>
                <NavLink to='/' className='btn btn-outline-danger p-2' type="submit">Anasayfaya dön</NavLink>
            </div>
        </div>
    )
}
