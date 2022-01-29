import { useCallback, useState } from "react";

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
