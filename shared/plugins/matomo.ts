export default defineNuxtPlugin(() => {
  return {
    provide: {
      pushMatomoEvent: (eventCategory: string, eventAction: string, eventName: string, value: string | number): void => {
        if (import.meta.client && _mtm) {
          _mtm.push(['trackEvent', eventCategory, eventAction, eventName, value]);
        }
      },
    },
  };
});
