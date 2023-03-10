const millisToMinutesAndSeconds = (millis: number) => {
  const minutes: number = Math.floor(millis / 60000);
  const seconds: string = ((millis % 60000) / 1000).toFixed(0);
  return seconds === "60"
    ? minutes + 1 + ":00"
    : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
};

export default millisToMinutesAndSeconds;
