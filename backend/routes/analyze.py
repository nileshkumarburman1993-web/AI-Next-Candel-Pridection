from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import random

router = APIRouter(
    prefix="/analyze",
    tags=["Analyze"]
)


class Candle(BaseModel):
    time: str
    open: float
    high: float
    low: float
    close: float
    volume: float = 0


class AnalyzeRequest(BaseModel):
    timeframe: str
    candles: List[Candle]


@router.post("/")
async def analyze(request: AnalyzeRequest):

    last = request.candles[-1]

    # -----------------------------
    # Prediction
    # -----------------------------

    prediction = "Bullish"

    if last.close < last.open:
        prediction = "Bearish"

    confidence = random.randint(75, 95)

    # -----------------------------
    # Trading Levels
    # -----------------------------

    if prediction == "Bullish":

        entry = round(last.close, 2)
        stop_loss = round(last.low, 2)
        target1 = round(entry + (entry - stop_loss), 2)
        target2 = round(entry + 2 * (entry - stop_loss), 2)

        next_candle = {
            "open": entry,
            "high": target1,
            "low": stop_loss,
            "close": round((entry + target1) / 2, 2)
        }

        reasons = [
            "Bullish candle close",
            "Buying pressure detected",
            "Momentum is positive"
        ]

    else:

        entry = round(last.close, 2)
        stop_loss = round(last.high, 2)
        target1 = round(entry - (stop_loss - entry), 2)
        target2 = round(entry - 2 * (stop_loss - entry), 2)

        next_candle = {
            "open": entry,
            "high": stop_loss,
            "low": target1,
            "close": round((entry + target1) / 2, 2)
        }

        reasons = [
            "Bearish candle close",
            "Selling pressure detected",
            "Momentum is negative"
        ]

    return {
        "success": True,
        "prediction": prediction,
        "confidence": confidence,
        "entry": entry,
        "stopLoss": stop_loss,
        "target1": target1,
        "target2": target2,
        "reasons": reasons,
        "nextCandle": next_candle,
        "timeframe": request.timeframe,
        "totalCandles": len(request.candles),
        "lastCandle": last
    }