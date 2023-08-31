    import ImageUploader from "../../../components/UI/ImageUploader";
    import "../layouts/BookMultimedia.css";

    export default function Multimedia() {
    return (
        <>
        <h1 className="insert-image"> Insert image </h1>
        <ImageUploader />
        <ul className="multimedia-wrapper">
            <li>
            <img src="https://m.media-amazon.com/images/I/5167YEsQ6YL.jpg" />
            </li>
            <li>
            <img src="https://m.media-amazon.com/images/I/5167YEsQ6YL.jpg" />
            </li>
            <li>
            <img src="https://m.media-amazon.com/images/I/5167YEsQ6YL.jpg" />
            </li>
        </ul>
        </>
    );
    }
