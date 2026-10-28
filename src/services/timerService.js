export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDatetime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `PT${minutes}M${secs}S`;
}