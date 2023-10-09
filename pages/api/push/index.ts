import webpush, { PushSubscription } from "web-push";
import { CONFIG } from "../../../config";
import {
  getSubscriptionsFromDb,
  saveSubscriptionToDb,
} from "../../../utils/in-memory-db";
import { NextApiRequest, NextApiResponse } from "next";

webpush.setVapidDetails(
  "mailto:test@example.com",
  CONFIG.PUBLIC_KEY,
  CONFIG.PRIVATE_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const subscription = req.body as PushSubscription | null;

    if (!subscription) {
      console.error("No subscription was provided!");
      return;
    }

    const updatedDb = await saveSubscriptionToDb(subscription);

    return res.status(200).json({ message: "success", updatedDb });
  } else if (req.method === "GET") {
    const subscriptions = await getSubscriptionsFromDb();

    subscriptions.forEach(async (s) => {
      const payload = JSON.stringify({
        title: "WebPush Notification!",
        body: "Hello World",
      });

      try {
        await webpush.sendNotification(s, payload);
      } catch (error) {
        console.log("Error sending notification", error);
      }
    });

    return res.status(200).json({
      message: `${subscriptions.length} messages sent!`,
    });
  }
}
