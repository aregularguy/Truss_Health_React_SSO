// WebcamCapture.js
import  { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WebcamCapture.css';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRefs = Array.from({ length: 4 }, () => useRef(null));
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  useEffect(() => {
    startWebcam(); // Call startWebcam when the component mounts
  }, []);

  const capturePhoto = () => {
    if (capturedImages.length < 4) {
      const context = canvasRefs[capturedImages.length].current.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRefs[capturedImages.length].current.width,
        canvasRefs[capturedImages.length].current.height
      );

      const image = canvasRefs[capturedImages.length].current.toDataURL('image/png');
      setCapturedImages([...capturedImages, image]);
    }
  };

  const clearAllImages = () => {
    setCapturedImages([]);
    setSelectedImage(null);
  };

  return (
    <>
    <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Example
      </h2>
    <div className="webcam-capture-container">
      <div className="webcam-video-container">
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div className="capture-button-container">
        <button onClick={capturePhoto} disabled={capturedImages.length >= 4}>
          Capture Photo
        </button>
        <button onClick={clearAllImages}>Clear All</button>
      </div>
      <div className="captured-images-container">
        {capturedImages.map((image, index) => (
          <div key={index} className={`captured-image-box ${selectedImage === index ? 'selected' : ''}`}>
            <img
              src={image}
              alt={`Captured ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className="clickable-image"
            />
          </div>
        ))}
      </div>
      {Array.from({ length: 4 - capturedImages.length }).map((_, index) => (
        <canvas key={index} ref={canvasRefs[capturedImages.length + index]} style={{ display: 'none' }} />
      ))}
      {selectedImage !== null && (
        <Link to={`/selected-image/${selectedImage}`}>
          <button>View Selected Image</button>
        </Link>
      )}
    </div>
    </>
  );
};

export default WebcamCapture;
