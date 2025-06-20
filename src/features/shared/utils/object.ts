export function shallowEqual(
  objA: Record<string, any>,
  objB: Record<string, any>
): boolean {
  if (objA === objB) return true;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!objB.hasOwnProperty(key)) {
      return false;
    }

    const valueA = objA[key];
    const valueB = objB[key];

    if (Array.isArray(valueA) && Array.isArray(valueB)) {
      if (valueA.length !== valueB.length) {
        return false;
      }
      for (let i = 0; i < valueA.length; i++) {
        if (valueA[i] !== valueB[i]) {
          return false;
        }
      }
    } else if (valueA !== valueB) {
      return false;
    }
  }

  return true;
}
