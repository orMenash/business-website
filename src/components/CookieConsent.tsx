
import { useState, useEffect } from "react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white py-2 text-sm z-50" role="alert" aria-live="polite">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <p>אתר זה משתמש בעוגיות לשיפור חווית המשתמש</p>
        <button
          onClick={handleAccept}
          className="bg-accent hover:bg-accent/90 px-4 py-1 rounded-md transition-colors"
          aria-label="אישור שימוש בעוגיות"
        >
          אישור
        </button>
      </div>
    </div>
  );
};
