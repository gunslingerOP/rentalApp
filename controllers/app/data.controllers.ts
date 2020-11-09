import { errRes, okRes } from "../../helpers/tools";
import { Notification } from "../../src/entity/notifications";

export default class dataStore {
  static async getNotifications(req, res): Promise<object> {
    let user = req.user;
    let notification: any;
    notification = await Notification.find({
      where: { recipient_id: user.id },
    });
    if (!notification) return errRes(res, `can't find your notifications`);
    return okRes(res, { data: notification.msg });
  }
}
