import { useCallback, useState, useEffect } from "react";

export function useModalState(defaultvalue = false) {
  const [isOpen, setIsopen] = useState(defaultvalue);
  //usecalllback is used everytime when we want to render a particular function to change only when it is called not when one of the component changes
  //for optimixation
  const open = useCallback(
    () => setIsopen(true),

    []
  );
  const close = useCallback(
    () => setIsopen(false),

    []
  );
  return { isOpen, close, open };
}

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};
