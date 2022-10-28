/**
 * @author PIYoung
 * @createdAt 2021-12-22
 * @description Sort Schemas
 */
const init = function () {
  const script = document.createElement('script');
  script.src = '/resources/swagger-js/openapisnippet.min.js';
  document.head.appendChild(script); //or something of the likes
  setTimeout(() => {
    const sort = () => {
      Array.prototype.slice
        .call(document.querySelectorAll('div.model-container'), 0)
        .sort((a, b) => {
          const aName = a.getAttribute('id');
          const bName = b.getAttribute('id');

          if (aName > bName) return 1;
          else return -1;
        })
        .forEach((div) => {
          if (
            !(div.getAttribute('id').toLowerCase().indexOf('dto') > -1) &&
            div.querySelector('span.model-title').textContent.indexOf('<MODEL>') === -1
          )
            (div.querySelector('span.model-title').textContent =
              div.querySelector('span.model-title').textContent + ' <MODEL>') &&
              div.querySelector('span.model-title').setAttribute('style', 'color: #0d5aa7');

          document.querySelector('section.models div.no-margin').appendChild(div);
        });
    };

    const section = document.querySelector('section.models');
    section.onclick = function (e) {
      setTimeout(() => {
        Array.prototype.slice
          .call(document.querySelector('section.models').classList, 0)
          .includes('is-open') && sort();
      }, 100);
    };

    sort();
  }, 1000);
};

if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
