import React from "react";

function constructSearchParamsLookup() {
  const params = new URLSearchParams(window.location.search);
  const lookup = {};
  for (const [key, value] of params) {
    lookup[key] = value;
  }
  return lookup;
}

export function useUrlSearchParams() {
  const [searchParams, setSearchParams] = React.useState(
    constructSearchParamsLookup
  );

  function set(key, value) {
    setSearchParams({ ...searchParams, [key]: value });
  }

  const handleUrlChange = () => setSearchParams(constructSearchParamsLookup);

  React.useEffect(() => {
    const newParams = new URLSearchParams("");

    Object.keys(searchParams).forEach((key) => {
      const entry = searchParams[key];

      if (Array.isArray(entry)) {
        entry.forEach((value) => {
          newParams.append(key, value);
        });
      } else if (!entry) {
        newParams.delete(key);
      } else {
        newParams.set(key, entry);
      }
    });

    const newQueryParams = newParams.toString();

    window.history.replaceState(
      {},
      "",
      newQueryParams
        ? `${location.pathname}?${newQueryParams}`
        : location.pathname
    );
  }, [searchParams]);

  React.useEffect(() => {
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  return {
    value: searchParams,
    set,
  };
}
