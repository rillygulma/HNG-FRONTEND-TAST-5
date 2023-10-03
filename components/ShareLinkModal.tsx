const ShareModal = ({ isOpen, onClose, uniqueUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueUrl)
  }

  return (
    isOpen && (
      <div className='modal'>
        <button onClick={onClose}>Close</button>
        <p>Share this link:</p>
        <input type='text' value={uniqueUrl} readOnly />
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
    )
  )
}

export default ShareModal
