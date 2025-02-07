const waitForElement = (selector) => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) return resolve(element);

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect(); 
        resolve(element);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
};

/**
 * 
 * @param {NodeListOf<HTMLVideoElement>} elements 
 */
function showPlayer(elements)
{
  for(const el of elements) {
      el.controls = true;
      el.parentElement.querySelector("div")?.remove()
  }
}

window.onload = async () => {
  const videoElements = document.querySelectorAll("video");
  showPlayer(videoElements)

  const observer = new MutationObserver(() => {
    const elements = document.querySelectorAll("video");

    if(elements && elements.length)
      showPlayer(elements);
  });
  observer.observe(document.body, { childList: true, subtree: true });
};
