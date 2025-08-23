import { useEffect, useState, useRef } from "react";
// Components
import LoadingBox from "./LoadingBox";

interface OtpResendTimerProps {
  initialTime: number;
  onResend: () => Promise<unknown> | void;
  resendText?: string;
  countdownText?: string | ((formattedTime: string) => string);
}

const OtpResendTimer = ({
  initialTime,
  onResend,
  resendText = "ارسال مجدد کد",
  countdownText = "ارسال مجدد تا",
}: OtpResendTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTimer = () => {
      setTimeLeft(initialTime);
      setIsResendVisible(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsResendVisible(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [initialTime]);

  const handleResend = async () => {
    if (isLoading) return;

    try {
      const result = onResend();

      if (result instanceof Promise) {
        setIsLoading(true);
        const response = await result;
        // Type-safe status check
        const status =
          response && typeof response === "object" && "status" in response
            ? (response as { status?: number }).status
            : undefined;

        if (status === 200 || status === undefined) {
          // Restart timer
          setTimeLeft(initialTime);
          setIsResendVisible(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
              if (prev <= 1) {
                clearInterval(intervalRef.current!);
                setIsResendVisible(true);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setIsResendVisible(true);
        }
      } else {
        // Restart timer
        setTimeLeft(initialTime);
        setIsResendVisible(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              setIsResendVisible(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch {
      setIsResendVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const formatted = formatTime(timeLeft);

  return (
    <div className="fcc gap-2 text-xs text-secondary-400 h-4">
      {!isResendVisible ? (
        <span>
          {typeof countdownText === "function"
            ? countdownText(formatted)
            : `${countdownText} ${formatted}`}
        </span>
      ) : (
        <button
          onClick={handleResend}
          disabled={isLoading}
          className="rounded"
        >
          {isLoading ? <LoadingBox size={20} color={"#0077DB"} /> : resendText}
        </button>
      )}
    </div>
  );
};

export default OtpResendTimer;