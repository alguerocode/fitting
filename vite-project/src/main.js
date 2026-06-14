import './style.css'

const LENS_URL_1 =
  'https://lens.snap.com/experience/0ed75989-7359-44d8-bf56-b295031c34db'
const LENS_URL_2 =
  'https://lens.snap.com/experience/368b0d4e-38d8-434f-8f9a-d14c7e941dcf'
const LENS_URL_3 = 'YOUR_LENS_URL_3'

const LENS_CONFIG = [
  { url: LENS_URL_1, label: 'Lens 1' },
  { url: LENS_URL_2, label: 'Lens 2' },
  { url: LENS_URL_3, label: 'Lens 3' },
]

function isLensReady(url) {
  return Boolean(url) && !url.includes('YOUR_LENS_URL')
}

function setStatus(message, isError = false) {
  const statusEl = document.querySelector('#status')
  if (!statusEl) return
  statusEl.textContent = message
  statusEl.classList.toggle('text-red-400', isError)
  statusEl.classList.toggle('text-white/70', !isError)
  statusEl.classList.toggle('hidden', !message)
}

function setActiveLensButton(index) {
  document.querySelectorAll('[data-lens-index]').forEach((button) => {
    const isActive = Number(button.dataset.lensIndex) === index
    button.classList.toggle('ring-2', isActive)
    button.classList.toggle('ring-yellow-400', isActive)
    button.classList.toggle('bg-white/20', isActive)
    button.classList.toggle('bg-white/10', !isActive)
  })
}

function renderUI() {
  document.querySelector('#app').innerHTML = `
    <div class="min-h-screen bg-black text-white flex flex-col">
      <div class="flex-1 relative overflow-hidden">
        <iframe
          id="lens-frame"
          title="Snapchat Lens"
          class="absolute inset-0 h-full w-full border-0"
          allow="camera; microphone; fullscreen; autoplay; xr-spatial-tracking"
          allowfullscreen
        ></iframe>
        <p id="status" class="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-sm text-white/70 px-4 text-center hidden"></p>
      </div>
      <div class="flex gap-3 p-4 justify-center bg-black/80 border-t border-white/10">
        ${LENS_CONFIG.map(
          (lens, index) => `
            <button
              type="button"
              data-lens-index="${index}"
              class="px-5 py-2.5 rounded-full text-sm font-medium transition-colors bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
              ${isLensReady(lens.url) ? '' : 'disabled'}
            >
              ${lens.label}
            </button>
          `,
        ).join('')}
      </div>
    </div>
  `
}

function loadLens(index) {
  const lens = LENS_CONFIG[index]
  if (!isLensReady(lens.url)) {
    setStatus(`${lens.label} is not ready yet.`, true)
    return
  }

  const frame = document.querySelector('#lens-frame')
  frame.src = lens.url
  setActiveLensButton(index)
  setStatus('')
}

function main() {
  renderUI()

  const readyLensIndex = LENS_CONFIG.findIndex((lens) => isLensReady(lens.url))
  if (readyLensIndex === -1) {
    setStatus('Add at least one lens URL to get started.', true)
    return
  }

  loadLens(readyLensIndex)

  document.querySelectorAll('[data-lens-index]').forEach((button) => {
    button.addEventListener('click', () => {
      loadLens(Number(button.dataset.lensIndex))
    })
  })
}

main()
