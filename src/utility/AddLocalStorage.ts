export enum LocalStorageKey {
  Token = "BigBashToken",
}

export function GetValueFromLocalStorage<T>(
  key: LocalStorageKey
): T | string | null {
  if (typeof window !== "undefined") {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue !== null) {
      try {
        return storedValue;
      } catch (error) {
        console.log(error);

        return storedValue;
      }
    }
  }
  return null;
}

export function GetUserToken() {
  const localStorageValue = GetValueFromLocalStorage<string>(
    LocalStorageKey.Token
  );
  return localStorageValue ?? "";
}

export function SaveUserToken(token: string) {
  window.localStorage.setItem(LocalStorageKey.Token, token);
  document.cookie = `BigBashToken=${token}; path=/; max-age=31536000`;
}

export function LogOut() {
  window.localStorage.removeItem(LocalStorageKey.Token);
  document.cookie = ``;
}
