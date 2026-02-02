import { Wallet } from 'lucide-react'
import { useState } from 'react'

export const TONConnect = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleConnect = () => {
    setIsConnected(!isConnected)
    if (!isConnected) {
      setWalletAddress('0QC...xxxxx')
    } else {
      setWalletAddress(null)
    }
  }

  return (
    <div className="px-4 py-4">
      <button
        onClick={handleConnect}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
          isConnected
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <Wallet size={20} />
        {isConnected ? `Connected: ${walletAddress}` : 'Connect TON Wallet'}
      </button>
    </div>
  )
}
