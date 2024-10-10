// Проверка длины строки

function checkStrokeLength(string, maxSymbols) {
  return string.length <= maxSymbols;
}

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');
  return normalizedString === reversedString;
};

checkStrokeLength('Комментарий', 15);

isPalindrome('Топот');
