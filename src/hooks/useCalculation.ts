import { useCallback } from 'react';

const useCalculation = () => {
  const calculation = useCallback((input: string): string => {
    const regex = /(\d+(\.\d+)?(?:[+-]\d+(\.\d+)?)+)/g;

    return input.replace(regex, (match) => {
      const parts = match.split(/([+-])/);
      let result = parseFloat(parts[0]);

      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const value = parseFloat(parts[i + 1]);

        result = operator === '+' ? (result += value) : (result -= value);
      }

      return result.toString();
    });
  }, []);

  return calculation;
};

export default useCalculation;
