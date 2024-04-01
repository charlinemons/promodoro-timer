export default function TimerDisplay({ time }) {
  console.log("Time prop in TimerDisplay:", time);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
  };

  const { minutes, remainingSeconds } = formatTime(time);

  return (
    <div className="timer-display">
      <h1>
        {minutes < 10 ? "0" + minutes : minutes}:
        {remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}
      </h1>
    </div>
  );
}
