
const www = 'https://www.javbus.com';

module.exports = $ => {
  const movie = $('.movie');
  
  const stars = $('.star-box img', movie).map((i, star) => {
    const img = $(star).attr('src');
    return {
      name: $(star).attr('title'),
      avatar: img.indexOf('http') === 0 ? img : www + img,
    }
  }).get()

  const [gid] = $('body')
    .find('script')
    .map((i, item) => item.children[0])
    .get()
    .filter(Boolean)
    .map(script => script.data)
    .filter(script => /gid/.test(script))
    .map(script => script.match(/gid = (\d+);/)[1])

  const mapShowDetail = (childNum) =>{
    const line = $(`.info p:nth-child(${childNum|| 1})`, movie).text();
    const idx = line.indexOf(':');
    const value = line
      .substring(idx + 1)
      .trim()
      return value
  }

  const obj = {
    gid,
    id:  mapShowDetail(1),
    title: $('h3').text(),
    date: mapShowDetail(2),
    length: mapShowDetail(3),
    director: mapShowDetail(4),
    studio: mapShowDetail(5),
    label: mapShowDetail(6),
    stars,
    genre: $('.info .genre a', movie).map((i, x) => $(x).text()).get(),
    cover: $('img', movie).attr('src'),
    images: $('#sample-waterfall a').map((i, anchor) => $(anchor).attr('href')).get(),
  }

  return obj;
};
