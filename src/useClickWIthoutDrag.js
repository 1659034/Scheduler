import { useState, useEffect, useCallback, useRef } from "react";
import useEventListener from "./useEventListener";

export default function useClickWithoutDrag(onClick) {
  const [ref, setRef] = useState();
  const mouseDown = useRef(false);
  const startPos = useRef();
  const hasMoved = useRef();
  const savedOnClick = useRef();

  useEffect(() => {
    savedOnClick.current = onClick;
  }, [onClick]);

  const onMouseDown = useCallback(event => {
    mouseDown.current = true;
    hasMoved.current = false;
    startPos.current = {
      x: event.clientX,
      y: event.clientY
    };
  }, []);

  const onMouseMove = useCallback(event => {
    if (mouseDown.current) {
      event.preventDefault();
      const offset = {
        x: event.clientX - startPos.current.x,
        y: event.clientY - startPos.current.y
      };
      hasMoved.current = Math.abs(offset.x) > 2 || Math.abs(offset.y) > 2;
    }
  }, []);

  const onMouseUp = useCallback(event => {
    if (mouseDown.current) {
      event.stopPropagation();
      mouseDown.current = false;
      if (!hasMoved.current) {
        savedOnClick.current(event);
      }
    }
  }, []);

  useEventListener("mousedown", onMouseDown, ref);
  useEventListener("mousemove", onMouseMove);
  useEventListener("mouseup", onMouseUp);

  return [setRef, ref];
}
