"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Pair information lookup table
const PAIR_INFO = {
    "EUR/USD": 1,
    "EUR/JPY": 1.62,
    "NAS100": 10,
} as const;

type Pair = keyof typeof PAIR_INFO; // "EUR/USD" | "EUR/JPY" | "NAS100"

export default function LotSizeCalculator() {
    const [accountBalance, setAccountBalance] = useState(10000)
    const [stopLoss, setStopLoss] = useState(70)
    const [pair, setPair] = useState("EUR/USD")
    const [riskAmount, setRiskAmount] = useState(90)
    const [lotSize, setLotSize] = useState(0)

    // Get point value from pair info
    const pointValue = PAIR_INFO[pair as Pair] || 1;

    useEffect(() => {
        // Calculate lot size using the formula: ROUND((Risk Amount * Point Value) / Stop Loss, 1)
        const calculatedLotSize = Math.round((riskAmount * pointValue) / stopLoss * 10) / 10
        setLotSize(calculatedLotSize)
    }, [riskAmount, pointValue, stopLoss])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Lot Size Calculator</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Calculate your optimal lot size</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="accountBalance">Account Balance</Label>
                        <Input
                            id="accountBalance"
                            type="number"
                            value={accountBalance}
                            onChange={(e) => setAccountBalance(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stopLoss">Stop Loss in Points</Label>
                        <Input
                            id="stopLoss"
                            type="number"
                            value={stopLoss}
                            onChange={(e) => setStopLoss(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pair">Pair</Label>
                        <Select value={pair} onValueChange={setPair}>
                            <SelectTrigger id="pair">
                                <SelectValue placeholder="Select a currency pair" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(PAIR_INFO).map((pairName) => (
                                    <SelectItem key={pairName} value={pairName}>
                                        {pairName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="riskAmount">Risk Amount ($)</Label>
                        <Input
                            id="riskAmount"
                            type="number"
                            value={riskAmount}
                            onChange={(e) => setRiskAmount(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pointValue">Point Value</Label>
                        <Input
                            id="pointValue"
                            type="number"
                            value={pointValue}
                            disabled
                            className="bg-gray-50"
                        />
                    </div>
                    <div className="pt-4 border-t">
                        <div className="text-lg font-semibold">Calculated Lot Size</div>
                        <div className="text-3xl font-bold text-primary">{lotSize}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

