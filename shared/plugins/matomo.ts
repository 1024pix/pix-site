export default defineNuxtPlugin(() => {
  return {
    provide: {
      pushMatomoEvent: (eventCategory: string, eventAction: string, eventName: string, value: string | number): void => {
        if (import.meta.client && window._mtm) {
          window._mtm.push(['trackEvent', eventCategory, eventAction, eventName, value]);
        }
      },
    },
  };
});
