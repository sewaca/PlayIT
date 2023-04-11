import {
  CSSProperties,
  ReactNode,
  SetStateAction,
  TouchEvent,
  useMemo,
  useRef,
  useState,
} from "react";

interface SwipableContentProps {
  children?: ReactNode;
  onLeftSwipe?: Function;
  onRightSwipe?: Function;
  setSwipeRight?: SetStateAction<Function>;
  setSwipeLeft?: SetStateAction<Function>;
  [index: string]: any;
}

export default function SwipableContent({
  children = null,
  onLeftSwipe = () => {},
  onRightSwipe = () => {},
  setSwipeRight = () => {},
  setSwipeLeft = () => {},
  ...rest
}: SwipableContentProps) {
  // div обертка
  const ref = useRef<null | HTMLDivElement>(null);
  // отступ div обертки от верхнего края экрана
  const topOffset = useMemo(
    () => ref.current?.getBoundingClientRect().top,
    [ref.current]
  );

  // Данные о касаниях
  const [touched, setTouched] = useState<null | { x: number; y: number }>(null);
  const [delta, setDelta] = useState<null | { x: number; y: number }>(null);

  // ~ HANDLERS
  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    setTouched({ x: e.touches[0].pageX, y: e.touches[0].pageY });
  }
  function onTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (touched)
      setDelta({
        x: Math.max(-300, Math.min(e.touches[0].pageX - touched.x, 300)),
        y: e.touches[0].pageY - touched.y,
      });
  }
  function onTouchEnd() {
    if (!delta) return;
    if (delta.x <= -100) onLeftSwipe();
    else if (delta.x >= 100) onRightSwipe();
    setDelta(null);
  }

  // ~ HELPERS
  function generateStyles(): CSSProperties {
    if (!ref.current || !touched || !delta || !topOffset) return {};

    let a = ((touched.y - topOffset) / ref.current.clientHeight) * 100;
    const transformOrigin = `center ${a > 60 ? "top" : "bottom"}`;

    const transform = `translateY(${delta.y}px) rotate(${
      45 * (delta.x / 300) * (a > 60 ? -1 : 1)
    }deg)`;

    return {
      transform,
      transformOrigin,
      transition: "0s",
    };
  }

  return (
    <div
      {...{ ref, ...rest, onTouchStart, onTouchMove, onTouchEnd }}
      style={{ ...rest.style, ...generateStyles() }}
    >
      {children}
    </div>
  );
}
