// import { CONFIG } from "../config";

const CONFIG = {
  PUBLIC_KEY:
    "BL_Vz2gRrmtxY_Lg-0GlhB-U4RVABUhhRwiK0z2UKiy8nNkpHZ77W2M6vfNIz7tOm5CxKijPwo_EQrhmbTRew1M",
  PRIVATE_KEY: "UY_JhFPm5i804uJJy7DEup43KeobTsH--wMHQHQU1rc",
};

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("./sw.js");
};

// Ask for user's permission to display notifications. Necessary on iOS devices to use to use the setAppBadge API
const askForPermission = async () => {
  return await Notification.requestPermission();
};

const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
};

const saveSubscription = async (subscription) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/push`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  return response.json();
};

const subscribe = async () => {
  if (localStorage.getItem("subscribed")) return;

  try {
    await unregisterServiceWorkers();

    const swRegistration = await registerServiceWorker();
    const permission = await askForPermission();

    if (permission === "granted") {
      // You can now use the Badging API
      console.log("Notifications Permission granted");
    } else {
      console.log("Notifications Permission denied");
    }

    const options = {
      applicationServerKey: CONFIG.PUBLIC_KEY,
      userVisibleOnly: true,
    };
    const subscription = await swRegistration.pushManager.subscribe(options);

    await saveSubscription(subscription);

    localStorage.setItem("subscribed", true);
    console.log({ subscription });
  } catch (err) {
    console.error(err);
  }
};

subscribe();
