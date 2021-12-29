import { useEffect, useRef } from 'react'

const useEventListener = (eventName, handlerFunc, element = window) => {
  const currentRef = useRef();
  // set the handler function as the current value of the ref to cache it
  useEffect(() => {
    currentRef.current = handlerFunc;
  }, [handlerFunc]);

  //call addEventListener with the eventName and 
  // handlerFunc to listen to the eventName event.
  useEffect(() => {
    const eventListener = (event) => currentRef.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener