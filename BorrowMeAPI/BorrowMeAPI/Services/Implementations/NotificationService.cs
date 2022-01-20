using BorrowMeAPI.Model;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        public void AddNotification(Notification notification)
        {
            throw new NotImplementedException();
        }

        public Notification GetAllNotifications(Guid userId)
        {
            throw new NotImplementedException();
        }

        public void RemoveNotification(Guid userId, Guid notificationId)
        {
            throw new NotImplementedException();
        }
    }
}
