
type OverlayPanelProps = {
    onClose: () => void;
}
function OverlayPanel({ onClose }: OverlayPanelProps) {
    return (
        <div>
            <button onClick={() => onClose()}>close</button>
        </div>
    )
}

export default OverlayPanel
