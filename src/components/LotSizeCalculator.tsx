"use client";

import { useReducer, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Pair information lookup table
const PAIR_INFO = {
    "EUR/USD": 1,
    "EUR/JPY": 1.60,
    "NAS100": 10,
} as const;

type Pair = keyof typeof PAIR_INFO;

// State and actions for the reducer
type State = {
    accountBalance: number;
    stopLoss: number;
    pair: Pair;
    riskAmount: number;
    lotSize: number;
};

type Action =
    | { type: "SET_ACCOUNT_BALANCE"; payload: number }
    | { type: "SET_STOP_LOSS"; payload: number }
    | { type: "SET_PAIR"; payload: Pair }
    | { type: "SET_RISK_AMOUNT"; payload: number }
    | { type: "CALCULATE_LOT_SIZE" };

// Initial state
const initialState: State = {
    accountBalance: 10000,
    stopLoss: 70,
    pair: "EUR/USD",
    riskAmount: 90,
    lotSize: 0,
};

// Reducer function
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_ACCOUNT_BALANCE":
            return { ...state, accountBalance: action.payload };
        case "SET_STOP_LOSS":
            return { ...state, stopLoss: action.payload };
        case "SET_PAIR":
            return { ...state, pair: action.payload };
        case "SET_RISK_AMOUNT":
            return { ...state, riskAmount: action.payload };
        case "CALCULATE_LOT_SIZE": {
            const pointValue = PAIR_INFO[state.pair] || 1;
            const lotSize = Math.round((state.riskAmount * pointValue) / state.stopLoss * 10) / 10;
            return { ...state, lotSize };
        }
        default:
            return state;
    }
}

export default function LotSizeCalculator() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "CALCULATE_LOT_SIZE" });
    }, [state.riskAmount, state.stopLoss, state.pair]);

    return (
        <main className="min-h-svh bg-gray-100 flex items-center justify-center p-2">
            <Card className="w-full max-w-md">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Lot Size Calculator</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        Calculate your optimal lot size
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="account-balance">Account Balance</Label>
                        <Input
                            id="account-balance"
                            type="number"
                            value={state.accountBalance}
                            onChange={(e) =>
                                dispatch({ type: "SET_ACCOUNT_BALANCE", payload: parseFloat(e.target.value) })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stop-loss">Stop Loss in Points</Label>
                        <Input
                            id="stop-loss"
                            type="number"
                            value={state.stopLoss}
                            onChange={(e) =>
                                dispatch({ type: "SET_STOP_LOSS", payload: parseFloat(e.target.value) })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pair">Pair</Label>
                        <Select
                            value={state.pair}
                            onValueChange={(value) => dispatch({ type: "SET_PAIR", payload: value as Pair })}
                        >
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
                        <Label htmlFor="risk-amount">Risk Amount ($)</Label>
                        <Input
                            id="risk-amount"
                            type="number"
                            value={state.riskAmount}
                            onChange={(e) =>
                                dispatch({ type: "SET_RISK_AMOUNT", payload: parseFloat(e.target.value) })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="point-value">Point Value</Label>
                        <Input
                            id="point-value"
                            type="number"
                            value={PAIR_INFO[state.pair]}
                            disabled
                            className="bg-gray-50"
                        />
                    </div>
                    <div className="pt-4 border-t">
                        <div className="text-lg font-semibold">Calculated Lot Size</div>
                        <div className="text-3xl font-bold text-primary">{state.lotSize}</div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
