import React, { ReactNode, useEffect, useRef, useState } from "react";

import Button from "~/components/Button";
import styles from "./scrollable-content.module.css";

import top from "~/assets/icons/top_triangle.svg";
import bottom from "~/assets/icons/bottom_triangle.svg";

interface ScrollableContentProps {
  children?: ReactNode;
}
interface TruePressedThumb {
  scroll: number;
  event: number;
}

// TODO: Сделать декомпозицию + прибраться
export default function ScrollableContent({
  children = null,
}: ScrollableContentProps) {
  // ! HTML REFS :
  const content = useRef<HTMLDivElement | null>(null);
  const thumb = useRef<HTMLDivElement | null>(null);
  // ! SCROLLABLE STATE:
  const [scrollable, setIsScrollable] = useState(false); // if content is scrollable
  const [scale, setScale] = useState(0); // 1px of scroll thumb equals to `scale` px of content
  // ! VARIABLES:
  let thumbPress: false | TruePressedThumb = false; // false or cords of press on thumb
  let contentTouch: false | TruePressedThumb = false; // false or cords of touch on content
  let scroll: number = 0; // scrollTop on content
  let viewport: number = 1 / scale; // % of visible content = (1 / scale) btw
  const wheelScrollAmount = 16; // px of content scrolling per wheel scroll event

  // ! HELPERS:
  // scroll content on `delta` px
  const scrollContent = (delta: number, from?: number) => {
    const el = content.current;
    if (!el) return;
    el.scroll(0, (from || el.scrollTop) + delta * scale);
    scroll = el.scrollTop;
    updThumbPosition();
  };
  // updating position on thumb in case according content scroll amount
  const updThumbPosition = () => {
    const el = content.current;
    const th = thumb.current;
    if (!th || !el) return;

    const trackSpace = (el.clientHeight - 32) * (1 - viewport); // px
    const maxScroll = el.scrollHeight - el.clientHeight; // px
    const scrled = scroll / maxScroll; // %

    th.style.top = `${scrled * trackSpace}px`;
  };
  // reset touch info
  const endThumbTouch = () => (thumbPress = false);

  // ! HANDLERS:
  // on wheel
  const handleScroll = function (e: React.WheelEvent) {
    if (!scrollable) return;
    scrollContent(Math.sign(e.deltaY) * wheelScrollAmount);
  };
  // on content touch
  const handleTouchMove = function (e: React.TouchEvent) {
    if (!contentTouch) return;
    scrollContent(
      contentTouch.event - e.touches[0].pageY,
      contentTouch.scroll || 0.1
    );
  };
  // on thumb scroll with mouse
  const handleThumbMouseMove = function (e: MouseEvent) {
    if (!scrollable || !thumbPress) return;
    scrollContent(e.pageY - thumbPress.event, thumbPress.scroll || 0.1);
  };
  // on thumb scroll with touches
  const handleThumbTouchMove = function (e: TouchEvent) {
    if (!scrollable || !thumbPress) return;
    scrollContent(
      e.touches[0].pageY - thumbPress.event,
      thumbPress.scroll || 0.1
    );
  };

  // ! ON MOUNT:
  // on change of thumb or content
  useEffect(() => {
    const el = content.current;
    if (!el) return;

    // when thumb || content 's changing - recounting everything
    if (el.scrollHeight !== el.clientHeight) {
      if (!el.clientHeight || !el.scrollHeight) return;
      setIsScrollable(true);
      setScale(el.scrollHeight / el.clientHeight);

      viewport = el.clientHeight / el.scrollHeight;
      if (thumb.current) thumb.current.style.height = viewport * 100 + "%";
      
      window.addEventListener("mousemove", handleThumbMouseMove);
      window.addEventListener("touchmove", handleThumbTouchMove);
      window.addEventListener("mouseup", endThumbTouch);
      window.addEventListener("touchend", endThumbTouch);
      return () => {
        // clear all listeners was setted
        window.removeEventListener("mousemove", handleThumbMouseMove);
        window.removeEventListener("touchmove", handleThumbTouchMove);
        window.removeEventListener("mouseup", endThumbTouch);
        window.removeEventListener("touchend", endThumbTouch);
      };
    } else setIsScrollable(false);
  }, [content.current, thumb.current]);

  return (
    <div
      className={styles.container + (scrollable ? " " + styles.scrollable : "")}
    >
      <div
        className={styles.wrapper}
        ref={content}
        onWheel={handleScroll}
        onTouchStart={(e) =>
          (contentTouch = {
            event: e.touches[0].pageY,
            scroll: content.current ? content.current.scrollTop : 0,
          })
        }
        onTouchEnd={() => (contentTouch = false)}
        onTouchMove={handleTouchMove}
      >
        {children}
      </div>
      {scrollable ? (
        <div className={styles.scrollbar}>
          <Button
            withPadding={false}
            className={styles.scrollButton}
            onClick={() => scrollContent(-wheelScrollAmount)}
          >
            <img src={top} />
          </Button>
          <div className={styles.track}>
            <div
              ref={thumb}
              className={styles.thumb}
              onMouseDown={(e) =>
                (thumbPress = {
                  event: e.pageY,
                  scroll: content.current ? content.current.scrollTop : 0,
                })
              }
              onTouchStart={(e) =>
                (thumbPress = {
                  event: e.touches[0].pageY,
                  scroll: content.current ? content.current.scrollTop : 0,
                })
              }
            ></div>
          </div>
          <Button
            withPadding={false}
            className={styles.scrollButton}
            onClick={() => scrollContent(wheelScrollAmount)}
          >
            <img src={bottom} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
