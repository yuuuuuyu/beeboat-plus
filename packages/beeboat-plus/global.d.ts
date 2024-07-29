declare module 'vue' {
  export interface GlobalComponents {
    BtpButton: typeof import('@beeboat/components')['BtpButton']
  }

  interface ComponentCustomProperties {
  }
}

export {}
