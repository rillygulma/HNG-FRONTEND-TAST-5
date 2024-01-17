// LoadingSpinner.jsx
const LoadingSpinner = () => (
  <div className='spinner'>
    <style jsx>{`
      .spinner,
      .spinner::after {
        border-radius: 50%;
        width: 2em;
        height: 2em;
      }
      .spinner {
        margin: 0 auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 0.3em solid rgba(255, 255, 255, 0.2);
        border-right: 0.3em solid rgba(255, 255, 255, 0.2);
        border-bottom: 0.3em solid rgba(255, 255, 255, 0.2);
        border-left: 0.3em solid #ffffff;
        transform: translateZ(0);
        animation: load8 1.1s infinite linear;
      }
      @keyframes load8 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
)

export default LoadingSpinner
