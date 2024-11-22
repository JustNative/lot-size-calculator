import { Metadata } from 'next'

// import LotSizeCalculator from '@/components/LotSizeCalculator'
import dynamic from 'next/dynamic'
const LotSizeCalculator = dynamic(() => import('@/components/LotSizeCalculator'))

export const metadata: Metadata = {
  title: 'Forex Lot Size Calculator | Optimize Your Trading',
  description: 'Calculate the optimal lot size for your forex trades with our easy-to-use calculator. Manage risk and maximize potential returns.',
  keywords: 'forex, lot size, calculator, trading, risk management',
}

export default function Home() {
  return (
    <LotSizeCalculator />
  )
}

