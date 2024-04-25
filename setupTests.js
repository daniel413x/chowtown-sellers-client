// solve Auth0 issue
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
})
global.crypto.subtle = {}

// shadcn components use ResizeObserver
// and they can crash tests if ResizeObserver is not mocked
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
