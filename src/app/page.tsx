import { Metadata } from 'next'

import LotSizeCalculator from '@/components/LotSizeCalculator'

export const metadata: Metadata = {
  title: 'Forex Lot Size Calculator | Optimize Your Trading',
  description: 'Calculate the optimal lot size for your forex trades with our easy-to-use calculator. Manage risk and maximize potential returns.',
  keywords: 'forex, lot size, calculator, trading, risk management',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section>
          <LotSizeCalculator />
        </section>
      </main>
    </div>
  )
}

