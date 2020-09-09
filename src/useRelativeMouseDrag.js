import { useState, useEffect, useCallback, useRef } from "react";
import useEventListener from "./useEventListener";

export default function useReelativeMouseDrag(beforeMove, onMove) {
  const [ref, setRef] = useState();
  const mouseDown = useRef(false);
  const startPos = useRef();
  const savedBeforeMoveHandler = useRef();
  const savedOnMoveHandler = useRef();

  useEffect(() => {
    savedBeforeMoveHandler.current = beforeMove;
  }, [beforeMove]);
  useEffect(() => {
    savedOnMoveHandler.current = onMove;
  }, [onMove]);

  const onMouseDown = useCallback(event => {
    mouseDown.current = true;
    startPos.current = {
      x: event.clientX,
      y: event.clientY,
      calc: (savedBeforeMoveHandler && savedBeforeMoveHandler.current()) || {}
    };
  }, []);

  const onMouseMove = useCallback(event => {
    if (mouseDown.current) {
      event.preventDefault();
      const offset = {
        x: event.clientX - startPos.current.x,
        y: event.clientY - startPos.current.y
      };

      const calculated = {};
      if (typeof startPos.current.calc.x !== "undefined") {
        calculated.x = startPos.current.calc.x + offset.x;
      }
      if (typeof startPos.current.calc.y !== "undefined") {
        calculated.y = startPos.current.calc.y + offset.y;
      }
      savedOnMoveHandler.current(calculated, offset);
    }
  }, []);

  const onMouseUp = useCallback(event => {
    if (mouseDown.current) {
      event.stopPropagation();
      mouseDown.current = false;
    }
  }, []);

  useEventListener("mousedown", onMouseDown, ref);
  useEventListener("mousemove", onMouseMove);
  useEventListener("mouseup", onMouseUp);

  return [setRef, ref];
}
