const translateTime = function(time) {
  if (time < 60) {
    return `${time}м`
  }

  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  return `${hours}ч ${minutes}м`
};

export { translateTime };