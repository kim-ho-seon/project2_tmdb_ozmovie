import { useState, useEffect } from 'react';

/**
 * useDebounce 훅은 주어진 값(value)의 변화를 지연시키는 데 사용됩니다.
 * 지정된 지연 시간(delay) 후에만 debouncedValue가 업데이트됩니다.
 *
 * @param {any} value - 디바운스할 값
 * @param {number} delay - 지연 시간(밀리초)
 * @returns {any} - 지연된 값
 */


function useDebounce(value, delay) {
  // debouncedValue 상태를 정의하고 초기값으로 value를 설정
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 지정된 delay 후에 value를 debouncedValue로 설정하는 타이머 핸들러 생성
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업 함수: 컴포넌트가 언마운트되거나 effect가 다시 실행될 때 타이머를 정리
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value 또는 delay가 변경될 때마다 effect가 실행됨

  // 지연된 값을 반환
  return debouncedValue;
}

export default useDebounce;
