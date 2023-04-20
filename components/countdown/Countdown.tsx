import React, { useEffect, useState } from 'react'
import {TimerContainer} from "./TimerContainer";

export default function Countdown({from, onFinished}: {from: Date, onFinished: () => void}) {

    // Why?...
    from = new Date(from)

    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const updateTime = () => {
            const difference = from.getTime() - new Date().getTime();

            const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
            const newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

            setDays(newDays);
            setHours(newHours);
            setMinutes(newMinutes);
            setSeconds(newSeconds);

            if (difference <= 0) {
                setDays(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);

                onFinished();
            }
        }

        updateTime();
        setInterval(updateTime, 1000);
    }, [])

    return (
        <div className="flex flex-col items-center">
            <TimerContainer
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        </div>
    )
}