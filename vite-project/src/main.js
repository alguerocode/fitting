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

function openLens(index) {
  const lens = LENS_CONFIG[index]
  if (!isLensReady(lens.url)) return
  window.open(lens.url, '_blank', 'noopener,noreferrer')
}

function renderUI() {
  document.querySelector('#app').innerHTML = `
    <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div class="max-w-md w-full text-center space-y-8">
        <div class="space-y-2">
          <h1 class="text-2xl font-semibold">3D Fiit Camera</h1>
          <p class="text-sm text-white/60">
            Choose a lens to open the WebAR experience in a new tab.
          </p>
        </div>
        <div class="flex flex-col gap-3">
          ${LENS_CONFIG.map(
            (lens, index) => `
              <button
                type="button"
                data-lens-index="${index}"
                class="w-full px-6 py-4 rounded-2xl text-base font-medium transition-colors bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
                ${isLensReady(lens.url) ? '' : 'disabled'}
              >
                ${lens.label}${isLensReady(lens.url) ? '' : ' (coming soon)'}
              </button>
            `,
          ).join('')}
        </div>
      </div>
    </div>
  `
}

function main() {
  renderUI()

  document.querySelectorAll('[data-lens-index]').forEach((button) => {
    button.addEventListener('click', () => {
      openLens(Number(button.dataset.lensIndex))
    })
  })
}

main()
