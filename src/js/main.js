const $viewImagesButton = document.querySelector('.js-view-images-button')
const $imageSlider = document.querySelector('.js-image-slider')
const $emblaNode = $imageSlider.querySelector('.js-embla')
const $captionContainer = $imageSlider.querySelector('.js-caption-container')
const $progress = $imageSlider.querySelector('.js-progress')
const $cursor = $imageSlider.querySelector('.js-cursor')
const images = $imageSlider.querySelectorAll('img')

const embla = EmblaCarousel($emblaNode, {
  align: 'start',
  loop: true,
})

let hoverStatus = 'close'

$viewImagesButton.addEventListener('click', () => {
  $imageSlider.classList.remove('is-hidden')
})

$imageSlider.addEventListener('click', () => {
  if (window.innerWidth < 701) return

  switch (hoverStatus) {
    case 'next':
      embla.scrollNext()
      break
    case 'prev':
      embla.scrollPrev()
      break
    case 'close':
      $imageSlider.classList.add('is-hidden')
      break
  }
})

document.addEventListener('mousemove', (event) => {
  const isHoveringImage = event.target.closest('.js-image-slider img')

  if (isHoveringImage) {
    if (event.clientX > window.innerWidth / 2) {
      hoverStatus = 'next'
    } else {
      hoverStatus = 'prev'
    }
  } else {
    hoverStatus = 'close'
  }

  $cursor.setAttribute('data-icon', hoverStatus)
  $cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
})

embla.on('select', update)
update()

imagesLoaded(document.body, () => {
  document.body.classList.remove('is-loading')
})

function update() {
  const index = embla.selectedScrollSnap()
  const $currentSlide = embla.slideNodes()[index]
  const $currentCaption = $currentSlide.querySelector('.js-caption')

  $progress.textContent = index + 1
  $captionContainer.innerHTML = $currentCaption.innerHTML
}
