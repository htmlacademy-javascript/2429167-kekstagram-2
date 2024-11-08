const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const descriptionText = [
  'Сегодня приехали на пляж. Нам очень понравилось!',
  'Съёмки природы с моей камеры',
  'Фотография блюда по моему фирменному рецепту',
  'Мой автомобиль!',
  'Приехали на курорт, сфотографировались у знака.',
  'Сегодня были на концерте классической музыки.',
];

const messageText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = ['Артём', 'Ярослав', 'Елена', 'Вероника', 'Сергей', 'Олег', 'Марина', 'Ксения', 'Святослав', 'Дмитрий', 'Анастасия', 'Евгения', 'Евгений', 'Александра', 'Александр'];

const POSTS_COUNT = 25;

const createPost = () => ({
  id: createRandomIdFromRangeGenerator(1, 25),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(descriptionText),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, () => ({
    id: createRandomIdFromRangeGenerator(26, 800),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: Array.from({ length: getRandomInteger(1, 2) }, () => (
      getRandomArrayElement(messageText)
    )),
    name: getRandomArrayElement(names),
  })),
});

const postGenerator = Array.from({length: POSTS_COUNT}, createPost);

postGenerator();
